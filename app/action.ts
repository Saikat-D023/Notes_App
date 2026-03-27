"use server"
import connectToDB from "../lib/db"
import Note from "../models/schemaNotes"

type Data = {
    title: string;
    content: string;
}

export async function createNote(data: Data) {
    await connectToDB();
    const note = await Note.create({
        title: data.title.trim(),
        content: data.content.trim(),
    });

    return {
        id: note._id.toString(),
        title: note.title,
        content: note.content,
    };
}

export async function deleteNote(_id: string) {
    await connectToDB();
    await Note.findByIdAndDelete(_id);
}