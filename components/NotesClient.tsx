"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Note {
  id?: string;
  _id?: string;
  title: string;
  content: string;
}

interface NotesClientProps {
  initialNotes: Note[];
}

export default function NotesClient({ initialNotes }: NotesClientProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to create note");
      }

      setNotes((prev) => [result.data, ...prev]);
      setTitle("");
      setContent("");
      toast.success("Note created");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-14 px-4 py-10 font-sans">
      {/* Page Title */}
      <h1 className="text-center text-3xl font-bold tracking-tight text-green-400">
        JOLT it
      </h1>

      {/* Create Note Form */}
      <div className="mx-auto w-full max-w-2xl">
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          {/* Hover Glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-lime-500/10" />
          </div>

          {/* Header */}
          <div className="relative mb-6">
            <h2 className="text-xl font-semibold text-zinc-100">
              Create a new note
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Write something you don’t want to forget
            </p>
          </div>

          {/* Form */}
          <form onSubmit={createNote} className="relative space-y-4">
            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              placeholder="Write your note content here…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating…" : "Create Note"}
              </button>
            </div>
          </form>

          {/* Bottom Accent */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">
          Your Notes{" "}
          <span className="text-sm font-normal text-zinc-400">
            ({notes.length})
          </span>
        </h2>

        {notes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center">
            <p className="text-zinc-400">No notes yet.</p>
            <p className="text-sm text-zinc-500">
              Create your first note above ✨
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {notes.map((note) => {
              const key = note.id ?? note._id;

              return (
                <div
                  key={key}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-lime-500/10" />
                  </div>

                  <h3 className="relative mb-2 text-lg font-semibold text-zinc-100">
                    {note.title}
                  </h3>

                  <p className="relative text-sm text-zinc-400 line-clamp-4">
                    {note.content}
                  </p>

                  <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
