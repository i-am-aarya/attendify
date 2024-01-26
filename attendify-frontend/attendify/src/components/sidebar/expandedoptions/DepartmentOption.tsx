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
  setFilter,
  isSelected,
  handleDepartmentSelection
}: {
  department: string;
  filter: FilterData,
  setFilter: React.Dispatch<React.SetStateAction<FilterData>>
  isSelected: boolean,
  handleDepartmentSelection: (departmentName: string) => void
}) => {

  return (
    <>
      <div className="expanded-option">
        <div
          className={
            isSelected
              ? "department-text-wrapper-expanded"
              : "department-text-wrapper"
          }
          onClick={() => {handleDepartmentSelection(department)}}
        >
          {department}
        </div>
        {isSelected && <SemesterSelectionPanel filter={filter} setFilter={setFilter} />}
      </div>
    </>
  );
};

export default DepartmentOption;
