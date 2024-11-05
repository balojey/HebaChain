from algopy import ARC4Contract, arc4, String, Account, BoxMap, subroutine, Txn, Global
from algopy.arc4 import abimethod
import algopy

class Product(arc4.Struct):
    id: arc4.String
    name: arc4.String
    state: arc4.String
    distributor: arc4.Address
    intermediary: arc4.Address
    customer: arc4.Address
    condition: arc4.String
    current_location: arc4.String
    delivery_location: arc4.String
    delivery_date: arc4.UInt64


class History(arc4.Struct):
    id: arc4.String
    product_id: arc4.String
    location: arc4.String
    condition: arc4.String
    timestamp: arc4.UInt64


class HebaChain(ARC4Contract):
    def __init__(self) -> None:
        self.products = BoxMap(String, Product)
        self.histories = BoxMap(String, History)

    @algopy.subroutine
    def save_product(self, product: Product) -> None:
        self.products[product.id.native] = product.copy()

    @subroutine
    def save_history(self, history: History) -> History:
        self.histories[history.id.native] = history.copy()
        return history

    @algopy.subroutine
    def update_product(self, product: Product) -> None:
        self.save_product(product)

    @algopy.subroutine
    def get_product(self, product_id: algopy.String) -> Product:
        return self.products[product_id]

    @abimethod()
    def add_product(
        self,
        product_id: arc4.String,
        history_id: arc4.String,
        name: algopy.arc4.String,
        customer: algopy.arc4.Address,
        intermediary: algopy.arc4.Address,
        condition: algopy.arc4.String,
        current_location: algopy.arc4.String,
        delivery_location: algopy.arc4.String
    ) -> None:
        current_timestamp: arc4.UInt64 = arc4.UInt64(Global.latest_timestamp)
        self.save_product(
            Product(
                product_id, name, algopy.arc4.String("CREATED"), algopy.arc4.Address(algopy.Txn.sender),\
                intermediary, customer, condition, current_location, delivery_location, algopy.arc4.UInt64(0)
            )
        )
        self.save_history(
            History(
                history_id, product_id, current_location, condition, current_timestamp
            )
        )
        algopy.log(product_id, name, condition, delivery_location)

    @abimethod()
    # @only_intermediary
    def ship_product(
        self,
        product_id: arc4.String,
        history_id: arc4.String,
        condition: arc4.String,
        location: arc4.String,
        delivery_date: arc4.UInt64
    ) -> None:
        current_timestamp: arc4.UInt64 = arc4.UInt64(Global.latest_timestamp)
        product: Product = self.get_product(product_id.native)

        assert arc4.Address(Txn.sender) == product.intermediary, "Only the Intermediary can call this function"
        assert product.state == arc4.String("CREATED"), "Product is not in created state!"

        product.condition = condition
        product.current_location = location
        product.delivery_date = delivery_date
        product.state = arc4.String("SHIPPED")
        self.update_product(product)
        self.save_history(
            History(
                history_id, product_id, location, condition, current_timestamp
            )
        )

        algopy.log(product.id, condition)

    @abimethod
    # @only_intermediary
    def alter_product(
        self,
        product_id: arc4.String,
        history_id: arc4.String,
        condition: arc4.String,
        location: arc4.String
    ) -> None:
        current_timestamp: arc4.UInt64 = arc4.UInt64(Global.latest_timestamp)
        product = self.get_product(product_id.native)

        assert arc4.Address(Txn.sender) == product.intermediary, "Only the Intermediary can call this function"
        assert product.state == arc4.String("SHIPPED"), "Product is not in shipped state!"

        product.condition = condition
        product.current_location = location

        self.update_product(product)
        self.save_history(
            History(
                history_id, product_id, location, condition, current_timestamp
            )
        )

        algopy.log(product_id, condition, location)

    @abimethod
    # @only_customer
    def deliver_product(
        self,
        product_id: arc4.String,
        history_id: arc4.String,
        condition: arc4.String
    ) -> None:
        current_timestamp: arc4.UInt64 = arc4.UInt64(Global.latest_timestamp)
        product = self.get_product(product_id.native)

        assert arc4.Address(Txn.sender) == product.customer, "Only the customer can call this function"
        assert product.state == arc4.String("SHIPPED"), "Product is not in shipped state!"
        
        product.current_location = product.delivery_location
        product.condition = condition
        product.state = arc4.String("DELIVERED")
        self.update_product(product)
        self.save_history(
            History(
                history_id, product_id, product.current_location, condition, current_timestamp
            )
        )
        
        algopy.log(product.id, condition)

