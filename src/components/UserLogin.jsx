import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

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
//   background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
  padding-right: 30px; /* Space for the eye icon */

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
    background: rgba(0,0,255,0.7);

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

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Login successful:", formData);
    navigate("/userdashboard"); // Redirect after login
  };

  return (
    <Container>
      <Title>User Login</Title>

      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Icon>
              <FaEnvelope />
            </Icon>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </InputWrapper>
          <ErrorText show={errors.email}>{errors.email}</ErrorText>

          <InputWrapper>
            <Icon>
              <FaLock />
            </Icon>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <TogglePassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
          </InputWrapper>
          <ErrorText show={errors.password}>{errors.password}</ErrorText>

          <Button type="submit">Login</Button>

          <TextLink onClick={() => navigate("/userforgotpassword")}>Forgot Password?</TextLink>
          <TextLink onClick={() => navigate("/usersignup")}>Don't have an account? Sign Up</TextLink>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default UserLogin;
