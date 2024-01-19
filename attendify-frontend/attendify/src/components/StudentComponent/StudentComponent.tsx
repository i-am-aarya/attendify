import React, { useState } from "react";
import "./StudentComponent.css";

const StudentComponent = ({studentName, studentSymbolNo} : {studentName: string, studentSymbolNo: string}) => {
  const [isChecked, setIsChecked] = useState(false);

  // const [studentName, setStudentName] = useState("")
  // const [studentSymbolNo, setStudentSymbolNo] = useState("")

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="students-box" onClick={handleCheckboxToggle}>
        <div className="students-details">
          <p>
            <span className="student-name">{studentName}</span>
            <span className="vertical-line"></span>
            <span className="symbol-text">Symbol No. : </span>
            <span className="symbol-no">{studentSymbolNo}</span>
          </p>
        </div>
        <div className="attendance-checkbox">
        <input type="checkbox" checked={isChecked} onChange={() => {}} />

        </div>
      </div>
    </>
  );
};

export default StudentComponent;
