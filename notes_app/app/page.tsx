import NotesClient from "@/components/NotesClient"
import connectToDB from "@/lib/db"
import Note from "@/models/Notes"

async function getNotes() {
  await connectToDB()
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean()

  return notes.map((x) => ({
    ...x,
    _id: x._id.toString(),
    id: x._id.toString(),
    title: x.title,
    content: x.content
  }))
}

export default async function Home() {

  const notes = await getNotes();
  console.log(notes)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl text-green-500">JOLT it</h1>
      <NotesClient initialNotes={notes} />
    </div>
  );
}

