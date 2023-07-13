import Cookies from "universal-cookie/es6";
import NavbarAdmin from "../components/NavbarAdmin";
import ImportDataComponent from "../components/ImportData";
import { saveProfessor, saveUser } from "../services/professorService";
import { useEffect, useState } from "react";

const cookies = new Cookies();

const ImportData = () => {
  const [professorValues, setProfessorValues] = useState([]);

  const handleSubmit = (professorData) => {
    saveProfessor(professorData);
    saveUser(professorData);
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
      <br />
      <ImportDataComponent
        handleSubmit={handleSubmit}
        title="Importar Docentes"
        values={professorValues}
        setValues={setProfessorValues}
      />
    </>
  );
};
export default ImportData;
