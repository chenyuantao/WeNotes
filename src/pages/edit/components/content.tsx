import React from 'react';
import { Article } from 'react-weui';
import styles from './styles.less';
import { Note } from '@/services/notes';

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
        ref={input => {
          // wait for the page transition
          setTimeout(() => {
            if (input) {
              input?.focus();
              if (input.selectionStart === 0) {
                input?.setSelectionRange(
                  input.textLength,
                  input.textLength,
                  'forward',
                );
              }
            }
          }, 251);
        }}
        className={styles.textarea}
        placeholder="Keep calm and write something."
        defaultValue={note.content}
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
