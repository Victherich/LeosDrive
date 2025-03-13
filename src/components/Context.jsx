import React, { useState } from 'react'
import { createContext } from 'react'

export const Context = createContext()

const ContextProvider = ({children}) => {
 const [userToken,setUserToken]=useState(true)
 const [driverToken,setDriverToken]=useState(true)

  return (
    <Context.Provider value={{userToken, driverToken}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider
