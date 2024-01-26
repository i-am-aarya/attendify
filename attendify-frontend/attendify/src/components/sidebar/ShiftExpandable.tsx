import React, { useEffect, useState } from "react";
import "./ShiftExpandable.css";
import DepartmentOptionPanel from "./expandedoptions/DepartmentOptionPanel";
import { FilterData } from "./Sidebar";

const ShiftExpandable = ({
  shiftName,
  filter,
  setFilter,
  isSelected,
  handleShiftSelection
}: {
  shiftName: string,
  filter: FilterData,
  setFilter: React.Dispatch<React.SetStateAction<FilterData>>
  isSelected: boolean,
  handleShiftSelection: (shiftName: string) => void
}) => {

  return (
    <>
      <div
        className={
          isSelected ? "sidebar-expandable-expanded" : "sidebar-expandable"
        }
      >
        <div className="shift-text-wrapper" onClick={() => {handleShiftSelection(shiftName)}}>
          <ul>
            <li>{shiftName}</li>
            {isSelected ? (
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
        {isSelected ? <DepartmentOptionPanel filter={filter} setFilter={setFilter} /> : null}
      </div>
    </>
  );
};

export default ShiftExpandable;
