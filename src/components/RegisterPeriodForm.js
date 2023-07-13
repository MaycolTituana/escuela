import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Message from "./MessageAlert";
import "../index.css";

const RegisterPeriodForm = (props) => {
  const { handleSubmit } = props;
  const [messageBox, setMessage] = useState({
    type: "",
    message: "",
    isHidden: true,
  });
  const [period, setPeriod] = useState({
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    actual: true,
  });

  useEffect(() => {
    var todayDate = new Date();
    var month = todayDate.getMonth() + 1;
    var day = todayDate.getDate();
    var year = todayDate.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    setPeriod({
      ...period,
      startDate: year + "-" + month + "-" + day,
      endDate: year + "-" + month + "-" + day,
    });
  }, []);

  const [validation, setValidation] = useState({
    nameOk: false,
    startDateOk: false,
    endDateOk: true,
  });

  const handleSubmitInternal = (e) => {
    e.preventDefault();
    if (validation.nameOk && validation.startDateOk && validation.endDateOk) {
      handleSubmit(period, setPeriod, messageBox, setMessage);
    } else {
      setMessage({
        type: "error",
        message: "Ingresa correctamente los campos",
        isHidden: false,
      });
    }
  };

  const nameValidation = () => {
    const periodName = period.name;
    const iName = document.getElementById("iName");
    const name = document.getElementById("name");
    var auxIterator = 0;

    if (periodName === "") {
      iName.textContent = "Ingrese el nombre del año lectivo.";
      auxIterator++;
      setValidation({ ...validation, nameOk: false });
    }

    if (auxIterator !== 1 && periodName.length < 4) {
      iName.textContent =
        "*El nombre del año lectivo debe tener al menos 5 digitos";
      auxIterator++;
      setValidation({ ...validation, nameOk: false });
    }

    if (auxIterator === 0) {
      iName.textContent = "";
      name.style.border = "";
      setValidation({ ...validation, nameOk: true });
    } else {
      name.style.borderBottom = "2px solid red";
      name.style.borderRadius = "5px";
    }
  };

  const startDateValidation = () => {
    const iYear = document.getElementById("iStartDate");
    const year = document.getElementById("startDate");
    const born = new Date(year.value);
    const actualDate = new Date();

    if (actualDate.getFullYear() !== born.getFullYear()) {
      iYear.textContent = "*El año lectivo debe comenzar en el año actual";
      setValidation({ ...validation, startDateOk: false });
      year.style.borderTop = "2px solid red";
      year.style.borderBottom = "2px solid red";
      year.style.borderRight = "2px solid red";
      year.style.borderLeft = "2px solid red";
      year.style.borderRadius = "5px";
    } else {
      iYear.textContent = "";
      year.style.border = "";
      setValidation({ ...validation, startDateOk: true });
    }
  };

  const endDateValidation = () => {
    const iYear = document.getElementById("iEndDate");
    const year = document.getElementById("endDate");
    const start = document.getElementById("startDate");
    const born = new Date(year.value);
    const actualDate = new Date(start.value);

    if (
      born.getFullYear() < actualDate.getFullYear() ||
      born.getFullYear() > actualDate.getFullYear() + 1
    ) {
      iYear.textContent = "*El año de finalizalión sobrepasa el límite.";
      setValidation({ ...validation, endDateOk: false });
      year.style.borderTop = "2px solid red";
      year.style.borderBottom = "2px solid red";
      year.style.borderRight = "2px solid red";
      year.style.borderLeft = "2px solid red";
      year.style.borderRadius = "5px";
    } else {
      iYear.textContent = "";
      year.style.border = "";
      setValidation({ ...validation, endDateOk: true });
    }
  };

  return (
    <>
      <br />
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ textAlign: "center" }}
      >
        Registrar Año Lectivo
      </Typography>
      <Box style={{ width: "100%" }}>
        <div className="container row row-cols-3 mt-4">
          <div className="col">
            <TextField
              value={period.name}
              onChange={(event) =>
                setPeriod({ ...period, name: event.target.value })
              }
              id="name"
              label="Nombre"
              style={{ width: "100%" }}
              onBlur={nameValidation}
            />
            <br />
            <i id="iName" class="msgError"></i>
            <br />
          </div>
          <div className="col">
            <TextField
              id="startDate"
              label="Fecha de comienzo"
              type="date"
              defaultValue="2023-05-24"
              value={period.startDate}
              onChange={(event) =>
                setPeriod({ ...period, startDate: event.target.value })
              }
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={startDateValidation}
            />
            <br />
            <br />
            <i id="iStartDate" class="msgError"></i>
          </div>
          <div className="col">
            <TextField
              id="endDate"
              label="Fecha de cierre"
              type="date"
              value={period.endDate}
              onChange={(event) =>
                setPeriod({ ...period, endDate: event.target.value })
              }
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={endDateValidation}
            />
            <br />
            <br />
            <i id="iEndDate" class="msgError"></i>
          </div>
        </div>

        <Box>
          <Button
            variant="contained"
            size="large"
            type="submit"
            sx={{
              boxShadow: "1px 1px 5px #333",
              background: "linear-gradient(to right, #0069c0, #0069c0)",
            }}
            onClick={handleSubmitInternal}
          >
            Registrar
          </Button>
          <Message
            type={messageBox.type}
            message={messageBox.message}
            isHidden={messageBox.isHidden}
          />
          <br />
          <br />
        </Box>
      </Box>
    </>
  );
};

export default RegisterPeriodForm;
