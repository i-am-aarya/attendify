import React, { useEffect, useState } from "react";
import "./ShiftExpandable.css";
import DepartmentOptionPanel from "./expandedoptions/DepartmentOptionPanel";
import { FilterData } from "./Sidebar";

const ShiftExpandable = ({
  shiftName,
  filter,
  setFilter
}: {
  shiftName: string,
  filter: FilterData,
  setFilter: React.Dispatch<React.SetStateAction<FilterData>>
}) => {

  const [shiftSelected, setshiftSelected] = useState(false);

  const handleShiftSelection = () => {
    setshiftSelected(!shiftSelected);

    setFilter((prevFilter) => ({...prevFilter, shift: shiftName.toLowerCase()}))

  };

  useEffect(() => {
    if (!shiftSelected) {
    setFilter((prevFilter) => ({...prevFilter, shift: ''}))
    }

  }, [shiftSelected])


  return (
    <>
      <div
        className={
          shiftSelected ? "sidebar-expandable-expanded" : "sidebar-expandable"
        }
      >
        <div className="shift-text-wrapper" onClick={handleShiftSelection}>
          <ul>
            <li>{shiftName}</li>
            {shiftSelected ? (
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"
                    fill="#FFFFFFFF"
                  />
                </svg>
              </li>
            ) : (
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
                    fill="#FFFFFFFF"
                  />
                </svg>
              </li>
            )}
          </ul>
        </div>
        {shiftSelected ? <DepartmentOptionPanel filter={filter} setFilter={setFilter} /> : null}
      </div>
    </>
  );
};

export default ShiftExpandable;
