import { useState } from "react";
import Productcard from "../components/Productcard";
import { useGetAllproductsQuery } from "../redux/apiSlice";
import Pagination from "../components/Pagination";

function Products() {
  const { data: products, isLoading, isError } = useGetAllproductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(12);

  const indexLast = currentPage * productPerPage;
  const indexFirst = indexLast - productPerPage;
  const currentProducts = products?.slice(indexFirst, indexLast);
  const totalProducts = products?.length;
  const paginate = (num) => setCurrentPage(num);

  return (
    <>
      <div className="container mx-auto min-h-screen md:flex-row flex flex-col p-3 gap-5">
        <div className="md:w-[250px] w-full bg-slate-100 h-14 md:h-auto mx-auto"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
          {currentProducts?.map((product) => {
            return (
              <div className="mx-auto" key={product._id}>
                <Productcard product={product} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          paginate={paginate}
          productPerPage={productPerPage}
          currentPage={currentPage}
          totalProducts={totalProducts}
        />
      </div>
    </>
  );
}

export default Products;
