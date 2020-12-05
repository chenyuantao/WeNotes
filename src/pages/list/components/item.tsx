import React, { CSSProperties } from 'react';
import styles from './styles.less';
import {
  MediaBox,
  MediaBoxTitle,
  MediaBoxInfo,
  MediaBoxInfoMeta,
  MediaBoxDescription,
} from 'react-weui';
import { Note } from '../../../services/notes';
import dayjs from 'dayjs';
import { history } from 'umi';

const ItemComp: React.FC<{ note: Note; style?: CSSProperties }> = ({
  note,
  style,
}) => (
  <MediaBox
    key={note.id}
    type="text"
    onClick={() => history.push(`/notes/${note.id}`)}
    className={styles.item}
    style={style}
  >
    <MediaBoxTitle>{note.name}</MediaBoxTitle>
    <MediaBoxDescription>{note.id}</MediaBoxDescription>
    <MediaBoxInfo>
      <MediaBoxInfoMeta>
        {dayjs(note.createdAt).format('YYYY-MM-DD HH:mm')}
      </MediaBoxInfoMeta>
    </MediaBoxInfo>
  </MediaBox>
);

export default ItemComp;
