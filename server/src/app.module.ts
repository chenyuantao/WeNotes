import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message-events/message.module';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessageModule,
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
