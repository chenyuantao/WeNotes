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
    return await this.notesRepository.find({ status: 1 });
  }

  async getNote(id: number): Promise<Notes> {
    return await this.notesRepository.findOne({
      id,
      status: 1,
    });
  }

  async createNote(note: Notes): Promise<Notes> {
    await this.notesRepository.insert(note);
    return note;
  }

  async updateNote(id: number, note: Notes) {
    await this.notesRepository.update(
      { id },
      { ...note, updatedAt: new Date() },
    );
    return note;
  }

  async deleteNote(id: number) {
    await this.notesRepository.update({ id }, { status: 0 });
  }
}
