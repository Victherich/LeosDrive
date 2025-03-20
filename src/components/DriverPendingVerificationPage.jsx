import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaClock, FaEnvelope, FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import { driverLogout } from "../Features/Slice";
import { useDispatch } from "react-redux";
import { Context } from "./Context";


// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #FE7C04;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: black;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #FE7C04;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background: #FE7C04;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin: 10px;
  display: flex;
  align-items: center;

  &:hover {
    background: gray;
  }

  svg {
    margin-right: 8px;
  }
`;

const ContactInfo = styled.p`
  font-size: 1rem;
  color: black;
  margin-top: 20px;
`;

const DriverPendingVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {setVerificationStatus}=useContext(Context)


   const handleLogout = () => {
      Swal.fire({
        text: 'Do you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(driverLogout());
            setVerificationStatus('')
          Swal.fire('Logged Out!', 'You have been logged out.', 'success');
          navigate('/');
        }
      });
    };

  return (
    <Container>
      <IconWrapper>
        <FaClock />
      </IconWrapper>
      <Title>Verification in Progress</Title>
      <Subtitle>Your account verification is still under review. Please check back later.</Subtitle>
      <Subtitle>If you need assistance, feel free to contact our support team.</Subtitle>

      <Button onClick={handleLogout}>
       Logout
      </Button>

      <ContactInfo>
        <FaEnvelope /> Contact Support: <strong>support@leosdrive.com</strong>
      </ContactInfo>
    </Container>
  );
};

export default DriverPendingVerification;
