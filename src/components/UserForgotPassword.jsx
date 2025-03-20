

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope } from "react-icons/fa";
import Swal from 'sweetalert2'

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
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #FE7C04;
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
  color: #FE7C04;
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  color: black;
  font-size: 1rem;
  ::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const SuccessText = styled.p`
  color: green;
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: ${({ show }) => (show ? "block" : "none")};
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
  transition: background 0.3s ease;
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
    color: #FE7C04;
  }
`;

const UserForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email.includes("@")) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }
  
    // Show loading alert
    Swal.fire({
      title: "Sending Reset Link...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await fetch("https://www.leosdrive.com/api/user_forgot_password.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: data.message,
          confirmButtonColor: "#FE7C04",
        }).then(() => {
          // navigate("/userresetpassword");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Something went wrong. Try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection and try again.",
      });
    }
  };
  

  return (
    <Container>
      <Title>User Forgot Password</Title>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Icon><FaEnvelope /></Icon>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccess("");
              }}
            />
          </InputWrapper>
          <ErrorText show={error}>{error}</ErrorText>
          <SuccessText show={success}>{success}</SuccessText>

          <Button type="submit">Send Reset Link</Button>
          <TextLink onClick={() => navigate("/userlogin")}>Back to Login</TextLink>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default UserForgotPassword;

