import React, { useContext } from 'react'
import { use } from 'react'
// import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from './Context'

const PrivateDriverSignup = () => {
    // const userToken = useSelector(state=>state.userToken)
    const {driverToken}=useContext(Context)
  return (
        <Outlet/>
  )
}

export default PrivateDriverSignup