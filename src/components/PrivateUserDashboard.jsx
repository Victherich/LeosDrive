import React, { useContext } from 'react'
import { Context } from './Context'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateUserDashboard = () => {
const {userToken}=useContext(Context)

  return (
    userToken?<Outlet/>:<Navigate to='/userlogin'/>
  )
}

export default PrivateUserDashboard
