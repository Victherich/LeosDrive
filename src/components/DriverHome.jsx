// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import { FaCar, FaMoneyBillWave, FaToggleOn, FaToggleOff } from "react-icons/fa";

// const Container = styled.div`
//   display: flex;
//   // flex-direction: column;
//   // align-items: center;
//   justify-content: center;
//   height: 100vh;
//   gap:10px;
//   background: white;
//   color: black;
//   text-align: center;

//   @media (max-width:884px){
//   flex-direction:column;

//   }
// `;

// const MapContainer = styled.div`
//   // width: 100%;
//   // height: 60vh;
//   flex:2;
//    @media (max-width:884px){
//   width:100%;
//   height:100vh

//   }
// `;

// const InfoBox = styled.div`
// flex:1;
//   // width: 100%;
  
//   padding: 15px;
//   border-radius: 10px;
//   background:whitesmoke;
//   color:#333;
//   margin-top: 10px;

//    @media (max-width:884px){
//   width:100%;

//   }
// `;

// const Button = styled.button`

//   padding: 12px;
//   font-size: 1rem;
//   font-weight: bold;
//   border: 1px solid #FE7C04;
//   border-radius: 10px;
//   cursor: pointer;
//   transition: 0.3s;
//   width: 100%;
//   margin-top: 10px;

//   &:hover {
    
  
//   }
// `;

// const DriverHomePage = () => {
//   const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU" });
//   const [location, setLocation] = useState({ lat: 0, lng: 0 });
//   const [online, setOnline] = useState(false);
//   const [earnings, setEarnings] = useState(0);

//   console.log(location)

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//     });
//   }, []);

//   if (!isLoaded) return <p>Loading map...</p>;

//   return (
//     <Container>
//       <MapContainer>
//         <GoogleMap center={location} zoom={15} mapContainerStyle={{ width: "100%", height: "100%" }}>
//           <Marker position={location} icon={{ url: "https://maps.google.com/mapfiles/kml/shapes/cabs.png" }} />
//         </GoogleMap>
//       </MapContainer>
      
//       <InfoBox>
//         <h2 style={{color:"#FE7C04"}}>Driver Dashboard</h2>
//         <p>Earnings: <FaMoneyBillWave /> ${earnings}</p>
//         <p>Status: {online ? "Online" : "Offline"}</p>
//         <Button onClick={() => setOnline(!online)}
//           style={{background:online?"#FE7C04":"white", color:online?"white":"#FE7C04"}}>
//           {online ? <FaToggleOn /> : <FaToggleOff />} {online ? "Go Offline" : "Go Online"}
//         </Button>
//       </InfoBox>
//     </Container>
//   );
// };

// export default DriverHomePage;



import React, { useState, useEffect, useContext } from "react";
import { database } from "./firebaseConfig"; // Import the configured database
import { ref, onValue, update , push, set, remove, get} from "firebase/database";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { use } from "react";
import taxi from '../Images/taxi.png'
import taxigif from '../Images/taxigif.gif'
import bike from '../Images/bike.png'
import { Context } from "./Context";

// Styled Components

const Container2 = styled.div`
  display:flex;


  @media(max-width:768px){
    flex-direction:column;
  }
`


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  padding: 20px;
  background: #f4f4f4;
  min-height: 100vh;
  width:100%;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const RideList = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  p{
    text-align:center;
  }
`;

const RideCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-left: 5px solid ${(props) => (props.status === "pending" ? "#ff9800" : "#4caf50")};

  h3 {
    margin: 0;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
`;

const Button = styled.button`
  background: ${(props) => (props.status === "pending" ? "#28a745" : "#ccc")};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: ${(props) => (props.status === "pending" ? "pointer" : "not-allowed")};
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: ${(props) => (props.status === "pending" ? "#218838" : "#ccc")};
  }
`;


const Button2 = styled.button`
  background: orange;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: ${(props) => (props.status === "pending" ? "#218838" : "gray")};
  }
`;


const Name = styled.div`
background:rgba(0,0,0,0.2);
color:white;
padding:10px;
// border-radius:10px;
width:20%;
display:flex;
flex-direction:column;
// justify-content:center;
align-items:center;
gap:10px;


img{
width:100px;
}

p{
    font-size:0.8rem;
    color:#333;
    text-align:center
}

@media(max-width:768px){
  width:100%;
}
` 


const DriverHomePage = () => {
  const [rides, setRides] = useState([]);
  
  const [driver, setDriver] = useState({});
  // console.log(driver)
  const driverInfo = useSelector(state=>state.driverInfo)
  const driverId = driverInfo.id
  const [driverVerificationData, setDriverVerificationData]= useState({})
console.log(driverVerificationData.car_name, driverVerificationData.car_plate)

const {blockRide, setBlockRide, }=useContext(Context);



// for display blocker

// const fetchAcceptedRides = async () => {
//   try {
//     const ridesRef = ref(database, "acceptedRides");
//     const snapshot = await get(ridesRef);
    
//     if (snapshot.exists()) {
//       const ridesData = snapshot.val();
//       const driverRides = Object.keys(ridesData)
//         .map((key) => ({
//           id: key,
//           ...ridesData[key],
//         }))
//         .filter((ride) => ride.driver_id === driverId && ride.ride_status === "accepted");

//       setRides(driverRides); // ✅ Update UI with accepted rides
//     } else {
//       setRides([]); // ✅ Empty UI when no accepted rides exist
//     }
//   } catch (error) {
//     console.error("Error fetching accepted rides:", error);
//   }
// };



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


// useEffect(()=>{

//   if(ongoingRides?.length>0){
//     setBlockRide(true);
//     }

// },[]);

// useEffect(()=>{
//   if(rides.length>0){
//   setBlockRide(true);
//   }
// },[]);
// display blocker ends here









  useEffect(()=>{
    fetchDriverById()
    fetchDriverVerification()
  },[])

// reload location eery 5 mins
useEffect(()=>{
  const id = setInterval(()=>{
    // window.location.reload();
    // Swal.fire({text:"success reload"})
  },3000)

  return ()=>clearInterval(id)
},[])


  const fetchDriverById = async () => {
    try {
      const response = await fetch(`https://www.leosdrive.com/api/get_driver_by_id.php?id=${driverInfo.id}&_=${new Date().getTime()}`);
      if (!response.ok) throw new Error("Failed to fetch driver");
      const data = await response.json();
      if (data.success) {
        setDriver(data.user);
        // setNewPhone(data.user.phone); // Set phone for modal
      } else throw new Error(data.error);
    } catch (error) {
      console.error("Error fetching driver:", error.message);
    }
  };


  
  const getRides = ()=>{
    const ridesRef = ref(database, "rides");

    onValue(ridesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ridesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRides(ridesArray);
      }
    });
  }

  useEffect(() => {
    getRides()
  }, []);


  const fetchAllRides = async () => {
    try {
      // Reference to the "rides" node in Firebase
      const ridesRef = ref(database, "rides");
      const snapshot = await get(ridesRef);

      if (snapshot.exists()) {
        const ridesData = snapshot.val();
        const ridesArray = Object.keys(ridesData).map((key) => ({
          id: key, // Firebase-generated key
          ...ridesData[key], // Ride details
        }));

        setRides(ridesArray); // ✅ Update state with fetched rides
      } else {
        setRides([]); // If no rides exist, set state to empty array
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  // const acceptRide = (rideId) => {
  //   update(ref(database, `rides/${rideId}`), { ride_status: "accepted" })
  //     .then(() => {
  //       Swal.fire("Ride Accepted!", "You have accepted the ride.", "success");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating ride status:", error);
  //       Swal.fire("Error", "Could not accept the ride.", "error");
  //     });
  // };


  // const acceptRide = (rideId) => {
  //   const driverDetails = {
  //     driver_id: "DRIVER123", // Replace with real driver ID
  //     driver_name: "John Doe",
  //     driver_phone: "+1234567890",
  //     vehicle: "Toyota Corolla - ABC123", 
  //     ride_status: "accepted",
  //   };
  
  //   update(ref(database, `rides/${rideId}`), driverDetails)
  //     .then(() => {
  //       Swal.fire("Ride Accepted!", "You have accepted the ride.", "success");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating ride status:", error);
  //       Swal.fire("Error", "Could not accept the ride.", "error");
  //     });
  // };


  const fetchDriverVerification = async () => {
 

    // setLoading(true);/
    // setError(null);

    try {
      // Make GET request to your PHP script with driver_id as a query parameter
      const response = await fetch(`https://www.leosdrive.com/api/get_driver_verification_by_driver_id.php?driver_id=${driverInfo.id}`);
      const data = await response.json();

      if (data.success) {
        setDriverVerificationData(data.driver);  // Set driver data if successful
      } else {
        // setError(data.error);  // Set error message if not successful
      }
    } catch (err) {
      // setError('Error fetching data. Please try again later.');
      console.error('Error fetching driver verification:', err);
    } finally {
      // setLoading(false);
    }
  };



  const acceptRide = (rideId) => {



    const driverDetails = {
      driver_id: driver.id, // Replace with real driver ID
      driver_name: driver.name,
      driver_phone: driver.phone,
      vehicle: driverVerificationData.car_name,
      plate_number: driverVerificationData.car_plate,
      ride_status: "accepted",
    };

    console.log(driverDetails)
  
    // Fetch the ride data from the 'rides' table first
    const rideRef = ref(database, `rides/${rideId}`);
  
    // Copy the ride data to 'acceptedRides' table
    onValue(rideRef, (snapshot) => {
      const rideData = snapshot.val();
      if (rideData) {
        // Copy the ride to the 'acceptedRides' table
        const acceptedRideRef = push(ref(database, "acceptedRides"));
        set(acceptedRideRef, { ...rideData, ...driverDetails })
          .then(() => {
            // After moving the ride to acceptedRides, remove it from 'rides'
            remove(ref(database, `rides/${rideId}`))
              .then(() => {
                Swal.fire("Ride Accepted!", "You have accepted the ride, Go to your Accepted rides and proceed.", "success");
                fetchAllRides();

              })
              .catch((error) => {
                console.error("Error deleting ride:", error);
                Swal.fire("Error", "Could not delete ride from 'rides' table.", "error");
              });
          })
          .catch((error) => {
            console.error("Error moving ride to acceptedRides:", error);
            Swal.fire("Error", "Could not accept the ride.", "error");
          });
      }
    });
  };
  
  

  return (
    <Container2>
   
        <Name>
            <h3>Hi {driverInfo.name},</h3> 
            <img src={taxi} alt='im'/>
            <p>"Drive with LeosDrive—where every trip brings you closer to success!"</p>
            <img src={taxigif} alt='im'/>
            <p>"Turn your wheels into wealth! Join LeosDrive and earn on your schedule."</p>
            <img src={bike} alt='im'/>
            <p> "Swift, secure, and seamless—LeosDrive delivers more than just packages; we deliver peace of mind!"</p>
          </Name>
          {blockRide&&<Container style={{background:"rgba(255,255,255,0.7)", position:"fixed", width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <h2 style={{color:"#333", background:"white", padding:"10px", borderRadius:"10px"}}>
                You have ongoing ride , Please complete and Refresh before accepting a new ride.
              </h2>
              <Button2 onClick={()=>window.location.reload()}>Refresh</Button2>
          </Container>}
    <Container>
      <Title>🚖 Driver Dashboard</Title>
      <h3>Your Incoming Ride Requests</h3>
      <RideList>
        {rides.length === 0 ? (
          <p>No new ride requests at the moment.</p>
        ) : (
          rides.map((ride) => (
            <RideCard key={ride.id} status={ride.ride_status}>
              <h3>Booking No: {ride.booking_number}</h3>
              {/* <p>
                <FaMapMarkerAlt /> Pickup: {ride.pickup_lat}, {ride.pickup_lng}
              </p> */}
              <p>
                <FaMapMarkerAlt /> Pickup: {ride.pickup_location}
              </p>
              <p>
                <FaMapMarkerAlt /> Drop-off: {ride.drop_off}
              </p>
              <p>Status: <strong>{ride.ride_status}</strong></p>
              <Button
                onClick={() => acceptRide(ride.id)}
                disabled={ride.ride_status !== "pending"}
                status={ride.ride_status}
              >
                <FaCheck /> Accept Ride
              </Button>
            </RideCard>
          ))
        )}
      </RideList>
    </Container>
    </Container2>
  );
};

export default DriverHomePage;
