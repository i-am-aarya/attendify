import React, { useState } from "react";
import "./DepartmentOption.css";
import SemesterSelectionPanel from "./SemesterSelectionPanel";

/**
 * DepartmentOption is the individual option, collection of which
 * appears in the ExpandedOptionsPanel, which appears in
 * app sidebar
 */

const DepartmentOption = ({ department }: { department: string }) => {
  const [expanded, setExpaneded] = useState(false);

  function handleDepartmentClick() {
    setExpaneded(!expanded);
  }

  return (
    <>
      <div className="expanded-option">
        <div className={expanded ? "department-text-wrapper-expanded" : "department-text-wrapper"} onClick={handleDepartmentClick}>
            {department}
        </div>
        {
            expanded && <SemesterSelectionPanel/>
        }
      </div>
    </>
  );
};

export default DepartmentOption;
