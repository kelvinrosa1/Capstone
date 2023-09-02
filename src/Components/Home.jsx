import { useState, useEffect } from "react";
import Product from "./Product";

function Home({ filteredProducts }) {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchApi() {
            try {
                const grabProducts = await fetch('https://fakestoreapi.com/products');
                const result = await grabProducts.json();
                setProducts(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, []);



    return (
        <>
        {/* <img src="https://marketplace.canva.com/EAFMOL-t4Qk/1/0/1600w/canva-black-and-beige-aesthetic-elegant-sale-offer-promotion-banner-nJ4lqNCNOCw.jpg" 
        className="summerSale"
        /> */}
        <div className="searchBar">
            <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
        <div className="container">
            {filteredProducts.map((product) => (
                <Product key={product.id} product={product}/>
            ))}
        </div>
        </>
    );
}

export default Home;
