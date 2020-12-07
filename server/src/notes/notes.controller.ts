import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('/api/notes')
export class NotesController {
  constructor(private service: NotesService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getNote(Number(params.id));
  }

  @Get()
  getList() {
    return this.service.getNotes();
  }

  @Put('')
  create(@Body() body) {
    return this.service.createNote(body);
  }

  @Post(':id')
  update(@Body() body, @Param() params) {
    return this.service.updateNote(Number(params.id), body);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.service.deleteNote(Number(params.id));
  }
}
