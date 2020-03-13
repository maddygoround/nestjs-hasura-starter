import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as passport from "passport";
import * as dotenv from "dotenv";

import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  dotenv.config();

  const configService = app.get(ConfigService)
  
  app.use(passport.initialize());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}

bootstrap();