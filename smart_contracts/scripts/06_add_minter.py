#!/usr/bin/python3
import os
from brownie import ExerciseToken, ExerciseTokenClaim, accounts, network, config


def main():
    dev = accounts.add(os.getenv(config['wallets']['from_key']))
    current_network_config = config['networks'][network.show_active()]

    exercise_token_contract = ExerciseToken[len(ExerciseToken) - 1]
    exercise_token_claim_contract = ExerciseTokenClaim[len(ExerciseTokenClaim) - 1]


    exercise_token_contract.addMinter(exercise_token_claim_contract.address, {'from': dev})
