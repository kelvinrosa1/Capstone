// import { useState } from 'react'
import './App.css'
import Navabar from './Components/Navabar'
import { Routes, Route } from 'react-router'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Profile from './Components/Profile'
import SingleProduct from './Components/SingleProduct'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([])
 
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

const updateFilteredProducts = (term) => {
  setSearchTerm(term);

  const  productList = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // setFilteredProducts(productList)
  console.log('filtered products: ', productList)
}

  return (
    <>
    <Navabar searchTerm={searchTerm} updateProducts={updateFilteredProducts} />
    <Routes>
      <Route path='/' element={<Home products={products} setProducts={setProducts} filteredProducts={filteredProducts} />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/product/:id' element={<SingleProduct/>}/>
    </Routes>
    </>
  )
}

export default App
