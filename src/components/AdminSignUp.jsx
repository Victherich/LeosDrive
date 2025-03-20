

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import bg from "../Images/passenger.png";

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
  background-size: cover;
  position: relative;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #FE7C04;
  position: relative;
`;

const FormWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
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
  color: #FE7C04;
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






const AdminSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = "Phone must be 10-15 digits";
    if (formData.password.length < 6) newErrors.password = "At least 6 characters required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      Swal.fire({
        title: "Signing Up...",
        text: "Please wait while we create your account.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        "https://www.leosdrive.com/api/admin_signup.php",
        formData, // Send entire formData including confirmPassword
        { headers: { "Content-Type": "application/json" } }
      );

     if(response.data.success===true){
      Swal.fire({ icon: "success", title: "Success!", text:response.data.message });
        navigate("/adminemailverification");
     }else{
      Swal.fire({text:response.data.error})
     }
      console.log(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Sign-Up Failed",
        text: error.response?.data?.error || "Something went wrong.",
      });
    }
  };

  return (
    <Container>
      <Title>Admin Sign Up</Title>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <Icon><FaUser /></Icon>
            <Input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          </InputWrapper>
          <ErrorText show={errors.name}>{errors.name}</ErrorText>

          <InputWrapper>
            <Icon><FaEnvelope /></Icon>
            <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </InputWrapper>
          <ErrorText show={errors.email}>{errors.email}</ErrorText>

          <InputWrapper>
            <Icon><FaPhone /></Icon>
            <Input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          </InputWrapper>
          <ErrorText show={errors.phone}>{errors.phone}</ErrorText>

          <InputWrapper>
            <Icon><FaLock /></Icon>
            <Input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <TogglePassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
          </InputWrapper>
          <ErrorText show={errors.password}>{errors.password}</ErrorText>

          <InputWrapper>
            <Icon><FaLock /></Icon>
            <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
          </InputWrapper>
          <ErrorText show={errors.confirmPassword}>{errors.confirmPassword}</ErrorText>

          <Button type="submit">Sign Up</Button>
          <TextLink onClick={() => navigate("/adminlogin")}>Already have an account? Login</TextLink>
        </form>
      </FormWrapper>
    </Container>
  );
};




export default AdminSignUp;
