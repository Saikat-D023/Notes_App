import connectToDB from "@/lib/db"
import Note from "@/models/Notes"


import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        await connectToDB();
        const notes = await Note.find({}).sort({ createdAt: -1 }).lean()

        return NextResponse.json({ success: true, data: notes }, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error },
            { status: 400 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDB()
        const body = await request.json()
        const note = await Note.create(body)

        return NextResponse.json({ success: true, data: note }, { status: 200 })
    } catch (error) {
        console.error("POST /api/notes Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 }
        )
    }
}
