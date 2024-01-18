import React from "react";
import "./ExpandedOptionsPanel.css"
import DepartmentOption from "./DepartmentOption";

const DepartmentOptionPanel = () => {
    return (
        <>
        <div className="expanded-option-panel">
            <DepartmentOption department="Software"/>
            <hr className="department-divider" />
            <DepartmentOption department="IT"/>
            <hr className="department-divider" />
            <DepartmentOption department="Computer"/>
            <hr className="department-divider" />
            <DepartmentOption department="Electrical"/>
            <hr className="department-divider" />
            <DepartmentOption department="Civil"/>
        </div>
        </>
    );
};

export default DepartmentOptionPanel