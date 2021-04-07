#!/usr/bin/python3
import os
import toml
from brownie import ExerciseToken, accounts, network, config


def main():
    token_contract = ExerciseToken[len(ExerciseToken) - 1]
    print(token_contract.address)
    contracts_folder = os.getenv('CONTRACTS_FOLDER', "/contracts/")
    with open(os.path.join(contracts_folder, "exercise_token.toml"), 'w') as writer:
        writer.write(toml.dumps({"address": token_contract.address, "abi": token_contract.abi}))
