import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById } from '../../services/note-services';
import './NoteDetail.css';

function NoteDetail() {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getNoteById(noteId)
            .then(data => {
                setNote(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch note:", err);
                setError("Failed to load note.");
                setLoading(false);
            });
    }, [noteId]);

    if (loading) return <div className="note-detail-loading">Loading...</div>;
    if (error) return <div className="note-detail-error">{error}</div>;
    if (!note) return <div className="note-detail-error">Note not found.</div>;

    return (
        <div className="note-detail-container">
            <button className="back-button" onClick={() => navigate('/')}>
                &larr; Back
            </button>
            <div className="note-detail-card">
                <div className="note-detail-header">
                    <h1>{note.title}</h1>
                    <span className="note-date">{new Date(note.date).toDateString()}</span>
                </div>
                <div className="note-detail-content">
                    {note.content}
                </div>
            </div>
        </div>
    );
}

export default NoteDetail;
