#!/usr/bin/python3
import os
from brownie import ExerciseTokenClaim, accounts, network, config


def main():
    clnode_jobid = os.getenv('CLNODE_JOBID')
    if not clnode_jobid:
        raise RuntimeError("I need a CLNODE_JOBID environment variable")

    claim_contract = ExerciseTokenClaim[len(ExerciseTokenClaim) - 1]

    claim_contract.setJobId(clnode_jobid, {'from': dev})
