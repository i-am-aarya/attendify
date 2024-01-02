import "./NavBar.css"
// import {ReactComponent as AttendifyLogo} from "../assets/Logo.svg"
import DropdownMenu from "../dropdown/DropdownMenu";

function NavBar() {
    return (
      <>
        <nav>
          <div className="project-title">
            Attendify
          </div>

          <div>
            <ul id="navbar">
              <li><DropdownMenu/></li>
            </ul>




          </div>
        </nav>
      </>
    );
}

export default NavBar;