import './App.css';
import { useEffect, useState } from 'react';
import NoteBox from './components/NoteBox/NoteBox';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
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
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const token = localStorage.getItem('loginFlag');
    if (token) setIsLoggedIn(true);

    // Initialize theme from local storage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

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
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main>
          <ToastContainer position="top-center" />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NoteBox />
                  {isLoggedIn && (
                    <div className="note-list">
                      {notes.map(note => (
                        <NoteDisplay
                          key={note.noteid}
                          title={note.title}
                          date={new Date(note.date).toDateString()}
                          onClick={() => console.log(note.noteid)}
                        />
                      ))}
                    </div>
                  )}
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
