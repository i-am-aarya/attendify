import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: React.ReactNode
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({children}) => {

    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    const checkAuth = async () => {
        try {
            if (token) {
                const decodedToken = jwtDecode(token)

                if (decodedToken && decodedToken.exp !== undefined && decodedToken.exp * 1000 < Date.now()) {

                    localStorage.removeItem('token')
                    navigate('/')

                } else {
                    await axios.get('http://localhost:8080/api/protected-resource', {
                        headers : {
                            Authorization: `Bearer ${token}`
                        }
                    })
                }
            }
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {

        checkAuth()
    }, [navigate, token])

  return (
    <div>
        {token && children}
    </div>
  )
}

export default ProtectedRoutes
