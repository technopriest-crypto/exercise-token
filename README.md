# exercise-token

## Development environment

1. Create Network `docker network create dev`

2. Run the `docker-compose` with the command :

  `docker-compose up -d`

3. Install Python web requirements

  ```docker exec -it web pip install -r requirements.txt```

4. To run server:

  ```docker exec -it web python site.py```

  Or To call a shell inside web container:

  ```docker exec -it web /bin/bash```
