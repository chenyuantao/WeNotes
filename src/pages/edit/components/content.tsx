import React, { useEffect } from 'react';
import { Article } from 'react-weui';
import styles from './styles.less';
import { Note } from '../../../services/notes';
import { useRef } from 'react';

export default ({
  note,
  onChange,
}: {
  note: Note;
  onChange: (newNote: Note) => void;
}) => {
  return (
    <Article className={styles.art}>
      <textarea
        className={styles.textarea}
        placeholder="Keep calm and write something."
        value={note.content}
        onChange={event =>
          onChange({
            ...note,
            content: event.currentTarget.value,
          })
        }
      />
    </Article>
  );
};
