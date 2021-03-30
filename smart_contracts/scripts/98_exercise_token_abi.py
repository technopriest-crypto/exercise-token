#!/usr/bin/python3
import os
from brownie import ExerciseToken, accounts, network, config


def main():
    token_contract = ExerciseToken[len(ExerciseToken) - 1]
    print(token_contract.address)
    # print(token_contract.abi)
