import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope } from "react-icons/fa";

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
  color: rgba(0, 0, 255, 0.5);
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
  color: rgba(0, 0, 255, 0.5);
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
  margin-top: 10px;

  &:hover {
    background: rgba(0, 0, 255, 0.7);
  }
`;

const TextLink = styled.p`
  margin-top: 15px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: rgba(0, 0, 255, 0.5);
  }
`;

const DriverForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    console.log("Password reset link sent to:", email);
    // navigate("/reset-password");
  };

  return (
    <Container>
      <Title>Driver Forgot Password</Title>
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
              }}
            />
          </InputWrapper>
          <ErrorText show={error}>{error}</ErrorText>

          <Button type="submit">Send Reset Link</Button>
          <TextLink onClick={() => navigate("/driverlogin")}>Back to Login</TextLink>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default DriverForgotPassword;
