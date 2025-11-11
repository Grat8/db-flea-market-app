# DB Market Project

## Getting started

- Starting the mysql docker: `docker compose up --build`
- Starting the server: `npm run dev` for dev mode or `npm run start`

To make sure changes to the init.sql file are updated or to remove the current data in the db, make sure to remove the docker volume. You can use `docker compose down -v` to accomplish this.

To execute sql statements on the db after running the docker, use `docker exec -it mysql-container mysql -u root -p`.
Or to just execute bash commands on the container itself, use `docker exec -it mysql-container bash`.