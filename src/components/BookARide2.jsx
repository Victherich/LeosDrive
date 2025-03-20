// import React, { useState } from "react";
// // import Map, { Marker } from "react-map-gl";
// import Map, { Marker } from "react-map-gl/maplibre";

// import axios from "axios";

// // ✅ Replace with your Mapbox API Key
// const MAPBOX_API_KEY = "pk.eyJ1IjoidmljdGhlcmljaCIsImEiOiJjbThhMmJkZm4wOTlsMmpzNW9tcWJmZTZ1In0.sD9l8PZ7mZx7cDfG2eBz3g";

// const BookARide2 = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [pickupCoords, setPickupCoords] = useState(null);
//   const [destinationCoords, setDestinationCoords] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [fare, setFare] = useState(null);

//   // Function to get coordinates from Mapbox Geocoding API
//   const getCoordinates = async (location, type) => {
//     try {
//       const response = await axios.get(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//           location
//         )}.json?access_token=${MAPBOX_API_KEY}`
//       );
//       if (response.data.features.length > 0) {
//         const [lon, lat] = response.data.features[0].center;
//         if (type === "pickup") {
//           setPickupCoords({ lat, lon });
//         } else {
//           setDestinationCoords({ lat, lon });
//         }
//       } else {
//         alert("Location not found!");
//       }
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//     }
//   };

//   // Function to calculate route and fare
//   const calculateRoute = async () => {
//     if (pickupCoords && destinationCoords) {
//       try {
//         const response = await axios.get(
//           `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords.lon},${pickupCoords.lat};${destinationCoords.lon},${destinationCoords.lat}?access_token=${MAPBOX_API_KEY}&geometries=geojson`
//         );

//         if (response.data.routes.length > 0) {
//           const route = response.data.routes[0];
//           const dist = route.distance / 1000; // Convert meters to km
//           setDistance(dist.toFixed(2));
//           setFare((dist * 2).toFixed(2)); // Example: $2 per km
//         } else {
//           alert("No route found. Please check your locations.");
//         }
//       } catch (error) {
//         console.error("Error fetching route:", error);
//       }
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Book a Ride 🚖</h1>

//       <input
//         type="text"
//         placeholder="Enter Pickup Location"
//         value={pickup}
//         onChange={(e) => setPickup(e.target.value)}
//       />
//       <button onClick={() => getCoordinates(pickup, "pickup")}>Find</button>

//       <input
//         type="text"
//         placeholder="Enter Destination"
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//       />
//       <button onClick={() => getCoordinates(destination, "destination")}>Find</button>

//       <button onClick={calculateRoute}>Calculate Route</button>

//       {distance && (
//         <div>
//           <p>🚗 Distance: {distance} km</p>
//           <p>💰 Estimated Fare: ${fare}</p>
//         </div>
//       )}

//       <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
//         <Map
//           initialViewState={{
//             latitude: pickupCoords?.lat || 37.7749,
//             longitude: pickupCoords?.lon || -122.4194,
//             zoom: 12,
//           }}
//           style={{ width: "100%", height: "100%" }}
//           mapStyle="mapbox://styles/mapbox/streets-v11"
//           mapboxAccessToken={MAPBOX_API_KEY}
//         >
//           {pickupCoords && (
//             <Marker latitude={pickupCoords.lat} longitude={pickupCoords.lon} color="blue" />
//           )}
//           {destinationCoords && (
//             <Marker latitude={destinationCoords.lat} longitude={destinationCoords.lon} color="red" />
//           )}
//         </Map>
//       </div>
//     </div>
//   );
// };

// export default BookARide2;



import React, { useState, useRef, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/maplibre";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"; // Import geocoder
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"; // Import geocoder styles
import axios from "axios";
import styled from "styled-components";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidmljdGhlcmljaCIsImEiOiJjbThhMmJkZm4wOTlsMmpzNW9tcWJmZTZ1In0.sD9l8PZ7mZx7cDfG2eBz3g"; // Replace with your Mapbox token

const BookARide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    // Initialize geocoder for pickup
    const pickupGeocoder = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapboxgl: map,
      placeholder: "Enter Pickup Location",
      marker: false,
    });
    pickupGeocoder.on("result", (e) => {
      setPickup(e.result.place_name);
      setPickupCoords(e.result.geometry.coordinates);
    });

    // Initialize geocoder for destination
    const destinationGeocoder = new MapboxGeocoder({
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapboxgl: map,
      placeholder: "Enter Destination",
      marker: false,
    });
    destinationGeocoder.on("result", (e) => {
      setDestination(e.result.place_name);
      setDestinationCoords(e.result.geometry.coordinates);
    });

    // Add geocoders to the UI
    map.addControl(pickupGeocoder);
    map.addControl(destinationGeocoder);
  }, []);

  // Calculate estimated fare ($2 per km)
  const calculateFare = (dist) => (dist * 2).toFixed(2);

  // Handle Route Calculation
  const handleRoute = async () => {
    if (pickupCoords && destinationCoords) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${destinationCoords[0]},${destinationCoords[1]}?access_token=${MAPBOX_ACCESS_TOKEN}`
        );

        if (response.data.routes.length > 0) {
          const route = response.data.routes[0];
          const dist = route.distance / 1000; // Convert meters to km
          setDistance(dist.toFixed(2));
          setFare(calculateFare(dist));
          setShowModal(true);
        } else {
          alert("No route found. Please check your locations.");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    } else {
      alert("Please enter valid locations.");
    }
  };

  // Handle Booking Ride
  const handleBookRide = async () => {
    try {
      const res = await axios.post("http://localhost/taxi_app/api.php", {
        user_id: 1,
        pickup,
        destination,
        distance,
        fare,
      });

      alert(res.data.message);
      setShowModal(false);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <Container>
      <Title>Book a Ride 🚖</Title>

      <MapContainer>
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            latitude: 37.7749,
            longitude: -122.4194,
            zoom: 12,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {pickupCoords && <Marker longitude={pickupCoords[0]} latitude={pickupCoords[1]} color="blue" />}
          {destinationCoords && <Marker longitude={destinationCoords[0]} latitude={destinationCoords[1]} color="red" />}
          {pickupCoords && destinationCoords && (
            <Source
              id="route"
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: [pickupCoords, destinationCoords],
                },
              }}
            >
              <Layer
                id="route-line"
                type="line"
                paint={{ "line-color": "blue", "line-width": 5 }}
              />
            </Source>
          )}
        </Map>
      </MapContainer>

      <Button onClick={handleRoute}>Calculate Route</Button>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>Route Details</h2>
            <p>🚗 Distance: {distance} km</p>
            <p>💰 Estimated Fare: ${fare}</p>

            <ModalButtons>
              <Button onClick={handleBookRide}>Book Ride</Button>
              <BackButton onClick={() => setShowModal(false)}>Back</BackButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default BookARide;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
  background: #f4f4f4;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #FE7C04;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: #FE7C04;
  color: white;
  font-size: 18px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background: gray;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 350px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const BackButton = styled(Button)`
  background: gray;
`;

