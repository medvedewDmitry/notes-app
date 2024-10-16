import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/utils/prisma";
import { Note } from "@prisma/client";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.text();
        const data: Note = JSON.parse(body);

        const prismaData = {
            title: data.title,
            desc: data.desc,
            is_archived: data.is_archived
        };

        const note = await prisma.note.update({
            where: {
                id_author_id: { id: data.id, author_id: data.author_id }
            },
            data: prismaData
        });


        return NextResponse.json({
            success: true,
            updated_note: note
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Ошибка создания заметки",
            error: e
        });
    }
}
