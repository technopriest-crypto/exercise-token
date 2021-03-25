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

- To run the React App

  Enter into the react-app directory

  `cd react-app`

  Build the React App

  `docker build --tag react-app .`

  Run the React App on port 3000 using `npm run start`

  `docker run -p 3000:3000 react-app npm run start sleep 30`

  Visit the React App at [localhost:3000](http://localhost:3000/)

- In the smart contract dev container:

  Run a shell in the container:
  `docker exec -it smart_contracts /bin/bash`

  Install brownie: `pip install eth-brownie`

  Set the wallet private key: `export PRIVATE_KEY=[wallet_private_key]`

  Deploy contract:

    ```
    brownie run scripts/deploy_api_consumer.py --network kovan
    brownie run scripts/fund_chainlink_api.py --network kovan
    ```
