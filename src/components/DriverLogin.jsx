

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { driverLogin } from "../Features/Slice";

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

const DriverLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Show loading alert
  //   Swal.fire({
  //     title: "Logging in...",
  //     text: "Please wait",
  //     allowOutsideClick: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   try {
  //     const response = await fetch("https://www.leosdrive.com/api/driver_login.php", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Login Successful!",
  //         text: "Redirecting...",
  //         timer: 2000,
  //         showConfirmButton: false,
  //       });

  //       setTimeout(() => {
  //         navigate("/driverdashboard");
  //       }, 2000);
  //     } else if (data.error.includes("Email not verified")) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Verify Your Email",
  //         text: "A new verification link has been sent to your email.",
  //         confirmButtonText: "OK",
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Login Failed",
  //         text: data.error,
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Something went wrong. Please try again later.",
  //     });
  //   }
  // };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: "Logging in...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  
    try {
      const response = await fetch("https://www.leosdrive.com/api/driver_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();


  
      if (data.success) {
        // localStorage.setItem("token", data.token); // Save token for future API calls
          console.log(data)
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting...",
          timer: 2000,
          showConfirmButton: false,
        });
  
        setTimeout(() => {
          navigate("/driverdashboard");
        }, 2000);
        const driverInfo = data.user;
        const driverToken = data.token;

        // Dispatch login action with a single object containing both adminInfo and adminToken
        dispatch(driverLogin({ driverInfo, driverToken }));


      } else if (data.error.includes("Email not verified")) {
        Swal.fire({
          icon: "warning",
          title: "Email Not Verified",
          text: "Check your email for a verification link and Verify here.",
          confirmButtonText: "Verify Here",
          allowOutsideClick:false,
        });
        navigate('/driveremailverification')
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect. Please check your internet connection.",
      });
    }
  };
  



 
  return (
    <Container>
      <Title>Driver Login</Title>

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
              required
            />
          </InputWrapper>

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
              required
            />
            <TogglePassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
          </InputWrapper>

          <Button type="submit">Login</Button>

          <TextLink onClick={() => navigate("/driverforgotpassword")}>
            Forgot Password?
          </TextLink>
          <TextLink onClick={() => navigate("/driversignup")}>
            Don't have an account? Sign Up
          </TextLink>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default DriverLogin;

