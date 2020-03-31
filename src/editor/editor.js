import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const EditorComponent = props => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [id, setId] = useState('');

  const { classes, noteUpdate, selectedNote } = props;

  useEffect(() => {
    setTitle(selectedNote.title);
    setText(selectedNote.body);
    setId(selectedNote.id);
  }, [selectedNote]);

  useEffect(() => {
    update();
  }, [title, text]);

  const updateTitle = e => {
    const updatedTitle = e.target.value;
    setTitle(updatedTitle);
  }

  const updateBody = updatedBody => {
    setText(updatedBody)
  };

  const update = debounce(() => {
    noteUpdate(id, {
      title: title,
      body: text,
    })
  }, 1500);

  return(
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder='Note title...'
        value={title ? title : ''}
        onChange={updateTitle}>
      </input>
      <ReactQuill 
        value={text} 
        onChange={updateBody}>
      </ReactQuill>
    </div>
  );
}

export default withStyles(styles)(EditorComponent);