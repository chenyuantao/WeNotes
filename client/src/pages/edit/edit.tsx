import React from 'react';
import { IRouteComponentProps } from 'umi';
import useSWR from 'swr';
import { getNote, saveNote, saveNoteToLocal, Note } from '@/services/notes';
import useSocketIO from '@/hooks/useSocketIO';
import styles from './components/styles.less';
import Header from './components/header';
import Content from './components/content';
import { Msg } from 'react-weui';

export default (props: IRouteComponentProps<{ id: string }>) => {
  const { id } = props.match.params;
  const apiKey = `/api/note/${id}`;
  const { data, error, mutate } = useSWR(apiKey, () => getNote(Number(id)));
  const socket = useSocketIO('http://localhost:3004/notes');
  if (error) {
    return (
      <Msg
        className={styles.msg}
        type="warn"
        title="Something went wrong."
        description={error.message}
      />
    );
  }
  const onChange = (newNote: Note) => {
    mutate(newNote, false);
    if (newNote.content !== data?.content) {
      socket?.emit('saveContent', {
        id,
        content: newNote.content,
      });
      saveNoteToLocal(Number(id), newNote.content);
    } else {
      saveNote(newNote.id, newNote);
    }
  };
  if (!data || !socket || !socket.connected) {
    return <Msg className={styles.msg} type="loading" title="Loading..." />;
  }
  return (
    <>
      <Header note={data} onChange={onChange} />
      <Content note={data} onChange={onChange} />
    </>
  );
};
