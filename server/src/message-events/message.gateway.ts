import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { NotesService } from '../notes/notes.service';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: '/notes' })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private noteService: NotesService) {}

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('saveContent')
  public async handleMessage(
    client: Socket,
    payload: { id: number; content: string },
  ): Promise<void> {
    await this.noteService.updateNote(Number(payload.id), {
      content: payload.content,
    });
    return this.logger.log(`Save content: ${JSON.stringify(payload)}`);
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
