import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaTaxi } from "react-icons/fa";
import logo from '../Images/logo.jpeg';
import 'animate.css';

// Styled Components
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background:#FE7C04;
  color: white;
  text-align: center;
  position: relative;
`;

const Logo = styled(motion.div)`
  font-size: 80px;
  color: white;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-top: 10px;
  font-weight: bold;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-top: 10px;
  opacity: 0.8;
`;

const Loader = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  display: flex;
  gap: 8px;
`;

const Dot = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
`;

const ButtonWrap = styled.div`
    display:flex;
    gap:20px;
    margin-top:20px;
`

const Button = styled.button`
  background: white;
  color: #333;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: gray;
    color: black;
  }
`;

const Img = styled(motion.img)`
  width:150px;
  height:150px;
  border-radius:50%;

`

// Framer Motion Animations
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const dotAnimation = {
  animate: {
    opacity: [0.3, 1, 0.3],
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

const SplashScreen = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState([".", ".", "."]);
  const [showButton,setShowbutton]=useState(false)
  const userOnboarded = false
  const driverOnboarded = false

  // Redirect to onboarding after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setShowbutton(true)
    }, 3000);
  }, [navigate]);

  const handleUserNavigate=()=>{
        if(userOnboarded){
            navigate('/userdashboard')
        }else{
            navigate('/useronboarding')
        }

  }

  const handleDriverNavigate=()=>{
    if(driverOnboarded){
        navigate('/driverdashboard')
    }else{
        navigate('/driveronboarding')
    }

}

  return (
    <Container initial="hidden" animate="visible" variants={fadeIn}>
    
      <Img src={logo} alt='logo' variants={bounce} className="animate__animated animate__bounce"/>
      <Title variants={fadeIn}>Welcome to LeosDrive</Title>
      <Subtitle variants={fadeIn}>Your Ride, Your Way</Subtitle>
      

      {/* Animated Loading Dots */}
      <Loader>
        {dots.map((dot, index) => (
          <Dot key={index} variants={dotAnimation} animate="animate" />
        ))}
      </Loader>
     <ButtonWrap>
     <Button onClick={handleDriverNavigate}>I'm a Driver</Button>
     <Button onClick={handleUserNavigate}>I'm a Passenger</Button>
     </ButtonWrap>
    </Container>
  );
};

export default SplashScreen;
