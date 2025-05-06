// app/not-found.tsx
'use client';

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="mb-6 text-gray-600">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Image src={"/404.svg"} width={400} height={400} alt="Pagina no encontrada" />
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 my-10 text-white rounded hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
