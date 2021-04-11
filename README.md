<h1 align="center">
  exercise-token
</h1>

<p align="center">
  <img src="/react-app/src/components/logo.png" width="150" height="150">
</p>

<h1 align="center">
  ETKN
</h1>

## Inspiration & Why CHAINLINK is needed here

## Prerequisites

- This repo forked or cloned
- [Docker](https://www.docker.com/) installed
- An ETH crypto wallet like [MetaMask](https://metamask.io/) installed

## Getting Started

Setting up the development environment

- Create the data folder:

  `mkdir data && mkdir data/chainlink-kovan`

- Add `api` and `password` files:

  ```
  echo "technopriest@gmx.us" > ./data/chainlink-kovan/api
  echo "password123" >> ./data/chainlink-kovan/api
  echo "password123" > ./data/chainlink-kovan/password
  ```

- Create the development network for docker: `docker network create dev`

- Create a file named `.env` in the root of the project: `touch .env`

    - Set the following environment variables in the `.env`

    ```
    WEB3_INFURA_PROJECT_ID=[the infura project id]
    ETH_URL=[the url given by infura. should start with wss://...]
    OAUTH_CLIENT_ID=[google api client id]
    OAUTH_CLIENT_SECRET=[google api client secret]
    PRIVATE_KEY=[a wallet private key with kovan eth. to be used to deploy the smart contracts]
    ```


- Start the docker containers:

  `docker-compose up -d`

- To run the React App:

  Enter into the react-app directory

  `cd react-app`

  Build the React App:

  `docker build --tag react-app .`

  Run the React App on port 3000 using npm run start:

  `docker run -p 3000:3000 react-app npm run start sleep 30`

  Visit the React App at [localhost:3000](http://localhost:3000/)

- In the smart contract dev container:

  Run a shell in the container:
  `docker exec -it smart_contracts /bin/bash`

  Install brownie: `pip install eth-brownie`

  Set the wallet private key: `export PRIVATE_KEY='wallet_private_key'`

  Set your chainlink node address `export CLNODE_ADDRESS='0x9c9361F06180EE1F6A554886e31Bd9383652c92F'`

  *Important* install the dependencies manually

  ```
  brownie pm install OpenZeppelin/openzeppelin-contracts@3.0.0 && brownie pm install alphachainio/chainlink-contracts@1.1.2
  ```

  Deploy contract:

    ```
    brownie run scripts/01_deploy_oracle.py --network kovan
    ```

- Add your node to the chainlink oracle contract by calling the `setFulfillmentPermission` function of the oracle contract:

  `brownie run scripts/02_set_fulfillment_permissions.py --network kovan`

  make sure the `CLNODE_ADDRESS` env var is correctly set to your node.


- Now, on the Chainlink node create a bridge and a job:

    - Create Bridge on the node

      - **Bridge Name:** ea-google-fit
      - **Bridge URL:** http://external_adapter.dev:8000

    - Create a Job:
      ```
      {
        "name": "google-fit",
      	"initiators": [
      		{
      			"type": "runlog"
      		}
      	],
      	"tasks": [
      		{
      			"type": "ea-google-fit",
      			"confirmations": null,
      			"params": {}
      		},
      		{
      			"type": "copy",
      			"confirmations": null,
      			"params": {
      				"copyPath": [
      					"steps"
      				]
      			}
      		},
      		{
      			"type": "ethuint256",
      			"confirmations": null,
      			"params": {}
      		},
      		{
      			"type": "ethtx",
      			"confirmations": null,
      			"params": {}
      		}
      	],
      	"startAt": null,
      	"endAt": null
      }
      ```

      - Set the env var for the job just created using the jobid from your web interface: `export CLNODE_JOBID=YOUR_JOB_ID`


- Deploy the token contract:

  `brownie run scripts/03_deploy_exercise_token.py --network kovan`

- Deploy the token contract:

  `brownie run scripts/04_deploy_exercise_token_claim.py --network kovan`

  and add chainlink funds to the claim contract:

  `brownie run scripts/05_fund_chainlink_api.py --network kovan`

  *Note:* Your wallet needs to have LINK tokens, which can be added by following [this guide](https://docs.chain.link/docs/acquire-link)

- Add the current claim contract as minter of our token:

  `brownie run scripts/06_add_minter.py --network kovan`

- Get the address of the **exercise_token** smart contract:

  `brownie run scripts/98_exercise_token_abi.py --network kovan`

- Get the address of the **exercise_token_claim** smart contract:

  `brownie run scripts/99_exercise_token_claim_abi.py --network kovan`
