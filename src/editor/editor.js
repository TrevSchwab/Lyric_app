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


  const firstPerson = () => {
    console.log('firstPerson');
    const findFirstTense = text.toLowerCase().split(' ').map(letter => {
      return letter.split('');
      // if (letter === 'i') {
      //   return letter;
      // }
    });

    console.log('findFirstTense ', findFirstTense);
  };

  const CustomToolbar = () => (
    <div>
      <div>
        <button>
          Past
        </button>
        <button>
          Present
        </button>
        <button>
          Future
        </button>
      </div>
      <div>
        <button onClick={firstPerson}>
          First Person
        </button>
        <button>
          Second Person
        </button>
        <button>
          Third Person
        </button>
      </div>
    </div>
  )
  

  return(
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder='Note title...'
        value={title ? title : ''}
        onChange={updateTitle}>
      </input>
      <CustomToolbar />
      <ReactQuill 
        theme="snow"
        value={text} 
        onChange={updateBody}>
      </ReactQuill>
    </div>
  );
}

export default withStyles(styles)(EditorComponent);