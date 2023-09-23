/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const { title, image, price, rating } = product;

  return (
    <Link to={`/product/${product.id}`}>
      <Card
        raised
        sx={{
          maxWidth: 280,
          margin: "0 auto",
          padding: "0.1em",
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={"alt"}
          title={"titleasdasdsada"}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            className="productText"
          >
            {title} - ${price} <br />
            {rating.rate}⭐ ({rating.count})
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
