# from uuid import uuid4
# from base64 import b64decode
# from hashlib import sha256

# import algokit_utils
# import pytest
# from algokit_utils import (
#     Account,
#     TransactionParameters,
#     TransferParameters,
#     get_account,
#     transfer,
# )
# from algokit_utils.config import config
# from algosdk import abi
# from algosdk.atomic_transaction_composer import (
#     AccountTransactionSigner,
#     TransactionWithSigner,
# )
# from algosdk.encoding import decode_address
# from algosdk.error import AlgodHTTPError
# from algosdk.transaction import PaymentTxn
# from algosdk.v2client.algod import AlgodClient
# from algosdk.v2client.indexer import IndexerClient

# from smart_contracts.artifacts.heba_chain_product_history.heba_chain_product_history_client import HebaChainProductHistoryClient


# def test_save_product_history(algod_client: AlgodClient, heba_chain_product_history_client: HebaChainProductHistoryClient, account: Account) -> None:
#     """Tests the save_product_history method."""

#     box_abi = abi.ABIType.from_string("(uint64,uint64,string,string,uint64)")
#     box_name = b"history_" + decode_address(account.address)

#     # Test application call return value
#     heba_chain_product_history_client.save_product_history(
#         history_id=str(uuid4()),
#         product_id=str(uuid4()),
#         current_location="Ilorin",
#         condition="Good",
#         transaction_parameters=TransactionParameters(boxes=[(0, box_name)]),
#     )

#     # Test box value fetched from Algod
#     box_value = b64decode(algod_client.application_box_by_name(heba_chain_product_history_client.app_id, box_name)["value"])
#     id, product_id, location, condition, timestamp = box_abi.decode(box_value)

#     assert isinstance(id, int)


# def test_get_product_history(algod_client: AlgodClient, heba_chain_product_history_client: HebaChainProductHistoryClient, account: Account) -> None:
#     pass
