from uuid import uuid4
from base64 import b64decode
from hashlib import sha256

import algokit_utils
import pytest
from algokit_utils import (
    Account,
    TransactionParameters,
    TransferParameters,
    get_account,
    transfer,
)
from algokit_utils.config import config
from algosdk import abi
from algosdk.atomic_transaction_composer import (
    AccountTransactionSigner,
    TransactionWithSigner,
)
from algosdk.encoding import decode_address
from algosdk.error import AlgodHTTPError
from algosdk.transaction import PaymentTxn
from algosdk.v2client.algod import AlgodClient
from algosdk.v2client.indexer import IndexerClient

from smart_contracts.artifacts.heba_chain.heba_chain_client import HebaChainClient


def test_add_product(algod_client: AlgodClient, heba_chain_client: HebaChainClient, account: Account, intermediary: Account, customer: Account) -> None:
    """Tests the add_product method."""

    history_box_abi = abi.ABIType.from_string("(string,string,string,string,uint64)")
    product_box_abi = abi.ABIType.from_string("(string,string,string,address,address,address,string,string,string,uint64)")
    history_box_name = b"history_" + decode_address(account.address)
    product_box_name = b"product_" + decode_address(account.address)

    # Test application call return value
    heba_chain_client.add_product(
        history_id=str(uuid4()),
        product_id=str(uuid4()),
        name="iPhone 13 pro",
        customer=customer.address,
        intermediary=intermediary.address,
        delivery_location="Lagos",
        current_location="Ilorin",
        condition="Good",
        transaction_parameters=TransactionParameters(boxes=[(0, product_box_name), (0, history_box_name)]),
    )

    # Test box value fetched from Algod
    box_value = b64decode(algod_client.application_box_by_name(heba_chain_client.app_id, history_box_name)["value"])
    id, product_id, location, condition, timestamp = history_box_abi.decode(box_value)

    assert isinstance(id, int)


def test_get_product_history(algod_client: AlgodClient, heba_chain_client: HebaChainClient, account: Account) -> None:
    pass
