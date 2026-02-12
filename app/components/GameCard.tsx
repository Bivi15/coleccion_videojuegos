"use client";

import { FC, useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline} from "@heroicons/react/24/outline";
import Link from "next/link";


interface GameCardProps {
    id: number;
    title: string;
    platform: string;
    genre: string;
    releaseDate: string;
    favorite: boolean;
    cover?: string;
    onFavoriteToggle?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const GameCard: FC<GameCardProps> = ({ id, title, platform, genre, releaseDate, favorite, cover, onFavoriteToggle, onDelete }) => {
    const [animate, setAnimate] = useState(false);

    return (
        <Link href={`/games/${id}`} className="block">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 border border-gray-800 hover:border-blue-500">
                {cover && cover !== "" ? ( 
                    <img src={cover} alt={title} className="w-full h-56 object-cover rounded" />
                ) : (
                    <img src="/gamepad.jpg" alt="Imagen de muestra" className="w-full h-56 object-cover rounded"/>
                )}
                <div className="p-4 space-y-2">
                    <h2 className="text-xl font-semibold text-white truncate">{title}</h2>
                    <p className="text-gray-300 text-sm">{platform} - <span className="inline-block bg-blue-600 text-xs px-2 py-1 rounded-full">{genre}</span> </p>
                    <p className="text-gray-400 text-sm">Released: {releaseDate}</p>
                    <button
                        className={`flex items-center gap-2 mt-2 text-yellow-400 transition-transform duration-200 ${animate ? "scale-125" : "scale-100"}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setAnimate(true);
                            onFavoriteToggle && onFavoriteToggle(id);
                            setTimeout(() => setAnimate(false), 200);
                        }}
                    >
                        {favorite ? <StarSolid className="w-5 h-5"/> : <StarOutline className="w-5 h-5" />}
                        {favorite ? "Favorito" : "Marcar"}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;