import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { FaCar, FaMoneyBillWave, FaToggleOn, FaToggleOff } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  // flex-direction: column;
  // align-items: center;
  justify-content: center;
  height: 100vh;
  gap:10px;
  background: white;
  color: black;
  text-align: center;

  @media (max-width:884px){
  flex-direction:column;

  }
`;

const MapContainer = styled.div`
  // width: 100%;
  // height: 60vh;
  flex:2;
   @media (max-width:884px){
  width:100%;
  height:100vh

  }
`;

const InfoBox = styled.div`
flex:1;
  // width: 100%;
  
  padding: 15px;
  border-radius: 10px;
  background:whitesmoke;
  color:#333;
  margin-top: 10px;

   @media (max-width:884px){
  width:100%;

  }
`;

const Button = styled.button`

  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #FE7C04;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  margin-top: 10px;

  &:hover {
    
  
  }
`;

const DriverHomePage = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyAgRebnRdLcsX0a74dz_GWVv30funQ7OlU" });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [online, setOnline] = useState(false);
  const [earnings, setEarnings] = useState(0);

  console.log(location)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <Container>
      <MapContainer>
        <GoogleMap center={location} zoom={15} mapContainerStyle={{ width: "100%", height: "100%" }}>
          <Marker position={location} icon={{ url: "https://maps.google.com/mapfiles/kml/shapes/cabs.png" }} />
        </GoogleMap>
      </MapContainer>
      
      <InfoBox>
        <h2 style={{color:"#FE7C04"}}>Driver Dashboard</h2>
        <p>Earnings: <FaMoneyBillWave /> ${earnings}</p>
        <p>Status: {online ? "Online" : "Offline"}</p>
        <Button onClick={() => setOnline(!online)}
          style={{background:online?"#FE7C04":"white", color:online?"white":"#FE7C04"}}>
          {online ? <FaToggleOn /> : <FaToggleOff />} {online ? "Go Offline" : "Go Online"}
        </Button>
      </InfoBox>
    </Container>
  );
};

export default DriverHomePage;
