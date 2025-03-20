

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
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
  position: relative;
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
  padding-right: 30px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const TogglePassword = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #FE7C04;
`;

const Button = styled.button`
  background:#FE7C04;
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

const DriverResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      Swal.fire("Error", "Invalid or missing token.", "error");
      navigate("/driverlogin");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters", "error");
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      Swal.fire({
        title: "Please wait...",
        text: "Resetting your password...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch("https://www.leosdrive.com/api/driver_reset_password.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire("Success", data.message, "success");
        setTimeout(() => navigate("/driverlogin"), 3000);
      } else {
        Swal.fire("Error", data.error || "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Network error. Please try again later.", "error");
    }
  };

  return (
    <Container>
      <Title>Driver Reset Password</Title>
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

          <Button type="submit">Reset Password</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default DriverResetPassword;
