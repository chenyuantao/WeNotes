export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const LS_KEY_NOTES = 'notes';

export const getNotes = (): Note[] => {
  const res: Note[] = [];
  for (let idx = 0; idx < localStorage.length; idx++) {
    const key = localStorage.key(idx);
    if (key && key.startsWith(LS_KEY_NOTES)) {
      const note = localStorage.getItem(key);
      if (note) {
        res.push(JSON.parse(note));
      }
    }
  }
  return res;
};

export const getOrCreateNote = (id: string): Note => {
  const key = `${LS_KEY_NOTES}/${id}`;
  let note = localStorage.getItem(key);
  if (note) {
    return JSON.parse(note);
  }
  const newNote = {
    id,
    title: 'A wonderful new note',
    content: 'Keep calm and write something.',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  localStorage.setItem(key, JSON.stringify(newNote));
  return newNote;
};

export const saveNote = (id: string, note: Note) =>
  localStorage.setItem(`${LS_KEY_NOTES}/${id}`, JSON.stringify(note));
