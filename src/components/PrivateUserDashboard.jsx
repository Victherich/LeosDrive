import React, { useContext } from 'react'
import { Context } from './Context'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateUserDashboard = () => {
const userToken = useSelector(state=>state.userToken)


  return (
    userToken?<Outlet/>:<Navigate to='/userlogin'/>
  )
}

export default PrivateUserDashboard
