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

const FormAssignationSubjectToProfessor = (props) => {
  const handleUpdate = props.handleUpdate;
  const professors = props.professors;
  const subjects = props.subjects;
  const professor = props.professor;
  const setProfessor = props.setProfessor;
  const setId = props.setId;

  const handleChangeId = (event) => {
    const { value } = event.target;
    console.log(value);
    setId(value);
  };

  const handleChangeProfessor = (event) => {
    const { name, value } = event.target;
    setProfessor({ ...professor, [name]: value });
  };

  const handleUpdateInternal = (e) => {
    e.preventDefault();
    handleUpdate(professor, setProfessor);
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
                    Docentes
                  </Typography>
                  <br />
                  <br />
                  <FormControl fullWidth>
                    <InputLabel id="labelProfessors">Docentes</InputLabel>
                    <Select
                      fullWidth
                      labelId="labelProfessors"
                      name="idProfessor"
                      id="idProfessor"
                      label="Docente"
                      onChange={handleChangeId}
                    >
                      <MenuItem disabled selected>
                        Seleccione un Docente
                      </MenuItem>
                      {professors.map((item) => (
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
                    Asignaturas
                  </Typography>
                  <br />
                  <br />

                  <FormControl fullWidth>
                    <InputLabel id="labelSubjects">Asignaturas</InputLabel>
                    <Select
                      fullWidth
                      labelId="labelSubjects"
                      name="idSubject"
                      id="idSubject"
                      label="Docente"
                      onChange={handleChangeProfessor}
                    >
                      <MenuItem disabled selected>
                        Seleccione una Asignatura
                      </MenuItem>
                      {subjects.map((item) => (
                        <MenuItem value={item._id}>{item.name}</MenuItem>
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
export default FormAssignationSubjectToProfessor;
