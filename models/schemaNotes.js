import mongoose from "mongoose"

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 30
        },
        content: {
            type: String,
            required: true,
            maxLength: 500
        }
    },
    {
        timestamps: true
    }
)

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
