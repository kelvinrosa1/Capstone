import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PriceContext } from "../App";
import { useContext } from "react";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let nav = useNavigate();
  const loggedIn = localStorage.getItem("id");
  const { setTotalPrice } = useContext(PriceContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/"> Universal Market</Link>
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                nav("/cart");
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  nav("/profile");
                }}
              >
                Profile
              </MenuItem>
              {loggedIn ? (
                <MenuItem
                  onClick={() => {
                    localStorage.clear();
                    setTotalPrice(0);
                    nav("/");
                  }}
                >
                  Logout
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    nav("/login");
                  }}
                >
                  Login
                </MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
