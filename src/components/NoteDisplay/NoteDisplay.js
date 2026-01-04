import React from 'react';
import './NoteDisplay.css';

const NoteDisplay = ({ title, date, onClick }) => {
  return (
    <div className="NoteDisplay" onClick={onClick}>
      <h3>{title}</h3>
      <small>{date}</small>
    </div>
  );
};

NoteDisplay.propTypes = {};

NoteDisplay.defaultProps = {};

export default NoteDisplay;
