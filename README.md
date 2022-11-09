![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
___
## Description `📄`
The project allows you to add custom posts. The project and database can be 
run in a docker container. Implemented authorization, user roles, role protectors, 
error interceptors, swagger documentation, file uploads.
___

## Installation `☕`
```bash
$ npm install
$ yarn install
```
___

## Setup environment `🔧`
```bash
# development mode
1. Create inside root dir file .development.env
2. Copy content from .development.env.dist to .development.env
3. correct inside the .development.env file the data to the required

# production mode
1. Create inside root dir file .production.env
2. Copy content from .production.env.dist to .production.env
3. correct inside the .production.env file the data to the required

# debug mode
1. Create inside root dir file .debug.env
2. Copy content from .development.env.dist to .debug.env
3. correct inside the .debug.env file the data to the required
```
___

## Running the app `🚀`
```bash

# development mode
$ npm run start:dev
$ yarn start:dev

# production mode
$ npm run start:prod
$ yarn start:prod

# debug mode
$ npm run start:debug
$ yarn start:debug
```
___
## Test `🐛`

```bash
# unit tests
$ npm run test
$ yarn test

# e2e tests
$ npm run test:e2e
$ yarn test:e2e

# test coverage
$ npm run test:cov
$ yarn test:cov
```
___

## Start in docker `🐳 `
- change in .env file row from `POSTGRES_HOST=localhost` to `POSTGRES_HOST=postgres`
- for build docker image run the command `docker-compose build`
- for start docker image run the `docker-compose up`
- for stop docker image run the `docker-compose down`
___

## Swagger documentations `📚`

http://localhost:5001/api/docs 

___
