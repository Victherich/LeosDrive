
// ################################################################################3333#####################
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaTaxi } from "react-icons/fa"; // Taxi icon
import axios from "axios";
import { LoadScript, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

// Google API Key
const GOOGLE_API_KEY = "AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)

const BookARide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const pickupRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      initAutocomplete(pickupRef.current, "pickup");
      initAutocomplete(destinationRef.current, "destination");
    }
  }, []);

  // Initialize Google Places Autocomplete
  const initAutocomplete = (input, type) => {
    if (!input) return;
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      if (type === "pickup") {
        setPickup(place.formatted_address);
        setPickupCoords({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        setDestination(place.formatted_address);
        setDestinationCoords({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    });
  };

  // Calculate estimated fare ($2 per km)
  const calculateFare = (dist) => (dist * 2).toFixed(2);

  // Handle Route Calculation
  const handleRoute = () => {
    if (pickupCoords && destinationCoords) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: pickupCoords,
          destination: destinationCoords,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const dist = result.routes[0].legs[0].distance.value / 1000; // Convert meters to km
            setDistance(dist.toFixed(2));
            setFare(calculateFare(dist));
            setDirections(result);
            setShowModal(true);
          } else {
            alert("No route found. Please check your locations.");
          }
        }
      );
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
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
      <Container>
        <Title>Book a Ride 🚖</Title>

        <Input
          type="text"
          placeholder="Enter Pickup Location"
          ref={pickupRef}
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Enter Destination"
          ref={destinationRef}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <Button onClick={handleRoute}>Calculate Route</Button>

        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <TaxiIcon />
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

        {/* Google Map */}
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </Container>
    </LoadScript>
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

const Input = styled.input`
  width: 80%;
  max-width: 400px;
  padding: 12px;
  margin: 10px 0;
  font-size: 16px;
  border: 2px solid #FE7C04;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #FE7C04;
  color: white;
  font-size: 18px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: gray;
  }
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

const TaxiIcon = styled(FaTaxi)`
  font-size: 50px;
  color: #FE7C04;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const BackButton = styled(Button)`
  background: gray;
`;

