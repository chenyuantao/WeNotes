export interface Note {
  id: string;
  name: string;
  createdAt: Date;
}

const LS_KEY_NOTES = 'notes';
const LS_KEY_NOTE = 'notes';

export const getNotes = (): Note[] => {
  const json = localStorage.getItem(LS_KEY_NOTES);
  return json ? JSON.parse(json) : [];
};

export const getNote = (id: string): string => {
  createNote(id);
  return localStorage.getItem(`${LS_KEY_NOTE}/${id}`) || '';
};

export const createNote = (id: string) => {
  const notes = getNotes();
  if (notes.some(n => n.id === id)) {
    return;
  }
  notes.push({
    id,
    name: 'new note',
    createdAt: new Date(),
  });
  localStorage.setItem(LS_KEY_NOTES, JSON.stringify(notes));
};
