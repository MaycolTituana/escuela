import React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
} from "@mui/material";

const FormAssignationStudentToCourse = (props) => {
  const handleUpdate = props.handleUpdate;
  const students = props.students;
  const courses = props.courses;
  const student = props.student;
  const setStudent = props.setStudent;
  const setId = props.setId;

  const handleChangeId = (event) => {
    const { value } = event.target;
    console.log(value);
    setId(value);
  };

  const handleChangeStudent = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleUpdateInternal = (e) => {
    e.preventDefault();
    handleUpdate(student, setStudent);
  };

  return (
    <>
      <form onSubmit={handleUpdateInternal}>
        <Box sx={{ width: "100%" }}>
          <div className="mt-4 container row row-cols-2">
            <div className="col container mt-4">
              <Grid>
                <Card
                  sx={{
                    borderRadius: "20px",
                    width: "100%",
                    p: 3,
                    boxShadow: "1px 1px 5px #333",
                  }}
                >
                  <Typography variant="h4" gutterBottom component="div">
                    Alumnos
                  </Typography>
                  <br />
                  <br />

                  <FormControl fullWidth>
                    <InputLabel id="labelStudents">Alumnos</InputLabel>
                    <Select
                      fullWidth
                      labelId="labelStudents"
                      name="idStudent"
                      id="idStudent"
                      label="Estudiante"
                      onChange={handleChangeId}
                    >
                      <MenuItem disabled selected>
                        Seleccione un Alumno
                      </MenuItem>
                      {students.map((item) => (
                        <MenuItem value={item._id}>
                          {item.name} {item.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Card>
              </Grid>
            </div>
            <div className="col container mt-4">
              <Grid>
                <Card
                  sx={{
                    borderRadius: "20px",
                    width: "100%",
                    p: 3,
                    boxShadow: "1px 1px 5px #333",
                  }}
                >
                  <Typography variant="h4" gutterBottom component="div">
                    Cursos
                  </Typography>
                  <br />
                  <br />
                  <FormControl fullWidth>
                    <InputLabel id="labelCourses">Cursos</InputLabel>
                    <Select
                      fullWidth
                      labelId="labelCourses"
                      name="idCourse"
                      id="idCourse"
                      label="Curso"
                      onChange={handleChangeStudent}
                    >
                      <MenuItem disabled selected>
                        Seleccione un Curso
                      </MenuItem>
                      {courses.map((item) => (
                        <MenuItem value={item._id}>
                          {item.number} {item.parallel}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Card>
              </Grid>
            </div>
          </div>
        </Box>
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{
            boxShadow: "1px 1px 5px #333",
            background: "linear-gradient(to right, #0069c0, #0069c0)",
            width: "15%",
          }}
        >
          Asignar
        </Button>
        <br />
      </form>
    </>
  );
};
export default FormAssignationStudentToCourse;
