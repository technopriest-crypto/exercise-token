#!/usr/bin/python3
import os
import toml
from brownie import  ExerciseTokenClaim, accounts, network, config


def main():
    contract = ExerciseTokenClaim[len(ExerciseTokenClaim) - 1]
    print(contract.address)

    contracts_folder = os.getenv('CONTRACTS_FOLDER', "/contracts/")
    with open(os.path.join(contracts_folder, "exercise_token_claim.toml"), 'w') as writer:
        writer.write(toml.dumps({"address": contract.address, "abi": contract.abi}))
