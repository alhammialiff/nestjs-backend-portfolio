## Description

This is a quick prototype to showcase ability working in Nest.js environment. What I love about working with Nest.js is the MVC architectural pattern and how almost identical it is to Angular. 

At this point of commit, Nest.js serves to talk to two data sources and two DBs. They are -:

### Data Sources
- Relational User Data from Local SQL DB
- Non-relational Device Data from HiveMQ's Public Broker to MongoDB Atlas Cloud

This prototype is a weekender work, but eventually it should showcase these implementations -:

 - [X] Scaffolding Relational DB containing User table and a Test User
 - [X] Relational Data Access via ORM (Prisma 5.14.0)
 - [X] MQTT Topic subscription handling
 - [X] Non-relational Data Access via ORM for MQTT Topics (Mongoose 8.20.2)
 - [ ] JWT Authentication
 - [ ] Salted Hash Authentication Handling
 - [ ] Foundational CRUD

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
