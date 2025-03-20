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

// const BookARide3 = () => {
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
//         <LoadScript googleMapsApiKey="AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU">
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

// export default BookARide3;



// map box #######################################################################################33333
// import React, { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import "./CSS/BookARide3.css";
// import taxi from "../Images/taxi.png";
// import { FaWindowMinimize, FaWindowMaximize } from "react-icons/fa";




// // ✅ Set Your Mapbox Token
// mapboxgl.accessToken = "pk.eyJ1IjoidmljdGhlcmljaCIsImEiOiJjbThhMmJkZm4wOTlsMmpzNW9tcWJmZTZ1In0.sD9l8PZ7mZx7cDfG2eBz3g";

// // ✅ Check if WebGL is supported
// if (!mapboxgl.supported({ failIfMajorPerformanceCaveat: false })) {
//   alert("Your browser does not support WebGL properly. Please update your browser.");
// }

// const messages = [
//   "Looking for the nearest taxi... 🚖",
//   "Finding the best route for you... 🗺️",
//   "Almost there! Just a moment... ⏳",
//   "Connecting you to a driver... 📞",
// ];

// const BookARide3 = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [pickupCoords, setPickupCoords] = useState(null);
//   const [destinationCoords, setDestinationCoords] = useState(null);
//   const [rideDetails, setRideDetails] = useState(null);
//   const [slideSwitch, setSlideSwitch] = useState(0);
//   const [messageIndex, setMessageIndex] = useState(0);
//   const [classA, setClassA] = useState(false);
//   const mapContainer = useRef(null);
//   const map = useRef(null);


//   // Define Refs at the start
// // const mapContainerRef = useRef(null);
// // const pickupInputRef = useRef(null);
// // const destinationInputRef = useRef(null);

//   useEffect(() => {
//     // Initialize Mapbox Map
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [-122.4194, 37.7749], // Default center (San Francisco)
//       zoom: 12,
//     });

//     // ✅ Add Pickup Location Autocomplete
//     const pickupGeocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       placeholder: "Enter Pickup Location",
//       mapboxgl: mapboxgl,
//     });
//     map.current.addControl(pickupGeocoder, "top-left");

//     pickupGeocoder.on("result", (e) => {
//       setPickup(e.result.place_name);
//       setPickupCoords(e.result.geometry.coordinates);
//     });

//     // ✅ Add Destination Location Autocomplete
//     const destinationGeocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       placeholder: "Enter Destination",
//       mapboxgl: mapboxgl,
//     });
//     map.current.addControl(destinationGeocoder, "top-right");

//     destinationGeocoder.on("result", (e) => {
//       setDestination(e.result.place_name);
//       setDestinationCoords(e.result.geometry.coordinates);
//     });

//     return () => map.current.remove();
//   }, []);



//   // useEffect(() => {
//   //   // ✅ Ensure WebGL works (prevents WebGL initialization errors)
//   //   if (!mapboxgl.supported({ failIfMajorPerformanceCaveat: false })) {
//   //     alert("Your browser does not fully support WebGL. Please update your browser.");
//   //     return;
//   //   }

//   //   // ✅ Initialize Map
//   //   const map = new mapboxgl.Map({
//   //     container: mapContainerRef.current,
//   //     style: "mapbox://styles/mapbox/streets-v11",
//   //     center: [3.3792, 6.5244], // Lagos, Nigeria
//   //     zoom: 12,
//   //   });

//   //   // ✅ Initialize Pickup Geocoder
//   //   const pickupGeocoder = new MapboxGeocoder({
//   //     accessToken: mapboxgl.accessToken,
//   //     types: "address,street,place",
//   //     countries: "NG",
//   //     bbox: [2.6769, 4.1826, 5.8987, 6.6853], // Lagos bounding box
//   //     proximity: { longitude: 3.3792, latitude: 6.5244 },
//   //     mapboxgl: mapboxgl,
//   //   });

//   //   // ✅ Initialize Destination Geocoder
//   //   const destinationGeocoder = new MapboxGeocoder({
//   //     accessToken: mapboxgl.accessToken,
//   //     types: "address,street,place",
//   //     countries: "NG",
//   //     bbox: [2.6769, 4.1826, 5.8987, 6.6853], // Lagos bounding box
//   //     proximity: { longitude: 3.3792, latitude: 6.5244 },
//   //     mapboxgl: mapboxgl,
//   //   });

//   //   // ✅ Attach geocoders to input fields
//   //   if (pickupInputRef.current) {
//   //     pickupInputRef.current.appendChild(pickupGeocoder.onAdd(map));
//   //   }
//   //   if (destinationInputRef.current) {
//   //     destinationInputRef.current.appendChild(destinationGeocoder.onAdd(map));
//   //   }

//   //   return () => {
//   //     map.remove(); // Cleanup on unmount
//   //   };
//   // }, []);


//   // 🚖 Handle Ride Booking
//   const handleBookRide = () => {
//     if (!pickup || !destination || !pickupCoords || !destinationCoords) {
//       Swal.fire({ text: "Please enter both pickup and destination!", showConfirmButton: false, timer: 2000 });
//       return;
//     }

//     setSlideSwitch(1);

//     // ✅ Calculate Distance & Price
//     const distance = getDistanceFromCoords(pickupCoords, destinationCoords);
//     const price = (distance * 2).toFixed(2); // $2 per km

//     setRideDetails({
//       pickup,
//       destination,
//       price,
//       driver: "John Doe",
//       car: "Toyota Prius",
//       plate: "XYZ 1234",
//     });

//     // Draw Route on Map
//     drawRoute(pickupCoords, destinationCoords);
//   };

//   // 🗺️ Function to Draw Route on Map
//   const drawRoute = (start, end) => {
//     axios
//       .get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?access_token=${mapboxgl.accessToken}`)
//       .then((res) => {
//         const route = res.data.routes[0].geometry;
//         map.current.getSource("route")?.setData({ type: "Feature", geometry: route });
//       })
//       .catch((err) => console.error("Error fetching route:", err));
//   };

//   // 📏 Function to Calculate Distance
//   const getDistanceFromCoords = (coord1, coord2) => {
//     const R = 6371; // Earth's radius in km
//     const dLat = (coord2[1] - coord1[1]) * (Math.PI / 180);
//     const dLon = (coord2[0] - coord1[0]) * (Math.PI / 180);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(coord1[1] * (Math.PI / 180)) * Math.cos(coord2[1] * (Math.PI / 180)) *
//               Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
//   };

//   return (
//     <div className="book-ride-container">
//       {/* Left: Map */}
//       <div className="map-container" ref={mapContainer}></div>

//       {/* Right: Booking Form */}
//       <div className={classA ? "right-container2" : "right-container"}>
//         <div className="MinMaxWrap">
//           <FaWindowMinimize className="MinmaxIcon" onClick={() => setClassA(true)} />
//           <FaWindowMaximize className="MinmaxIcon" onClick={() => setClassA(false)} />
//         </div>

//         {slideSwitch === 0 && (
//           <div className="form-container">
//             <h2>BOOK A RIDE</h2>
//             <button className="LetsGoWrap" onClick={handleBookRide}>
//               <img src={taxi} alt="taxi" />
//               <p>Let's Go</p>
//             </button>
//           </div>
//         )}

//         {slideSwitch === 1 && rideDetails && (
//           <div className="ride-details-container">
//             <h2>Loe'sDrive Standard</h2>
//             <p><strong>Pickup:</strong> {rideDetails.pickup}</p>
//             <p><strong>Destination:</strong> {rideDetails.destination}</p>
//             <p><strong>Fare:</strong> ${rideDetails.price}</p>
//             <button className="confirm-button" onClick={() => setSlideSwitch(2)}>Confirm Ride</button>
//             <button className="cancel-button" onClick={() => setSlideSwitch(0)}>Cancel</button>
//           </div>
//         )}

//         {slideSwitch === 2 && (
//           <div className="ride-details-container">
//             <h2>{messages[messageIndex]}</h2>
//             <p>Please wait...</p>
//             <button className="cancel-button" onClick={() => setSlideSwitch(0)}>Cancel</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookARide3;






import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import Swal from "sweetalert2";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onChildAdded } from "firebase/database";
import "./CSS/BookARide3.css";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Gx2N5mBak4JNfCn-nu6WAqOq_TzGL5w",
  authDomain: "taxi-app-d0c51.firebaseapp.com",
  databaseURL: "https://taxi-app-d0c51-default-rtdb.firebaseio.com",
  projectId: "taxi-app-d0c51",
  storageBucket: "taxi-app-d0c51.firebasestorage.app",
  messagingSenderId: "303341809766",
  appId: "1:303341809766:web:a36b558c086282c28c7da7",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ Google Maps Configuration
const googleMapsApiKey = "AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU";
const mapContainerStyle = { width: "100%", height: "100vh" };
const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco

const BookARide3 = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // ✅ Handle Google Maps loading
  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  const onLoadPickup = (autocomplete) => setPickupAutocomplete(autocomplete);
  const onLoadDestination = (autocomplete) => setDestinationAutocomplete(autocomplete);

  // ✅ Fix: Check if `window.google` is available
  const onPlaceChangedPickup = () => {
    if (pickupAutocomplete && window.google) {
      const place = pickupAutocomplete.getPlace();
      if (!place.geometry) return;
      setPickup(place.formatted_address);
      setPickupLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const onPlaceChangedDestination = () => {
    if (destinationAutocomplete && window.google) {
      const place = destinationAutocomplete.getPlace();
      if (!place.geometry) return;
      setDestination(place.formatted_address);
      setDestinationLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  return (
    <div className="book-ride-container">
      {/* ✅ Load Google Maps first */}
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]} onLoad={handleScriptLoad}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={12}>
          {pickupLocation && <Marker position={pickupLocation} />}
          {destinationLocation && <Marker position={destinationLocation} />}
        </GoogleMap>
      </LoadScript>

      {/* ✅ Only render Autocomplete when Google Maps is loaded */}
      {isScriptLoaded && (
        <div className="ride-form">
          <h2>Book a Ride</h2>

          <Autocomplete onLoad={onLoadPickup} onPlaceChanged={onPlaceChangedPickup}>
            <input type="text" placeholder="Enter Pickup Location" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </Autocomplete>

          <Autocomplete onLoad={onLoadDestination} onPlaceChanged={onPlaceChangedDestination}>
            <input type="text" placeholder="Enter Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
          </Autocomplete>

          <button className="confirm-button" onClick={() => alert("Ride Booked!")}>Book Ride</button>
        </div>
      )}
    </div>
  );
};

export default BookARide3;
