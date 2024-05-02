import { useNavigate } from "react-router-dom";
function SearchModal({ query, products, setQuery }) {
  const navigate = useNavigate();
  const filteredProducts = products?.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="max-w-[200px] md:max-w-[300px] max-h-[250px] overflow-hidden overflow-y-auto flex flex-col gap-2 bg-slate-50 absolute top-[48px]">
      {filteredProducts?.map((item, i) => {
        return (
          <div
            onClick={() => {
              navigate(`/products/${item._id}`);
              setQuery("");
            }}
            className="flex items-center border-b-2 gap-2 text-base justify-between hover:bg-gray-300 cursor-pointer"
            key={i}
          >
            <img src={item.image} className="w-10" />
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchModal;
