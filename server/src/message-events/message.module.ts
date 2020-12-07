import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { NotesModule } from '../notes/notes.module';

@Module({
  imports: [NotesModule],
  controllers: [],
  providers: [MessageGateway],
})
export class MessageModule {}
