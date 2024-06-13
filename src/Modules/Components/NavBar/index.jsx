import React, { useState } from "react";
import {
  Drawer,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  InputBase,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavBar.css";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBar = ({ setSearchResults }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [drawerState, setDrawerState] = useState({
    left: false,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDrawer = (_anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, left: open });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleSearchSubmit = async () => {
  //   try {
  //     const response = await axios.get(
  //       ` https://finscreener.in/api/search?query=${searchQuery}`
  //     );
  //     setSearchResults(response.data);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   }
  // };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#404040" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img src="/Images/logo1.png" height="100" width="100" />

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
              <MenuItem>
                <Link to="/joblist">Spot Light</Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box type="img" src="/Images/logo.svg" height="100" width="100" />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Link to="/" className="users-menu-text">
              SpotLight
            </Link>
            <Link to="/" className="users-menu-text">
              Market
            </Link>
            <Link to="/" className="users-menu-text">
              Screeners
            </Link>
            <Link to="/" className="users-menu-text">
              IPO
            </Link>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              // value={searchQuery}
              // onChange={handleSearchChange}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     handleSearchSubmit();
              //   }
              // }}
            />
          </Search>
          <Box sx={{ flexGrow: 0 }}>
            <Drawer
              anchor="right"
              open={drawerState.left}
              onClose={toggleDrawer("right", false)}
            ></Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
