import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AddToCart({ productId }) {
  let navigate = useNavigate();
  const handleSubmit = () => {
    console.log("logging");

    let items = JSON.parse(localStorage.getItem("cart")) || [];
    console.log({ items });

    let item = items.find((item) => item.productId === productId);
    console.log({ item });

    if (item) {
      item.quantity += 1;
    } else {
      items.push({
        productId: parseInt(productId),
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(items));
    console.log({ items });
    navigate(`/cart`);
  };
  return <button onClick={handleSubmit}>Add to cart</button>;
}

export default AddToCart;
