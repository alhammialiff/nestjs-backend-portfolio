## Description

This is a quick prototype to showcase ability working in Nest.js environment. What I love about working with Nest.js is the MVC architectural pattern and how almost identical it is to Angular. This prototypes is a weekender work, but eventually it should showcase these implementations -:

 - [X] Scaffolding Relational DB containing User table and a Test User
 - [X] Relational Data Access via ORM (Prisma 5.14.0)
 - [X] MQTT Topic subscription handling
 - [] Non-relational Data Access via ORM for MQTT Topics
 - [] JWT Authentication
 - [] Salted Hash Authentication Handling
 
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

# production mode
$ npm run start:prod
```

## Deployment

## Resources

- [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- [Github Copilot] Used in Ask mode to speed up developments and learning/re-learning. I do not use Agent mode.
- [Prisma 5.14.0](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- [HiveMQ Public MQTT Broker](https://www.hivemq.com/mqtt/public-mqtt-broker/)

## Main Libraries Licenses

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
Prisma is [Apache 2.0 licenses]
MQTT is [MIT licensed]
