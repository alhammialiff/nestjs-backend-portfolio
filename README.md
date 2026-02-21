## Description

This is a quick prototype to showcase ability working in Nest.js environment. What I love about working with Nest.js is the MVC architectural pattern and how almost identical it is to Angular. 

This prototype is a weekender work, but eventually it should showcase these implementations -:

 - [X] Scaffolding Relational DB containing User table and a Test User
 - [X] Relational Data Access via ORM (Prisma 5.14.0)
 - [X] MQTT Topic subscription handling
 - [X] Non-relational Data Access via ORM for MQTT Topics (Mongoose 8.20.2)
 - [X] Salted Hash Authentication Handling
 - [X] JWT Authentication
 - [X] Relaying MQTT Message to client via Websocket
 - [X] Client-triggered request to create job into RabbitMQ
 - [ ] Development of worker to handle jobs from RabbitMQ in parallel

At this point of commit, Nest.js serves to talk to two data sources and two DBs. They are -:

### Data Sources

#### 1. Relational User Data from Local SQL DB

##### Fig 1. Getting User By ID from User Entity in Local SQL DB
<p align="center">
  <img src="./docs/images/local-sql-example.png" alt="Local SQL Data Example" width="600">
</p>


#### 2. Non-relational Device Data from HiveMQ's Public Broker to MongoDB Atlas Cloud

##### Fig 2. Message Publish from Hive MQ
<p align="center">
  <img src="./docs/images/hive-mq-subscription.png" alt="Hive MQ Subscription Example" width="600">
</p>

##### Fig 3. Message stored in MongoDB Atlas
<p align="center">
  <img src="./docs/images/mongo-db-atlas.png" alt="Mongo DB Atlas Example" width="600">
</p>


#### 3. Relaying MQTT Message to a Websocket Client

##### Fig 4. Nest.js relaying MQTT data via Websocket
<p align="center">
  <img src="./docs/images/nest-js-websocket--receive-client-and-send-mqtt-data.png" alt="Mongo DB Atlas Example" width="600">
</p>

##### Fig 5. Client receiving MQTT data via Websocket
<p align="center">
  <img src="./docs/images/websocket-client-connect-and-receive-mqtt-data.png" alt="Mongo DB Atlas Example" width="600">
</p>


#### 4. JWT Authentication & Auth Guards

##### Fig 6. Token issued on successful login
<p align="center">
  <img src="./docs/images/login-with-issued-jwt-token.png" alt="Hive MQ Subscription Example" width="600">
</p>

##### Fig 7. 200 on guarded route request when token is still alive
<p align="center">
  <img src="./docs/images/auth-guarded-route-response-with-auth-user.png" alt="Mongo DB Atlas Example" width="600">
</p>

##### Fig 8. 401 on guarded route request when token has expired
<p align="center">
  <img src="./docs/images/auth-guarded-route-with-unauth-response-on-token-expiry.png" alt="Mongo DB Atlas Example" width="600">
</p>


### 5. Client-triggered job creation into RabbitMQ

##### Fig 9. POST /job/create response
<p align="center">
  <img src="./docs/images/client-triggered-job-creation-successful-response.png" alt="Client-triggered job creation into RabbitMQ succesful response" width="600">
</p>

##### Fig 10. Rabbit MQ Manager receiving the Job ID payload for worker's consumption
<p align="center">
  <img src="./docs/images/client-triggered-job-creation-into-rmq.png" alt="Client-triggered job creation into RabbitMQ" width="600">
</p>


### 6. Workers consuming jobs from RabbitMQ

- WIP


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Github Copilot] Used in Ask mode to speed up developments and learning/re-learning. I do not use Agent mode.
- [Prisma 5.14.0](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- [HiveMQ Public MQTT Broker](https://www.hivemq.com/mqtt/public-mqtt-broker/)
- [MongoDB Atlas Free Tier](https://www.mongodb.com/products/platform/atlas-database)

## Main Libraries Licenses

- Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
- Prisma is [Apache 2.0 licenses]
- MQTT is [MIT licensed]
