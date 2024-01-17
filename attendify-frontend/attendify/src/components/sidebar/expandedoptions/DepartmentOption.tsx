import React from "react";

/**
 * DepartmentOption is the individual option, collection of which
 * appears in the DepartmentOptionsPanel, which appears in
 * app sidebar
 */

function doSth() {
    console.log("Print")
}

const DepartmentOption = ({semester}: {semester: string}) => {
    return (
        <>
        <div className="expanded-option" onClick={doSth}>
            {semester}
        </div>
        </>
    );
};

export default DepartmentOption;