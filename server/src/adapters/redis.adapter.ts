import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import * as Redis from 'ioredis';

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number): any {
    const server = super.createIOServer(port);
    const pubClient = new Redis(process.env.REDIS_URL);
    const subClient = pubClient.duplicate();
    server.adapter(redisIoAdapter({ pubClient, subClient }));
    return server;
  }
}
