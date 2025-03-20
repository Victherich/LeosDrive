import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft, FaHome } from "react-icons/fa";

// Styled Component

const Container = styled.div`
    
`


const BackButton = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  background: #fe7c04;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 24px;
  width:50px;
  height:50px;
  transition: transform 0.2s ease;
  padding:10px;
  border-radius:50%;
  z-index:9999;
  

  &:hover {
    transform: translateX(-5px);
  }
`;


const BackButton2 = styled.button`
  position: absolute;
  top: 60px;
  left: 5px;
  background: #fe7c04;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 24px;
  width:50px;
  height:50px;
  transition: transform 0.2s ease;
  padding:10px;
  border-radius:50%;
  z-index:9999;
  

  &:hover {
    transform: translateX(-5px);
  }
`;

const BackArrow = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Routes where the Back Arrow should NOT appear
  const hiddenRoutes = ["/driverdashboard", "/admindashboard", "/userdashboard",'/', '/contactus', '/termsandconditions'] ;

  if (hiddenRoutes.includes(location.pathname)) {
    return null; // Don't render on these pages
  }

  return (
    <Container>
        {location.pathname !== "/userlogin" && location.pathname !== "/driverlogin" && (
  <BackButton onClick={() => window.history.back()}>
    <FaArrowLeft />
  </BackButton>
)}

    <BackButton2 onClick={() =>navigate('/')}>
      <FaHome />
    </BackButton2>
    </Container>
   
  );
};

export default BackArrow;
