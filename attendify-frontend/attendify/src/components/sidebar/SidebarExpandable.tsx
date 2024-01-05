import React, { useState } from "react";
import "./SidebarExpandable.css";
import ExpandedOptionsPanel from "./expandedoptions/ExpandedOptionsPanel";


const SidebarExpandable = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandableClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div
        className={
          expanded ? "sidebar-expandable-expanded" : "sidebar-expandable"
        }
        onClick={handleExpandableClick}
      >
        {
          expanded ? (


            <div className="expandable-content">
            
              <ul className="sidebar-list">
                <li className="selector-text">{text}</li>
                <li>

                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z" fill="#FFFFFFFF"/></svg>

                </li>
              </ul>


              <ExpandedOptionsPanel/>

            </div>


          ) : (
            // display Semesters
            <ul className="sidebar-list">
              <li className="selector-text">{text}</li>
              <li>
                <svg
                  className="dropdown-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
                    fill="#FFFFFF80"
                  />
                </svg>
              </li>
            </ul>
          )
          // display shift name
        }
      </div>
    </>
  );
};

export default SidebarExpandable;
