import { Link } from 'react-router-dom';
import './NoteDisplay.css';

const NoteDisplay = ({ id, title, date, onClick }) => {
  return (
    <Link to={`/note/${id}`} className="NoteDisplay" onClick={onClick}>
      <h3>{title}</h3>
      <small>{date}</small>
    </Link>
  );
};

NoteDisplay.propTypes = {};

NoteDisplay.defaultProps = {};

export default NoteDisplay;
