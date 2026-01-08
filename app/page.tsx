import NotesClient from "@/components/NotesClient";
import connectToDB from "@/lib/db";
import Note from "@/models/Notes";

async function getNotes() {
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean();

  return notes.map((x) => ({
    ...x,
    _id: x._id.toString(),
    id: x._id.toString(),
    title: x.title,
    content: x.content,
  }));
}

export default async function Home() {
  const notes = await getNotes();

  return (
   <>
      <NotesClient initialNotes={notes} />
   </>
  );
}
