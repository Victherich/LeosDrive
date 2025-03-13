import React, { useContext } from 'react'
import { use } from 'react'
// import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from './Context'

const PrivateUserLogin = () => {
    // const userToken = useSelector(state=>state.userToken)
    const {userToken}=useContext(Context)
  return (
        <Outlet/>
  )
}

export default PrivateUserLogin