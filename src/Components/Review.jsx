import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { PriceContext } from "../App";
import { useContext } from "react";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  // eslint-disable-next-line no-unused-vars
  const { totalPrice, setTotalPrice } = useContext(PriceContext);
  const [newCart, setNewCart] = React.useState([]);
  React.useEffect(() => {
    function updateCart() {
      const cart = JSON.parse(localStorage.getItem("cartInfo"));
      setNewCart(cart);
    }
    updateCart();
  }, []);
  // const total = newCart.reduce(
  //   (acc, product) => acc + product.price * product.quantity,
  //   0
  // );
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {newCart.map((product) => (
          <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.desc} />
            <Typography variant="body2">${product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice.toFixed(1)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
