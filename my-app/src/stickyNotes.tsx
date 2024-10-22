import React, { useState } from "react";
import "./App.css";
import { Label, Note } from "./types/types";
import { dummyNotesList } from "./constants";
import { ClickCounter } from "./starterfiles/hooksExercise";
import { themes, ThemeContext } from "./themeContext";

export const StickyNotes = () => {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);

  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };

  const [createNote, setCreateNote] = useState<Note>(initialNote);
  const [favoriteNotes, setFavoriteNotes] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleFavorite = (noteTitle: string) => {
    if (favoriteNotes.includes(noteTitle)) {
      setFavoriteNotes(favoriteNotes.filter((title) => title !== noteTitle));
    } else {
      setFavoriteNotes([...favoriteNotes, noteTitle]);
    }
  };

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const updateNoteHandler = (
    event: React.ChangeEvent<HTMLDivElement>,
    noteId: number,
    field: keyof Note
  ) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, [field]: event.target.innerText } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNoteHandler = (noteId: number, noteTitle: string) => {
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    setNotes(filteredNotes);

    if (favoriteNotes.includes(noteTitle)) {
      setFavoriteNotes(favoriteNotes.filter((title) => title !== noteTitle));
    }
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        className="container"
        style={{ background: currentTheme.background, color: currentTheme.foreground }}
      >
        <button
          onClick={toggleTheme}
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Toggle Theme
        </button>

        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              value={createNote.title}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Note Content"
              value={createNote.content}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
            />
          </div>

          <div>
            <select
              value={createNote.label}
              onChange={(event) =>
                setCreateNote({ ...createNote, label: event.target.value as Label })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              style={{
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              Create Note
            </button>
          </div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{ background: currentTheme.foreground, color: currentTheme.background }}
            >
              <div className="notes-header">
                <button
                  onClick={() => toggleFavorite(note.title)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: currentTheme.foreground === "#ffffff" ? "#000000" : "#ffffff",
                  }}
                >
                  {favoriteNotes.includes(note.title) ? "❤" : "♡"}
                </button>

                <button
                  data-testid = {`delete-note-${note.id}`}
                  onClick={() => deleteNoteHandler(note.id, note.title)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: currentTheme.foreground === "#ffffff" ? "#000000" : "#ffffff",
                  }}
                >
                  x
                </button>
              </div>

              <h2
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(event) => updateNoteHandler(event, note.id, "title")}
              >
                
                {note.title}
              </h2>

              <p
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(event) => updateNoteHandler(event, note.id, "content")}
              >
                {note.content}
              </p>

              <p
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(event) => updateNoteHandler(event, note.id, "label")}
              >
                {note.label}
              </p>
            </div>
          ))}
        </div>

        <ClickCounter />

        <div className="favorite-notes">
          <h3>List of Favorites:</h3>
          {favoriteNotes.length > 0 ? (
            <ul>
              {favoriteNotes.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          ) : (
            <p>Please add favorite notes</p>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
