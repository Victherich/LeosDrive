import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCar, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import { updateUserOnboarded } from "../Features/Slice";
import { useDispatch } from "react-redux";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background:#FE7C04;
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
`;

const SlideWrapper = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  display: ${({ active }) => (active ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.8s ease-in-out;
`;

const IconWrapper = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  width: 80%;
`;

// Button Styling
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

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

// Pagination Dots
const Pagination = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  position: absolute;
  bottom: 100px;

  div {
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    opacity: 0.5;
    transition: opacity 0.3s ease;
    cursor: pointer;

    &.active {
      opacity: 1;
      background: gray;
    }
  }
`;

const UserOnboarding = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch= useDispatch();

  const slides = [
    {
      icon: <FaCar />,
      title: "Book a Ride in Seconds",
      description: "Easily book a ride anytime, anywhere, with just a few taps.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Real-Time Tracking",
      description: "Track your ride live and know exactly where your driver is.",
    },
    {
      icon: <FaCreditCard />,
      title: "Multiple Payment Options",
      description: "Pay with cash, card, or digital wallets for convenience.",
    },
  ];

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/userdashboard");
      dispatch(updateUserOnboarded(true));
    }
  };

  return (
    <Container>
      <SlideWrapper>
        {slides.map((slide, index) => (
          <Slide key={index} active={index === currentIndex}>
            <IconWrapper>{slide.icon}</IconWrapper>
            <Title>{slide.title}</Title>
            <Description>{slide.description}</Description>
          </Slide>
        ))}
      </SlideWrapper>

      {/* Pagination Dots */}
      <Pagination>
        {slides.map((_, index) => (
          <div
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Pagination>

      {/* Navigation Button */}
      <ButtonWrapper>
        <Button onClick={goNext}>
          {currentIndex < slides.length - 1 ? "Next" : "Get Started"}
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default UserOnboarding;
