"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import GameCard from "@/app/components/GameCard";
import { Game } from "@/app/data/games"
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function GameDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { id } =  params;
    const [game, setGame] = useState<Game | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchGame = async () => {
        try {
            const res = await axios.get(`/api/games/${id}`);
            setGame(res.data);
        }catch (err: any) {
            if (err.response?.status === 404) {
                router.replace("/");
            } else {
                console.error(err);
            }
        }
    };

    useEffect(() => {
       fetchGame();
    }, [id]);

    const toggleFavorite = async () => {
        if (!game) return;
        await axios.put(`/api/games/${id}`, { favorite: !game.favorite });
        fetchGame();
    };

    const deleteGame = async () => {
        try {
            await axios.delete(`/api/games/${id}`);
            router.replace("/");
        }catch (err) {
            console.error(err);
        }
    };


    if (!game) return <p className="p-6 text-gray-400">Cargando...</p>;

    return (
        <main className="p-6 max-w-3xl mx-auto space-y-6">
            <button
                onClick={() => router.back()}
                className="flex itmes-center gap-2 text-gray-300 hover:text-white mb-4 transition"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Volver
            </button>
            <GameCard {...game} onFavoriteToggle={toggleFavorite} onDelete={deleteGame} />
            <div className="flex gap-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-500 transition"
                >
                    Eliminar
                </button>
                <Link href={`/games/add?edit=${id}`}>
                    <button
                        className="bg-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
                    >
                        Editar
                    </button>
                </Link>
            </div>

            {/* Modal eliminar */}
            {showModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-80">
                <h2 className="text-xl font-bold mb-4 text-white">
                Eliminar juego?
                </h2>
                <div className="flex justify-end gap-4">
                <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                >
                    Cancelar
                </button>
                <button
                    onClick={deleteGame}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                    Eliminar
                </button>
                </div>
            </div>
            </div>
        )}
        </main>
    );
}