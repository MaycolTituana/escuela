import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

const TableGradesStudent = (props) => {
  const gradesValues = props.gradesValues;
  const subjectsValues = props.subjectsValues;
  const values = props.values;
  const setValues = props.setValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const obtainSubject = (idSubject) => {
    for (var i = 0; i < subjectsValues.length; i++) {
      if (subjectsValues[i]._id === idSubject) {
        return subjectsValues[i].name;
      }
    }
  };

  const obtainAverage = (grades) => {
    const lessonsAveraged = 0.2 * grades.lessons;
    const participationsAveraged = 0.2 * grades.participations;
    const homeworksAveraged = 0.2 * grades.homeworks;
    const projectAveraged = 0.2 * grades.project;
    const examAveraged = 0.2 * grades.exam;

    return (
      lessonsAveraged +
      participationsAveraged +
      homeworksAveraged +
      projectAveraged +
      examAveraged
    );
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
        Visualizar Calificaciones
      </Typography>
      <br />
      <br />

      <Box component="form" style={{ width: "100%" }}>
        <div className="container row row-cols-1">
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
        </div>

        <table className="table mt-4">
          <tr>
            <th className="text-center">Materias</th>
            <th className="text-center">Lecciones</th>
            <th className="text-center">Participaciones</th>
            <th className="text-center">Deberes</th>
            <th className="text-center">Proyecto</th>
            <th className="text-center">Examen</th>
            <th className="text-center">Promedio</th>
          </tr>

          {gradesValues.map((item) => (
            <tr>
              <td className="text-center">{obtainSubject(item.idSubject)}</td>
              <td className="text-center">{item.grades[0].lessons}</td>
              <td className="text-center">{item.grades[0].participations}</td>
              <td className="text-center">{item.grades[0].homeworks}</td>
              <td className="text-center">{item.grades[0].project}</td>
              <td className="text-center">{item.grades[0].exam}</td>
              <td className="text-center">{obtainAverage(item.grades[0])}</td>
            </tr>
          ))}
        </table>

        <br />
        <br />
      </Box>
    </div>
  );
};
export default TableGradesStudent;
