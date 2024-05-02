import { useState } from "react";
import Addproduct from "../components/Addproduct";
import ViewProducts from "../components/ViewProducts";
function AdminPanel() {
  const [status, setStatus] = useState("Add");
  return (
    <div className="container mx-auto min-h-screen md:flex mt-10">
      <div className="w-full flex md:flex-col justify-around md:justify-normal md:w-[250px] gap-3">
        <button
          onClick={() => setStatus("Add")}
          className="px-3 py-2 bg-slate-300"
        >
          Add products
        </button>
        <button
          onClick={() => setStatus("View")}
          className="px-3 py-2 bg-slate-300"
        >
          View products
        </button>
      </div>
      <div className="flex-1">
        {status == "Add" ? <Addproduct /> : <ViewProducts />}
      </div>
    </div>
  );
}

export default AdminPanel;
