import React from 'react';
import styles from './styles.less';
import { history } from 'umi';
import { Note } from '@/services/notes';
import { Popup } from 'react-weui';
import { useState } from 'react';
import dayjs from 'dayjs';

export default ({
  note,
  onChange,
}: {
  note: Note;
  onChange: (newNote: Note) => void;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{note.title}</h3>
      <img
        className={styles.back}
        src={require('@/asserts/ic_back.png')}
        onClick={() => history.goBack()}
      />
      <img
        className={styles.info}
        src={require('@/asserts/ic_info.png')}
        onClick={() => setShow(true)}
      />
      <Popup show={show} onRequestClose={() => setShow(false)}>
        <>
          <div>{note.title}</div>
          <div>{dayjs(note.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
        </>
      </Popup>
    </div>
  );
};
