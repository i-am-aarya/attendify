import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect } from 'react'
// import {useNavigate} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
    children: React.ReactNode
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({children}) => {
    const navigate = useNavigate()

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
    const checkAuth = async() => {
        try {
            if (token) {
                const decodedToken = jwtDecode(token)

                if (decodedToken && decodedToken.exp !== undefined && decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('adminToken')
                    navigate('/')
                } else {

                    await axios.get('http://localhost:8080/api/admin/protected-resource', {
                        headers : {
                            Authorization: `Bearer ${token}`
                        }
                    })
                }
            }
        } catch (error) {
            console.error("Error while checking authentication: ", error)
            // navigate('/')
        }
    }

        checkAuth()
    }, [navigate, token])

  return (
    <>
        {children}
    </>
  )
}

export default ProtectedRoutes