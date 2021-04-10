#!/usr/bin/python3
import os
from brownie import Oracle, accounts, network, config

def main():
    dev = accounts.add(os.getenv(config['wallets']['from_key']))
    current_network_config = config['networks'][network.show_active()]
    return Oracle.deploy(
        current_network_config['link_token'],
        {'from': dev})
