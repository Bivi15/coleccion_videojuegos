"use client";

import { FC, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface GameFormProps {
    initialData?: {
        id: number;
        title: string;
        platform: string;
        genre: string;
        releaseDate: string;
        favorite: boolean;
        cover?: string;
    };
}

const GameForm: FC<GameFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [cover, setCover] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setPlatform(initialData.platform);
            setGenre(initialData.genre);
            setReleaseDate(initialData.releaseDate);
            setCover(initialData.cover || "");
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (initialData?.id) {
                // Editor
                await axios.put(`/api/games/${initialData.id}`, {
                    title,
                    platform,
                    genre,
                    releaseDate,
                    cover,
                });
            } else {
                // Nuevo
                await axios.post("/api/games", {
                    title,
                    platform,
                    genre,
                    releaseDate,
                    cover,
                    favorite: false,
                });
            }
            router.push("/");
        } catch (err) {
            console.error("Error guardando juego:",err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg space-y-4">
            <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 rounded bg-gray-800" required/>
            <input type="text" placeholder="Plataforma" value={platform} onChange={e => setPlatform(e.target.value)} className="w-full p-2 rounded bg-gray-800" required/>
            <input type="text" placeholder="Género" value={genre} onChange={e => setGenre(e.target.value)} className="w-full p-2 rounded bg-gray-800" required/>
            <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} className="w-full p-2 rounded bg-gray-800" required/>
            <input type="text" placeholder="URL de carátula" value={cover} onChange={e => setCover(e.target.value)} className="w-full p-2 rounded bg-gray-800"/>
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition">{initialData ? "Guardar" : "Añadir juego"}</button>

        </form>
    );
};

export default GameForm;

