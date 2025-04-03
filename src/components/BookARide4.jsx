// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import "./CSS/BookARide3.css"; // External CSS
// import taxi from '../Images/taxi.png'
// import Swal from "sweetalert2";
// import { useEffect } from "react";
// import { FaExpandArrowsAlt, FaPhone, FaWindowMaximize, FaWindowMinimize } from "react-icons/fa";

// const mapContainerStyle = {
//   width: "100%",
//   height: "100vh",
// };

// const center = {
//   lat: 37.7749, // Default center (San Francisco)
//   lng: -122.4194,
// };

// const messages = [
//     "Looking for the nearest taxi... 🚖",
//     "Finding the best route for you... 🗺️",
//     "Almost there! Just a moment... ⏳",
//     "Connecting you to a driver... 📞"
//   ];

// const BookARide4 = () => {
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
//       <div className="map-container">
//         {/* <LoadScript googleMapsApiKey="AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU"> */}
//         <LoadScript googleMapsApiKey="AIzaSyCnazeloaIQpaDPou1YTl1hEbAe1II73GA">
//           <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
//             <Marker position={center} />
//           </GoogleMap>
//         </LoadScript>
//       </div>

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

// export default BookARide4;








// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// // Set default map container style
// const mapContainerStyle = {
//   width: "100%",
//   height: "400px",
// };

// // Set default center position (Uluru)
// const center = {
//   lat: -25.344,
//   lng: 131.031,
// };

// const GoogleMapComponent = () => {
//   const [map, setMap] = useState(null);

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={10}
//         onLoad={(map) => setMap(map)}
//       >
//         {/* Marker at Uluru */}
//         <Marker position={center} title="Uluru" />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default GoogleMapComponent;






// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const center = {
//   lat: -25.344,
//   lng: 131.031,
// };

// const GOOGLE_MAPS_API_KEY = "AIzaSyCnazeloaIQpaDPou1YTl1hEbAe1II73GA"; // Replace with your actual API key

// const GoogleMapComponent = () => {
//   return (
//     <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
//         <Marker position={center} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default GoogleMapComponent;




// import React, { useState, useRef } from "react";
// import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";
// import Swal from "sweetalert2";
// import "./CSS/BookARide3.css";
// import taxi from "../Images/taxi.png";
// import { FaPhone } from "react-icons/fa";


// const libraries = ["places"]; // Load the "places" library for Autocomplete

// const mapContainerStyle = {
//   width: "100%",
//   height: "100vh",
// };

// const center = {
//   lat: 37.7749,
//   lng: -122.4194,
// };

// const BookARide4 = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyCnazeloaIQpaDPou1YTl1hEbAe1II73GA",  //clents api key
//     // googleMapsApiKey: "AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU",
//     libraries,
//   });

//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [rideDetails, setRideDetails] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [showPhone, setShowPhone] = useState(false);

//   const pickupRef = useRef(null);
//   const destinationRef = useRef(null);

//   const handleBookRide = () => {
//     if (!pickup || !destination) {
//       Swal.fire({ text: "Please enter both pickup and destination!", showConfirmButton: false, timer: 2000 });
//       return;
//     }

//     const service = new window.google.maps.DirectionsService();
//     service.route(
//       {
//         origin: pickupRef.current.value,
//         destination: destinationRef.current.value,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === "OK") {
//           setDirections(result);
//           setRideDetails({
//             pickup: pickupRef.current.value,
//             destination: destinationRef.current.value,
//             price: Math.floor(Math.random() * 50) + 10,
//             driver: "John Doe",
//             car: "Toyota Prius",
//             plate: "XYZ 1234",
//             phone: "123456789",
//           });
//         } else {
//           Swal.fire({ text: "Could not find a route!", icon: "error" });
//         }
//       }
//     );
//   };

//   return (
//     <div className="book-ride-container">
//       <div className="map-container">
//         {isLoaded ? (
//           <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
//             {directions && <DirectionsRenderer directions={directions} />}
//           </GoogleMap>
//         ) : (
//           <p>Loading Map...</p>
//         )}
//       </div>

//       <div className="right-container">
//         {isLoaded && ( // Ensure API is loaded before rendering Autocomplete
//           <div className="form-container">
//             <h2>BOOK A RIDE</h2>
//             <Autocomplete>
//               <input type="text" placeholder="Enter Pickup Location" ref={pickupRef} />
//             </Autocomplete>
//                <Autocomplete>
//               <input type="text" placeholder="Enter Destination" ref={destinationRef} />
//             </Autocomplete>
//             <button onClick={handleBookRide}>Let's Go</button>
//           </div>
//         )}

//         {rideDetails && (
//           <div className="ride-details-container">
//             <h2>Ride Confirmed</h2>
//             <p><strong>Pickup:</strong> {rideDetails.pickup}</p>
//             <p><strong>Destination:</strong> {rideDetails.destination}</p>
//             <p><strong>Driver:</strong> {rideDetails.driver}</p>
//             <p><strong>Car:</strong> {rideDetails.car}</p>
//             <p><strong>Plate:</strong> {rideDetails.plate}</p>

//             <button className="cancel-button" style={{ backgroundColor: "#FE7C04" }} onClick={() => setShowPhone(!showPhone)}>
//               <FaPhone /> Call Driver
//             </button>
//             {showPhone && <p style={{ color: "#FE7C04" }}><strong>{rideDetails.phone}</strong></p>}

//             <button className="cancel-button" onClick={() => setRideDetails(null)}>
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookARide4;
