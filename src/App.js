import './App.css';
import { useEffect, useState, useRef } from 'react';
import NoteBox from './components/NoteBox/NoteBox';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NoteDisplay from './components/NoteDisplay/NoteDisplay';
import NoteDetail from './components/NoteDetail/NoteDetail';
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
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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
                    <div className="notes-wrapper">
                      <button className="scroll-button left" onClick={() => scroll('left')} aria-label="Scroll Left">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <div className="note-list" ref={scrollRef}>
                        {notes.map(note => (
                          <NoteDisplay
                            key={note.noteid}
                            id={note.noteid}
                            title={note.title}
                            date={new Date(note.date).toDateString()}
                          />
                        ))}
                      </div>
                      <button className="scroll-button right" onClick={() => scroll('right')} aria-label="Scroll Right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
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
            <Route path="/note/:noteId" element={<NoteDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
