import React, { useContext } from 'react'
import { use } from 'react'
// import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from './Context'

const PrivateDriverLogin = () => {
    // const userToken = useSelector(state=>state.userToken)
    const {driverToken}=useContext(Context)
  return (
        !driverToken?<Outlet/>:<Navigate to="/"/>
  )
}

export default PrivateDriverLogin