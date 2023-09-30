import "./App.css";
import { createContext } from "react";
import Navabar from "./Components/Navabar";
import { Routes, Route } from "react-router";
import { useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import SingleProduct from "./Components/SingleProduct";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import Checkout from "./Components/Checkout";

export const PriceContext = createContext();
export const CartContext = createContext();

function App() {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <>
      <PriceContext.Provider value={{ totalPrice, setTotalPrice }}>
        <Navabar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/cart"
            element={
              <Cart totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
            }
          />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={<Checkout totalPrice={totalPrice} />}
          />
        </Routes>
        <Footer />
      </PriceContext.Provider>
    </>
  );
}

export default App;
