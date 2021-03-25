#!/usr/bin/python3
import os
from brownie import Oracle, accounts, network, config


def main():
    dev = accounts.add(os.getenv(config['wallets']['from_key']))

    clnode_address = os.getenv('CLNODE_ADDRESS')
    if not clnode_address:
        raise RuntimeError("I need a CLNODE_ADDRESS environment variable")

    oracle_contract = Oracle[len(Oracle) - 1]
    oracle_contract.setFulfillmentPermission(clnode_address, True, {'from': dev})
