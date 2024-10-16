import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/utils/prisma";
import { Note } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const data: Note = JSON.parse(body);

        const prismaData = {
            title: data.title,
            desc: data.desc,
            is_archived: data.is_archived,
            time_created: data.time_created,
            author: {
                connect: { id: Number(data.author_id) }
            }
        };

        const note = await prisma.note.create({
            data: prismaData
        });


        return NextResponse.json({
            success: true,
            created_note: note
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
