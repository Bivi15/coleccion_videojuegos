"use client";

import { useEffect, useState } from "react";
import GameCard from "@/app/components/GameCard";
import axios from "axios";

interface Game {
    id: number;
    title: string;
    platform: string;
    genre: string;
    releaseDate: string;
    favorite: boolean;
    cover?: string;
}

export default function FavoritePage() {
    const [games, setGames] = useState<Game[]>([]);

    const fetchFavorites = async () => {
        try {
            const res = await axios.get("/api/games");
            setGames(res.data.filter((g: Game) => g.favorite));
        }catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const toggleFavorite = async (id: number) => {
        const game = games.find(g => g.id === id);
        if(!game) return;
        await axios.put(`/api/games/${id}`, { favorite: !game.favorite });
        fetchFavorites();
    };

    if (games.length === 0)
        return <p className="p-6 text-gray-400">No tienes juegos favoritos</p>

    return (
        <main className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-30 mb-8">
                <h1 className="text-3xl font-bold mb-6">Mis juegos favoritos</h1>
                <p className="text-gray-900 mb-4">
                    Mostrando {games.length} {games.length === 1 ? "juego" : "juegos"}
                </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {games.map(game => (
                    <GameCard key={game.id} {...game} onFavoriteToggle={() => toggleFavorite(game.id)} />
                ))}
            </div>
        </main>
    );
}