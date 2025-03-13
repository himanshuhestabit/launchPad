import React from "react";

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Prev
      </button>

      <div className="flex space-x-2">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => num !== currentPage && nextPage(num)}
            className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
              num === currentPage
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-700 hover:bg-blue-500 text-gray-300"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        onClick={nextPage}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          currentPage >= totalPages
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
