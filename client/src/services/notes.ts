import axios from 'axios';
export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const API_PREFIX = '/api/notes';

export const getNotes = async (): Promise<Note[]> =>
  axios.get(API_PREFIX).then(res => res.data.data);

export const getNote = async (id: number): Promise<Note> =>
  axios.get(`${API_PREFIX}/${id}`).then(res => res.data.data);

export const createNote = async (note: Partial<Note>): Promise<Note> =>
  axios.put(`${API_PREFIX}`, note).then(res => res.data.data);

export const saveNote = async (
  id: number,
  note: Partial<Note>,
): Promise<Note> =>
  axios.post(`${API_PREFIX}/${id}`, note).then(res => res.data.data);

export const deleteNote = (id: number) =>
  axios.delete(`${API_PREFIX}/${id}`).then(res => res.data.data);
