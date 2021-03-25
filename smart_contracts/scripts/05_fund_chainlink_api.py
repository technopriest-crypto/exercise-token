#!/usr/bin/python3
import os
from brownie import ExerciseTokenClaim, accounts, network, interface, config


def main():
    dev = accounts.add(os.getenv(config['wallets']['from_key']))

    # Get the most recent ExerciseTokenClaim Object
    exercise_token_claim_contract = ExerciseTokenClaim[len(ExerciseTokenClaim) - 1]
    interface.LinkTokenInterface(config['networks'][network.show_active()]['link_token']).transfer(
        exercise_token_claim_contract, 1000000000000000000, {'from': dev})
    print("Funded {}".format(exercise_token_claim_contract.address))
