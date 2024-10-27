from algopy import ARC4Contract, String
from algopy.arc4 import abimethod
from typing import NamedTuple
from enum import Enum
import algopy


class ProductState(Enum):
    created = "CREATED"
    shipped = "SHIPPED"
    delivered = "DELIVERED"

class Product(algopy.arc4.Struct):
    id: algopy.UInt64
    name: algopy.String
    state: ProductState
    distributor: algopy.Account
    intermediary: algopy.Account
    customer: algopy.Account
    condition: algopy.String
    current_location: algopy.String
    delivery_location: algopy.String
    delivery_date: algopy.BigUInt

class History(algopy.arc4.Struct):
    id: algopy.UInt64
    product_id: algopy.UInt64
    location: algopy.String
    condition: algopy.String
    timestamp: algopy.UInt64

class ProductCreated(algopy.arc4.Tuple):
    product_id: algopy.BigUInt
    name: algopy.String
    condition: algopy.String
    delivery_location: algopy.String

class ProductShipped(algopy.arc4.Tuple):
    product_id: algopy.BigUInt
    condition: algopy.String

class ProductUpdated(algopy.arc4.Tuple):
    product_id: algopy.BigUInt
    condition: algopy.String
    location: algopy.String

class ProductDelivered(algopy.arc4.Tuple):
    product_id: algopy.BigUInt
    condition: algopy.String


def only_distributor(func, *args, **kwargs):
    pass

def only_intermediary(func, *args, **kwargs):
    pass

def only_customer(func, *args, **kwargs):
    pass


class HebaChain(ARC4Contract):
    def __init__(self) -> None:
        self.products = algopy.Box(algopy.arc4.DynamicArray[Product], key=b"product_")
        self.histories = algopy.Box(algopy.arc4.DynamicArray[History], key=b"history_")
        self.total_product: algopy.UInt64 = 0
        self.total_history: algopy.UInt64 = 0

    @algopy.subroutine
    def increment_total_product(self) -> None:
        self.total_product += 1

    @algopy.subroutine
    def save_product(self, product: Product) -> None:
        self.products.value[product.id] = product

    @algopy.subroutine
    def update_product(self, product: Product) -> None:
        self.save_history(product)

    @algopy.subroutine
    def get_product(self, product_id: int) -> Product:
        product: Product = self.products.value[product_id]
        return product

    @algopy.subroutine
    def save_history(self, history: History) -> None:
        self.histories.value[history.id] = history

    @algopy.subroutine
    def get_histories(self, product_id: int) -> tuple[History]:
        histories = [history for history in self.histories.value if history.product_id == product_id]
        histories = histories.sort(key="timestamp")
        return tuple(histories)

    

    @abimethod()
    def add_product(
        self,
        name: str,
        customer: str,
        intermediary: str,
        condition: str,
        current_location: str,
        delivery_location: str
    ) -> None:
        product_id: algopy.BigUInt = self.total_product
        self.histories[product_id] = History(current_location, condition, algopy.op.Block.blk_timestamp())
        self.products.append(
            Product(
                product_id,
                name,
                ProductState.created,
                algopy.Txn.sender,
                algopy.Account(intermediary),
                algopy.Account(customer),
                condition,
                current_location,
                delivery_location,
                0
            )
        )
        algopy.log(ProductCreated(product_id, name, condition, delivery_location))
        self.increment_total_product()

    @abimethod()
    @only_intermediary
    def ship_product(
        self,
        product_id: int,
        condition: str,
        location: str,
        delivery_date: algopy.BigUInt
    ) -> None:
        product: Product = self.products[product_id]
        assert product.state == ProductState.created, "Product is not in created state!"
        self.histories[product_id] = History(
            location,
            condition,
            algopy.op.Block.blk_timestamp()
        )
