import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

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
  position: relative;
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
  padding-right: 30px;
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

const TogglePassword = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: rgba(0, 0, 255, 0.5);
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

const UserResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Password reset successfully");
    navigate("/userlogin");
  };

  return (
    <Container>
      <Title>User Reset Password</Title>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Icon><FaLock /></Icon>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TogglePassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
          </InputWrapper>

          <InputWrapper>
            <Icon><FaLock /></Icon>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
          </InputWrapper>

          <ErrorText show={error}>{error}</ErrorText>

          <Button type="submit">Reset Password</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default UserResetPassword;
