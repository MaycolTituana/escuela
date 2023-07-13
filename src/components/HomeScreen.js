import * as React from "react";
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
import colegio from "../img/colegio.png";

const HomeScreen = () => {
  return (
    <div className="container">
      <div className="row row-cols-1">
        <div className="col">
          <h1 class="titleHome text-center">Unidad Educativa</h1>
          <h2 class="subtitleHome text-center">Liceo "La Siembra"</h2>
        </div>
      </div>
      <div className="row row-cols-1">
        <div className="col">
          <img src={colegio} class="administrador" />
        </div>
      </div>
    </div>
  );
};
export default HomeScreen;
