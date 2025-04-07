import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { database } from "./firebaseConfig"; // Import the configured database
import { ref, onValue, update , push, set, remove, get} from "firebase/database";
import { useSelector } from 'react-redux';

export const Context = createContext()

const ContextProvider = ({children}) => {
 const [userToken,setUserToken]=useState(true)
 const [driverToken,setDriverToken]=useState(false)
 const [adminToken, setAdminToken]=useState(true)
const driverInfo = useSelector(state=>state.driverInfo)
const driverId =driverInfo?.id

 const [adminPages, setAdminPages] = useState(0)

 const [verificationStatus, setVerificationStatus]=useState('')

 const [blockRide, setBlockRide]=useState(false)
 
 
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


//fetching ride rates

const [rates, setRates]=useState(null)
console.log(rates)

useEffect(()=>{
   if (isNaN(rates)) {
    console.error("Invalid amount value", rates);
    // Optionally handle fallback or error state here
  } else {
    console.log("good rate to use ",rates); // This can now be used in calculations
  }
},[rates])



 const fetchRates = async () => {
    try {
      const res = await fetch('https://www.leosdrive.com/api/fetch_rates.php');
      const data = await res.json();
      if (data.success) setRates(data.rates[0].amount);
    } catch (err) {
    //   Swal.fire('Error', 'Failed to fetch rates', 'error');
      console.error(err)
    }
  };

 

useEffect(()=>{
  fetchRates();
},[])



  useEffect(() => {
    const id = setInterval(() => {
        fetchRates();
    }, 180000); // 3 minutes = 180,000 ms

    return () => clearInterval(id); // Cleanup interval on unmount
}, []);








// fetching commision rates
const [commissionRates, setCommissionRates]=useState(null);

console.log(commissionRates)

useEffect(()=>{
   if (isNaN(commissionRates)) {
    console.error("Invalid amount value", commissionRates);
    // Optionally handle fallback or error state here
  } else {
    console.log("good commission rate to use ",commissionRates); // This can now be used in calculations
  }
},[commissionRates])
 

  const fetchCommissionRates = async () => {
    try {
      const res = await fetch('https://www.leosdrive.com/api/fetch_commission.php');
      const data = await res.json();
      if (data.success) setCommissionRates(data.rates[0].amount);
      // console.log(data.rates[0].amount)
    } catch (err) {
      // Swal.fire('Error', 'Failed to fetch rates', 'error');
    }
  };

  useEffect(() => {
    fetchCommissionRates();
  }, []);



  useEffect(() => {
    const id = setInterval(() => {
        fetchCommissionRates();
    }, 180000); // 3 minutes = 180,000 ms

    return () => clearInterval(id); // Cleanup interval on unmount
}, []);






const [ongoingRides, setOngoingRides] = useState([]);
const [rides, setRides] = useState([]);













const fetchAcceptedRides = async () => {
  try {
    const ridesRef = ref(database, "acceptedRides"); // ✅ Correct reference
    const snapshot = await get(ridesRef);

    if (snapshot.exists()) {
      const ridesData = snapshot.val();
    //   console.log("All Rides:", ridesData); // ✅ Log fetched rides

      // ✅ Convert data to an array and filter
      const driverRides = Object.keys(ridesData)
        .map((key) => ({
          id: key,
          ...ridesData[key],
        }))
        .filter((ride) => {
        //   console.log(`Checking ride ${ride.id}:`, ride); // ✅ Log each ride
          return (
            String(ride.driver_id) === String(driverId) && ride.ride_status === "accepted"
          );
        });

      console.log("Filtered Rides:", driverRides); // ✅ Log after filtering

      // setRides(driverRides.length > 0 ? driverRides : []); // ✅ Update state
      // fetchUserById(driverRides[0].user_id)
      if(driverRides.length>0){
      setBlockRide(true);
      }
    } else {
      // setRides([]); // ✅ Handle empty data
      setBlockRide(false)
    }
  } catch (error) {
    console.error("Error fetching rides:", error);
  } finally {
    // setLoading(false);
  }
};









const fetchOngoingRides = async () => {
    try {
      const ridesRef = ref(database, "ongoingRides");
      const snapshot = await get(ridesRef);
  
      if (snapshot.exists()) {
        const ridesData = snapshot.val();
  
        console.log("Fetched ridesData:", ridesData); // ✅ Debugging
  
        if (!driverId) {
          console.error("Driver ID is missing!");
          return;
        }
  
        // Ensure driverId is a string if stored that way in Firebase
        const formattedDriverId = String(driverId);
  
        // ✅ Filter only the ongoing rides assigned to this driver
        const driverOngoingRides = Object.keys(ridesData)
          .map((key) => ({
            id: key,
            ...ridesData[key],
          }))
          .filter((ride) => {
            console.log(`Checking ride: ${ride.id}, driver_id: ${ride.driver_id}`);
            return String(ride.driver_id) === formattedDriverId;
          });
  
        console.log("Filtered ongoing rides:", driverOngoingRides); // ✅ Debugging
  
        // setOngoingRidesChecker(driverOngoingRides);
        // fetchUserById(driverOngoingRides[0].user_id)
        if(driverOngoingRides.length>0){
          setBlockRide(true);
          }
      } else {
        console.warn("No ongoing rides found.");
        // setOngoingRides([]);
        setBlockRide(false)
      }
    } catch (error) {
      console.error("Error fetching ongoing rides:", error);
    } finally {
      // setLoading(false);
    }
  };
  


useEffect(() => {
  const id = setInterval(()=>{
    fetchOngoingRides();
  fetchAcceptedRides();
  },3000)
}, []);





  return (
    <Context.Provider value={{userToken, driverToken, adminToken, adminPages, setAdminPages,
     fetchDriverById, verificationStatus, setVerificationStatus,
     rates, commissionRates,blockRide, setBlockRide, rides, setRides, ongoingRides, setOngoingRides}}>
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




// real time database
// https://console.firebase.google.com/u/6/project/taxi1-app/database/taxi1-app-default-rtdb/data/~2F