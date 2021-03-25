#!/usr/bin/python3
import os
from brownie import Oracle, ExerciseToken, ExerciseTokenClaim, accounts, network, config


def main():
    dev = accounts.add(os.getenv(config['wallets']['from_key']))
    current_network_config = config['networks'][network.show_active()]
    # get existing contracts
    oracle_contract = Oracle[len(Oracle) - 1]
    token_contract = ExerciseToken[len(ExerciseToken) - 1]

    clnode_jobid = os.getenv('CLNODE_JOBID')
    if not clnode_jobid:
        raise RuntimeError("I need a CLNODE_JOBID environment variable")

    return ExerciseTokenClaim.deploy(
        oracle_contract.address,
        clnode_jobid,
        current_network_config['fee'],
        current_network_config['link_token'],
        token_contract.address,
        {'from': dev})
