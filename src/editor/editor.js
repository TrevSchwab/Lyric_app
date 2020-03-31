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




// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import debounce from '../helpers';
// import BorderColorIcon from '@material-ui/icons/BorderColor';
// import { withStyles } from '@material-ui/core/styles';
// import styles from './styles';

// const EditorComponent = props => {

//   const [text, setText] = useState('')
//   const [title, setTitle] = useState('')
//   const [id, setID] = useState('')

//   console.log('editor state ', text, title, id)
//   // console.log('editor props ', props)

//   const { classes } = props

//   console.log('props ', props)



//   // useEffect(() => {
   
//   //     console.log('changed id')
//   //     setText(selectedNote.body)
//   //     setTitle(selectedNote.title)
//   //     setID(selectedNoteIndex)

//   // }, [text])

//   const updateBody = (val) => {
//     // console.log('updateBody 1', val);
//     setText(val)
//     update();
//   }

//   const updateTitle = (txt) => {
//     console.log('updateTitle ', txt.target.value)
//     setTitle(txt.target.value)
//     update()
//   }

//   const update = debounce(async () => {
//     console.log('updateBody 2 ', text)
//     await props.noteUpdate(id, {
//       title: title,
//       body: text,
//     })
//   }, 1500)


//   useEffect(() => {
//     console.log('useEffect')
//     // setText(props.selectedNote.body)
//     setTitle(props.selectedNote.title)
//     // setID(props.selectedNoteIndex)
//   }, [title])


//   let render =
//     <div className={classes.editorContainer}>
//       <BorderColorIcon className={classes.editIcon} />
//       <input
//         className={classes.titleInput}
//         placeholder='Note title...'
//         value={title ? title : ''}
//         onChange={updateTitle}>
//       </input>
//       <ReactQuill
//         value={text}
//         onChange={updateBody.bind(this)}>
//       </ReactQuill>
//     </div>

//   return render
// }
// export default withStyles(styles)(EditorComponent);