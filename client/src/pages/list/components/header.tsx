import React from 'react';
import styles from './styles.less';

export default ({
  size = 0,
  onCreateNote,
}: {
  size: number;
  onCreateNote: () => void;
}) => (
  <div className={styles.header}>
    <h3 className={styles.title}>{`WeNotes ${size ? `(${size})` : ''}`}</h3>
    <img
      className={styles.add}
      src={require('@/asserts/ic_add.png')}
      onClick={onCreateNote}
    />
  </div>
);
