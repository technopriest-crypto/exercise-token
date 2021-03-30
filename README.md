# exercise-token

## Development environment

- Create the data folder:

  `mkdir data && mkdir data/chainlink-kovan`


- Add `api` and `password` files:

  ```
  echo "technopriest@gmx.us" > ./data/chainlink-kovan/api
  echo "password123" >> ./data/chainlink-kovan/api
  echo "password123" > ./data/chainlink-kovan/password
  ```

- Create Network `docker network create dev`

- Run the `docker-compose` with the command :

  `docker-compose up -d`

- Install Python web requirements

  ```docker exec -it web pip install -r requirements.txt```

- To run server:

  ```docker exec -it web python site.py```

  Or To call a shell inside web container:

  ```docker exec -it web /bin/bash```

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
      			"type": "runlog",
      			"params": {
      				"address": "0x07d654f98dd16563f3585779623e5f724cc62d70"
      			}
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

      Set the env var for the job just created using the jobid from your web interface: `export CLNODE_JOBID=YOUR_JOB_ID`


- Deploy the token contract:

  `brownie run scripts/03_deploy_exercise_token.py --network kovan`


- Deploy the token contract:

  `brownie run scripts/04_deploy_exercise_token_claim.py --network kovan`

  and add chainlink funds to the claim contract:

  `brownie run scripts/05_fund_chainlink_api.py --network kovan`

  *Note:* Your wallet needs to have LINK tokens, which can be added by following [this guide](https://docs.chain.link/docs/acquire-link)

- Add the current claim contract as minter of our token:

  `brownie run scripts/06_add_minter.py --network kovan`

- run

  `brownie run scripts/99_exercise_token_claim_abi.py --network kovan`

  to get the address and abi
