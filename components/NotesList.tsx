
import React from "react";
import connectToDB from "@/lib/db";
import Note from "@/models/schemaNotes";
import NoteCard from "@/components/NoteCard";

type NoteItem = {
  _id: string;
  title: string;
  content: string
};

export default async function NotesList() {
  await connectToDB();
  const rawNotes = await Note.find({}).sort({ createdAt: -1 }).lean();
  const notes = rawNotes.map((note) => ({
    _id: String(note._id),
    title: note.title,
    content: note.content,
  })) as NoteItem[];

  if (notes.length === 0) {
    return <p className="m-5 text-lg">No notes saved yet.</p>;
  }

  return (
    <section>
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          _id={note._id}
          title={note.title}
          content={note.content}
        />
      ))}
    </section>
  );
}
