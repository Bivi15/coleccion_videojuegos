import { NextRequest, NextResponse } from "next/server";
import { games, Game } from "@/app/data/games";

export async function GET() {
    return NextResponse.json(games);
}

export async function POST(req:NextRequest) {
    const body: Omit<Game, "id"> = await req.json();
    const newGame: Game = { id: Date.now(), ...body };
    games.push(newGame);
    return NextResponse.json(newGame);
}