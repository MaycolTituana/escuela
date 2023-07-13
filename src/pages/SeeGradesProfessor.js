import Cookies from "universal-cookie/es6";
import NavbarProfessor from "../components/NavbarProfessor";
import TableGradesProfessor from "../components/TableGradesProfessor";
import TableGradesProfessorPrimary from "../components/TableGradesProfessorPrimary";
import SchoolYear from "../components/SchoolYear";
import ModalUpdateGrades from "../components/ModalUpdateGrades";
import ModalUpdateGradesPrimary from "../components/ModalUpdateGradesPrimary";
import { getProfessorByUsername } from "../services/professorService";
import { getCourseById } from "../services/courseService";
import {
  getSubjectsByTypeAndLevel,
  getSubjectById,
} from "../services/subjectService";
import { getStudentsByCourse } from "../services/studentService";
import {
  getGradesByCourseSubjectAndQuimester,
  getSubjectsWithoutGrades,
  updateGrades,
} from "../services/gradesService";
import { getActualSchoolYear } from "../services/periodService";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const cookies = new Cookies();

const SeeGradesProfessor = () => {
  const [gradesValues, setGradesValues] = useState([]);
  const [professorValues, setProfessorValues] = useState({
    _id: "",
    name: "",
    lastName: "",
    bornYear: "",
    idCarad: "",
    specialization: "",
    level: "",
    disponibility: "",
    email: cookies.get("email", { path: "/" }),
    user: cookies.get("user", { path: "/" }),
    password: cookies.get("password", { path: "/" }),
    idSubject: "",
    idCourse: [],
  });
  const [coursesValues, setCoursesValues] = useState([]);
  const [subjectsValues, setSubjectsValues] = useState([]);
  const [studentsValues, setStudentsValues] = useState([]);

  const [values, setValues] = useState({
    idSubject: "",
    idCourse: "",
    quimester: 0,
  });

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const handleUpdate = () => {
    for (var i = 0; i < gradesValues.length; i++) {
      const gradeInformation = {
        grades: gradesValues[i].grades,
        idStudent: gradesValues[i].idStudent,
        idProfessor: gradesValues[i].idProfessor,
        idSubject: gradesValues[i].idSubject,
        idCourse: gradesValues[i].idCourse,
        quimester: gradesValues[i].quimester,
      };

      updateGrades(gradeInformation, setGradesValues, gradesValues[i]._id);
    }
    window.alert("Calificaciones actualizadas");
  };

  useEffect(() => {
    async function loadProfessor() {
      const response = await getProfessorByUsername(professorValues.user);

      if (response.status === 200) {
        setProfessorValues(response.data[0]);
      }
    }

    loadProfessor();
  }, []);

  useEffect(() => {
    async function loadCourses() {
      var courses = [];

      for (var i = 0; i < professorValues.idCourse.length; i++) {
        const response = await getCourseById(professorValues.idCourse[i]);
        const response2 = await getActualSchoolYear();

        if (response.status === 200) {
          if (response.data.idSchoolYear === response2.data[0]._id) {
            courses.push(response.data);
          }
        }
      }

      setCoursesValues(courses);
    }

    loadCourses();
  }, [values.quimester]);

  useEffect(() => {
    async function loadSubjects() {
      if (professorValues.idSubject == "") {
        const response = await getSubjectsByTypeAndLevel(
          0,
          professorValues.level
        );

        if (response.status === 200) {
          const data = response.data;
          var subjects = [];

          for (var i = 0; i < data.length; i++) {
            const auxBool = await getSubjectsWithoutGrades(
              data[i]._id,
              values.idCourse,
              values.quimester
            );
            if (auxBool === true) {
              subjects.push(data[i]);
            }
          }

          setSubjectsValues(subjects);
        }
      } else if (professorValues.idSubject != "") {
        const response = await getSubjectById(professorValues.idSubject);

        if (response.status === 200) {
          const data = response.data;
          var subjects = [];

          for (var i = 0; i < data.length; i++) {
            const auxBool = await getSubjectsWithoutGrades(
              data[i]._id,
              values.idCourse,
              values.quimester
            );
            if (auxBool === true) {
              subjects.push(data[i]);
            }
          }

          setSubjectsValues(subjects);
        }
      }
    }

    loadSubjects();
  }, [values.idCourse, values.quimester]);

  useEffect(() => {
    async function loadStudents() {
      const response = await getStudentsByCourse(values.idCourse);

      if (response.status === 200) {
        setStudentsValues(response.data);
      }
    }

    loadStudents();
  }, [values.idCourse]);

  useEffect(() => {
    async function loadGrades() {
      const response = await getGradesByCourseSubjectAndQuimester(values);

      if (response.status === 200) {
        setGradesValues(response.data);
      }
    }

    loadGrades();
  }, [values]);

  useEffect(() => {
    if (
      typeof cookies.get("user") === "undefined" ||
      cookies.get("type", { path: "/" }) !== "2"
    ) {
      window.location.href = "./";
    }
  });

  const tableGradesEGB = () => {
    return (
      <TableGradesProfessor
        gradesValues={gradesValues}
        coursesValues={coursesValues}
        subjectsValues={subjectsValues}
        studentsValues={studentsValues}
        values={values}
        setValues={setValues}
      />
    );
  };

  const tableGradesPrimary = () => {
    return (
      <TableGradesProfessorPrimary
        gradesValues={gradesValues}
        coursesValues={coursesValues}
        subjectsValues={subjectsValues}
        studentsValues={studentsValues}
        values={values}
        setValues={setValues}
      />
    );
  };

  const modalUpdateGradesEGB = () => {
    return (
      <ModalUpdateGrades
        handleUpdate={handleUpdate}
        modal={modal}
        setModal={setModal}
        gradesValues={gradesValues}
        setGradesValues={setGradesValues}
        studentsValues={studentsValues}
      />
    );
  };

  const modalUpdateGradesPrimary = () => {
    return (
      <ModalUpdateGradesPrimary
        handleUpdate={handleUpdate}
        modal={modal}
        setModal={setModal}
        gradesValues={gradesValues}
        setGradesValues={setGradesValues}
        studentsValues={studentsValues}
      />
    );
  };

  return (
    <div className="container">
      <NavbarProfessor />
      <br />
      <SchoolYear />
      {professorValues.level === "EGB"
        ? tableGradesEGB()
        : tableGradesPrimary()}

      <br />
      <Button
        variant="contained"
        size="large"
        onClick={openModal}
        sx={{
          boxShadow: "1px 1px 5px #333",
          background: "linear-gradient(to right, #0069c0, #0069c0)",
          width: "30%",
          marginLeft: "35%",
        }}
      >
        Editar
      </Button>
      <br />

      {professorValues.level === "EGB"
        ? modalUpdateGradesEGB()
        : modalUpdateGradesPrimary()}
    </div>
  );
};
export default SeeGradesProfessor;
