import React from "react";
import "./ExpandedOptionsPanel.css"
import DepartmentOption from "./DepartmentOption";

const DepartmentOptionPanel = () => {
    return (
        <>
        <div className="expanded-option-panel">
            <DepartmentOption semester="Software"/>
            <DepartmentOption semester="IT"/>
            <DepartmentOption semester="Computer"/>
            <DepartmentOption semester="Electrical"/>
            <DepartmentOption semester="Civil"/>
        </div>
        </>
    );
};

export default DepartmentOptionPanel