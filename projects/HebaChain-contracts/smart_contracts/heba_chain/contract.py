from typing import TypeAlias

from algopy import Account, ARC4Contract, BoxMap, Bytes, Global, Txn, UInt64, arc4, gtxn, op, String, log, subroutine

Hash: TypeAlias = Bytes


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
        self.products = BoxMap(Hash, Product, key_prefix=b"product_")
        self.histories = BoxMap(Hash, History, key_prefix=b"history_")

    @subroutine
    def save_product(self, product: Product, product_hash: Hash) -> None:
        self.products[product_hash] = product.copy()

    @subroutine
    def save_history(self, history: History, history_hash: Hash) -> History:
        self.histories[history_hash] = history.copy()
        return history

    @subroutine
    def update_product(self, product: Product, product_hash: Hash) -> None:
        self.save_product(product, product_hash)

    @subroutine
    def get_product(self, product_id: String) -> Product:
        p_id = op.sha256(product_id.bytes)
        return self.products[p_id]

    @arc4.abimethod
    def add_product(
        self,
        product_id: arc4.String,
        history_id: arc4.String,
        name: arc4.String,
        customer: arc4.Address,
        intermediary: arc4.Address,
        condition: arc4.String,
        current_location: arc4.String,
        delivery_location: arc4.String
    ) -> Product:
        """Add a product.

        Args:
            name (arc4.String): The product's name.

        Returns:
            User: The user's profile information.
        """
        current_timestamp: arc4.UInt64 = arc4.UInt64(Global.latest_timestamp)
        new_history_hash = op.sha256(history_id.bytes)
        new_product_hash = op.sha256(product_id.bytes)
        if new_product_hash not in self.products:
            self.save_product(
                Product(
                    product_id, name, arc4.String("CREATED"), arc4.Address(Txn.sender),
                    intermediary, customer, condition, current_location, delivery_location, arc4.UInt64(0)
                ),
                new_product_hash
            )
        if new_history_hash not in self.histories:
            self.save_history(
                History(
                    id=history_id,
                    product_id=product_id,
                    location=current_location,
                    condition=condition,
                    timestamp=current_timestamp
                ),
                new_history_hash
            )
        log(product_id, name, condition, delivery_location)
        return self.products[new_product_hash]

    @arc4.abimethod()
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
        history_hash = op.sha256(history_id.bytes)
        product_hash = op.sha256(product_id.bytes)
        product: Product = self.get_product(product_id.native)

        assert arc4.Address(Txn.sender) == product.intermediary, "Only the Intermediary can call this function"
        assert product.state == arc4.String("CREATED"), "Product is not in created state!"

        product.condition = condition
        product.current_location = location
        product.delivery_date = delivery_date
        product.state = arc4.String("SHIPPED")
        self.update_product(product, product_hash)
        self.save_history(
            History(
                history_id, product_id, location, condition, current_timestamp
            ),
            history_hash
        )

        log(product.id, condition)

    @arc4.abimethod
    # @only_intermediary
    def alter_product(
        self,
        product_id: arc4.String,
        history_id: arc4.String,
        condition: arc4.String,
        location: arc4.String
    ) -> None:
        current_timestamp: arc4.UInt64 = arc4.UInt64(Global.latest_timestamp)
        history_hash = op.sha256(history_id.bytes)
        product_hash = op.sha256(product_id.bytes)
        product = self.get_product(product_id.native)

        assert arc4.Address(Txn.sender) == product.intermediary, "Only the Intermediary can call this function"
        assert product.state == arc4.String("SHIPPED"), "Product is not in shipped state!"

        product.condition = condition
        product.current_location = location

        self.update_product(product, product_hash)
        self.save_history(
            History(
                history_id, product_id, location, condition, current_timestamp
            ),
            history_hash
        )

        log(product_id, condition, location)

    @arc4.abimethod
    # @only_customer
    def deliver_product(
        self,
        product_id: arc4.String,
        history_id: arc4.String,
        condition: arc4.String
    ) -> None:
        current_timestamp: arc4.UInt64 = arc4.UInt64(Global.latest_timestamp)
        history_hash = op.sha256(history_id.bytes)
        product_hash = op.sha256(product_id.bytes)
        product = self.get_product(product_id.native)

        assert arc4.Address(Txn.sender) == product.customer, "Only the customer can call this function"
        assert product.state == arc4.String("SHIPPED"), "Product is not in shipped state!"
    
        product.current_location = product.delivery_location
        product.condition = condition
        product.state = arc4.String("DELIVERED")
        self.update_product(product, product_hash)
        self.save_history(
            History(
                history_id, product_id, product.current_location, condition, current_timestamp
            ),
            history_hash
        )
    
        log(product.id, condition)
