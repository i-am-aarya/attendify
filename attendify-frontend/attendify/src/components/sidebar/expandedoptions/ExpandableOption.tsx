import React from "react";

/**
 * ExpandedOption is the individual option, collection of which
 * appears in the ExpandedOptionsPanel, which appears in
 * app sidebar
 */

function doSth() {
    console.log("Print")
}

const ExpandedOption = ({semester}: {semester: string}) => {
    return (
        <>
        <div className="expanded-option" onClick={doSth}>
            {semester}
        </div>
        </>
    );
};

export default ExpandedOption;