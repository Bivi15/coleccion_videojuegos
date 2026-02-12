import { NextRequest, NextResponse } from "next/server";
import { games, Game } from "@/app/data/games";

function getIdFromUrl(req: NextRequest) {
    return parseInt(req.url.split("/").pop() || "0", 10);
}

export async function GET(req: NextRequest) {
    const id = getIdFromUrl(req);
    const game = games.find(g => g.id === id);
    if (!game) return NextResponse.json({ error: "Juego no encontrado"} , { status: 404 });
    return NextResponse.json(game);
}

export async function PUT(req: NextRequest) {
    const id = getIdFromUrl(req);
    const gameIndex = games.findIndex(g => g.id === id);
    if (gameIndex === -1) return NextResponse.json({ message: "Juego no encontrado" }, { status: 404 });

    const body = await req.json();
    games[gameIndex] = { ...games[gameIndex], ...body };
    return  NextResponse.json(games[gameIndex]);
}

export async function DELETE(req: NextRequest) {
    const id = getIdFromUrl(req);
    const index = games.findIndex(g => g.id === id);
    if (index === -1) 
        return NextResponse.json({ error: "Juego no encontrado" }, { status: 404 });

    const deleted = games.splice(index, 1);
    return NextResponse.json(deleted[0]);
}