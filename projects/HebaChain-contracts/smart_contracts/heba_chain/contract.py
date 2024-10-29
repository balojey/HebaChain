from algopy import ARC4Contract, String
from algopy.arc4 import abimethod
# from typing import NamedTuple
# from enum import Enum
import algopy


# class ProductState(Enum):
#     created = "CREATED"
#     shipped = "SHIPPED"
#     delivered = "DELIVERED"

class History(algopy.arc4.Struct):
    product_id: algopy.arc4.UInt64
    location: algopy.arc4.String
    condition: algopy.arc4.String
    timestamp: algopy.arc4.UInt64

class ProductCreated(algopy.arc4.Struct):
    product_id: algopy.arc4.UInt64
    name: algopy.arc4.String
    condition: algopy.arc4.String
    delivery_location: algopy.arc4.String

class ProductShipped(algopy.arc4.Struct):
    product_id: algopy.arc4.UInt64
    condition: algopy.arc4.String

class ProductUpdated(algopy.arc4.Struct):
    product_id: algopy.arc4.UInt64
    condition: algopy.arc4.String
    location: algopy.arc4.String

class ProductDelivered(algopy.arc4.Struct):
    product_id: algopy.arc4.UInt64
    condition: algopy.arc4.String

class Product(algopy.arc4.Struct):
    id: algopy.arc4.UInt64
    name: algopy.arc4.String
    state: algopy.arc4.String
    distributor: algopy.arc4.Address
    intermediary: algopy.arc4.Address
    customer: algopy.arc4.Address
    condition: algopy.arc4.String
    current_location: algopy.arc4.String
    delivery_location: algopy.arc4.String
    delivery_date: algopy.arc4.UInt64


class HebaChain(ARC4Contract):
    def __init__(self) -> None:
        self.products = algopy.Box(algopy.arc4.DynamicArray[algopy.arc4.DynamicBytes], key=b"product_")
        self.histories = algopy.Box(algopy.arc4.DynamicArray[algopy.arc4.DynamicBytes], key=b"history_")
        self.total_product: algopy.UInt64 = algopy.UInt64(0)

    @algopy.subroutine
    def increment_total_product(self) -> None:
        self.total_product += 1

    @algopy.subroutine
    def save_product(self, product: Product) -> None:
        self.products.value[product.id.native] = algopy.arc4.DynamicBytes(product.bytes)

    @algopy.subroutine
    def update_product(self, product: Product) -> None:
        self.save_product(product)

    @algopy.subroutine
    def get_product(self, product_id: algopy.UInt64) -> Product:
        return Product.from_bytes(self.products.value[product_id].native)

    @algopy.subroutine
    def save_history(self, history: History) -> None:
        self.histories.value[history.product_id.native] = algopy.arc4.DynamicBytes(history.bytes)

    @algopy.subroutine
    def get_history(self, product_id: algopy.UInt64) -> History:
        return History.from_bytes(self.histories.value[product_id].native)

    @abimethod()
    def add_product(
        self,
        name: algopy.arc4.String,
        customer: algopy.arc4.Address,
        intermediary: algopy.arc4.Address,
        condition: algopy.arc4.String,
        current_location: algopy.arc4.String,
        delivery_location: algopy.arc4.String
    ) -> None:
        product_id: algopy.arc4.UInt64 = algopy.arc4.UInt64(self.total_product)
        current_timestamp: algopy.arc4.UInt64 = algopy.arc4.UInt64(algopy.Global.latest_timestamp)

        self.save_history(
            History(product_id, current_location, condition, current_timestamp)
        )
        self.save_product(
            Product(
                product_id,
                name,
                algopy.arc4.String("CREATED"),
                algopy.arc4.Address(algopy.Txn.sender),
                intermediary,
                customer,
                condition,
                current_location,
                delivery_location,
                algopy.arc4.UInt64(0)
            )
        )

        algopy.log(ProductCreated(product_id, name, condition, delivery_location))
        self.increment_total_product()

    @abimethod()
    # @only_intermediary
    def ship_product(
        self,
        product_id: algopy.arc4.UInt64,
        condition: algopy.arc4.String,
        location: algopy.arc4.String,
        delivery_date: algopy.arc4.UInt64
    ) -> None:        
        product: Product = self.get_product(product_id.native)
        current_timestamp: algopy.arc4.UInt64 = algopy.arc4.UInt64(algopy.Global.latest_timestamp)

        assert algopy.arc4.Address(algopy.Txn.sender) == product.intermediary, "Only the Intermediary can call this function"
        assert product.state == algopy.arc4.String("CREATED"), "Product is not in created state!"

        self.save_history(
            History(
                product.id,
                location,
                condition,
                current_timestamp
            )
        )
        product.condition = condition
        product.current_location = location
        product.delivery_date = delivery_date
        product.state = algopy.arc4.String("SHIPPED")
        self.update_product(product)

        algopy.log(ProductShipped(product.id, condition))

    @abimethod
    # @only_intermediary
    def alter_product(
        self,
        product_id: algopy.arc4.UInt64,
        condition: algopy.arc4.String,
        location: algopy.arc4.String
    ) -> None:
        product = self.get_product(product_id.native)
        current_timestamp: algopy.arc4.UInt64 = algopy.arc4.UInt64(algopy.Global.latest_timestamp)

        assert algopy.arc4.Address(algopy.Txn.sender) == product.intermediary, "Only the Intermediary can call this function"
        assert product.state == algopy.arc4.String("SHIPPED"), "Product is not in shipped state!"

        product.condition = condition
        product.current_location = location

        self.save_history(
            History(
                product.id,
                location,
                condition,
                current_timestamp
            )
        )
        self.update_product(product)

        algopy.log(ProductUpdated(product_id, condition, location))

    @abimethod
    # @only_customer
    def deliver_product(
        self,
        product_id: algopy.arc4.UInt64,
        condition: algopy.arc4.String
    ) -> None:
        product = self.get_product(product_id.native)
        current_timestamp: algopy.arc4.UInt64 = algopy.arc4.UInt64(algopy.Global.latest_timestamp)

        assert algopy.arc4.Address(algopy.Txn.sender) == product.customer, "Only the customer can call this function"
        assert product.state == algopy.arc4.String("SHIPPED"), "Product is not in shipped state!"
        
        product.current_location = product.delivery_location
        product.condition = condition
        product.state = algopy.arc4.String("DELIVERED")

        self.save_history(
            History(
                product.id,
                product.delivery_location,
                condition,
                current_timestamp
            )
        )
        self.update_product(product)
        
        algopy.log(ProductDelivered(product.id, condition))

    @abimethod()
    def get_product_history(
        self,
        product_id: algopy.arc4.UInt64
    ) -> History:
        return self.get_history(product_id.native)

    @abimethod
    def get_products(
        self
    ) -> algopy.Bytes:
        # products = [Product.from_bytes(product) for product in self.products.value]
        # return tuple(products)
        return self.products.value.bytes

