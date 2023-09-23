import { useState, useEffect } from "react";
import Product from "./ProductHome";
import SearchInput from "./Searchinput";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchApi() {
      try {
        const grabProducts = await fetch("https://fakestoreapi.com/products");
        const result = await grabProducts.json();
        console.log(result);
        setProducts(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
      {/* Use the SearchInput component here */}
      <div className="container">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Home;
