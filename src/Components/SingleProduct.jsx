import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "./AddToCart";

function SingleProduct() {
  const [singleId, setSingleId] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    async function fetchApi() {
      try {
        const grabSingleId = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );
        const result = await grabSingleId.json();
        setSingleId(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="singleProduct">
      <img className="productImage" src={singleId?.image} />
      <div>
        <h2>
          {singleId?.title} - ${singleId?.price}
        </h2>
        <h3>
          {singleId?.rating.rate} ⭐ ({singleId?.rating.count})
        </h3>
        <p>{singleId?.description}</p>
        <AddToCart productId={id} />
      </div>
    </div>
  );
}

export default SingleProduct;
