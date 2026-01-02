/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState } from "react";
import toast from "react-hot-toast"

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
    const [notes, setNotes] = useState(initialNotes);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const createNote = async (e: any) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        setLoading(true)
        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `HTTP error! status: ${response.status}`);
            }

            if (result.success) {
                setNotes([result.data, ...notes]);
                toast.success("notes created successfully")
                setTitle("")
                setContent("")
            }
            setLoading(false)
        } catch (error) {
            console.error("Error creating note:", error)
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            toast.error(errorMessage)
        }
    }

    return (
        <>
            <div>
                <form onSubmit={createNote}>
                    <h2>Create New Note</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Note Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={4}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Note"}
                        </button>
                    </div>
                </form>

                <div>
                    <h2>Your Notes ({notes.length})</h2>
                    {notes.length === 0 ?
                        (<p>
                            No Notes yet. Create your First Note Above
                        </p>) : (
                            notes.map((note) => (
                                <div key={note.id || note._id}>
                                    {note.title}
                                    {note.content}
                                </div>
                            ))
                        )}
                </div>
            </div>
        </>
    )
}