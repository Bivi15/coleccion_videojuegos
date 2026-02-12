import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-stone-400 to-slate-950 text-white">
        {/* HEADER / NAV */}
        <header className="bg-blck/40 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between">
            <h1 className="text-2xl font-bold text-white">Coleccíon de Videojuegos</h1>
            <nav className="flex gap-6 text-gray-300">
              <Link href="/">
                Inicio
              </Link>
              <Link href="/games/add">
                Añadir juego
              </Link>
              <Link href="/favorites">
                Favoritos
              </Link>
            </nav>
        </header>
        {/* MAIN CONTENT*/}
        <main className="max-w-7xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
