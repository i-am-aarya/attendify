import React from "react";
import "./ExpandedOptionsPanel.css"
import DepartmentOption from "./DepartmentOption";

const DepartmentOptionPanel = () => {
    return (
        <>
        <div className="expanded-option-panel">
            <DepartmentOption department="Software"/>
            <DepartmentOption department="IT"/>
            <DepartmentOption department="Computer"/>
            <DepartmentOption department="Electrical"/>
            <DepartmentOption department="Civil"/>
        </div>
        </>
    );
};

export default DepartmentOptionPanel