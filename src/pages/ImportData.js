import Cookies from "universal-cookie/es6";
import NavbarAdmin from "../components/NavbarAdmin";
import ImportDataComponent from "../components/ImportData";
import { saveSubject } from "../services/subjectService";
import { saveCourse } from "../services/courseService";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const cookies = new Cookies();

const ImportData = () => {
  const [courseValues, setCourseValues] = useState([]);

  const [subjectValues, setSubjectValues] = useState([]);

  const handleSubmitSubject = (subjectData) => {
    saveSubject(subjectData);
  };

  const handleSubmitCourse = (courseData) => {
    saveCourse(courseData);
  };

  useEffect(() => {
    if (
      typeof cookies.get("user") === "undefined" ||
      cookies.get("type", { path: "/" }) !== "0"
    ) {
      window.location.href = "./";
    }
  });

  return (
    <>
      <NavbarAdmin />
      <Box sx={{ width: "100%", marginLeft: "15%" }}>
        <Grid container>
          <Grid item xs={4}>
            <ImportDataComponent
              handleSubmit={handleSubmitCourse}
              title="Importar Cursos"
              values={courseValues}
              setValues={setCourseValues}
            />
          </Grid>
          <Grid item xs={4}>
            <ImportDataComponent
              handleSubmit={handleSubmitSubject}
              title="Importar Asignaturas"
              values={subjectValues}
              setValues={setSubjectValues}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default ImportData;
