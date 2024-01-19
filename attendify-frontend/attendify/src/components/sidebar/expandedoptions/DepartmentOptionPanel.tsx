import React, { useEffect, useState } from "react";
import "./DepartmentOptionPanel.css"
import DepartmentOption from "./DepartmentOption";
import { FilterData } from "../Sidebar";

const DepartmentOptionPanel = (
    {
        filter,
        setFilter
    }: {
        filter: FilterData,
        setFilter: React.Dispatch<React.SetStateAction<FilterData>>
    }
) => {
    
    return (
        <>
        <div className="expanded-option-panel">
            <DepartmentOption filter={filter} setFilter={setFilter} department="Software"/>
            <DepartmentOption filter={filter} setFilter={setFilter} department="IT"/>
            <DepartmentOption filter={filter} setFilter={setFilter} department="Computer"/>
            <DepartmentOption filter={filter} setFilter={setFilter} department="Electrical"/>
            <DepartmentOption filter={filter} setFilter={setFilter} department="Civil"/>
        </div>
        </>
    );
};

export default DepartmentOptionPanel