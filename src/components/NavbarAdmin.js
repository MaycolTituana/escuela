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
import exitButton from "../img/exitButton.jpg";
import cerrarSesion from "../img/cerrar-sesion.png";

const cookies = new Cookies();

const NavbarAdmin = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [submenuManageUsers, setSubmenuManageUsers] = React.useState(null);
  const [submenuManageInstitution, setSubmenuManageInstitution] =
    React.useState(null);
  const [submenuAsignations, setSubmenuAsignations] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenManageUsers = (event) => {
    setSubmenuManageUsers(event.currentTarget);
  };
  const handleOpenManageInstitution = (event) => {
    setSubmenuManageInstitution(event.currentTarget);
  };
  const handleOpenAsignations = (event) => {
    setSubmenuAsignations(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseManageUsers = () => {
    setSubmenuManageUsers(null);
  };
  const handleCloseManageInstitution = () => {
    setSubmenuManageInstitution(null);
  };
  const handleCloseAsignations = () => {
    setSubmenuAsignations(null);
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
            <Link to="/homeScreenAdmin">
              <div className="logoNav"></div>
            </Link>

            <Box
              sx={{ display: { xs: "none", md: "flex", marginRight: "auto" } }}
            >
              <Tooltip title="Gestionar usuarios">
                <Button
                  key="manageUsers"
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={handleOpenManageUsers}
                >
                  Usuarios
                </Button>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="submenuManageUsers"
                anchorEl={submenuManageUsers}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(submenuManageUsers)}
                onClose={handleCloseManageUsers}
              >
                <Link to="/createStudent" className="link">
                  <MenuItem key="createStudent">
                    <Typography textAlign="center">Registrar Alumno</Typography>
                  </MenuItem>
                </Link>
                <Link to="/importProfessors" className="link">
                  <MenuItem key="importProfessors">
                    <Typography textAlign="center">
                      Importar Docentes
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>

            <Box
              sx={{ display: { xs: "none", md: "flex", marginRight: "auto" } }}
            >
              <Tooltip title="Gestionar institución">
                <Button
                  key="submenuManageInstitution"
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={handleOpenManageInstitution}
                >
                  Institución
                </Button>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="subMenuForms"
                anchorEl={submenuManageInstitution}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(submenuManageInstitution)}
                onClose={handleCloseManageInstitution}
              >
                <Link to="/createSchoolYear" className="link">
                  <MenuItem key="createSchoolYear">
                    <Typography textAlign="center">
                      Crear Año Lectivo
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/importData" className="link">
                  <MenuItem key="importData">
                    <Typography textAlign="center">Importar Datos</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Tooltip title="Realizar asignaciones">
                <Button
                  key="asignation"
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={handleOpenAsignations}
                >
                  Asignar
                </Button>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="subMenuReports"
                anchorEl={submenuAsignations}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(submenuAsignations)}
                onClose={handleCloseAsignations}
              >
                <Link to="/coursesToSchoolYear" className="link">
                  <MenuItem key="coursesToSchoolYear">
                    <Typography textAlign="center">
                      Cursos a Año Lectivo
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/courseToProfessor" className="link">
                  <MenuItem key="courseToProfessor">
                    <Typography textAlign="center">Curso a Docente</Typography>
                  </MenuItem>
                </Link>
                <Link to="/subjectToProfessor" className="link">
                  <MenuItem key="subjectToProfessor">
                    <Typography textAlign="center">
                      Asignatura a Docente
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to="/studentToCourse" className="link">
                  <MenuItem key="studentToCourse">
                    <Typography textAlign="center">Alumno a Curso</Typography>
                  </MenuItem>
                </Link>
              </Menu>
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
export default NavbarAdmin;
