// import React from "react";
// import styled from "styled-components";
// import heroVideo from "../Images/media1.mp4";

// const HeroContainer = styled.section`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   text-align: center;
//   overflow: hidden;

//   video {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const HeroText = styled.div`
//   padding: 30px;
//   border-radius: 10px;
//   z-index: 1;

//   h1 {
//     font-size: 3.5rem;
//     text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
//     color: white;
//   }
  
//   p {
//     font-size: 1.5rem;
//     color: white;
//     text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
//   }
// `;

// const Hero = () => {
//   return (
//     <HeroContainer>
//       <video autoPlay muted loop>
//         <source src={heroVideo} type="video/mp4" />
//       </video>
//       <HeroText>
//         <h1>Welcome to AJGA Journal</h1>
//         <p>Advancing knowledge and innovation globally</p>
//       </HeroText>
//     </HeroContainer>
//   );
// };

// export default Hero;



import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import heroVideo from "../Images/h1.mp4";
import heroVideo2 from '../Images/h2.mp4'
import { useNavigate } from "react-router-dom";

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  overflow: hidden;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Text Container
const HeroText = styled.div`
  position: absolute;
  z-index: 2;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(50px);
  animation: ${(props) => (props.isVisible ? "flyInFromBottom 1.5s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }

  @keyframes flyInFromBottom {
    from {
      opacity: 0;
      transform: translateY(300px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroTitle2 = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(50px);
  animation: ${(props) => (props.isVisible ? "flyInFromSide 1.5s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }

  @keyframes flyInFromSide {
    from {
      opacity: 0;
      transform: translatex(500px);
    }
    to {
      opacity: 1;
      transform: translatex(0);
    }
  }
`;


const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(-50px);
  animation: ${(props) => (props.isVisible ? "flyInFromTop 1s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 428px) {
    font-size: 1rem;
  }

  @keyframes flyInFromTop {
    from {
      opacity: 0;
      transform: translateY(-300px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
  margin-top:10px;

  &:hover {
    background: gray;
    transform:scale(1.1);
  }
`;

// Hero Component
const Hero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate()
  const [mediaShow, setMediaShow] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMediaShow((prev) => (prev + 1) % 2);
    }, 7000);
  
    return () => clearInterval(intervalId); // Cleanup function to prevent memory leaks
  }, []);
  

  // Intersection Observer to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <HeroContainer ref={heroRef}>
      {mediaShow===0&&<video autoPlay muted loop>
        <source src={heroVideo} type="video/mp4" />
      </video>}
      {mediaShow===1&&<video autoPlay muted loop>
        <source src={heroVideo2} type="video/mp4" />
      </video>}
      <HeroText>
        {/* <HeroTitle isVisible={isVisible}>LeosDrive</HeroTitle> */}
        <HeroTitle isVisible={isVisible}>Get a Ride in Minutes!</HeroTitle>
        <HeroSubtitle isVisible={isVisible}>The fastest and safest way to move around your city.</HeroSubtitle>
        <Button onClick={()=>navigate('/splash')}>Get Started</Button>
      </HeroText>
    </HeroContainer>
  );
};

export default Hero;

