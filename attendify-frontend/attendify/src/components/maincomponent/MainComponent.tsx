import React, { useState } from "react";
import "./MainComponent.css";

const MainContent = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div className="main-content">
                <div className="students-text-wrapper">Students</div>

                <div className="students-display-area">
                    <div className="students-box" onClick={handleCheckboxToggle}>
                        <div className="students-details">
                            <p>
                                <span className="student-name">Ram Khatri</span>
                                <span className="vertical-line"></span>
                                <span className="symbol-text">Symbol No. : </span>
                                <span className="symbol-no">2111455</span>
                            </p>
                        </div>
                        <input type="checkbox" checked={isChecked} onChange={() => {}} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainContent;
