import prisma from "@/utils/prisma";
import nextConnect from "next-connect";
import {NextApiRequestWithUserId} from "@/types";
import {NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const notes = await prisma.note.findMany({
            select: {
                id: true,
                title: true,
                desc: true,
                author_id: true,
                is_archived: true,
                author: true,
                time_created: true,
            }
        });

        return NextResponse.json({
            success: true,
            notes: notes
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json({
            success: false,
            message: "Ошибка олучения заметок",
            error: e
        })
    }
}