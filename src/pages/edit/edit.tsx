import React from 'react';
import { IRouteComponentProps } from 'umi';
import useSWR from 'swr';
import { getNote } from '../../services/notes';
import styles from './styles.less';

export default (props: IRouteComponentProps<{ id: string }>) => {
  const { id } = props.match.params;
  const { data, error } = useSWR('/api/note', () => getNote(id));
  if (!id) {
    return <div>something wrong.</div>;
  }
  return (
    <>
      <div className={styles.header}>{id}</div>
    </>
  );
};
