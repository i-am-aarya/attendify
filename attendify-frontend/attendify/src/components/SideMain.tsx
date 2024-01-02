import React from "react";
import Sidebar from "./sidebar/Sidebar";
import MainContent from "./maincontent/MainContent";

import "./SideMain.css"


const SideMain = () => {

    return (
      <>
        <div className="sidemain">
          <Sidebar/>
          <MainContent/>
        </div>
      </>
    );

}

export default SideMain;