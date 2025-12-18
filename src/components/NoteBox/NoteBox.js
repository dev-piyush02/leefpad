import React, { useState } from 'react';
import './NoteBox.css';
import { addNote } from '../../services/public-services';
import { toast } from 'react-toastify';

const NoteBox = () => {
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    userid: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event, prop) => {
    setNoteData({ ...noteData, [prop]: event.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteData.content || !noteData.title || !noteData.userid) {
      setError('Please fill in all the fields');
      return;
    }
    console.log(noteData);

    addNote(noteData).then((resp) => {
      toast.success("Your note is safe with us :)")
    }).catch((error) => {
      toast.error("Something went wrong :(")
    })

    setNoteData({
      title: '',
      content: '',
      userid: ''
    });
    setError('');
  };

  return (
    <div className="NoteBox" data-testid="NoteBox">
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="title-box">
          <input
            type="text"
            value={noteData.title}
            onChange={(e) => handleChange(e, 'title')}
            placeholder="Give your note a name"
          />
        </div>
        <div className='text-box'>
          <textarea
            rows='5'
            cols='40'
            value={noteData.content}
            onChange={(e) => handleChange(e, 'content')}
            placeholder='Start typing your note....'
          />
        </div>
        <div className='sec-row'>
          <div className='user-id'>
            <input
              type='text'
              value={noteData.userid}
              onChange={(e) => handleChange(e, 'userid')}
              placeholder='Enter your user-id'
            />
          </div>
          <div className='save-btn'>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

NoteBox.propTypes = {};

NoteBox.defaultProps = {};

export default NoteBox;
