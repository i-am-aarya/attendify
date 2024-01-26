import React, { useEffect, useState } from "react";
import SemesterOption from "./SemesterOption";
import { FilterData } from "../Sidebar";

const SemesterSelectionPanel = ({
  filter,
  setFilter,
}: {
  filter: FilterData;
  setFilter: React.Dispatch<React.SetStateAction<FilterData>>;
}) => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]
  const semesterNames = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"]

  const handleSemesterSelection = (semesterText: string) => {
    setSelectedSemester(semesterText.toLowerCase());

    setFilter((prevFilter) => ({
      ...prevFilter,
      semester: semesterText.toLowerCase(),
    }));
  };

  return (
    <div className="semester-selection-panel">
      {
        semesterNames.map((semesterName, index) => (
          <SemesterOption
          semester={semesters[index]}
          semesterText={semesterName}
          isSelected = {selectedSemester === semesterName.toLowerCase()}
          onSelect={handleSemesterSelection}
          key={index}
          />
        ))
      }
    </div>
  );
};

export default SemesterSelectionPanel;
