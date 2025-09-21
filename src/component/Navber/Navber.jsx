import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../../context/ThemeProvider";

const pages = [
  { label: "Home", path: "/home" },
  { label: "Men", path: "/menproductfilter" },
  { label: "Women", path: "/wemen-product" },
  { label: "Kids", path: "/kids" },
  // { label: "Bestselling", path: "/bestselling" },
  // { label: "Offer", path: "/offer" },
  { label: "Organic", path: "/organic" },
  { label: "Showpiece", path: "/showpiece" },
  { label: "Contact", path: "/contact" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navber() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { mode, toggleTheme } = useThemeContext();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="static"
      sx={{
        background:
          mode === "light"
            ? "linear-gradient(90deg, #0F2027, #203A43, #2C5364)"
            : "linear-gradient(90deg, #000000, #1a1a1a, #2C5364)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "cursive",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "#FFD700",
              textDecoration: "none",
              fontSize: "1.8rem",
            }}
          >
            Barakah Shop
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <NavLink
                  key={page.label}
                  to={page.path}
                  style={{ textDecoration: "none", color: mode === "light" ? "#000" : "#fff" }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}>
            {pages.map((page) => (
              <NavLink key={page.label} to={page.path} style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    "&:hover": {
                      color: "#FFD700",
                      transform: "scale(1.05)",
                      transition: "0.3s",
                    },
                  }}
                >
                  {page.label}
                </Button>
              </NavLink>
            ))}
          </Box>

          {/* Dark/Light Toggle */}
          <Box
            onClick={toggleTheme}
            sx={{
              display: "flex",
              alignItems: "center",
              width: 60,
              height: 30,
              bgcolor: mode === "dark" ? "#333" : "#ddd",
              borderRadius: "30px",
              p: "4px",
              position: "relative",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              transition: "background 0.3s ease-in-out",
              mx: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 4,
                left: mode === "dark" ? "32px" : "4px",
                width: 22,
                height: 22,
                borderRadius: "50%",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                transition: "left 0.3s ease-in-out",
              }}
            >
              {mode === "dark" ? (
                <LightModeIcon sx={{ fontSize: 16, color: "#FFD700" }} />
              ) : (
                <DarkModeIcon sx={{ fontSize: 16, color: "#0F2027" }} />
              )}
            </Box>
          </Box>

          {/* Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src="/static/images/avatar/2.jpg"
                  sx={{ border: mode === "light" ? "2px solid #FFD700" : "2px solid #fff" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ color: mode === "light" ? "#000" : "#fff" }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
