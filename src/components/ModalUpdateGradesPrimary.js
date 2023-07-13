import { Modal, Box, TextField, Button } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalUpdateGradesPrimary = (props) => {
  const handleUpdate = props.handleUpdate;
  const modal = props.modal;
  const setModal = props.setModal;
  const gradesValues = props.gradesValues;
  const setGradesValues = props.setGradesValues;
  const studentsValues = props.studentsValues;

  const obtainNameStudent = (idStudent) => {
    for (var i = 0; i < studentsValues.length; i++) {
      if (studentsValues[i]._id === idStudent) {
        return studentsValues[i].name + " " + studentsValues[i].lastName;
      }
    }
  };

  const handleChangeGrades = (event) => {
    const { name, value } = event.target;
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const id = optionElement.getAttribute("id");
    const newGrades = [];

    for (var i = 0; i < gradesValues.length; i++) {
      if (gradesValues[i].idStudent === id) {
        const grade = {
          _id: gradesValues[i]._id,
          idStudent: gradesValues[i].idStudent,
          idProfessor: gradesValues[i].idProfessor,
          idSubject: gradesValues[i].idSubject,
          idCourse: gradesValues[i].idCourse,
          quimester: gradesValues[i].quimester,
          __v: gradesValues[i].__v,
          grades: [
            {
              ...gradesValues[i].grades[0],
              [name]: value,
            },
          ],
        };

        newGrades.push(grade);
      } else {
        newGrades.push(gradesValues[i]);
      }
    }

    setGradesValues(newGrades);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    handleUpdate();
    setModal(false);
  };

  return (
    <div className="container">
      <Modal open={modal}>
        <form id="submitGrades" onSubmit={handleEdit}>
          <Box sx={style} style={{ width: "70%" }}>
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
                  <td className="text-center">{obtainNameStudent(item.idStudent)}</td>
                  <td className="text-center">
                    <select
                      class="select"
                      name="lessons"
                      value={item.grades[0].lessons}
                      onChange={handleChangeGrades}
                      label="Lecciones"
                    >
                      <option disabled selected>
                        Seleccione una calificación{" "}
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
                      value={item.grades[0].participations}
                      label="Participaciones"
                      onChange={handleChangeGrades}
                    >
                      <option disabled selected>
                        Seleccione una calificación{" "}
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
                      value={item.grades[0].homeworks}
                      label="Deberes"
                      onChange={handleChangeGrades}
                    >
                      <option disabled selected>
                        Seleccione una calificación{" "}
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
                      value={item.grades[0].project}
                      label="Proyecto"
                      onChange={handleChangeGrades}
                    >
                      <option disabled selected>
                        Seleccione una calificación{" "}
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
                      value={item.grades[0].exam}
                      label="Examen"
                      onChange={handleChangeGrades}
                    >
                      <option disabled selected>
                        Seleccione una calificación{" "}
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
              onClick={handleEdit}
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
            <Button
              variant="contained"
              size="large"
              onClick={() => setModal(false)}
              sx={{
                boxShadow: "1px 1px 5px #333",
                background: "linear-gradient(to right, #0069c0, #0069c0)",
                width: "30%",
                marginLeft: "35%",
              }}
            >
              Cancelar
            </Button>
            <br />
            <br />
          </Box>
        </form>
      </Modal>
    </div>
  );
};
export default ModalUpdateGradesPrimary;
