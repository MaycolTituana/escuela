import React, { useState, useEffect } from "react";
import "../App.css";
import "../index.css";
import { Box, TextField, Button } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { checkLogin } from "../services/login";
import Cookies from "universal-cookie/es6";
import { borderRadius } from "@mui/system";
import logo from "../img/logo.png";

const cookies = new Cookies();

const Login = () => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [loginValues, setLoginValues] = useState({
    user: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const startSession = (event) => {
    event.preventDefault();
    checkLogin(loginValues, setLoginValues);
  };

  useEffect(() => {
    if (typeof cookies.get("user") !== "undefined") {
      if (cookies.get("type") === "0") {
        window.location.href = "./homeScreenAdmin";
      } else if (cookies.get("type") === "2") {
        window.location.href = "./homeScreenProfessor";
      } else if (cookies.get("type") === "3") {
        window.location.href = "./homeScreenStudent";
      }
    }
  });

  return (
    <form onSubmit={startSession}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Box
          sx={{
            width: "30%",
            marginLeft: "35%",
            marginTop: "5%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingLeft: "20px",
            paddingRight: "20px",
            background: "#fff9" /* fallback for old browsers */,
            boxShadow: "1px 1px 10px #333",
            borderRadius: "20px",
          }}
        >
          <img src={logo} width={"40%"} alt="logo" />

          <br />
          {/* USUARIO */}
          <InputLabel htmlFor="input-with-icon-adornment">Usuario</InputLabel>
          <FormControl variant="standard">
            <Input
              id="input-with-icon-adornment"
              name="user"
              endAdornment={
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              }
              size="large"
              sx={{ width: "105%", my: 2 }}
              variant="standard"
              placeholder="Ingrese su Usuario"
              value={loginValues.user}
              onChange={handleChange}
            />
          </FormControl>

          <br />

          {/* CONTRASEÑA */}
          <InputLabel htmlFor="standard-adornment-password">
            Contraseña
          </InputLabel>
          <FormControl variant="standard">
            <Input
              id="standard-adornment-password"
              name="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              size="large"
              sx={{ width: "100%", my: 2 }}
              placeholder="Ingrese su Contraseña"
              value={loginValues.password}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              boxShadow: "1px 1px 5px #333",
              margin: "10px",
              background: "#0069c0" /* fallback for old browsers */,
              background:
                "linear-gradient(to right, #0069c0, #0069c0)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
              width: "60%",
            }}
          >
            Ingresar
          </Button>
          <br />
        </Box>
      </Box>
    </form>
  );
};
export default Login;
