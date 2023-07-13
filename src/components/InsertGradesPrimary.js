import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import "../index.css";

const InsertGrades = (props) => {
  const handleSubmit = props.handleSubmit;
  const gradesValues = props.gradesValues;
  const setGradesValues = props.setGradesValues;
  const coursesValues = props.coursesValues;
  const subjectsValues = props.subjectsValues;
  const values = props.values;
  const setValues = props.setValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleChangeGrades = (event) => {
    const { name, value } = event.target;
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const id = optionElement.getAttribute("id");

    const newGrades = gradesValues.map((grade) => {
      if (grade.idStudent === id) {
        return {
          ...grade,
          [name]: value,
        };
      }
      return grade;
    });

    setGradesValues(newGrades);
  };

  const handleSubmitInternal = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="container">
      <br />
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ textAlign: "center" }}
      >
        Registrar Calificaciones
      </Typography>
      <br />
      <br />

      <form id="submitGrades" onSubmit={handleSubmitInternal}>
        <Box component="form" style={{ width: "100%" }}>
          <div className="container row row-cols-3">
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="quimesterLabel">Quimestre</InputLabel>
                <Select
                  fullWidth
                  labelId="quimesterLabel"
                  id="quimester"
                  name="quimester"
                  value={values.quimester}
                  label="Quimestre"
                  onChange={handleChange}
                >
                  <MenuItem disabled selected>
                    Seleccione un Quimestre{" "}
                  </MenuItem>
                  <MenuItem value={1}>Primer Quimestre</MenuItem>
                  <MenuItem value={2}>Segundo Quimestre</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="labelCourse">Cursos</InputLabel>
                <Select
                  fullWidth
                  labelId="labelCourse"
                  id="idCourse"
                  name="idCourse"
                  value={values.idCourse}
                  label="Cursos"
                  onChange={handleChange}
                >
                  <MenuItem disabled selected>
                    Seleccione un Curso{" "}
                  </MenuItem>
                  {coursesValues.map((item) => (
                    <MenuItem value={item._id}>
                      {item.number} {item.parallel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <FormControl fullWidth>
                <InputLabel id="labelSubject">Asignaturas</InputLabel>
                <Select
                  fullWidth
                  labelId="labelSubject"
                  id="idSubject"
                  name="idSubject"
                  value={values.idSubject}
                  label="Materias"
                  onChange={handleChange}
                >
                  <MenuItem disabled selected>
                    Seleccione una Asignatura{" "}
                  </MenuItem>
                  {subjectsValues.map((item) => (
                    <MenuItem value={item._id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <table className="table mt-4">
            <tr>
              <th className="text-center">Estudiantes</th>
              <th className="text-center">Lecciones</th>
              <th className="text-center">Participaciones</th>
              <th className="text-center">Deberes</th>
              <th className="text-center">Proyecto</th>
              <th className="text-center">Examen</th>
            </tr>

            {gradesValues.map((item) => (
              <tr>
                <td className="text-center">{item.nameStudent}</td>
                <td className="text-center">
                  <select
                    class="select"
                    name="lessons"
                    value={item.lessons}
                    onChange={handleChangeGrades}
                    label="Lecciones"
                  >
                    <option disabled selected>
                      Seleccione una Calificación{" "}
                    </option>
                    <option id={item.idStudent} value="I">
                      I
                    </option>
                    <option id={item.idStudent} value="EP">
                      EP
                    </option>
                    <option id={item.idStudent} value="A">
                      A
                    </option>
                    <option id={item.idStudent} value="N/E">
                      N/E
                    </option>
                  </select>
                </td>
                <td className="text-center">
                  <select
                    class="select"
                    name="participations"
                    value={item.participations}
                    label="Participaciones"
                    onChange={handleChangeGrades}
                  >
                    <option disabled selected>
                      Seleccione una Calificación{" "}
                    </option>
                    <option id={item.idStudent} value="I">
                      I
                    </option>
                    <option id={item.idStudent} value="EP">
                      EP
                    </option>
                    <option id={item.idStudent} value="A">
                      A
                    </option>
                    <option id={item.idStudent} value="N/E">
                      N/E
                    </option>
                  </select>
                </td>
                <td className="text-center">
                  <select
                    class="select"
                    name="homeworks"
                    value={item.homeworks}
                    label="Deberes"
                    onChange={handleChangeGrades}
                  >
                    <option disabled selected>
                      Seleccione una Calificación{" "}
                    </option>
                    <option id={item.idStudent} value="I">
                      I
                    </option>
                    <option id={item.idStudent} value="EP">
                      EP
                    </option>
                    <option id={item.idStudent} value="A">
                      A
                    </option>
                    <option id={item.idStudent} value="N/E">
                      N/E
                    </option>
                  </select>
                </td>
                <td className="text-center">
                  <select
                    class="select"
                    name="project"
                    value={item.project}
                    label="Proyecto"
                    onChange={handleChangeGrades}
                  >
                    <option disabled selected>
                      Seleccione una Calificación{" "}
                    </option>
                    <option id={item.idStudent} value="I">
                      I
                    </option>
                    <option id={item.idStudent} value="EP">
                      EP
                    </option>
                    <option id={item.idStudent} value="A">
                      A
                    </option>
                    <option id={item.idStudent} value="N/E">
                      N/E
                    </option>
                  </select>
                </td>
                <td className="text-center">
                  <select
                    class="select"
                    name="exam"
                    value={item.exam}
                    label="Examen"
                    onChange={handleChangeGrades}
                  >
                    <option disabled selected value="I">
                      Seleccione una Calificación{" "}
                    </option>
                    <option id={item.idStudent} value="I">
                      I
                    </option>
                    <option id={item.idStudent} value="EP">
                      EP
                    </option>
                    <option id={item.idStudent} value="A">
                      A
                    </option>
                    <option id={item.idStudent} value="N/E">
                      N/E
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </table>

          <br />
          <br />
          <Button
            variant="contained"
            size="large"
            type="submit"
            onClick={handleSubmitInternal}
            sx={{
              boxShadow: "1px 1px 5px #333",
              background: "linear-gradient(to right, #0069c0, #0069c0)",
              width: "30%",
              marginLeft: "35%",
            }}
          >
            Registrar
          </Button>
          <br />
          <br />
        </Box>
      </form>
    </div>
  );
};
export default InsertGrades;
