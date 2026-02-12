"use client";

import { useSearchParams } from "next/navigation";
import GameFrom from "@/app/components/GameForm";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddGamePage() {
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const [initialData, setInitialData] = useState<any>(null);

    useEffect(() => {
        if (editId) {
            axios.get(`/api/games/${editId}`).then(res => setInitialData(res.data));
        }
    }, [editId]);

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-align-center">
                Añadir nuevo juego
            </h1>
            <GameFrom initialData={initialData} />
        </main>
    );
}
