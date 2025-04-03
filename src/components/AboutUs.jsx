import React from "react";
import styled from "styled-components";
import { FaTaxi, FaUsers, FaBullseye, FaRegClock } from 'react-icons/fa'; // React Icons
import abtimg from '../Images/abtimg.jpg'

// Styled Components
const PageContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #f8f8f8;
`;

const HeroSection = styled.section`
  background: url(${abtimg}) center/cover no-repeat;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;

  h1 {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  background-color: #fff;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    max-width: 900px;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const ServicesSection = styled.section`
  background-color: #f1f1f1;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .services {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .service-card {
    background: white;
    padding: 30px;
    width: 250px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;

    h3 {
      font-size: 1.5rem;
      margin: 20px 0;
    }

    p {
      font-size: 1rem;
      margin-bottom: 15px;
    }

    svg {
      font-size: 3rem;
      color: orange;
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const MissionSection = styled.section`
  background-color: orange;
  color: white;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const TeamSection = styled.section`
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .team-cards {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .team-card {
    background: white;
    padding: 30px;
    width: 250px;
    margin: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;

    img {
      width: 100%;
      border-radius: 50%;
    }

    h3 {
      font-size: 1.5rem;
      margin: 15px 0;
    }

    p {
      font-size: 1rem;
      color: #777;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const Footer = styled.footer`
  background-color: #222;
  color: white;
  padding: 40px 20px;
  text-align: center;

  p {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  a {
    color: #ffbf00;
    text-decoration: none;
    font-weight: bold;
  }
`;

// Main About Us Page Component
const AboutUs = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <h1>About LeosDrive</h1>
        <p>Your Reliable Taxi Service</p>
        {/* <button onClick={() => window.open('/book-now')}>Book a Ride</button> */}
      </HeroSection>

      {/* About Us Section */}
      <AboutSection>
        <h2>About LeoDrive</h2>
        <p>
          LeoDrive is a modern and reliable taxi service committed to providing
          the best ride experience for our customers. We offer fast, affordable,
          and safe rides to your destination. Whether you need to get to work, 
          catch a flight, or enjoy a night out, LeoDrive is the taxi service you can trust.
        </p>
      </AboutSection>

      {/* Services Section */}
      <ServicesSection>
        <h2>Our Services</h2>
        <div className="services">
          <div className="service-card">
            <FaTaxi />
            <h3>Taxi Rides</h3>
            <p>Fast and affordable rides to anywhere in the city.</p>
          </div>
          <div className="service-card">
            <FaUsers />
            <h3>Group Rides</h3>
            <p>Perfect for family trips or events with multiple people.</p>
          </div>
          <div className="service-card">
            <FaBullseye />
            <h3>Delivery Serices</h3>
            <p>Get your best delivery services at affordable rate.</p>
          </div>
          <div className="service-card">
            <FaRegClock />
            <h3>24/7 Support</h3>
            <p>We are available anytime you need us, no matter the hour.</p>
          </div>
        </div>
      </ServicesSection>

      {/* Mission Section */}
      <MissionSection>
        <h2>Our Mission</h2>
        <p>
          At LeoDrive, our mission is to revolutionize the transportation
          experience by providing top-quality service, unmatched reliability,
          and innovative solutions. We aim to make every journey an enjoyable
          and seamless experience.
        </p>
      </MissionSection>

      {/* Team Section */}
      {/* <TeamSection>
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>Chief Operating Officer</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Mark Wilson</h3>
            <p>Head of Marketing</p>
          </div>
        </div>
      </TeamSection> */}

      {/* Footer */}
      {/* <Footer>
        <p>LeoDrive © 2025 | <a href="/privacy-policy">Privacy Policy</a></p>
      </Footer> */}
    </PageContainer>
  );
};

export default AboutUs;
