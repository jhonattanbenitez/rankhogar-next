import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex justify-center gap-4 mt-10">
      {currentPage > 1 ? (
        <Link
          href={`/page/${currentPage - 1}`}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Anterior
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-100 rounded text-gray-400 cursor-not-allowed">
          Anterior
        </span>
      )}

      <span className="px-4 py-2 bg-gray-100 rounded">
        Página {currentPage} de {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={`/page/${currentPage + 1}`}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Siguiente
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-100 rounded text-gray-400 cursor-not-allowed">
          Siguiente
        </span>
      )}
    </div>
  );
}
