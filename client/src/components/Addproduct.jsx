import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
function Addproduct() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    old_price: "",
    price: "",
    category: "",
    brand: "",
    image: "",
  });
  const imageHandler = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      "http://localhost:3001/products",
      {
        ...productInfo,
        image: image,
      },
      { withCredentials: true }
    );
    if (res.data.error) {
      setLoading(false);
      return toast.error(res.data.error);
    }
    if (res.data.success) {
      setLoading(false);
      toast.success(res.data.success);
      setProductInfo({
        title: "",
        description: "",
        old_price: "",
        price: "",
        category: "",
        brand: "",
        image: "",
      });
      setImage("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-center">
        <h4 className="text-xl text-slate-400 font-montserrat font-semibold">
          Add product
        </h4>
        <input
          name="title"
          value={productInfo.title}
          onChange={changeHandler}
          className="w-[80%] mx-auto h-10 outline-none border border-gray-300 "
          type="text"
          placeholder="Enter product title..."
        />
        <textarea
          name="description"
          value={productInfo.description}
          onChange={changeHandler}
          className="w-[80%] mx-auto outline-none border border-gray-300"
          cols="30"
          rows="5"
          placeholder="Enter description for the product..."
        ></textarea>
        <div className="flex justify-between w-[80%] mx-auto">
          <input
            name="category"
            value={productInfo.category}
            onChange={changeHandler}
            type="text"
            placeholder="Enter category..."
            className="outline-none border border-gray-300 h-8"
          />
          <input
            name="brand"
            value={productInfo.brand}
            onChange={changeHandler}
            type="text"
            placeholder="Enter brand..."
            className="outline-none border border-gray-300 h-8"
          />
        </div>
        <div className="flex justify-between w-[80%] mx-auto">
          <input
            name="price"
            value={productInfo.price}
            onChange={changeHandler}
            type="number"
            placeholder="Enter price..."
            className="outline-none border border-gray-300 h-8"
          />
          <input
            name="old_price"
            value={productInfo.old_price}
            onChange={changeHandler}
            type="number"
            placeholder="Enter old price..."
            className="outline-none border border-gray-300 h-8"
          />
        </div>
        <div>
          <label className="flex items-center mx-auto w-[80%]">
            <img
              className="w-40"
              src={
                image
                  ? image
                  : "https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg"
              }
              alt=""
            />
            <input onChange={imageHandler} type="file" />
          </label>
        </div>
        <div>
          <button className="bg-orange-400 text-slate-50 px-3 py-1 rounded-md w-40">
            {loading ? "uploading..." : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Addproduct;
