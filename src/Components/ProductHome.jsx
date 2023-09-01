/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {
    const {title, image, price} = product
    let navigate = useNavigate()

  return (
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
       sx={{ padding: "1em 1em 0 1em", objectFit: "contain",}}
        // sx={{ maxWidth: 345,height:194}}
        // image={image}
        // title="title"
      />
      <CardContent> 
        <Typography gutterBottom variant="body1" component="div" className='productText'>
          {title} - ${price} 
        </Typography>
      </CardContent>
      <CardActions className='productButtons'>
        <Button size="small">Share</Button>
        <Button size="small" onClick={() => navigate(`/product/${product.id}`)}>Learn More</Button>
      </CardActions>
    </Card>
  );
}