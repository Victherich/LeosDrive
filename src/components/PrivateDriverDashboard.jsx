import React, { useContext } from 'react'
import { Context } from './Context'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateDriverDashboard = () => {
const driverToken=useSelector(state=>state.driverToken)



  return (
    driverToken?<Outlet/>:<Navigate to='/driverlogin'/>
  )
}

export default PrivateDriverDashboard
