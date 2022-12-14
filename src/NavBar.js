import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { Link as NavigationLink } from "react-router-dom";
import "./nav_bar.css";

const pages = ["Users", "Authors", "Books", "Vouchers"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleColorofLink = (page) => {
    if (page === window.location.pathname.slice(1)) {
      return "white";
    } else {
      return "#a0a0a0";
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavigationLink
                    style={{ textDecoration: "none" }}
                    to={`/${page.toLowerCase()}`}
                  >
                    <Typography
                      className="nav-link"
                      key={page}
                      color={handleColorofLink(page)}
                      sx={{ my: 2, display: "block", mx: 2 }}
                    >
                      {page}
                    </Typography>
                  </NavigationLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavigationLink
                style={{ textDecoration: "none" }}
                to={`/${page.toLowerCase()}`}
              >
                <Typography
                  as="p"
                  key={page}
                  underline="none"
                  color={handleColorofLink(page)}
                  sx={{ my: 2, display: "block", mx: 2 }}
                  className="nav-link"
                >
                  {page}
                </Typography>
              </NavigationLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
