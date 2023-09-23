import { useEffect } from "react";
import { useState } from "react";

function Cart() {
  const [productIds, setProductsIds] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const newCart = JSON.parse(localStorage.getItem("cart"));
        console.log({ newCart });

        const cartProductIds = newCart.map((product) => product.productId);

        const productsResponse = await fetch(
          "https://fakestoreapi.com/products"
        );
        const allProducts = await productsResponse.json();

        const filtered = allProducts.filter((product) =>
          cartProductIds.includes(product.id)
        );

        setFilteredProducts(filtered);
        setProductsIds(cartProductIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getProducts();
  }, []);

  console.log({ productIds, filteredProducts });

  return (
    <div className="cartContainer">
      <h2>Your Cart</h2>
      {filteredProducts.map((product) => (
        <div key={product.id} className="cartBox">
          <ul>
            <li>
              <img src={product.image} className="cartImage" />
              <h1>{product.title}</h1>
              <p>{product.price}</p>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Cart;
