import './App.css';
import { useEffect, useState } from 'react';
import NoteBox from './components/NoteBox/NoteBox';
import Header from './components/Header/Header';
import NoteDisplay from './components/NoteDisplay/NoteDisplay';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getAllNotes } from './services/note-services';
import { logout } from './services/public-services';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('loginFlag');
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setNotes([]);
      return;
    }

    getAllNotes()
      .then(resp => setNotes(resp))
      .catch(() => setNotes([]));
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      localStorage.removeItem('loginFlag');
      setIsLoggedIn(false);
      setNotes([]);
    }
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <ToastContainer position="top-center" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NoteBox />
                {isLoggedIn &&
                  notes.map(note => (
                    <NoteDisplay
                      key={note.noteid}
                      title={note.title}
                      date={new Date(note.date).toDateString()}
                      onClick={() => console.log(note.noteid)}
                    />
                  ))}
              </>
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
