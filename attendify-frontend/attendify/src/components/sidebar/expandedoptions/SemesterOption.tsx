import React, { useEffect, useState } from "react";
import "./SemesterOption.css";
import { FilterData } from "../Sidebar";



const SemesterOption = ({
  semester,
  semesterText,
  filter,
  setFilter
}: {
  semester: string,  
  semesterText: string
  filter: FilterData,
  setFilter: React.Dispatch<React.SetStateAction<FilterData>>
}) => {
  const [semesterSelected, setSemesterSelected] = useState(false);

  function handleSelection() {
    setSemesterSelected(!semesterSelected);
    setFilter((prevFilter) => ({...prevFilter, semester: semesterText.toLowerCase()}))
  }

  useEffect(() => {
    if (!semesterSelected) {
      setFilter((prevFilter) => ({...prevFilter, semester: ''}))
    }

  }, [semesterSelected])

  return (
    <div
      className={semesterSelected ? "semester-option-selected" : "semester-option"}
      onClick={handleSelection}
    >
      {semester}
    </div>
  );
};

export default SemesterOption;
