import React from 'react';
import './NoteDisplay.css';

const NoteDisplay = ({ title, date, onClick }) => {
  return (
    <div className="note-card" onClick={onClick}>
      <span className="note-title">{title}</span>
      <span className="note-date">{date}</span>
    </div>
  );
};

NoteDisplay.propTypes = {};

NoteDisplay.defaultProps = {};

export default NoteDisplay;
