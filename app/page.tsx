import AddNotes from "@/components/AddNotes";
import NotesList from "@/components/NotesList";

export default async function Home() {
  return (
   <>
      <AddNotes />
      <NotesList />
   </>
  );
}
