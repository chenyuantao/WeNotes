import React, { ChangeEvent } from 'react';
import styles from './styles.less';
import { history } from 'umi';
import { Note } from '@/services/notes';
import {
  Popup,
  Form,
  FormCell,
  CellHeader,
  Label,
  CellBody,
  Input,
  PopupHeader,
  Button,
} from 'react-weui';
import { useState } from 'react';
import dayjs from 'dayjs';
import { deleteNote } from '@/services/notes';

export default ({
  note,
  onChange,
}: {
  note: Note;
  onChange: (newNote: Note) => void;
}) => {
  const [show, setShow] = useState(false);
  const [innerTitle, setInnerTitle] = useState(note.title);
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
          <PopupHeader
            left="Cancel"
            right="Save"
            leftOnClick={() => {
              setInnerTitle(note.title);
              setShow(false);
            }}
            rightOnClick={() => {
              if (innerTitle !== note.title) {
                onChange({
                  ...note,
                  title: innerTitle,
                });
              }
              setShow(false);
            }}
          />
          <Form>
            <FormCell>
              <CellHeader>
                <Label>Title</Label>
              </CellHeader>
              <CellBody>
                <Input
                  type="text"
                  placeholder="Enter your note's title."
                  defaultValue={innerTitle}
                  onChange={(event: ChangeEvent<{ value: string }>) =>
                    setInnerTitle(event.currentTarget.value)
                  }
                />
              </CellBody>
            </FormCell>
            <FormCell>
              <CellHeader>
                <Label>Created At</Label>
              </CellHeader>
              <CellBody>
                {dayjs(note.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </CellBody>
            </FormCell>
            <FormCell>
              <CellHeader>
                <Label>Updated At</Label>
              </CellHeader>
              <CellBody>
                {dayjs(note.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
              </CellBody>
            </FormCell>
            <div className={styles.buttonArea}>
              <Button
                size="small"
                type="warn"
                className={styles.delete}
                onClick={() => {
                  deleteNote(note.id);
                  history.goBack();
                }}
              >
                DELETE
              </Button>
            </div>
          </Form>
        </>
      </Popup>
    </div>
  );
};
