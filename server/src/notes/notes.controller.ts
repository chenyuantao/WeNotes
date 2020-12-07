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
import { Notes } from './notes.entity';

@Controller('notes')
export class NotesController {
  constructor(private service: NotesService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getNote(params.id);
  }

  @Get()
  getList() {
    return this.service.getNotes();
  }
}
