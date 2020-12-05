import React from 'react';
import { List, AutoSizer } from 'react-virtualized';
import useSWR, { mutate } from 'swr';
import { getNotes } from '../../services/notes';
import styles from './components/style.less';
import Header from './components/header';
import Item from './components/item';
import { history } from 'umi';
import { v4 as uuidv4 } from 'uuid';
import { SearchBar, PullToRefresh, Msg } from 'react-weui';
import { useState } from 'react';

const getNotesKey = '/api/notes';

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
            onClick: () => history.push(`/notes/${uuidv4()}`),
          },
        ]}
      />
    );
  }
  const list = data.filter(d => !searchValue || d.name.includes(searchValue));
  return (
    <div className={styles.container}>
      <Header size={list.length} />
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
    </div>
  );
};
