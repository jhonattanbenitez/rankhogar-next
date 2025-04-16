"use client";

import Link from "next/link";
import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t mt-16">
      <div className="container mx-auto px-4 py-8 text-sm text-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            &copy; {new Date().getFullYear()} Rank Hogar. Todos los
            derechos reservados.
          </p>
        <Logo variant="white"/>
          <nav className="flex gap-4">
            <Link
              href="/about"
              className="hover:text-blue-600 transition-colors"
            >
              Sobre nosotros
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-600 transition-colors"
            >
              Contacto
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-blue-600 transition-colors"
            >
              Política de privacidad
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
