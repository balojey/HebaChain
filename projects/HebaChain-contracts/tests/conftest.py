from pathlib import Path

import pytest
from algokit_utils import (
    Account,
    get_algod_client,
    get_indexer_client,
    is_localnet,
    transfer,
    get_account,
    TransferParameters
)
import algokit_utils
from algokit_utils.config import config
from algosdk.v2client.algod import AlgodClient
from algosdk.v2client.indexer import IndexerClient
from dotenv import load_dotenv

from smart_contracts.artifacts.heba_chain_product_history.heba_chain_product_history_client import HebaChainProductHistoryClient
from smart_contracts.artifacts.game.game_client import GameClient
from smart_contracts.artifacts.heba_chain.heba_chain_client import HebaChainClient


@pytest.fixture(autouse=True, scope="session")
def environment_fixture() -> None:
    env_path = Path(__file__).parent.parent / ".env.localnet"
    load_dotenv(env_path)


@pytest.fixture(scope="session")
def algod_client() -> AlgodClient:
    client = get_algod_client()

    # you can remove this assertion to test on other networks,
    # included here to prevent accidentally running against other networks
    assert is_localnet(client)
    return client


@pytest.fixture(scope="session")
def indexer_client() -> IndexerClient:
    return get_indexer_client()


@pytest.fixture(scope="session")
def account(algod_client: AlgodClient) -> Account:
    return get_account(
        algod_client,
        "demo_account",
        1_000_000_000
    )


@pytest.fixture(scope="session")
def intermediary(algod_client: AlgodClient) -> Account:
    return get_account(
        algod_client,
        "intermediary_demo_account",
        1_000_000
    )


@pytest.fixture(scope="session")
def customer(algod_client: AlgodClient) -> Account:
    return get_account(
        algod_client,
        "customer_demo_account",
        1_000_000
    )


@pytest.fixture(scope="session")
def heba_chain_product_history_client(account: Account, algod_client: AlgodClient, indexer_client: IndexerClient) -> HebaChainProductHistoryClient:
    config.configure(
        debug=True,
        # trace_all=True,
    )

    client = HebaChainProductHistoryClient(
        algod_client,
        creator=account,
        indexer_client=indexer_client,
    )

    client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
    )

    transfer(
        algod_client,
        TransferParameters(
            from_account=account,
            to_address=client.app_address,
            micro_algos=100_000_000,
        ),
    )

    return client


@pytest.fixture(scope="session")
def game_client(account: Account, algod_client: AlgodClient, indexer_client: IndexerClient) -> GameClient:
    config.configure(
        debug=True,
        # trace_all=True,
    )

    client = GameClient(
        algod_client,
        creator=account,
        indexer_client=indexer_client,
    )

    client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
    )

    transfer(
        algod_client,
        TransferParameters(
            from_account=account,
            to_address=client.app_address,
            micro_algos=100_000_000,
        ),
    )

    return client


@pytest.fixture(scope="session")
def heba_chain_client(account: Account, algod_client: AlgodClient, indexer_client: IndexerClient) -> HebaChainClient:
    config.configure(
        debug=True,
        # trace_all=True,
    )

    client = HebaChainClient(
        algod_client,
        creator=account,
        indexer_client=indexer_client,
    )

    client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
    )

    transfer(
        algod_client,
        TransferParameters(
            from_account=account,
            to_address=client.app_address,
            micro_algos=100_000_000,
        ),
    )

    return client
