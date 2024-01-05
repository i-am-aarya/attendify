import React from "react";
import ExpandedOption from "./ExpandableOption";
import "./ExpandedOptionsPanel.css"

const ExpandedOptionPanel = () => {
    return (
        <>
        <div className="expanded-option-panel">
            <ExpandedOption semester="Software"/>
            <ExpandedOption semester="IT"/>
            <ExpandedOption semester="Computer"/>
            <ExpandedOption semester="Electrical"/>
            <ExpandedOption semester="Civil"/>
        </div>
        </>
    );
};

export default ExpandedOptionPanel