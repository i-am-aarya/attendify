import React, { useEffect, useState } from "react";
import "./DepartmentOptionPanel.css";
import DepartmentOption from "./DepartmentOption";
import { FilterData } from "../Sidebar";

const DepartmentOptionPanel = ({
  filter,
  setFilter,
}: {
  filter: FilterData;
  setFilter: React.Dispatch<React.SetStateAction<FilterData>>;
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const departmentNames = ["Software", "IT", "Computer", "Electrical", "Civil"];

  const handleDepartmentSelection = (departmentName: string) => {
    setSelectedDepartment(departmentName.toLowerCase())

    setFilter((prevFilter) => ({
        ...prevFilter,
        department: departmentName.toLowerCase()
    }))

  }

  return (
    <>
      <div className="expanded-option-panel">

        {
            departmentNames.map((departmentName, index) => (
                <DepartmentOption
                department={departmentName}
                filter={filter}
                setFilter={setFilter}
                isSelected={selectedDepartment === departmentName.toLowerCase()}
                handleDepartmentSelection={handleDepartmentSelection}
                key={index}
                />
            ))
        }

        {/* <DepartmentOption
          filter={filter}
          setFilter={setFilter}
          department="Software",
        />
        <DepartmentOption
          filter={filter}
          setFilter={setFilter}
          department="IT"
        />
        <DepartmentOption
          filter={filter}
          setFilter={setFilter}
          department="Computer"
        />
        <DepartmentOption
          filter={filter}
          setFilter={setFilter}
          department="Electrical"
        />
        <DepartmentOption
          filter={filter}
          setFilter={setFilter}
          department="Civil"
        /> */}
      </div>
    </>
  );
};

export default DepartmentOptionPanel;
