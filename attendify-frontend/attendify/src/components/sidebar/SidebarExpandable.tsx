import React, {useState} from "react";
import "./SidebarExpandable.css";

function doSth() {}

const SidebarExpandable = ({text}: { text: string }) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandableClick = () => {
    setExpanded(!expanded)
  }


  return (
    <>
      <div className="sidebar-selector">
        <ul className="sidebar-list">
          <li className="selector-text">{text}</li>

          <li>
            <svg className="dropdown-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24">
              <path
                d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
                fill="#ffffff"/>
            </svg>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarExpandable;
