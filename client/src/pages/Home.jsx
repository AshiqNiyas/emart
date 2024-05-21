import { useSelector } from "react-redux";
import { useGetAllproductsQuery } from "../redux/apiSlice";
import Productcard from "../components/Productcard";
function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: products, isLoading, isError } = useGetAllproductsQuery();
  return (
    <div className="min-h-screen container mx-auto">
      <div className="text-center text-2xl font-montserrat font-bold text-gray-600 p-4">
        {userInfo?.username && `Welcome ${userInfo.username} to e-mart`}
      </div>
      <h4 className="text-xl text-center font-montserrat">Latest products</h4>
      <div className="   text-gray-600  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-5">
        {products
          ?.slice(1)
          .slice(-5)
          .map((product) => {
            return (
              <div className="mx-auto" key={product._id}>
                <Productcard product={product} />
              </div>
            );
          })}
      </div>
      <h4 className="text-xl text-center font-montserrat">Laptops</h4>
      <div className="text-gray-600  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-5">
        {products
          ?.filter((product) => product.category == "Laptop")
          .slice(1)
          .slice(-5)
          .map((product) => {
            return (
              <div className="mx-auto" key={product._id}>
                <Productcard product={product} />
              </div>
            );
          })}
      </div>
      <h4 className="text-xl text-center font-montserrat">Trending Mobiles</h4>
      <div className="text-gray-600  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-5">
        {products
          ?.filter((product) => product.category == "Mobile")
          .slice(1)
          .slice(-5)
          .map((product) => {
            return (
              <div className="mx-auto" key={product._id}>
                <Productcard product={product} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
