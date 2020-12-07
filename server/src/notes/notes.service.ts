import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Notes } from './notes.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes) private notesRepository: Repository<Notes>,
  ) {}

  async getNotes(): Promise<Notes[]> {
    return await this.notesRepository.find();
  }

  async getNote(id: number): Promise<Notes> {
    return await this.notesRepository.findOne({
      id,
    });
  }
}
