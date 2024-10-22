import {render, screen, fireEvent} from "@testing-library/react";
import {StickyNotes} from "./stickyNotes";
import { ThemeContext, themes } from "./themeContext";
import { dummyNotesList } from "./constants";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    test("creates a new note", () => {
      render(<StickyNotes />);
   
   // Please make sure your sticky note has a title and content input field with the following placeholders.
      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
      });
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });

    test("Read: Are all notes displayed", () => {
        render(
           <StickyNotes />
        );
        dummyNotesList.forEach(note => {
        const title = screen.getByText(note.title);
        const content = screen.getByText(note.content);
        expect(title).toBeInTheDocument();
        expect(content).toBeInTheDocument();  
        });
    });

    test("Update testing", () => {
        render(<StickyNotes/>);
        const notes = screen.getByText("test note 3 title");
        fireEvent.blur(notes, {target: {innerText: "Title Updated"}});
        const newTitle = screen.getByText("Title Updated")
        expect(newTitle).toBeInTheDocument();
    });

    test("Testing Delete", () => {
        render(<StickyNotes/>);
        const title = screen.getByText("test note 1 title");
        const deleteButton = screen.getByTestId("delete-note-1");
        fireEvent.click(deleteButton);

        const delnotetitle = screen.queryByText("test note 1 title");
        expect(delnotetitle).not.toBeInTheDocument();
        
    });
   });
   