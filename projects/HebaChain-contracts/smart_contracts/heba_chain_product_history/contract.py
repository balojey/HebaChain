# pyright: reportMissingModuleSource=false
from algopy import ARC4Contract
from algopy.arc4 import abimethod
import algopy


class History(algopy.arc4.Struct):
    product_id: algopy.arc4.UInt64
    location: algopy.arc4.String
    condition: algopy.arc4.String
    timestamp: algopy.arc4.UInt64


class HebaChainProductHistory(ARC4Contract):
    def __init__(self) -> None:
        self.histories = algopy.Box(algopy.arc4.DynamicArray[algopy.arc4.DynamicArray[algopy.arc4.DynamicBytes]], key=b"history_")

    @algopy.subroutine
    def save_history(self, history: History) -> None:
        if not self.histories:
            self.histories.value = algopy.arc4.DynamicArray[algopy.arc4.DynamicArray[algopy.arc4.DynamicBytes]].from_bytes(algopy.op.bzero(1))
        if not self.histories.value[history.product_id.native]:
            self.histories.value[history.product_id.native] = algopy.arc4.DynamicArray[algopy.arc4.DynamicBytes].from_bytes(algopy.op.bzero(1))
        self.histories.value[history.product_id.native].append(algopy.arc4.DynamicBytes(history.bytes))

    @algopy.subroutine
    def get_history(self, product_id: algopy.UInt64) -> algopy.arc4.DynamicArray[History]:
        histories = self.histories.value[product_id].copy()
        new_histories: algopy.arc4.DynamicArray[History] = algopy.arc4.DynamicArray[History].from_bytes(algopy.op.bzero(1))
        for i in algopy.urange(histories.length):
            new_histories.append(History.from_bytes(histories[i].native))
        return new_histories

    @abimethod()
    def get_product_history(
        self,
        product_id: algopy.arc4.UInt64
    ) -> algopy.arc4.DynamicArray[History]:
        return self.get_history(product_id.native)
    
    @abimethod()
    def save_product_history(
        self,
        product_id: algopy.arc4.UInt64,
        current_location: algopy.arc4.String,
        condition: algopy.arc4.String,
    ) -> None:
        current_timestamp: algopy.arc4.UInt64 = algopy.arc4.UInt64(algopy.Global.latest_timestamp)
        self.save_history(
            History(
                product_id,
                current_location,
                condition,
                current_timestamp
            )
        )
