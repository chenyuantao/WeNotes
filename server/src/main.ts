import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis.adapter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
  console.log(`server is running on http://localhost:${port}`);
}

bootstrap();
