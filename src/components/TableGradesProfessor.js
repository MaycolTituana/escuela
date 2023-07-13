import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

const TableGradesProfessor = (props) => {
  const gradesValues = props.gradesValues;
  const coursesValues = props.coursesValues;
  const subjectsValues = props.subjectsValues;
  const studentsValues = props.studentsValues;
  const values = props.values;
  const setValues = props.setValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const obtainNameStudent = (idStudent) => {
    for (var i = 0; i < studentsValues.length; i++) {
      if (studentsValues[i]._id === idStudent) {
        return studentsValues[i].name + " " + studentsValues[i].lastName;
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
            {" "}
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
            <th className="text-center">Promedio</th>
          </tr>

          {gradesValues.map((item) => (
            <tr>
              <td className="text-center">
                {obtainNameStudent(item.idStudent)}
              </td>
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
export default TableGradesProfessor;
