import React, { useState, useEffect } from "react";
import "./DepartmentOption.css";
import SemesterSelectionPanel from "./SemesterSelectionPanel";
import { FilterData } from "../Sidebar";

/**
 * DepartmentOption is the individual option, collection of which
 * appears in the departmentSelectedOptionsPanel, which appears in
 * app sidebar
 */

const DepartmentOption = ({
  department,
  filter,
  setFilter
}: {
  department: string;
  filter: FilterData,
  setFilter: React.Dispatch<React.SetStateAction<FilterData>>
}) => {
  const [departmentSelected, setdepartmentSelected] = useState(false);

  function handleDepartmentClick() {
    setdepartmentSelected(!departmentSelected);
    setFilter((prevFilter) => ({...prevFilter, department: department.toLowerCase()}))

  }

  useEffect(() => {
    if (!departmentSelected) {
      setFilter((prevFilter) => ({...prevFilter, department: ''}))
    }
  }, [departmentSelected])

  return (
    <>
      <div className="expanded-option">
        <div
          className={
            departmentSelected
              ? "department-text-wrapper-expanded"
              : "department-text-wrapper"
          }
          onClick={handleDepartmentClick}
        >
          {department}
        </div>
        {departmentSelected && <SemesterSelectionPanel filter={filter} setFilter={setFilter} />}
      </div>
    </>
  );
};

export default DepartmentOption;
