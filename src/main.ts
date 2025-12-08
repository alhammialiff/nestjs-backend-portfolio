import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


/** 
* Bootstrapping Nest.js app with HTTP backend with MQTT Microservice
*/
async function bootstrap() {

  // Bootstrapping RESTful backend
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  
  // Bootstrapping MQTT Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL ?? 'mqtt://localhost:1883',
      username: process.env.MQTT_CLIENT_USERNAME,
      password: process.env.MQTT_CLIENT_KEY,
      clientId: `nestjs-${Math.random().toString(16).slice(2)}`
    }
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
