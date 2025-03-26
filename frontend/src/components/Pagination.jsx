import React from "react";
import PropTypes from "prop-types";

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  setPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-500 cursor-not-allowed text-gray-300"
            : "bg-gradient-to-r from-[#AF57C5] to-[#D33427] hover:brightness-50 text-white"
        }`}
      >
        Prev
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => currentPage !== num && setPage(num)}
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
            ? "bg-gray-500 cursor-not-allowed text-gray-300"
            : "bg-gradient-to-r from-[#AF57C5] to-[#D33427] hover:brightness-50 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

// ✅ Add PropTypes validation
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
