#!/usr/bin/python3
import os
from brownie import ExerciseToken, accounts, network, config


def main():
    dev = accounts.add(os.getenv(config['wallets']['from_key']))
    return ExerciseToken.deploy({'from': dev})
