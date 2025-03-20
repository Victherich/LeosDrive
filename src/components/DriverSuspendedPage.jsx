import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBan, FaEnvelope, FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { driverLogout } from "../Features/Slice";
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
  color: red;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: black;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: red;
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

const DriverSuspended = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        <FaBan />
      </IconWrapper>
      <Title>Account Suspended</Title>
      <Subtitle>Your account has been suspended due to a violation of our terms or other issues.</Subtitle>
      <Subtitle>Please contact our support team for more information.</Subtitle>

      <Button onClick={handleLogout}>
        Logout
      </Button>

      <ContactInfo>
        <FaEnvelope /> Contact Support: <strong>support@leosdrive.com</strong>
      </ContactInfo>
    </Container>
  );
};

export default DriverSuspended;
