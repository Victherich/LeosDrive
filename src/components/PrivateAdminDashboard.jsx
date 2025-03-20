import React, { useContext } from 'react'
import { Context } from './Context'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateAdminDashboard = () => {

const adminToken = useSelector(state=>state.adminToken)


  return (
    adminToken?<Outlet/>:<Navigate to='/adminlogin'/>
  )
}

export default PrivateAdminDashboard
