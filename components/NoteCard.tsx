"use client";
import { useState } from "react";
import { deleteNote, updateNote } from "../app/action";
import { useRouter } from "next/navigation";

type NoteCardProps = {
  _id?: string;
  title: string;
  content: string;
};

export default function NoteCard({ _id, title, content }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const router = useRouter();

  async function deleteTheNote() {
    await deleteNote(_id as string);
    router.refresh();
    alert("note deleted");
  }

  async function saveNote() {
    const nextTitle = editedTitle.trim();
    const nextContent = editedContent.trim();

    if (!nextTitle || !nextContent) {
      alert("title and content cannot be empty");
      return;
    }

    await updateNote(_id as string, { title: nextTitle, content: nextContent });
    setIsEditing(false);
    router.refresh();
  }

  function editNote() {
    setIsEditing(true);
    setEditedTitle(title);
    setEditedContent(content);
  }

  function cancelEdit() {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(false);
  }

  return (
    <article className="m-5 flex max-w-md items-start justify-between rounded-lg border-2 border-neutral-900 p-5">
      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="mb-3 w-full rounded-md border-2 border-neutral-900 px-4 py-2 text-xl"
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Content"
              className="min-h-32 w-full rounded-md border-2 border-neutral-900 px-4 py-3"
            />
          </>
        ) : (
          <>
            <h2 className="mb-3 rounded-md border-2 border-neutral-900 px-4 py-2 text-xl">
              {title}
            </h2>
            <p className="min-h-32 rounded-md border-2 border-neutral-900 px-4 py-3">
              {content}
            </p>
          </>
        )}
      </div>

      <div className="ml-4 flex flex-col gap-3">
        {isEditing ? (
          <>
            <button
              onClick={saveNote}
              type="button"
              className="rounded-md border-2 border-neutral-900 px-4 py-2"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              type="button"
              className="rounded-md border-2 border-neutral-900 px-4 py-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </article>
  );
}
