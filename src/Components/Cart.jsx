import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Cart() {
  // eslint-disable-next-line no-unused-vars
  const [productIds, setProductsIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const newCart = JSON.parse(localStorage.getItem("cart"));

        const cartProductIds = newCart.map((product) => product.productId);

        const productsResponse = await fetch(
          "https://fakestoreapi.com/products"
        );
        const allProducts = await productsResponse.json();

        const filtered = allProducts.filter((product) =>
          cartProductIds.includes(product.id)
        );

        setCartItems(
          filtered.map((product) => ({
            ...product,
            quantity: newCart.find(
              (cartItem) => cartItem.productId === product.id
            ).quantity,
          }))
        );

        setProductsIds(cartProductIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getProducts();
  }, []);

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (product) => product.id !== productId
    );

    setCartItems(updatedCartItems);

    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        }))
      )
    );

    updateTotalPrice(updatedCartItems);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        }))
      )
    );

    updateTotalPrice(updatedCartItems);
  };

  const updateTotalPrice = (updatedCartItems) => {
    const total = updatedCartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  };

  return (
    <div className="cartContainer">
      <h2>Your Cart</h2>
      {cartItems.map((product) => (
        <div key={product.id} className="cartBox">
          <ul>
            <li>
              <img
                src={product.image}
                className="cartImage"
                alt={product.title}
              />
              <h1>{product.title}</h1>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <Stack spacing={2} direction="row">
                <Button
                  sx={{ backgroundColor: "black" }}
                  variant="text"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </Button>
                <Button
                  variant="text"
                  onClick={() =>
                    updateQuantity(product.id, product.quantity + 1)
                  }
                >
                  Add One
                </Button>
              </Stack>
            </li>
          </ul>
        </div>
      ))}
      <p>Total: ${totalPrice.toFixed(1)}</p>
      <Link to="/checkout">Checkout</Link>
    </div>
  );
}

export default Cart;
