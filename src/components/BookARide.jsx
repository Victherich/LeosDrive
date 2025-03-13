// // import React, { useState } from "react";
// // import styled from "styled-components";
// // import { FaMapMarkerAlt, FaCar, FaCreditCard, FaClock } from "react-icons/fa";

// // const DashboardContainer = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: flex-start;
// //   height: 100vh;
// //   width: 100%;
// //   background: white;
// //   color: black;
// //   padding: 20px;
// // `;

// // const Title = styled.h1`
// //   font-size: 2rem;
// //   color: rgba(0, 0, 255, 0.5);
// //   margin-bottom: 20px;
// // `;

// // const InputWrapper = styled.div`
// //   display: flex;
// //   align-items: center;
// //   background: #e0e0e0;
// //   padding: 10px;
// //   border-radius: 5px;
// //   margin-bottom: 15px;
// //   width: 100%;
// //   max-width: 400px;
// // `;

// // const Icon = styled.div`
// //   color: rgba(0, 0, 255, 0.5);
// //   margin-right: 10px;
// // `;

// // const Input = styled.input`
// //   flex: 1;
// //   border: none;
// //   background: transparent;
// //   outline: none;
// //   font-size: 1rem;
// //   padding: 5px;

// //   ::placeholder {
// //     color: rgba(0, 0, 0, 0.6);
// //   }
// // `;

// // const RideOptions = styled.div`
// //   display: flex;
// //   gap: 10px;
// //   margin: 20px 0;
// // `;

// // const RideOption = styled.button`
// //   padding: 10px;
// //   border: 1px solid rgba(0, 0, 255, 0.5);
// //   background: white;
// //   cursor: pointer;
// //   border-radius: 8px;

// //   &:hover {
// //     background: rgba(0, 0, 255, 0.1);
// //   }
// // `;

// // const Button = styled.button`
// //   background: rgba(0, 0, 255, 0.5);
// //   color: white;
// //   padding: 12px 24px;
// //   font-size: 1rem;
// //   font-weight: bold;
// //   border: none;
// //   border-radius: 25px;
// //   cursor: pointer;
// //   transition: background 0.3s ease;
// //   width: 100%;
// //   max-width: 300px;

// //   &:hover {
// //     background: rgba(0, 0, 255, 0.7);
// //   }
// // `;

// // const BookARide = () => {
// //   const [pickup, setPickup] = useState("");
// //   const [destination, setDestination] = useState("");
// //   const [selectedRide, setSelectedRide] = useState(null);
// //   const [isConfirmed, setIsConfirmed] = useState(false);

// //   const rideOptions = [
// //     { type: "Standard", icon: <FaCar />, price: "$10" },
// //     { type: "XL", icon: <FaCar />, price: "$15" },
// //     { type: "Luxury", icon: <FaCar />, price: "$25" },
// //   ];

// //   const handleConfirm = () => {
// //     if (pickup && destination && selectedRide) {
// //       setIsConfirmed(true);
// //     } else {
// //       alert("Please enter details and select a ride.");
// //     }
// //   };

// //   return (
// //     <DashboardContainer>
// //       <Title>User Dashboard</Title>

// //       {/* Pickup & Destination */}
// //       <InputWrapper>
// //         <Icon>
// //           <FaMapMarkerAlt />
// //         </Icon>
// //         <Input
// //           type="text"
// //           placeholder="Enter Pickup Location"
// //           value={pickup}
// //           onChange={(e) => setPickup(e.target.value)}
// //         />
// //       </InputWrapper>

// //       <InputWrapper>
// //         <Icon>
// //           <FaMapMarkerAlt />
// //         </Icon>
// //         <Input
// //           type="text"
// //           placeholder="Enter Destination"
// //           value={destination}
// //           onChange={(e) => setDestination(e.target.value)}
// //         />
// //       </InputWrapper>

// //       {/* Ride Selection */}
// //       <h3>Select a Ride</h3>
// //       <RideOptions>
// //         {rideOptions.map((ride, index) => (
// //           <RideOption
// //             key={index}
// //             onClick={() => setSelectedRide(ride)}
// //             style={{
// //               background: selectedRide?.type === ride.type ? "rgba(0, 0, 255, 0.2)" : "white",
// //             }}
// //           >
// //             {ride.icon} {ride.type} - {ride.price}
// //           </RideOption>
// //         ))}
// //       </RideOptions>

// //       {/* Confirm Button */}
// //       {!isConfirmed ? (
// //         <Button onClick={handleConfirm}>Confirm Ride</Button>
// //       ) : (
// //         <h3>✅ Ride Confirmed! Driver on the way.</h3>
// //       )}
// //     </DashboardContainer>
// //   );
// // };

// // export default BookARide;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { FaMapMarkerAlt, FaCar, FaCreditCard, FaClock } from "react-icons/fa";
// import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
// import MapComponent from "./MapComponent";

// // Styled Components
// const DashboardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   height: 100vh;
//   width: 100%;
//   background: white;
//   color: black;
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   color: rgba(0, 0, 255, 0.5);
//   margin-bottom: 10px;
// `;

// const MapWrapper = styled.div`
//   width: 100%;
//   height: 300px;
//   margin: 10px 0;
//   border-radius: 10px;
//   overflow: hidden;
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   background: #e0e0e0;
//   padding: 10px;
//   border-radius: 5px;
//   margin-bottom: 15px;
//   width: 100%;
//   max-width: 400px;
// `;

// const Icon = styled.div`
//   color: rgba(0, 0, 255, 0.5);
//   margin-right: 10px;
// `;

// const Input = styled.input`
//   flex: 1;
//   border: none;
//   background: transparent;
//   outline: none;
//   font-size: 1rem;
//   padding: 5px;
// `;

// const RideOptions = styled.div`
//   display: flex;
//   gap: 10px;
//   margin: 10px 0;
// `;

// const RideOption = styled.button`
//   padding: 10px;
//   border: 1px solid rgba(0, 0, 255, 0.5);
//   background: white;
//   cursor: pointer;
//   border-radius: 8px;

//   &:hover {
//     background: rgba(0, 0, 255, 0.1);
//   }
// `;

// const PaymentOptions = styled.div`
//   display: flex;
//   gap: 10px;
//   margin: 10px 0;
// `;

// const PaymentOption = styled.button`
//   padding: 10px;
//   border: 1px solid rgba(0, 0, 255, 0.5);
//   background: white;
//   cursor: pointer;
//   border-radius: 8px;

//   &:hover {
//     background: rgba(0, 0, 255, 0.1);
//   }
// `;

// const Button = styled.button`
//   background: rgba(0, 0, 255, 0.5);
//   color: white;
//   padding: 12px 24px;
//   font-size: 1rem;
//   font-weight: bold;
//   border: none;
//   border-radius: 25px;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   width: 100%;
//   max-width: 300px;

//   &:hover {
//     background: rgba(0, 0, 255, 0.7);
//   }
// `;

// const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual key

// const BookARide = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [selectedRide, setSelectedRide] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [directions, setDirections] = useState(null);
//   const [map, setMap] = useState(null);

//   const rideOptions = [
//     { type: "Standard", icon: <FaCar />, price: "$10" },
//     { type: "XL", icon: <FaCar />, price: "$15" },
//     { type: "Luxury", icon: <FaCar />, price: "$25" },
//   ];

//   const paymentOptions = ["Cash", "Card", "Wallet"];

//   // Fetch Directions on Input Change
//   useEffect(() => {
//     if (pickup && destination) {
//       const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: pickup,
//           destination: destination,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === "OK") {
//             setDirections(result);
//           }
//         }
//       );
//     }
//   }, [pickup, destination]);

//   const handleConfirm = () => {
//     if (pickup && destination && selectedRide && selectedPayment) {
//       setIsConfirmed(true);
//     } else {
//       alert("Please enter all details, select a ride, and choose a payment method.");
//     }
//   };

//   return (
//     <DashboardContainer>
//       <Title>User Dashboard</Title>

//       {/* Pickup & Destination Inputs */}
//       <InputWrapper>
//         <Icon>
//           <FaMapMarkerAlt />
//         </Icon>
//         <Input
//           type="text"
//           placeholder="Enter Pickup Location"
//           value={pickup}
//           onChange={(e) => setPickup(e.target.value)}
//         />
//       </InputWrapper>

//       <InputWrapper>
//         <Icon>
//           <FaMapMarkerAlt />
//         </Icon>
//         <Input
//           type="text"
//           placeholder="Enter Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//       </InputWrapper>

//       {/* Google Map */}
//       <LoadScript googleMapsApiKey={API_KEY}>
//         <MapWrapper>
//           <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "100%" }}
//             zoom={13}
//             center={{ lat: 37.7749, lng: -122.4194 }}
//             onLoad={(map) => setMap(map)}
//           >
//             {directions && <DirectionsRenderer directions={directions} />}
//           </GoogleMap>
//         </MapWrapper>
//       </LoadScript>

//       <MapComponent/>

//       {/* Ride Selection */}
//       <h3>Select a Ride</h3>
//       <RideOptions>
//         {rideOptions.map((ride, index) => (
//           <RideOption
//             key={index}
//             onClick={() => setSelectedRide(ride)}
//             style={{
//               background: selectedRide?.type === ride.type ? "rgba(0, 0, 255, 0.2)" : "white",
//             }}
//           >
//             {ride.icon} {ride.type} - {ride.price}
//           </RideOption>
//         ))}
//       </RideOptions>

//       {/* Payment Selection */}
//       <h3>Select Payment</h3>
//       <PaymentOptions>
//         {paymentOptions.map((option, index) => (
//           <PaymentOption
//             key={index}
//             onClick={() => setSelectedPayment(option)}
//             style={{
//               background: selectedPayment === option ? "rgba(0, 0, 255, 0.2)" : "white",
//             }}
//           >
//             <FaCreditCard /> {option}
//           </PaymentOption>
//         ))}
//       </PaymentOptions>

//       {/* Confirm Button */}
//       {!isConfirmed ? (
//         <Button onClick={handleConfirm}>Confirm Ride</Button>
//       ) : (
//         <h3>✅ Ride Confirmed! Driver on the way.</h3>
//       )}
//     </DashboardContainer>
//   );
// };

// export default BookARide;

// 33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333

// import React, { useState } from "react";
// import styled from "styled-components";
// import { FaMapMarkerAlt, FaCar, FaCreditCard } from "react-icons/fa";
// import MapComponent from "./MapComponent";

// // Styled Components
// const DashboardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   height: 100vh;
//   width: 100%;
//   background: white;
//   color: black;
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   color: rgba(0, 0, 255, 0.5);
//   margin-bottom: 10px;
// `;

// const MapWrapper = styled.div`
//   width: 100%;
//   height: 300px;
//   margin: 10px 0;
//   border-radius: 10px;
//   overflow: hidden;
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   background: #e0e0e0;
//   padding: 10px;
//   border-radius: 5px;
//   margin-bottom: 15px;
//   width: 100%;
//   max-width: 400px;
// `;

// const Icon = styled.div`
//   color: rgba(0, 0, 255, 0.5);
//   margin-right: 10px;
// `;

// const Input = styled.input`
//   flex: 1;
//   border: none;
//   background: transparent;
//   outline: none;
//   font-size: 1rem;
//   padding: 5px;
// `;

// const Button = styled.button`
//   background: rgba(0, 0, 255, 0.5);
//   color: white;
//   padding: 12px 24px;
//   font-size: 1rem;
//   font-weight: bold;
//   border: none;
//   border-radius: 25px;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   width: 100%;
//   max-width: 300px;

//   &:hover {
//     background: rgba(0, 0, 255, 0.7);
//   }
// `;

// const BookARide = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [pickupCoords, setPickupCoords] = useState(null);
//   const [destinationCoords, setDestinationCoords] = useState(null);
//   const [isConfirmed, setIsConfirmed] = useState(false);

//   // Dummy function to simulate fetching coordinates
//   const getCoordinates = (address, setCoords) => {
//     if (address.toLowerCase() === "new york") {
//       setCoords([40.7128, -74.006]); // New York coords
//     } else if (address.toLowerCase() === "los angeles") {
//       setCoords([34.0522, -118.2437]); // LA coords
//     } else {
//       alert("Enter 'New York' or 'Los Angeles' for demo");
//     }
//   };

//   const handleConfirm = () => {
//     if (pickup && destination) {
//       setIsConfirmed(true);
//     } else {
//       alert("Please enter both pickup and destination.");
//     }
//   };

//   return (
//     <DashboardContainer>
//       <Title>User Dashboard</Title>

//       {/* Pickup & Destination Inputs */}
//       <InputWrapper>
//         <Icon>
//           <FaMapMarkerAlt />
//         </Icon>
//         <Input
//           type="text"
//           placeholder="Enter Pickup Location"
//           value={pickup}
//           onChange={(e) => setPickup(e.target.value)}
//           onBlur={() => getCoordinates(pickup, setPickupCoords)}
//         />
//       </InputWrapper>

//       <InputWrapper>
//         <Icon>
//           <FaMapMarkerAlt />
//         </Icon>
//         <Input
//           type="text"
//           placeholder="Enter Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           onBlur={() => getCoordinates(destination, setDestinationCoords)}
//         />
//       </InputWrapper>

//       {/* Leaflet Map */}
//       <MapWrapper>
//         <MapComponent pickupCoords={pickupCoords} destinationCoords={destinationCoords} />
//       </MapWrapper>

//       {/* Confirm Button */}
//       {!isConfirmed ? (
//         <Button onClick={handleConfirm}>Confirm Ride</Button>
//       ) : (
//         <h3>✅ Ride Confirmed! Driver on the way.</h3>
//       )}
//     </DashboardContainer>
//   );
// };

// export default BookARide;





import React, { useState, Suspense } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaCar } from "react-icons/fa";
import MapComponent from "./MapComponent";

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  background: white;
  color: black;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: rgba(0, 0, 255, 0.5);
  margin-bottom: 10px;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin: 10px 0;
  border-radius: 10px;
  overflow: hidden;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;
`;

const Icon = styled.div`
  color: rgba(0, 0, 255, 0.5);
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  padding: 5px;
`;

const Button = styled.button`
  background: rgba(0, 0, 255, 0.5);
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  max-width: 300px;

  &:hover {
    background: rgba(0, 0, 255, 0.7);
  }
`;

const BookARide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Dummy function to simulate fetching coordinates
  const getCoordinates = (address, setCoords) => {
    if (address.toLowerCase() === "new york") {
      setCoords([40.7128, -74.006]); // New York coords
    } else if (address.toLowerCase() === "los angeles") {
      setCoords([34.0522, -118.2437]); // LA coords
    } else {
      alert("Enter 'New York' or 'Los Angeles' for demo");
    }
  };

  const handleConfirm = () => {
    if (pickup && destination) {
      setIsConfirmed(true);
    } else {
      alert("Please enter both pickup and destination.");
    }
  };

  return (
    <DashboardContainer>
      <Title>User Dashboard</Title>

      {/* Pickup & Destination Inputs */}
      <InputWrapper>
        <Icon>
          <FaMapMarkerAlt />
        </Icon>
        <Input
          type="text"
          placeholder="Enter Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          onBlur={() => getCoordinates(pickup, setPickupCoords)}
        />
      </InputWrapper>

      <InputWrapper>
        <Icon>
          <FaMapMarkerAlt />
        </Icon>
        <Input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onBlur={() => getCoordinates(destination, setDestinationCoords)}
        />
      </InputWrapper>

      {/* Leaflet Map (Suspense needed for React 18) */}
      <MapWrapper>
        <Suspense fallback={<div>Loading Map...</div>}>
          <MapComponent pickupCoords={pickupCoords} destinationCoords={destinationCoords} />
        </Suspense>
      </MapWrapper>

      {/* Confirm Button */}
      {!isConfirmed ? (
        <Button onClick={handleConfirm}>Confirm Ride</Button>
      ) : (
        <h3>✅ Ride Confirmed! Driver on the way.</h3>
      )}
    </DashboardContainer>
  );
};

export default BookARide;
