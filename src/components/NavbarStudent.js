import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import "../index.css";
import Cookies from "universal-cookie/es6";
import cerrarSesion from "../img/cerrar-sesion.png";

const cookies = new Cookies();

const NavbarStudent = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [submenuManageGrades, setSubmenuManageGrades] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenManageGrades = (event) => {
    setSubmenuManageGrades(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseManageGrades = () => {
    setSubmenuManageGrades(null);
  };

  const logOut = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("user", { path: "/" });
    cookies.remove("email", { path: "/" });
    cookies.remove("password", { path: "/" });
    cookies.remove("type", { path: "/" });

    window.location.href = "./";
  };

  return (
    <div className="container">
      <AppBar position="static" style={{ backgroundColor: "#318CE7" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/homeScreenStudent">
              <div class="logoNav"></div>
            </Link>

            <Box
              sx={{ display: { xs: "none", md: "flex", marginRight: "auto" } }}
            >
              <Link to="/seeGradesStudent" className="link">
                <MenuItem
                  key="seeGrades"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  CALIFICACIONES
                </MenuItem>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Salir">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Botón salir" src={cerrarSesion} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="exit" onClick={logOut}>
                  <Typography textAlign="center">Salir</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default NavbarStudent;
