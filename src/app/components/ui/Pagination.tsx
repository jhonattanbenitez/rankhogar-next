import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/",
}: PaginationProps) {
  // Clean the base path to prevent duplicate query params
  const cleanBasePath = basePath.split("?")[0];

  return (
    <div className="flex justify-center gap-4 mt-10">
      {currentPage > 1 ? (
        <Link
          href={`${cleanBasePath}?page=${currentPage - 1}`}
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
          href={`${cleanBasePath}?page=${currentPage + 1}`}
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
