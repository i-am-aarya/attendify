import React, { useEffect, useState } from "react";
import "./StudentComponent.css";
import { Student } from "../sidebar/Sidebar";
import { StudentAttendance } from "../MainContent/MainContent";

const StudentComponent = ({
  studentDetails,
  studentAttendance,
  onCheckboxToggle
}: {
  studentDetails: Student,
  studentAttendance: StudentAttendance,
  onCheckboxToggle: () => void
}) => {

  return (
    <>
      <div className="students-box" onClick={onCheckboxToggle}>
        <div className="students-details">
          <p>
            <span className="student-name">{studentDetails.name}</span>
            <span className="vertical-line"></span>
            <span className="symbol-text">Symbol No. : </span>
            <span className="symbol-no">{studentDetails.symbolNumber}</span>
          </p>
        </div>
        <div className="attendance-checkbox">
          <input type="checkbox" checked={studentAttendance.attendance} onChange={() => {}} />
        </div>
      </div>
    </>
  );
};

export default StudentComponent;
