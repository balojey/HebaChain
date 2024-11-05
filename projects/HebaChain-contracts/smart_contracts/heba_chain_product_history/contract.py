# pyright: reportMissingModuleSource=false
from algopy import ARC4Contract, arc4, String, Account, BoxMap, subroutine, Txn, Global
from algopy.arc4 import abimethod
import algopy


class History(arc4.Struct):
    id: arc4.String
    product_id: arc4.String
    location: arc4.String
    condition: arc4.String
    timestamp: arc4.UInt64


class HebaChainProductHistory(ARC4Contract):
    def __init__(self) -> None:
        self.histories = BoxMap(Account, History)
        # self.total_history: algopy.UInt64 = algopy.UInt64(0)

    # @algopy.subroutine
    # def increment_total_history(self) -> None:
    #     self.total_history += 1

    @subroutine
    def save_history(self, history: History) -> History:
        self.histories[Txn.sender] = history.copy()
        return history

    # @algopy.subroutine
    # def get_history(self, product_id: algopy.UInt64) -> algopy.arc4.DynamicArray[History]:
    #     all_history: algopy.arc4.DynamicArray[History] = algopy.arc4.DynamicArray[History].from_bytes(algopy.op.bzero(1 * 4))
    #     for i in algopy.urange(self.histories.length(algopy.UInt64(100))):
    #         history = self.histories.get(i, default=History(
    #             algopy.arc4.UInt64(0),
    #             algopy.arc4.UInt64(0),
    #             algopy.arc4.String("Nowhere"),
    #             algopy.arc4.String("Nothing"),
    #             algopy.arc4.UInt64(algopy.Global.latest_timestamp)
    #         )).copy()
    #         if history.product_id.native == product_id:
    #             all_history.append(history.copy())
    #     return all_history

    # @abimethod()
    # def get_product_history(
    #     self,
    #     product_id: algopy.arc4.UInt64
    # ) -> algopy.arc4.DynamicArray[History]:
    #     return self.get_history(product_id.native)
    
    @abimethod()
    def save_product_history(
        self,
        history_id: algopy.arc4.String,
        product_id: algopy.arc4.String,
        current_location: algopy.arc4.String,
        condition: algopy.arc4.String,
    ) -> History:
        # history_id: algopy.arc4.UInt64 = algopy.arc4.UInt64(self.total_history)
        current_timestamp: arc4.UInt64 = arc4.UInt64(Global.latest_timestamp)
        return self.save_history(
            History(
                history_id,
                product_id,
                current_location,
                condition,
                current_timestamp
            )
        )
        # self.increment_total_history()
