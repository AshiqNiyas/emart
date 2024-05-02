function Pagination({ productPerPage, totalProducts, paginate, currentPage }) {
  const pagenumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pagenumbers.push(i);
  }
  return (
    <div className="flex justify-center gap-2 m-10 ">
      {pagenumbers.map((num, i) => {
        return (
          <button
            className="px-2 border border-red-400 focus:bg-orange-400 focus:text-white"
            onClick={() => {
              if (num === currentPage) {
                return;
              }
              paginate(num);
            }}
            key={i}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
