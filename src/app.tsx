import { ChangeEvent, useState } from "react";

import { NewNoteCard, NoteCard, Search } from "./components";

import nlwExpertLogo from "./assets/logo-nlw-expert-light.svg";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage);
    }
    return [];
  });

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  };

  const onNoteDeleted = (id: string) => {
    const notesArray = notes.filter((note) => note.id !== id);

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearch(query);
  };

  const filteredNotes =
    search !== ""
      ? notes.filter(({ content }) =>
          content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes;

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6 px-5 lg:px-12">
      <div className="flex items-center justify-between">
        <img
          src={nlwExpertLogo}
          alt="Logo NLW Expert"
          className="w-40 lg:w-48"
        />
        <NewNoteCard onNoteCreated={onNoteCreated} />
      </div>
      <Search handleSearch={handleSearch} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </main>
  );
}
