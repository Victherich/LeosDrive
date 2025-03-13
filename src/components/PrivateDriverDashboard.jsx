import React, { useContext } from 'react'
import { Context } from './Context'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateDriverDashboard = () => {
const {driverToken}=useContext(Context)

  return (
    driverToken?<Outlet/>:<Navigate to='/driverlogin'/>
  )
}

export default PrivateDriverDashboard
