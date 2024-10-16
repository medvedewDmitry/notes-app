import {NextRequest, NextResponse} from 'next/server';
import prisma from "@/utils/prisma";

import {Note} from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const note_id: Note = JSON.parse(body);

        if (!note_id) {
            return NextResponse.json({message: 'note_id не указан'});
        }

        const deletedNote = await prisma.note.delete({
            where: {id: Number(note_id)}
        });

        return NextResponse.json({
            success: true,
            deleted_note: deletedNote
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Ошибка удлания заметки",
            error: e
        });
    }
}
