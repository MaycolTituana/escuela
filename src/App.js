import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomeScreenAdmin from './pages/HomeScreenAdmin';
import HomeScreenProfessor from './pages/HomeScreenProfessor';
import HomeScreenStudent from './pages/HomeScreenStudent';
import ImportData from './pages/ImportData';
import ImportProfessors from './pages/ImportProfessors';
import RegisterStudent from './pages/RegisterStudent'
import RegisterPeriod from './pages/CreatePeriod'
import AssignationCourseToSchoolYear from './pages/AssignationCourseToSchoolYear';
import AssignationSubjectoToProfessor from './pages/AssignationSubjectToProfessor';
import AssignationCourseToProfessor from './pages/AssignationCourseToProfessor';
import AssignationStudentToCourse from './pages/AssignationStudentToCourse';
import InsertGrades from './pages/InsertGrades';
import SeeGradesProfessor from './pages/SeeGradesProfessor';
import SeeGradesStudent from './pages/SeeGradesStudent';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeScreenAdmin" element={<HomeScreenAdmin />} />
        <Route path="/homeScreenProfessor" element={<HomeScreenProfessor />} />
        <Route path="/homeScreenStudent" element={<HomeScreenStudent />} />
        <Route path="/importData" element={<ImportData />} />
        <Route path="/importProfessors" element={<ImportProfessors />} />
        <Route path="/createStudent" element={<RegisterStudent/>}/>
        <Route path="/createSchoolYear" element={<RegisterPeriod/>}/>
        <Route path="/coursesToSchoolYear" element={<AssignationCourseToSchoolYear/>}/>
        <Route path="/subjectToProfessor" element={<AssignationSubjectoToProfessor/>}/>
        <Route path="/courseToProfessor" element={<AssignationCourseToProfessor/>}/>
        <Route path="/studentToCourse" element={<AssignationStudentToCourse/>}/>
        <Route path="/registerGrades" element={<InsertGrades/>}/>
        <Route path="/seeGradesProfessor" element={<SeeGradesProfessor />}/>
        <Route path="/seeGradesStudent" element={<SeeGradesStudent />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
