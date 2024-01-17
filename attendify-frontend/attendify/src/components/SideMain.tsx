import React from "react";
import Sidebar from "./sidebar/Sidebar";
import MainComponent from "./maincomponent/MainComponent";


import "./SideMain.css"


const SideMain = () => {

    return (
      <>
        <div className="sidemain">
          <Sidebar/>
          <MainComponent/>
        </div>
      </>
    );

}

export default SideMain;