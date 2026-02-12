"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "./components/GameCard";
import { useRouter } from "next/navigation";


interface Game {
  id: number;
  title: string;
  platform: string;
  genre: string;
  releaseDate: string;
  favorite: boolean;
  cover?: string;
}

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [platformFilter, setPlatformFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [search, setSearch] = useState("");
  const [gameToDelete, setGameToDelete] = useState<number | null>(null);
  const router = useRouter();

  // Cargar juego desde la API
  const fetchGames = async () => {
    try {
      const res = await axios.get("/api/games");
      setGames(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Favorito
  const toggleFavorite = async (id: number) => {
    const game = games.find(g => g.id === id);
    if (!game) return;
    await axios.put(`/api/games/${id}`, { favorite: !game.favorite });
    fetchGames();
  };

  // Eliminar
  const confirmDelete = (id: number) => {
    setGameToDelete(id);
  };
  
  const handleDelete = async () => {
    if (gameToDelete === null) return;
    await axios.delete(`/api/games/${gameToDelete}`);
    setGameToDelete(null);
    fetchGames();
  }

  // Filtros
  const filteredGames = games.filter(game => {
    const platformMatch = platformFilter ? game.platform === platformFilter : true;
    const genreMatch = genreFilter ? game.genre === genreFilter : true;
    const searchMatch = game.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return platformMatch && genreMatch && searchMatch;
  })

  // Valores únicos para los filtros
  const platforms = [...new Set(games.map(g => g.platform))];
  const genres = [...new Set(games.map(g => g.genre))];

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-30 mb-8">
        <h1 className="text-4xl font-bold mb-6">Colección de videojuegos</h1>
        <p className="text-gray-900 mb-4">
          Mostrando {filteredGames.length} {filteredGames.length === 1 ? "juego" : "juegos"}
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={platformFilter}
          onChange={e => setPlatformFilter(e.target.value)}
        >
          <option value="">Todas las plataformas</option>
          {platforms.map(platform => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>

        <select
          className="bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={genreFilter}
          onChange={e => setGenreFilter(e.target.value)}
        >
          <option value="">Todos los géneros</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <input 
        type="text" 
        placeholder="Buscar juego..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
      />

      {/* Grid de juegos */}
      {filteredGames.length === 0 ? (
        <p className="text-gray-400">No hay juegos para mostrar</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredGames.map(game => (
            <GameCard
              key={game.id}
              {...game}
              onFavoriteToggle={() => toggleFavorite(game.id)}
              onDelete={() => confirmDelete(game.id)}
            />
          ))}
        </div>
      )}

      {/* Modal eliminar */}
      {gameToDelete !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-80">
            <h2 className="text-xl font-bold mb-4 text-white">
              Eliminar juego?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setGameToDelete(null)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
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
