import { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { PriceContext } from "../App";

function Cart() {
  // eslint-disable-next-line no-unused-vars
  const [productIds, setProductsIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { totalPrice, setTotalPrice } = useContext(PriceContext);

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
        const stateCart = filtered.map((product) => ({
          ...product,
          quantity: newCart.find(
            (cartItem) => cartItem.productId === product.id
          ).quantity,
        }));
        localStorage.setItem("cartInfo", JSON.stringify(stateCart));
        console.log({ stateCart });
        setCartItems(stateCart);
        updateTotalPrice(stateCart);
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
    console.log(cartItems);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        }))
      )
    );
    setCartItems(updatedCartItems);

    updateTotalPrice(updatedCartItems);
  };

  const updateTotalPrice = (updatedCartItems) => {
    const total = updatedCartItems.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  };
  console.log(totalPrice);

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
              <IconButton
                sx={{ backgroundColor: "black" }}
                variant="text"
                onClick={() => updateQuantity(product.id, product.quantity - 1)}
              >
                <RemoveIcon />
              </IconButton>
              <p>Quantity: {product.quantity}</p>{" "}
              <IconButton
                sx={{ backgroundColor: "black" }}
                variant="text"
                onClick={() => updateQuantity(product.id, product.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
              <br />
              <Button
                sx={{ marginTop: "20px" }}
                variant="text"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </Button>
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
