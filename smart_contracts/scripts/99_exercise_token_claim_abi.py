#!/usr/bin/python3
import os
from brownie import ExerciseTokenClaim, accounts, network, config


def main():
    contract = ExerciseTokenClaim[len(ExerciseTokenClaim) - 1]
    print(contract.address)
    print(contract.abi)
