import React from 'react';
import styles from './styles.less';
import { v4 as uuidv4 } from 'uuid';
import { history } from 'umi';

export default ({ size = 0 }: { size: number }) => (
  <div className={styles.header}>
    <h3 className={styles.title}>{`WeNotes ${size ? `(${size})` : ''}`}</h3>
    <img
      className={styles.add}
      src={require('@/asserts/ic_add.png')}
      onClick={() => history.push(`/notes/${uuidv4()}`)}
    />
  </div>
);
