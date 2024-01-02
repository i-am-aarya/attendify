import "./DropdownMenu.css"
import React, { useState } from "react";

// const DropdownMenu = () => {
function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div onClick={toggleMenu} className="dropdown-toggle">
        
        <div className="dropdown-teacher-name">
          Teacher's Name
        </div>

        <div className="dropdown-icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" fill="#ffffff"/></svg>
        </div>

      </div>
      {
        isOpen && (
            <ul className="dropdown-menu">
                <li>Log Out</li>
            </ul>
        )
      }
      {isOpen && <div onClick={closeMenu} className="dropdown-backdrop"></div>}
    </div>
  );
};

export default DropdownMenu;