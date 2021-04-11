<h1 align="center">
  exercise-token
</h1>

<p align="center">
  <img src="/react-app/src/components/etknlogo.gif" width="225" height="150">
</p>

<h3 align="center">
  <em>ETKN</em>
</h3>

<p align="center">
  Exercise Token (<em>ETKN</em>) is a fool-proof, yet simple and impactful way to incentivize healthy habits using ChainLink Oracles and the power of Smart Contracts!
</p>

<p align="center">
  <a href="https://github.com/technopriest-crypto/exercise-token/blob/main/LICENSE">
    <img alt="MIT license" src="https://img.shields.io/github/license/technopriest-crypto/exercise-token">
  </a>
</p>

## Inspiration & Why CHAINLINK is needed here

## Ambitions for the future (ToDo)

## Prerequisites

- This repo forked or cloned
- [Docker](https://www.docker.com/) installed
- An ETH crypto wallet like [MetaMask](https://metamask.io/) installed
    - Set to the Kovan network
    - The wallet funded with ETH, I used this [Gitter chat](https://gitter.im/kovan-testnet/faucet)
    - The wallet funded with LINK tokens, by following [this guide](https://docs.chain.link/docs/acquire-link)
- Create an [Infura](https://infura.io/) project
    - Obtain the **Web3 Infura Project ID** and the **ETH Url**
- Create a [Google OAuth](https://developers.google.com/identity/protocols/oauth2) project
    - Obtain the **OAuth Client ID** and the **OAuth Client Secret**

## Getting Started

*We know it's pretty intimidating*, but trust us, you'll figure it out!

- Create the data folder:

  `mkdir data && mkdir data/chainlink-kovan`

- Add **api** and **password** files with the chainlink node info:

  ```
  echo "technopriest@gmx.us" > ./data/chainlink-kovan/api
  echo "password123" >> ./data/chainlink-kovan/api
  echo "password123" > ./data/chainlink-kovan/password
  ```

- Create the development network for docker: `docker network create dev`

- Create a file named **.env** in the root of the project: `touch .env`

    - Set the following environment variables in the **.env**

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

  Enter into the react-app directory:

  `cd react-app`

  Build the React App:

  `docker build --tag react-app .`

  Run the React App on port 3000 using npm run start:

  `docker run -p 3000:3000 react-app npm run start sleep 30`

  Visit the React App at [localhost:3000](http://localhost:3000/)

- In the smart contract dev container:

  Run a shell in the container: `docker exec -it smart_contracts /bin/bash`

  Install brownie: `pip install eth-brownie`

  Set your chainlink node address: `export CLNODE_ADDRESS='0x9c9361F06180EE1F6A554886e31Bd9383652c92F'`

  *Important* install the dependencies manually:

  ```
  brownie pm install OpenZeppelin/openzeppelin-contracts@3.0.0 && brownie pm install alphachainio/chainlink-contracts@1.1.2
  ```

  Deploy the oracle contract: `brownie run scripts/01_deploy_oracle.py --network kovan`


- Add your node to the chainlink oracle contract by calling the **setFulfillmentPermission** function of the oracle contract:

  `brownie run scripts/02_set_fulfillment_permissions.py --network kovan`

  make sure the **CLNODE_ADDRESS** env var is correctly set to your node.


- Now, on the Chainlink node create a bridge and a job by logging onto [localhost:6688](http://localhost:6688/):

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

- Add the current claim contract as minter of our token:

  `brownie run scripts/06_add_minter.py --network kovan`

- Get the address of the **exercise_token** smart contract:

  `brownie run scripts/98_exercise_token_abi.py --network kovan`

- Get the address of the **exercise_token_claim** smart contract:

  `brownie run scripts/99_exercise_token_claim_abi.py --network kovan`
