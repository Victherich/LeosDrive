import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const Context = createContext()

const ContextProvider = ({children}) => {
 const [userToken,setUserToken]=useState(true)
 const [driverToken,setDriverToken]=useState(false)
 const [adminToken, setAdminToken]=useState(true)

 const [adminPages, setAdminPages] = useState(0)

 const [verificationStatus, setVerificationStatus]=useState('')
 
  // const fetchDriverById = async (driver_id) => {

  //   console.log(driver_id)
  //    try {
  //      const response = await fetch(`https://www.leosdrive.com/api/get_driver_verification_by_id.php?id=${driver_id}&_=${new Date().getTime()}`);
  //      if (!response.ok) throw new Error("Failed to fetch driver");
  //      const data = await response.json();
  //      if (data.success) {
  //        setVerificationStatus(data.user.status);
  //        console.log(data)
      
  //      } else throw new Error(data.error);
  //    } catch (error) {
  //      console.error("Error fetching driver:", error.message);
  //    }
  //  };

 
  const fetchDriverById = async (driver_id) => {
    console.log(driver_id);
    try {
        const response = await fetch(`https://www.leosdrive.com/api/get_driver_verification_by_driver_id.php?driver_id=${driver_id}&_=${new Date().getTime()}`);
        if (!response.ok) throw new Error("Failed to fetch driver");
        
        const data = await response.json();
        if (data.success) {
            setVerificationStatus(data.driver.status); // Ensure "driver" matches PHP response
            console.log(data);
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error("Error fetching driver:", error.message);
    }
};

 

  return (
    <Context.Provider value={{userToken, driverToken, adminToken, adminPages, setAdminPages, fetchDriverById, verificationStatus, setVerificationStatus}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider



// #####33
// User “leosdrive_leosdrive” was added to the database “leosdrive_leosdrive”.
// password: Efe@legit3


// google api key
// AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU



// Maps JavaScript API
// Geocoding API
// Places API
// Directions API