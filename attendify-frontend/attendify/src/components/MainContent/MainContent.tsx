import React, { useEffect, useState } from "react";
import "./MainContent.css";
import StudentComponent from "../StudentComponent/StudentComponent";
import Sidebar from "../sidebar/Sidebar";
import NavBar from "../navbar/NavBar";
import { Student } from "../sidebar/Sidebar";

const MainContent = () => {

  const [studentsFound, setStudentsFound] = useState(false)
  const [studentsArray, setStudentsArray] = useState<Array<Student>>(Array)

  useEffect(() => {
    if (!(studentsArray.length === 0)) {
      setStudentsFound(true)
    } else {
      setStudentsFound(false)
    }
  }, [studentsArray])
  
  return (
    <>
      <div className="main-content">
        <NavBar />

        {/* contains sidebar and the students display area */}
        <div className="sidebar-students-display-area">
          <Sidebar studentsArray={studentsArray} setStudentsArray={setStudentsArray} />

          <div className="students-display-area">
          <div className="students-text-wrapper">Students</div>

            {studentsFound ? 

            studentsArray.map((student, index) => (
              <StudentComponent studentName={student.name} key={index} studentSymbolNo="696969" />
            ))
             : <div>No Students Found</div>}

          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
