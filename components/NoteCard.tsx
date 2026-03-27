"use client";
import {deleteNote} from "../app/action"; 

type NoteCardProps = {
  _id?: string;
  title: string;
  content: string;
};

export default function NoteCard({ _id, title, content }: NoteCardProps) {
  function deleteTheNote() {
    deleteNote(_id as string);
    alert("note deleted")
  }

  function editNote() {
    alert("edit note")
  }

  return (
    <article className="m-5 flex max-w-md items-start justify-between rounded-lg border-2 border-neutral-900 p-5">
      <div className="flex-1">
        <h2 className="mb-3 rounded-md border-2 border-neutral-900 px-4 py-2 text-xl">
          {title}
        </h2>
        <p className="min-h-32 rounded-md border-2 border-neutral-900 px-4 py-3">
          {content}
        </p>
      </div>

      <div className="ml-4 flex flex-col gap-3">
        <button
          onClick={deleteTheNote}
          type="button"
          className="rounded-md border-2 border-neutral-900 px-4 py-2"
        >
          Delete
        </button>
        <button
          onClick={editNote}
          type="button"
          className="rounded-md border-2 border-neutral-900 px-4 py-2"
        >
          Edit
        </button>
      </div>
    </article>
  );
}
