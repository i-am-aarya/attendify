import React from "react";
import "./Sidebar.css"
import SidebarExpandable from "./SidebarExpandable";

const Sidebar = () => {

    return (
        <>

        <div className="sidebar">
        
            <h1>Class</h1>
            
            <SidebarExpandable text="Morning"/>

            <SidebarExpandable text="Day"/>

        </div>
        </>
    );
};

export default Sidebar;