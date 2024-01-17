import React, { useState } from "react";
import "./StudentComponent.css";

const StudentComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="students-box" onClick={handleCheckboxToggle}>
        <div className="students-details">
          <p>
            <span className="student-name">Ram Khatri</span>
            <span className="vertical-line"></span>
            <span className="symbol-text">Symbol No. : </span>
            <span className="symbol-no">2111455</span>
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
