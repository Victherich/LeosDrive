import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import bg from '../Images/passenger.png'

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

//   background-image:url(${bg});
  background-size:cover;
   filter: brightness(1); /* Increases brightness */
position:relative;

&::before{
content:"";
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:rgba(255,255,255,0.9);
}

`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: rgba(0, 0, 255, 0.5);
  position:relative;
`;

const FormWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position:relative;
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

const TextLink = styled.p`
  margin-top: 15px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: rgba(0, 0, 255, 0.5);
  }
`;

const UserSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Sign-Up successful:", formData);
    // navigate("/dashboard");
  };

  return (
    <Container>
      <Title>User Sign Up</Title>

      <FormWrapper>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <InputWrapper>
            <Icon>
              <FaUser />
            </Icon>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </InputWrapper>
          <ErrorText show={errors.name}>{errors.name}</ErrorText>

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Confirm Password Field */}
          <InputWrapper>
            <Icon>
              <FaLock />
            </Icon>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
          </InputWrapper>
          <ErrorText show={errors.confirmPassword}>{errors.confirmPassword}</ErrorText>

          <Button type="submit">Sign Up</Button>

          <TextLink onClick={() => navigate("/userlogin")}>Already have an account? Login</TextLink>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default UserSignUp;
