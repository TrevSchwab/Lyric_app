import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const EditorComponent = (props) => {
  // constructor() {
  //   super();
  //   this.state = {
  //     text: '',
  //     title: '',
  //     id: ''
  //   };
  // }

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [id, setId] = useState('');

  const { classes } = props;

  useEffect(() => {
    setTitle(props.selectedNote.title);
    setText(props.selectedNote.body);
    setId(props.selectedNote.id);
  }, [])

  useEffect(() => {
    console.log('update title effect')
    update();
  }, [title, text])

  // componentDidMount = () => {
  //   this.setState({
  //     text: this.props.selectedNote.body,
  //     title: this.props.selectedNote.title,
  //     id: this.props.selectedNote.id
  //   });
  // }

  // componentDidUpdate = () => {
  //   if(this.props.selectedNote.id !== this.state.id) {
  //     this.setState({
  //       text: this.props.selectedNote.body,
  //       title: this.props.selectedNote.title,
  //       id: this.props.selectedNote.id
  //     });
  //   }
  // }


  const updateTitle = e => {
    const updatedTitle = e.target.value;
    setTitle(updatedTitle);
    // update(updatedTitle);
  }

  const updateBody = updatedBody => {
    console.log('updatedBody ', updatedBody);
    setText(updatedBody)
    // update(updatedBody);
  };

  const update = debounce(() => {
    console.log('updatedTitle ', title);
    console.log('updatedBody ', text);
    props.noteUpdate(id, {
      title: title,
      body: text,
    })
  }, 1500);

  // render() {

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
  // }
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