// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import "./CSS/BookARide3.css"; // External CSS
// import taxi from '../Images/taxi.png'
// import Swal from "sweetalert2";
// import { useEffect } from "react";
// import { FaExpandArrowsAlt, FaPhone, FaWindowMaximize, FaWindowMinimize } from "react-icons/fa";







// const BookARide6 = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [rideDetails, setRideDetails] = useState(null);
//   const [slideSwitch, setSlideSwitch] = useState(0);
//   const [messageIndex, setMessageIndex] = useState(0);
//   const [classA, setClassA]=useState(false)
//   const [showPhone, setShowPhone] = useState(false)

//   const handleBookRide = () => {
//     if (!pickup || !destination) {
//       Swal.fire({text:"Please enter both pickup and destination!", showConfirmButton:false, timer:2000});
//       return;
//     }

//     setSlideSwitch(1)
//     // Simulate pricing and ride details
//     const price = 10 * 100;
//     setRideDetails({
//       pickup,
//       destination,
//       price,
//       driver: "John Doe",
//       car: "Toyota Prius",
//       plate: "XYZ 1234",
//       phone:"123456789"
//     });
//   };




//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//     }, 4000); // Change message every 2 seconds

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);



//   const handleRideCancel = () => {
//     Swal.fire({
//       text: "Are you sure you want to cancel this ride?",
//     //   text: "You will need to log in again to access your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Cancel",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {

//         setRideDetails(null);
//         setPickup("");
//         setDestination("");
//         setSlideSwitch(0);
//         // Perform the logout actions
//         // run the back end logic for ride cancellation here
//         Swal.fire({
//           text: "The Ride has been Cancelled",
//         //   text: "You have been logged out successfully.",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
  
      
//       }
//     });
//   };
  


//   return (
//     <div className="book-ride-container">
//       {/* Left: Google Maps */}
//       {/* <div className="map-container">
//         <LoadScript googleMapsApiKey="AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU">
//           <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
//             <Marker position={center} />
//           </GoogleMap>
//         </LoadScript>
//       </div> */}

//       {/* Right: Booking Form or Ride Details */}
//       <div className={classA?"right-container2":"right-container"}>
//       <div className="MinMaxWrap">
//             <FaWindowMinimize className="MinmaxIcon" onClick={()=>setClassA(true)}/>
//             <FaWindowMaximize className="MinmaxIcon" onClick={()=>setClassA(false)}/>
//             </div>
//         {slideSwitch===0 &&
//           <div className="form-container">
//             <h2>BOOK A RIDE</h2>
            
//             <input
//               type="text"
//               placeholder="Enter Pickup Location"
//               value={pickup}
//               onChange={(e) => setPickup(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Enter Destination"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//             />
//             <div className="LetsGoWrap" onClick={handleBookRide}>
//                 <img src={taxi} alt='taxi'/>
//                 <p>Let's Go</p>
//             </div>

            
//           </div>}
        
//         {slideSwitch===1 && <div className="ride-details-container">
//             <h2>Loe'sDrive Standard</h2>
//             <p><strong>Pickup:</strong> {rideDetails.pickup}</p>
//             <p><strong>Destination:</strong> {rideDetails.destination}</p>
//             {/* <p><strong>Driver:</strong> {rideDetails.driver}</p> */}
//             {/* <p><strong>Car:</strong> {rideDetails.car}</p> */}
//             {/* <p><strong>Plate:</strong> {rideDetails.plate}</p> */}
            
//             <div className="LetsGoWrap" onClick={handleBookRide} style={{marginBottom:"10px", backgroundColor:"white", border:"1px solid orange", justifyContent:"space-between"}}>
//                 <img src={taxi} alt='taxi'/>
//                 <p style={{color:"#333"}}>NGN {rideDetails.price}</p>
//             </div>
//             <button className="confirm-button" onClick={()=>setSlideSwitch(2)}>Confirm Ride</button>
//             <button className="cancel-button" onClick={handleRideCancel}>Cancel</button>
//           </div>}

//           {slideSwitch===2 && <div className="ride-details-container">
//             <h2>{messages[messageIndex]}</h2>
        
//       <p>Please wait...</p>

            

//             <div className="loading-container">
//       <div className="road">
//         <img
//           src={taxi} // Example car image
//           alt="Car"
//           className="moving-car"
//         />
//       </div>
//     </div>
            

          
//             <button className="cancel-button" onClick={handleRideCancel}>Cancel</button>
//             <button className="cancel-button" onClick={()=>setSlideSwitch(3)}>Accept </button>
//           </div>}

//           {slideSwitch===3 && <div className="ride-details-container">
//             <h2>Ride Accepted, Your Driver is on the way</h2>
//             <p><strong>Pickup:</strong> {rideDetails.pickup}</p>
//             <p><strong>Destination:</strong> {rideDetails.destination}</p>
//             <p><strong>Driver:</strong> {rideDetails.driver}</p>
//             <p><strong>Car:</strong> {rideDetails.car}</p>
//             <p><strong>Plate:</strong> {rideDetails.plate}</p>
//             <button className="cancel-button" style={{backgroundColor:'#FE7C04'}} onClick={()=>setShowPhone(!showPhone)}><FaPhone/> Call Driver</button>
//             {showPhone&&<p style={{color:"#FE7C04"}}><strong> {rideDetails.phone}</strong></p>}
            
//             <div className="LetsGoWrap" onClick={handleBookRide} style={{marginBottom:"10px",marginTop:'10px', backgroundColor:"white", border:"1px solid orange", justifyContent:"space-between"}}>
//                 <img src={taxi} alt='taxi'/>
//                 <p style={{color:"#333"}}>NGN {rideDetails.price}</p>
//             </div>
          
//             <button className="cancel-button" onClick={handleRideCancel}>Cancel</button>
//           </div>}





        
        
//       </div>
//     </div>
//   );
// };

// export default BookARide6;









// 3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
import React, { useState, useEffect, useContext } from "react";
import { FaLocationArrow, FaMapMarkerAlt , FaUser, FaPhone, FaCar, FaIdCard, FaGoodreads, } from "react-icons/fa";
import styled from "styled-components";
import Swal from "sweetalert2";
import taxi from '../Images/taxi.png'
import bike from '../Images/bike.png'
import { useDispatch, useSelector } from "react-redux";
import { updateBookingNumber } from "../Features/Slice";
import { useNavigate } from "react-router-dom";

import { database } from "./firebaseConfig";
import { ref, set, push, onValue, get, child, remove  } from "firebase/database";
import taxigif from '../Images/taxigif.gif';
import foodbike from '../Images/foodbike.png';
import { Context } from "./Context";
import { startRideB } from "../Features/Slice";
import { stopRideB } from "../Features/Slice";
import { updateElapsedTimeB } from "../Features/Slice";





const Container = styled.div`
  display: flex;
  min-height: 100%;
  padding:30px 30px;
  background-color: #f4f4f4;
  gap:50px;
  height:auto;
  

  @media(max-width:768px){
    flex-direction:column;
    align-items:center;
    // justify-content:center;
    min-height:auto;
  }
`;

const Form = styled.div`

  padding: 20px;
  border-radius: 8px;

  
  width: 300px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline:none;
`;

const Button = styled.button`
  width: 100%;
    padding: 10px;
    background:  #fe7c04;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display:flex;
    justify-content:center;     
    align-items:center;
    gap:20px;

    p{
    font-weight:bold;
    font-size:1.2rem;
    }

img{
    width:100px;
}

  &:hover {
    background: orange;
  }
`;

const Name = styled.div`
background:rgba(0,0,0,0.2);
color:white;
padding:10px;
border-radius:10px;
width:250px;
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
`


const Delivery = styled.div`
    display:flex;
    flex-direction:column;
    width:250px;
    padding:10px;
    height:250px;
    justify-content:center;
    align-items:center;
    background:lightgray;
    border-radius:20px;
    cursor:pointer;
    margin-top:30px;


    &:hover{
        background:orange;
        color:white;
    }

    img{
    width:150px;
    }
`

const ButtonWrap = styled.div`
display:flex;
gap:10px;

`



const RideInfo = styled.p`
  font-size: 14px;
  color: #555;
//   margin: 5px 0;
`;

const PassengerDetails = styled.div`
  background: #f9f9f9;
  padding: 5px;
  border-radius: 8px;
//   margin-top: 10px;
`;




const messages = [
    "Looking for the nearest taxi... 🚖",
    "Finding the best route for you... 🗺️",
    "Almost there! Just a moment... ⏳",
    "Connecting you to a driver... 📞"
  ];


  const Amount = styled.span`
  font-size: 16px;
  color: #28a745;
  font-weight: bold;
`;

const Status = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  color: white;
  background: ${({ status }) =>
    status === "Completed" ? "green" : status === "Upcoming" ? "#fe7c04" : "gray"};
`;

const BookARide = () => {
  const [pickupCoords, setPickupCoords] = useState("Fetching location...");
  const [destination, setDestination] = useState("");
  const [deliveryForm, setDeliveryForm] = useState(false);
  const [deliveryDestination, setDeliveryDestination]= useState('')
  const [deliveryPickup, setDeliveryPickup]=useState('');
  const [slideSwitch, setSlideSwitch] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);
const userInfo = useSelector(state=>state.userInfo);
const dispatch = useDispatch();
const bookingNumber = useSelector(state=>state.bookingNumber)
console.log(bookingNumber);
const [rideInfo, setRideInfo] = useState(null);
const [ongoingRideInfo, setOngoingRideInfo] = useState(null);
const [completedRideInfo, setCompletedRideInfo] = useState(null);
const [pickUpLocation, setPickupLocation]=useState('')
// console.log(completedRideInfo)
const {rates}=useContext(Context);

const navigate = useNavigate();

const isRidingB = useSelector(state=>state.isRidingB)
const rideStartB = useSelector(state=>state.rideStartB)
const [elapsedTimeB, setElapsedTimeB]=useState(0);



// geting cuurent time - the start time
useEffect(() => {
  const id = setInterval(() => {
    setElapsedTimeB(Math.floor((Date.now() - rideStartB) / 1000));
  }, 2000);

  return () => clearInterval(id); // Clean up the interval
}, [isRidingB, rideStartB]);




// just conerting time to readable format for display and saing
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num) => String(num).padStart(2, '0');

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};




// getting user location
const getUserLocation = ()=>{
  console.log("useEffect: trying to get location");

  if ('geolocation' in navigator) {
    // setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setPickupCoords(`Lat: ${latitude}, Lng: ${longitude}`);
        console.log("Location success:", latitude, longitude);
        // setIsLoadingLocation(false);
        // Swal.fire({text:"location updated", timer:1000})
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLatitude(null);
        setLongitude(null);
        // setIsLoadingLocation(false);


        switch (error.code) {
          case error.PERMISSION_DENIED:
            Swal.fire({
              icon: 'error',
              title: 'Permission Denied',
              text: 'Please allow location access in your browser settings and refresh the page.',
              allowOutsideClick:false,
              confirmButtonText:"Try Again"
            }).then((result)=>{
              if(result.isConfirmed){
                getUserLocation();
              }
            });
            break;

          case error.POSITION_UNAVAILABLE:
            Swal.fire({
              icon: 'warning',
              title: 'Location Unavailable',
              text: 'Try turning on your GPS or moving to a better signal area, then refresh the page.',
              allowOutsideClick:false,
              confirmButtonText:"Try Again"
            }).then((result)=>{
              if(result.isConfirmed){
                getUserLocation();
              }
            });
            break;

          case error.TIMEOUT:
            Swal.fire({
              icon: 'info',
              title: 'Timeout',
              text: 'Fetching your location took too long. Please refresh the page and try again.',
              allowOutsideClick:false,
              confirmButtonText:"Try Again"
            }).then((result)=>{
              if(result.isConfirmed){
                getUserLocation();
              }
            });
            break;

          default:
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong while getting your location.',
              allowOutsideClick:false,
              confirmButtonText:"Try Again"
            }).then((result)=>{
              if(result.isConfirmed){
                getUserLocation();
              }
            });
            break;
        }
      }
    );
  } else {
    // setIsLoadingLocation(false);
    Swal.fire({
      icon: 'error',
      title: 'Unsupported',
      text: 'Geolocation is not supported in your browser.',
      allowOutsideClick:false,
      confirmButtonText:"Try Again"
    }).then((result)=>{
      if(result.isConfirmed){
        getUserLocation();
      }
    });
  }

}

useEffect(() => {
  getUserLocation();
}, []);


useEffect(()=>{
  const id = setInterval(()=>{
    getUserLocation();
  },3000)

  return ()=>clearInterval(id)
},[]);





// fetcing user location
// useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//           const { latitude, longitude } = position.coords;
//           setPickupCoords(`Lat: ${latitude}, Lng: ${longitude}`);

//         },
//         () => {
//           setLatitude(null);
//           setLongitude(null);
//         }
//       );
//     }
//   }, []);
  


// fetching user location






   useEffect(() => {
      const interval = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 4000); // Change message every 2 seconds
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);


  
    const handleRideCancel = () => {
      Swal.fire({
        text: "Are you sure you want to cancel this ride?",
      //   text: "You will need to log in again to access your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
  
        //   setRideDetails(null);
        //   setPickup("");
          setDestination("");
          handleDeleteRide(bookingNumber)
      
     
          Swal.fire({
            text: "The Ride has been Cancelled",
          //   text: "You have been logged out successfully.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
    
        
        }
      });
    };



    const generateBookingNumber = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };
    

    const handleBookRide = async () => {
        if (!destination) {
          Swal.fire({ text: "Please enter your destination!", icon: "warning", timer: 2000 });
          return;
        }
    
        if (latitude === null || longitude === null) {
          Swal.fire({ text: "Fetching your location. Please wait!", icon: "info", timer: 2000 });
          return;
        }
    

        const loadingAlert = Swal.fire({text:"Please..."})
        Swal.showLoading();
        // Generate booking number
        const bookingNumber = generateBookingNumber();
    
        // Create ride details
        const rideDetails = {
          user_id: userInfo.id, // Replace with actual user ID
          pickup_lat: latitude,
          pickup_lng: longitude,
          drop_off: destination,
          ride_status: "pending",
          booking_number: bookingNumber,
          timestamp: new Date().toISOString(),
          pickup_location:pickUpLocation,
        };
    
            try {
          // Save ride details in Firebase
          const rideRef = push(ref(database, "rides")); // Creates a unique key for each ride
          await set(rideRef, rideDetails);
    
          // Show success message
        //   Swal.fire({ text: `Ride booked! Booking No: ${bookingNumber}`, icon: "success", timer: 3000 });
    
          setDestination(""); // Reset destination input
          setSlideSwitch(2);
          dispatch(updateBookingNumber(bookingNumber));
          // Swal.fire({text:"booked"})
    
        } catch (error) {
          console.error("Booking error:", error);
          Swal.fire("Error", "Failed to save ride in database", "error");
        }finally{
            loadingAlert.close();
        } 
    };
    
      


    

const handleDeleteRide = async (bookingNumber) => {
  if (!bookingNumber) {
    Swal.fire("Error", "Booking number is required!", "error");
    return;
  }

  try {
    const response = await fetch("https://www.leosdrive.com/api/delete_ride.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_number: bookingNumber }),
    });

    const result = await response.json();

    if (result.success) {
      Swal.fire("Success", result.message, "success");
      dispatch(updateBookingNumber(null));
    } else {
      Swal.fire("Error", result.error, "error");
    }
  } catch (error) {
    console.error("Delete error:", error);
    Swal.fire("Error", "Server not responding", "error");
  }
};








// const fetchRideInfoByBookingNumber = async (bookingNumber) => {
//     try {
//       // Reference to the 'rides' node (without specifying the booking number)
//       const ridesRef = ref(database, 'rides');
//       const snapshot = await get(ridesRef);
      
//       // Check if the snapshot exists
//       if (snapshot.exists()) {
//         const ridesData = snapshot.val();
        
//         // Find the ride with the matching booking_number
//         for (let rideKey in ridesData) {
//           const ride = ridesData[rideKey];
          
//           if (ride.booking_number === bookingNumber) {
//             setRideInfo(ride)   
//             return ride;  // Return the ride information if booking_number matches
//           }
//         }
        
//         // If no matching ride is found, throw an error
//         throw new Error("Ride not found");
//       } else {
//         throw new Error("No rides found");
//       }
//     } catch (error) {
//       console.error("Error fetching ride info:", error);
//       throw new Error("Failed to fetch ride information");
//     }
//   };


//   useEffect(()=>{
//     fetchRideInfoByBookingNumber(bookingNumber)
//   },[bookingNumber])







const handleCancelRide = async () => {
  Swal.fire({
    text: "Are you sure you want to cancel this ride?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Cancel",
    cancelButtonText: "No",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Reference to all rides
        const ridesRef = ref(database, "rides");
        const snapshot = await get(ridesRef);

        if (snapshot.exists()) {
          const ridesData = snapshot.val();
          let rideKeyToDelete = null;

          // Find the correct ride by booking_number
          for (let rideKey in ridesData) {
            if (ridesData[rideKey].booking_number === bookingNumber) {
              rideKeyToDelete = rideKey;
              break;
            }
          }

          if (rideKeyToDelete) {
            // Delete ride using the found key
            await remove(ref(database, `rides/${rideKeyToDelete}`));

            Swal.fire({
              text: "The Ride has been Cancelled",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });

            // Clear ride details
            dispatch(updateBookingNumber(null));
            setRideInfo(null);
            window.location.reload();
          } else {
            throw new Error("Ride not found");
          }
        } else {
          throw new Error("No rides found in the database");
        }
      } catch (error) {
        console.error("Error cancelling ride:", error);
        Swal.fire("Error", "Could not cancel ride", "error");
      }
    }
  });
};



  


const handleCancelRide2 = async () => {
    Swal.fire({
      text: "Are you sure you want to cancel this ride?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Reference to all rides
          const ridesRef = ref(database, "acceptedRides");
          const snapshot = await get(ridesRef);
  
          if (snapshot.exists()) {
            const ridesData = snapshot.val();
            let rideKeyToDelete = null;
  
            // Find the correct ride by booking_number
            for (let rideKey in ridesData) {
              if (ridesData[rideKey].booking_number === bookingNumber) {
                rideKeyToDelete = rideKey;
                break;
              }
            }
  
            if (rideKeyToDelete) {  
              // Delete ride using the found key
              await remove(ref(database, `acceptedRides/${rideKeyToDelete}`));
  
              Swal.fire({
                text: "The Ride has been Cancelled",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
  
              // Clear ride details
              dispatch(updateBookingNumber(null));
              setRideInfo(null);
              window.location.reload();
            } else {
              throw new Error("Ride not found");
            }
          } else {
            throw new Error("No rides found in the database");
          }
        } catch (error) {
          console.error("Error cancelling ride:", error);
          Swal.fire("Error", "Could not cancel ride", "error");
        }
      }
    });
  };
  
  



  useEffect(() => {
    if (!userInfo || !userInfo.id) return;
  
    const acceptedRidesRef = ref(database, `acceptedRides`);
  
    // Listen for changes in the accepted rides for this user
    const unsubscribe = onValue(acceptedRidesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const acceptedRides = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .filter((ride) => ride.user_id === userInfo.id); // Filter by user ID
  
        if (acceptedRides.length > 0) {
          const acceptedRide = acceptedRides[0]; // Assuming only one accepted ride per user
          setRideInfo(acceptedRide); // Set the ride info for display
        } else {
          setRideInfo(null); // No accepted rides
        }
      }
    });
  
    return () => unsubscribe(); // Cleanup listener
  }, [userInfo]);



//    useEffect(() => {
//       const fetchAcceptedRides = async () => {
//         try {
//           const ridesRef = ref(database, "acceptedRides"); // ✅ Correct reference
//           const snapshot = await get(ridesRef);
    
//           if (snapshot.exists()) {
//             const ridesData = snapshot.val();
//           //   console.log("All Rides:", ridesData); // ✅ Log fetched rides
    
//             // ✅ Convert data to an array and filter
//             const driverRides = Object.keys(ridesData)
//               .map((key) => ({
//                 id: key,
//                 ...ridesData[key],
//               }))
//               .filter((ride) => {
//               //   console.log(`Checking ride ${ride.id}:`, ride); // ✅ Log each ride
//                 return (
//                   String(ride.user_id) === String(userInfo.id)
//                 );
//               });
    
//             console.log("Filtered Rides:", driverRides); // ✅ Log after filtering
    
//             setRideInfo(driverRides.length > 0 ? driverRides : []); // ✅ Update state
//             // fetchUserById(driverRides[0].user_id)
//           } else {
//             // setRides([]); // ✅ Handle empty data
//           }
//         } catch (error) {
//           console.error("Error fetching rides:", error);
//         } finally {
//         //   setLoading(false);
//         }
//       };
    
//       fetchAcceptedRides();
//     }, [userInfo]);
  


//   return (
//     <Container>

//         <Name>
//             <p>
//             Hi User,
//             </p>
            
//         </Name>
//      {/* {!bookingNumber&& <Form>
//         <Title>Book a Ride</Title>
//         <p style={{textAlign:"left"}}>
//            <FaMapMarkerAlt/> Your Destination Location
//         </p>
//         <Input
//           type="text"
//           placeholder="Enter Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value.toUpperCase())}
//         />
//         <p style={{textAlign:"left"}}>
//            <FaLocationArrow/> Your current Location
//         </p>
//         <Input type="text" value={pickupCoords} disabled />     
//         <Button onClick={handleBookRide}><img src={taxi} alt='taxi'/> <p>Let's Go</p></Button>
//       </Form>}

//         {bookingNumber && <div className="ride-details-container">
//                    <h2>{messages[messageIndex]}</h2>
               
//              <p>Please wait...</p>
       
                   
       
//                    <div className="loading-container">
//              <div className="road">
//                <img
//                  src={taxi} // Example car image
//                  alt="Car"
//                  className="moving-car"
//                />
//              </div>
//            </div>
                 
//                    <button className="cancel-button" onClick={handleRideCancel}>Cancel</button>
//                    </div>} */}



// {rideInfo ? (
//   <div className="ride-details-container">
//     {rideInfo.ride_status === "pending" ? (
//       <>
//         <h2>{messages[messageIndex]}</h2>
//         <p>Looking for a driver...</p>
//         <div className="loading-container">
//           <img src={taxi} alt="Taxi Loading" className="moving-car" />
//         </div>
//         <button className="cancel-button" onClick={handleCancelRide}>Cancel</button>
//       </>
//     ) : (
//       <>
//         <h2>🚖 Ride Accepted!</h2>
//         <p>Your driver is on the way.</p>
//         <div className="driver-info">
//           <p><FaUser /> {rideInfo.driver_name}</p>
//           <p><FaPhone /> {rideInfo.driver_phone}</p>
//           <p><FaCar /> {rideInfo.vehicle}</p>
//           <button className="cancel-button" onClick={handleCancelRide}>Cancel</button>
//         </div>
//       </>
//     )}
//   </div>
// ) : (
//   <Form>
//     <Title>Book a Ride</Title>
//     <p><FaMapMarkerAlt /> Your Destination</p>
//     <Input type="text" placeholder="Enter Destination" value={destination} onChange={(e) => setDestination(e.target.value.toUpperCase())} />
//     <p><FaLocationArrow /> Your Location</p>
//     <Input type="text" value={pickupCoords} disabled />
//     <Button onClick={handleBookRide}><img src={taxi} alt="taxi" /> <p>Let's Go</p></Button>
//   </Form>
// )}


//     <Delivery onClick={()=>navigate('/userdashboard/deliveryform')}>
//             <img src={bike} alt="bike"/>
//             <h3>Delivery</h3>
//             <p>Send / Receive Items</p>
//         </Delivery>
   
//     </Container>
//   );



useEffect(() => {
  if (!userInfo || !userInfo.id) return;

  const ongoingRidesRef = ref(database, "ongoingRides");

  // Listen for changes in ongoing rides for this user
  const unsubscribe = onValue(ongoingRidesRef, (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
      const ongoingRides = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((ride) => String(ride.user_id) === String(userInfo.id)); // Ensure correct type comparison

      console.log("User's ongoing rides:", ongoingRides); // ✅ Debugging: Check user's rides
     
      if (ongoingRides.length > 0) {
        setOngoingRideInfo(ongoingRides[0]); // ✅ Set the first ride (modify if multiple needed)
        setRideInfo(prev => !prev);
        fetchOngoingRides2();
        Swal.fire({text:"Ongoing ride", allowOutsideClick:false}).then((result)=>{if(result.isConfirmed){setRideInfo(prev=>!prev)}})
        dispatch(startRideB());
        dispatch(updateBookingNumber(ongoingRides[0].booking_number));

      } else {
        setOngoingRideInfo(null);
      }
    } else {
      setOngoingRideInfo(null); // No ongoing rides found
    }
  });

  return () => unsubscribe(); // ✅ Cleanup listener when component unmounts
}, [userInfo]); // ✅ Reacts to `userInfo` updates







useEffect(() => {
    if (!userInfo || !userInfo.id || !bookingNumber) return;
  
    const completedRidesRef = ref(database, "completedRides");
  
    // Listen for changes in completed rides for this user
    const unsubscribe = onValue(completedRidesRef, (snapshot) => {
      const data = snapshot.val();

    //   console.log(data)
  
      if (data) {
        const completedRide = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .find((ride) => 
            String(ride.user_id) === String(userInfo.id) &&
            String(ride.booking_number) === String(bookingNumber) // Match booking number
          );
  
        // console.log("User's specific completed ride:", completedRide); // ✅ Debugging
  
        if (completedRide) {
          setCompletedRideInfo(completedRide); 
          console.log(completedRide)// ✅ Set the specific completed ride
          setRideInfo(!null);
          dispatch(stopRideB());
        } else {
          setCompletedRideInfo(null); // No matching ride found
        }
      } else {
        setCompletedRideInfo(null); // No data found
      }
    });
  
    return () => unsubscribe(); // ✅ Cleanup listener when component unmounts
  }, [userInfo, bookingNumber]); // ✅ Reacts to `userInfo` and `bookingNumber`
  



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@22 ride auto calculation and update
// number 1
const [rideUpdate, setRideUpdate] = useState({
    location: null,
    distance: 0,
    amount: 0,
  });
  const [startLocation, setStartLocation] = useState(null); // Start location
  const [currentLocation, setCurrentLocation] = useState(null); // Current location of the driver
  const ratePerKm = rates; // Example rate per km, adjust accordingly

// number 2
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        
        if (startLocation) {
          const distance = calculateDistance(
            startLocation.latitude,
            startLocation.longitude,
            latitude,
            longitude
          );
          setRideUpdate((prevState) => ({
            ...prevState,
            location: `${latitude}, ${longitude}`,
            distance: distance,
            amount: distance * ratePerKm, // Calculate amount based on distance
          }));
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  

// number3
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  
// number 4
  useEffect(() => {
    const intervalId = setInterval(getCurrentLocation, 3000); // Update every 3 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [startLocation]);
  


//   number 5
const fetchOngoingRides2 = async () => {
    try {
      const ridesRef = ref(database, "ongoingRides"); // Fetch from ongoingRides table
      const snapshot = await get(ridesRef);
      
      if (snapshot.exists()) {
        const ridesData = snapshot.val();
        
        // Filter ongoing rides for the specific driver
        const driverRides = Object.keys(ridesData)
          .map((key) => ({
            id: key,
            ...ridesData[key],
          }))
          .filter((ride) => {
            return String(ride.user_id) === String(userInfo.id) && ride.ride_status === "accepted"; // Ensuring we're looking at ongoing rides
          });
  
        if (driverRides.length > 0) {
          // Set start location from the ongoing ride's pickup location
          const ongoingRide = driverRides[0];
          setStartLocation({
            latitude: ongoingRide.pickup_lat,
            longitude: ongoingRide.pickup_lng,
          });
  
          console.log(ongoingRide);
        //   alert("Start location picked for ongoing ride");
        } else {
          console.log("No ongoing rides for this driver.");
        }
      }
    } catch (error) {
      console.error("Error fetching ongoing rides:", error);
    }
  };


  useEffect(()=>{
    fetchOngoingRides2()
  },[])




const resetDisplays = ()=>{
    dispatch(updateBookingNumber(null));
    window.location.reload();
}




// subscribe to canceled ride
useEffect(() => {
  if (!userInfo || !userInfo.id) return;

  const cancelledRidesRef = ref(database, `cancelledRides`);

  // Listen for cancellations relevant to the current user
  const unsubscribe = onValue(cancelledRidesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const userCancelledRides = Object.keys(data)
        .map((key) => ({ id: key, ...data[key] }))
        .filter((ride) => ride.user_id === userInfo.id);

      if (userCancelledRides.length > 0) {
        console.log(userCancelledRides)
        // Show alert or update UI
        Swal.fire({title:"Ride Cancelled", 
        text:"Your ride has been cancelled.",
        icon: "info", 
        allowOutsideClick:false,
      }).then((result)=>{if(result.isConfirmed){deleteCancelledRide(userCancelledRides[0]?.id);}})
        setRideInfo(null); // Clear the current ride info
      }
    }
  });


  // delete from cancelled rides
  const deleteCancelledRide = (rideId) => {
    const cancelledRideRef = ref(database, `cancelledRides/${rideId}`);
  
    remove(cancelledRideRef)
      .then(() => {
        // Swal.fire("Deleted", "Cancelled ride has been removed.", "success");
         // Clear ride details
         dispatch(updateBookingNumber(null));
         setRideInfo(null);
         window.location.reload();
    
      })
      .catch((error) => {
        console.error("Error deleting cancelled ride:", error);
        Swal.fire("Error", "Failed to delete cancelled ride.", "error");
      });
  };
  

  return () => unsubscribe(); // Cleanup listener
}, [userInfo]);




return (
    <Container>
      <Name>
        <h3>Hi {userInfo.name},</h3> 
        <img src={taxi} alt='im'/>
        <p>"Your journey, your time—book a ride with LeosDrive and travel in comfort!"</p>
        <img src={taxigif} alt='im'/>
        <p>"From pickup to destination, we drive your moments. Ride with LeosDrive today!"</p>
        <img src={bike} alt='im'/>
        <p> "Swift, secure, and seamless—LeosDrive delivers more than just packages; we deliver peace of mind!"</p>
      </Name>
  
      {bookingNumber ? (
        <div className="ride-details-container">
          {rideInfo=== null &&  
            <>  
              <h2>{messages[messageIndex]}</h2>
              <p>Looking for a driver...</p>
              <div className="loading-container">
                <img src={taxi} alt="Taxi Loading" className="moving-car" />
              </div>
              <button className="cancel-button" onClick={handleCancelRide}>
                Cancel
              </button>
            </>} 
            
            {rideInfo?.ride_status === "accepted"&&
            <>  
              <h2>🚖 Ride Accepted!</h2>
              <p>Your driver is on the way.</p>
              <div className="driver-info">
                <p>
                  <FaUser /> {rideInfo?.driver_name}
                </p>
                <p>
                  <FaPhone /> {rideInfo?.driver_phone}
                </p>
                <p>
                  <FaCar /> {rideInfo?.vehicle}
                </p>
                <p>
                  <FaIdCard/> {rideInfo?.plate_number}
                </p>
                <button className="cancel-button" onClick={handleCancelRide2}>
                  Cancel
                </button>
              </div>
            </>}


            {ongoingRideInfo &&
            <>  
              <h2>🚖 Ride Ongoing!</h2>
              <p>Your ride is in progress....</p>
              <div className="driver-info">
                <p>
                  <FaUser /> {ongoingRideInfo?.driver_name}
                </p>
                <p>
                  <FaPhone /> {ongoingRideInfo?.driver_phone}
                </p>
                <p>
                  <FaCar /> {ongoingRideInfo?.vehicle}
                </p>
                <p>
                  <FaIdCard/> {ongoingRideInfo?.plate_number}
                </p>

                <img src={taxigif} alt='taxigif' style={{width:"100px"}}/>
                {/* <button className="cancel-button" onClick={handleCancelRide2}>
                  Cancel
                </button> */}

                <PassengerDetails>
                    <strong>Ride Updates</strong>
                    {/* <RideInfo><strong>Current Location:</strong> {rideUpdate.location}</RideInfo> */}
                    {/* <RideInfo><strong>Distance Covered:</strong> {rideUpdate.distance}</RideInfo> */}
                    <RideInfo>
  <strong>Start Time:</strong> {new Date(rideStartB).toLocaleTimeString()}
</RideInfo>
                  
                    <RideInfo>
  <strong>Current Time:</strong> {new Date().toLocaleTimeString()}
</RideInfo> 

<RideInfo>
  <strong>Elapsed Time:</strong> {formatTime(elapsedTimeB)}
</RideInfo>  
                    <RideInfo><strong>Current Amount:</strong> NGN {(rates*elapsedTimeB).toFixed(2)}</RideInfo>
                    
                </PassengerDetails>

              </div>
            </>}



            {completedRideInfo &&
            <>  
              <h2>🚖 Ride Completed!</h2>
              <p>Your ride is completed</p>
              <div className="driver-info">
                <p>
                  <FaUser /> {completedRideInfo?.driver_name}
                </p>
                <p>
                  <FaPhone /> {completedRideInfo?.driver_phone}
                </p>
                <p>
                  <FaCar /> {completedRideInfo?.vehicle}
                </p>
                <p>
                  <FaIdCard/> {completedRideInfo?.plate_number}
                </p>

                
                

                <PassengerDetails>
                    <strong>Ride Updates</strong>
                   <RideInfo><strong>Booking Number: </strong> {completedRideInfo.booking_number}</RideInfo>
          {/* <RideInfo><strong>Pickup Location:</strong> {ride.pickup_lat}, {ride.pickup_lng}</RideInfo> */}
          <RideInfo><strong>Pickup Location: </strong> {completedRideInfo.pickup_location}</RideInfo>
          <RideInfo><strong>Drop-off Location: </strong> {completedRideInfo.drop_off}</RideInfo>
          {/* <RideInfo><strong>Distance Covered:</strong> {ride.final_distance} km</RideInfo> */}
          <RideInfo><strong>Start Time: </strong> {completedRideInfo.start_time}</RideInfo>
          <RideInfo><strong>Duration: </strong> {completedRideInfo.ride_duration}</RideInfo>
          <RideInfo><strong>End Time: </strong> {completedRideInfo.end_time}</RideInfo>
        <RideInfo><strong>Amount: </strong> <Amount>NGN {parseFloat(completedRideInfo.final_amount).toFixed(2)}</Amount></RideInfo>
        {/* <RideInfo><strong>Status: </strong> <Status status={completedRideInfo.ride_status}>{completedRideInfo.ride_status}</Status></RideInfo> */}
         
                </PassengerDetails>

                <button className="cancel-button" onClick={resetDisplays}>
                  Ok
                </button>

              </div>
            </>}
          
          
        </div>
      ) : (
        <Form>
          <Title>Book a Ride</Title>
          <p><FaMapMarkerAlt /> From: </p>
          {/* <Input type="text" value={pickupCoords} disabled /> */}
          <Input 
             type="text"
             placeholder="Enter Pick up Location"
             value={pickUpLocation}
             onChange={(e) => setPickupLocation(e.target.value.toUpperCase())}
          />
          <p><FaLocationArrow /> To: </p>
          <Input  
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
          />
          
          <Button onClick={handleBookRide}>
            <img src={taxi} alt="taxi" />
            <p>Let's Go</p>
          </Button>
        </Form>
      )}
  
      <Delivery onClick={() => navigate(`/userdashboard/deliveryform/${userInfo.id}`)}>
        <img src={bike} alt="bike"/>
        <h3>Delivery</h3>
        <p>Send / Receive Items</p>
      </Delivery>

      <Delivery onClick={() => navigate(`/userdashboard/foodform/${userInfo.id}`)}>
        <img src={foodbike} alt="bike"/>
        <h3>Food Delivery</h3>
        <p>Receive instant food Delivery</p>
      </Delivery>
    </Container>
  );
  

};

export default BookARide;








// import React, { useState, useEffect } from "react";
// import { FaLocationArrow, FaMapMarkerAlt, FaUser, FaPhone, FaCar } from "react-icons/fa";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import taxi from '../Images/taxi.png';
// import bike from '../Images/bike.png';
// import { useDispatch, useSelector } from "react-redux";
// import { updateBookingNumber } from "../Features/Slice";
// import { useNavigate } from "react-router-dom";
// import { database } from "./firebaseConfig";
// import { ref, set, push, onValue } from "firebase/database";

// const Container = styled.div`
//   display: flex;
//   height: 100%;
//   padding:30px 30px;
//   background-color: #f4f4f4;
//   gap:50px;
// `;

// const Form = styled.div`
//   padding: 20px;
//   border-radius: 8px;
//   width: 100%;
//   max-width: 400px;
//   text-align: center;
// `;

// const Title = styled.h2`
//   margin-bottom: 15px;
//   font-size: 1.5rem;
//   color: #333;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;
//   outline:none;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background: #fe7c04;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   display:flex;
//   justify-content:center;     
//   align-items:center;
//   gap:20px;
//   p{
//     font-weight:bold;
//     font-size:1.2rem;
//   }
//   img{
//     width:100px;
//   }

//   &:hover {
//     background: orange;
//   }
// `;

// const Delivery = styled.div`
//   display:flex;
//   flex-direction:column;
//   width:250px;
//   height:250px;
//   justify-content:center;
//   align-items:center;
//   background:lightgray;
//   border-radius:20px;
//   cursor:pointer;
//   margin-top:30px;

//   &:hover{
//     background:orange;
//     color:white;
//   }

//   img{
//     width:150px;
//   }
// `;

// const Name = styled.div`
//   background:rgba(0,0,0,0.3);
//   color:white;
//   padding:10px;
//   border-radius:10px;
//   width:20%;
// `;

// const messages = [
//   "Looking for the nearest taxi... 🚖",
//   "Finding the best route for you... 🗺️",
//   "Almost there! Just a moment... ⏳",
//   "Connecting you to a driver... 📞"
// ];

// const BookARide6 = () => {
//   const [pickupCoords, setPickupCoords] = useState("Fetching location...");
//   const [destination, setDestination] = useState("");
//   const [slideSwitch, setSlideSwitch] = useState(0);
//   const [messageIndex, setMessageIndex] = useState(0);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const userInfo = useSelector(state => state.userInfo);
//   const dispatch = useDispatch();
//   const bookingNumber = useSelector(state => state.bookingNumber);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//           const { latitude, longitude } = position.coords;
//           setPickupCoords(`Lat: ${latitude}, Lng: ${longitude}`);
//         },
//         () => {
//           setLatitude(null);
//           setLongitude(null);
//         }
//       );
//     }
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//     }, 4000); // Change message every 4 seconds

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);

//   const generateBookingNumber = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const handleBookRide = async () => {
//     if (!destination) {
//       Swal.fire({ text: "Please enter your destination!", icon: "warning", timer: 2000 });
//       return;
//     }

//     if (latitude === null || longitude === null) {
//       Swal.fire({ text: "Fetching your location. Please wait!", icon: "info", timer: 2000 });
//       return;
//     }

//     // Generate booking number
//     const bookingNumber = generateBookingNumber();

//     // Create ride details
//     const rideDetails = {
//       user_id: userInfo.id, // Replace with actual user ID
//       pickup_lat: latitude,
//       pickup_lng: longitude,
//       drop_off: destination,
//       ride_status: "pending",
//       booking_number: bookingNumber,
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       // Save ride details in Firebase
//       const rideRef = push(ref(database, "rides")); // Creates a unique key for each ride
//       await set(rideRef, rideDetails);

//       // Show success message
//       Swal.fire({ text: `Ride booked! Booking No: ${bookingNumber}`, icon: "success", timer: 3000 });

//       setDestination(""); // Reset destination input
//       setSlideSwitch(2);
//       dispatch(updateBookingNumber(bookingNumber));
//     } catch (error) {
//       console.error("Booking error:", error);
//       Swal.fire("Error", "Failed to save ride in database", "error");
//     }
//   };

//   const handleCancelRide = () => {
//     Swal.fire({
//       text: "Are you sure you want to cancel this ride?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Cancel",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Delete ride from Firebase
//         const rideRef = ref(database, `rides/${bookingNumber}`);
//         set(rideRef, null) // Deletes ride from database
//           .then(() => {
//             Swal.fire({
//               text: "The Ride has been Cancelled",
//               icon: "success",
//               timer: 2000,
//               showConfirmButton: false,
//             });

//             // Clear ride details
//             dispatch(updateBookingNumber(null));
//           })
//           .catch((error) => {
//             console.error("Error cancelling ride:", error);
//             Swal.fire("Error", "Could not cancel ride", "error");
//           });
//       }
//     });
//   };

//   const [rideInfo, setRideInfo] = useState(null);

//   useEffect(() => {
//     if (!bookingNumber) return;

//     // Reference the ride in Firebase
//     const rideRef = ref(database, `rides/${bookingNumber}`);

//     // Listen for changes
//     const unsubscribe = onValue(rideRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setRideInfo(data);
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, [bookingNumber]);

//   return (
//     <Container>
//       <Name>
//         <p>Hi {userInfo.name}</p>
//       </Name>

//       {rideInfo ? (
//         <div className="ride-details-container">
//           {rideInfo.ride_status === "pending" ? (
//             <>
//               <h2>{messages[messageIndex]}</h2>
//               <p>Looking for a driver...</p>
//               <div className="loading-container">
//                 <img src={taxi} alt="Taxi Loading" className="moving-car" />
//               </div>
//               <button className="cancel-button" onClick={handleCancelRide}>Cancel</button>
//             </>
//           ) : (
//             <>
//               <h2>🚖 Ride Accepted!</h2>
//               <p>Your driver is on the way.</p>
//               <div className="driver-info">
//                 <p><FaUser /> {rideInfo.driver_name}</p>
//                 <p><FaPhone /> {rideInfo.driver_phone}</p>
//                 <p><FaCar /> {rideInfo.vehicle}</p>
//                 <button className="cancel-button" onClick={handleCancelRide}>Cancel</button>
//               </div>
//             </>
//           )}
//         </div>
//       ) : (
//         <Form>
//           <Title>Book a Ride</Title>
//           <p><FaMapMarkerAlt /> Your Destination</p>
//           <Input type="text" placeholder="Enter Destination" value={destination} onChange={(e) => setDestination(e.target.value.toUpperCase())} />
//           <p><FaLocationArrow /> Your Location</p>
//           <Input type="text" value={pickupCoords} disabled />
//           <Button onClick={handleBookRide}><img src={taxi} alt="taxi" /> <p>Let's Go</p></Button>
//         </Form>
//       )}

//       <Delivery onClick={() => navigate('/userdashboard/deliveryform')}>
//         <img src={bike} alt="bike" />
//         <h3>Delivery</h3>
//         <p>Send / Receive Items</p>
//       </Delivery>
//     </Container>
//   );
// };

// export default BookARide6;

