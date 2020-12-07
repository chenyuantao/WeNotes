import React from 'react';
import { List, AutoSizer } from 'react-virtualized';
import useSWR, { mutate } from 'swr';
import { getNotes } from '../../services/notes';
import styles from './components/styles.less';
import Header from './components/header';
import Item from './components/item';
import { history } from 'umi';
import { SearchBar, PullToRefresh, Msg } from 'react-weui';
import { useState } from 'react';
import { createNote } from '@/services/notes';

const getNotesKey = '/api/notes';
const createNoteAndRedirect = async () => {
  const { id } = await createNote({
    title: 'A wonderful new note',
    content: 'Keep calm and write something.',
  });
  history.push(`/notes/${id}`);
};

export default () => {
  const { data, error } = useSWR(getNotesKey, getNotes);
  const [searchValue, setSearchValue] = useState('');
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
  if (!data) {
    return <Msg className={styles.msg} type="loading" title="Loading..." />;
  }
  if (!data.length) {
    return (
      <Msg
        className={styles.msg}
        type="info"
        title="Please create your first note."
        buttons={[
          {
            type: 'primary',
            label: 'Create',
            onClick: () => createNoteAndRedirect(),
          },
        ]}
      />
    );
  }
  const list = data.filter(
    d =>
      !searchValue ||
      d.title.includes(searchValue) ||
      d.content.includes(searchValue),
  );
  return (
    <>
      <Header size={list.length} onCreateNote={() => createNoteAndRedirect()} />
      <SearchBar
        className={styles.search}
        placeholder="Search"
        lang={{
          cancel: 'Cancel',
        }}
        defaultValue={searchValue}
        onChange={(val: string) => setSearchValue(val)}
      />
      <div className={styles.list}>
        <PullToRefresh
          onRefresh={(res: () => void) => {
            mutate(getNotesKey);
            res();
          }}
        >
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowCount={list.length}
                rowHeight={120}
                rowRenderer={({ index, style }) => (
                  <Item key={list[index].id} note={list[index]} style={style} />
                )}
              />
            )}
          </AutoSizer>
        </PullToRefresh>
      </div>
    </>
  );
};
