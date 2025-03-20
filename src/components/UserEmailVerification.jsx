import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";
import { FaLock } from "react-icons/fa";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: white;
  color: black;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #fe7c04;
`;

const FormWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const Icon = styled.div`
  color: #fe7c04;
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: black;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #fe7c04;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background: gray;
  }
`;

const TextLink = styled.p`
  margin-top: 15px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #fe7c04;
  }
`;

const UserEmailVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      Swal.fire({ icon: "error", title: "Error", text: "Please enter the OTP." });
      return;
    }

    try {
      Swal.fire({
        title: "Verifying...",
        text: "Please wait while we verify your OTP.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        "https://www.leosdrive.com/api/user_email_verification.php",
        { otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        Swal.fire({ icon: "success", title: "Verified!", text: response.data.message }).then(() => {
          navigate("/userlogin"); // Redirect to the dashboard after verification
        });
      } else {
        Swal.fire({ icon: "error", title: "Verification Failed", text: response.data.error });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Something went wrong. Try again later.",
      });
    }
  };

  return (
    <Container>
      <Title>User Email Verification</Title>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Icon><FaLock /></Icon>
            <Input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </InputWrapper>
          <Button type="submit">Verify OTP</Button>
        </form>
        <TextLink onClick={() => navigate("/userresendemailotp")}>Resend OTP</TextLink>
      </FormWrapper>
    </Container>
  );
};

export default UserEmailVerification;
