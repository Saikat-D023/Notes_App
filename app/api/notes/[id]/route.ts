import connectToDB from "@/lib/db"
import Note from "@/models/schemaNotes"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, 
    {params}: {params: Promise<{id: unknown}>}) {
    try{
        await connectToDB();
        const { id } = await params;

        const deletedNote =await Note.findByIdAndDelete(id);

        if(!deletedNote){
            return NextResponse.json(
                { success: false, error: "Could not find the id"},
                { status: 404}
            )
        }
        return NextResponse.json({ success: true, deletedNote: deletedNote }, { status: 200 })
    }catch (error) {
        console.error("POST /api/notes Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 }
        )
    }
}

export async function PUT(request: NextRequest, 
    {params}: {params: Promise<{id: unknown}>}){
    try {
        await connectToDB();
        const { id } = await params;
        const body = await request.json();

        const toUpdateNote = await Note.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );

        if (!toUpdateNote) {
            return NextResponse.json(
            { success: false, error: "Could not find the id" },
            { status: 404 }
        );
        } else {
            console.log('Updated user:', toUpdateNote);
            return NextResponse.json({ success: true, data: toUpdateNote }, { status: 200 }); 
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 }
        )
    }
}