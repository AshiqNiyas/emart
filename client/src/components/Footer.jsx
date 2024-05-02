function Footer() {
  return (
    <div className="container  mx-auto h-60 text-center text-white bg-gray-500 flex md:flex-row flex-col ">
      <div className="flex-1 justify-center h-full flex flex-col gap-2 items-center">
        <a>Home</a>
        <a>About</a>
        <a>Sellers</a>
      </div>
      <div className="flex-1 justify-center h-full flex flex-col gap-2 items-center">
        <a>Details</a>
        <a>Trivial</a>
        <a>Products</a>
      </div>
    </div>
  );
}

export default Footer;
