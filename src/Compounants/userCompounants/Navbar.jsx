import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

// MUI Imports
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Tooltip,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

// Context
import DarkModeToggleButton from "../DarkMode";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useSearch } from "../../contexts/SearchContext";

// User menu settings
const settings = [
  {
    name: "Profile",
    path: "/profile",
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    name: "Logout",
    path: "/logout",
    icon: <LogoutIcon fontSize="small" />,
  },
];

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

function ResponsiveAppBar() {
  const { darkMode } = useDarkMode();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();

  React.useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(storedUser);
    } catch (err) {
      console.error("Invalid user in localStorage", err);
      setUser(null);
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: darkMode
          ? "rgba(36, 48, 72, 0.5)"
          : "rgba(255, 255, 255, 0.5)",
        color: darkMode ? "white" : "black",
        backdropFilter: "blur(12px)",
        boxShadow: "none",
        transition: "all 0.3s ease-in-out",
        fontFamily: "'Fira Code', monospace",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h4"
              noWrap
              component={Link}
              to="/user-dashboard"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: `'Fira Code', monospace`,
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AS
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                fontSize: { xs: ".75rem", sm: "1.5rem" },
              }}
            >
              {user ? `Welcome, ${user.userName}` : "Welcome to AS"}
            </Typography>
          </Box>

          <Box
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.1, sm: 0.5 },
            }}
          >
            <Tooltip title="Cart">
              <IconButton
                component={Link}
                to="/cart"
                color="inherit"
                sx={{ marginLeft: { sx: 0, sm: 1 } }}
              >
                <ShoppingCartCheckoutIcon />
              </IconButton>
            </Tooltip>

            {user && (
              <>
                <Tooltip title="User Menu">
                  <IconButton onClick={handleOpenUserMenu} color="inherit">
                    <PermIdentityIcon />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      component={Link}
                      to={setting.path}
                      onClick={handleCloseUserMenu}
                      sx={{ display: "flex", gap: 1, alignItems: "center" }}
                    >
                      {setting.icon}
                      <Typography>{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}

            <DarkModeToggleButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
