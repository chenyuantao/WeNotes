import React from 'react';
import styles from './styles.less';
import { history } from 'umi';
import { Note } from '@/services/notes';

export default ({
  note,
  onChange,
}: {
  note: Note;
  onChange: (newNote: Note) => void;
}) => (
  <div className={styles.header}>
    <h3 className={styles.title}>{note.title}</h3>
    <img
      className={styles.back}
      src={require('@/asserts/ic_back.png')}
      onClick={() => history.goBack()}
    />
  </div>
);
