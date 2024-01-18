import { useEffect, useState } from "react";
import "./DropdownMenu.css"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'

interface Teacher {
  exp: BigInteger
  emailID: string
}

const DropdownMenu = () => {
  const navigate = useNavigate()

  const [teacherName, setTeacherName] = useState("")
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<Teacher>(token)
      // setTeacherName(decoded['emailID'])
      setTeacherName(decoded.emailID)

      console.log(decoded)
    }

  })

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/')
    setTeacherName("")
  }

  return (
    <div className="dropdown">
        <div className="dropdown-teacher-name">
          {teacherName}
        </div>
        <button className="dropdown-log-out" onClick={handleLogout}>
          Log Out
        </button>
      </div>
  )
};

export default DropdownMenu;
