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
      >
        <div className="shift-text-wrapper" onClick={handleExpandableClick}>
          <ul>
            <li>{text}</li>
            {expanded ? (
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
              <li><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" fill="#FFFFFFFF"/></svg>
              </li>
            )}
          </ul>
        </div>
        {expanded ? <ExpandedOptionsPanel /> : null}
      </div>
    </>
  );
};

export default SidebarExpandable;
