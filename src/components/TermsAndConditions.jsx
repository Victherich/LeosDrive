import React from "react";
import styled from "styled-components";

const TermsAndPrivacy = () => {
  return (
    <Container>
      <Title>Terms and Conditions & Privacy Policy</Title>

      {/* Terms and Conditions Section */}
      <Section>
        <h2>1. Terms and Conditions</h2>
        <p>
          Welcome to <strong>LoesDrive</strong>. By using our services, you agree to comply with the 
          following terms and conditions. If you do not agree, please do not use our services.
        </p>

        <h3>1.1 User Responsibilities</h3>
        <ul>
          <li>Users must provide accurate personal information when signing up.</li>
          <li>Users must not use the service for illegal activities.</li>
          <li>Payments for rides must be completed as per the selected payment method.</li>
          <li>Drivers and riders must treat each other with respect and follow safety guidelines.</li>
        </ul>

        <h3>1.2 Ride Policies</h3>
        <ul>
          <li>Loe’s Drive reserves the right to cancel rides for safety concerns.</li>
          <li>Users are responsible for any damages they cause to the driver’s vehicle.</li>
          <li>Surge pricing may apply during peak hours.</li>
        </ul>
      </Section>

      {/* Privacy Policy Section */}
      <Section>
        <h2>2. Privacy Policy</h2>
        <p>
          We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, 
          and protect your personal data.
        </p>

        <h3>2.1 Information We Collect</h3>
        <ul>
          <li>Personal details (name, phone number, email) for account creation.</li>
          <li>Location data to provide accurate ride services.</li>
          <li>Payment information for ride transactions.</li>
          <li>Usage data (e.g., ride history) for analytics and improvements.</li>
        </ul>

        <h3>2.2 How We Use Your Information</h3>
        <ul>
          <li>To process ride requests and payments.</li>
          <li>To improve our service and personalize user experience.</li>
          <li>To ensure safety and prevent fraudulent activities.</li>
          <li>To comply with legal requirements.</li>
        </ul>

        <h3>2.3 Data Security</h3>
        <p>
          We implement strong security measures to protect user data. However, no system is 100% secure, 
          so users should also take necessary precautions.
        </p>
      </Section>

      <LastNote>
        <p>
          By using **Loe’s Drive**, you agree to these Terms and Conditions and Privacy Policy.
          If you have any questions, please contact our support team.
        </p>
      </LastNote>
    </Container>
  );
};

export default TermsAndPrivacy;

/* ===================== Styled Components ===================== */
const Container = styled.div`
  max-width: 900px;
  margin: 80px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #FE7C04;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 30px;

  h2 {
    color: #FE7C04;
    border-bottom: 2px solid #FE7C04;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }

  h3 {
    color: #444;
    margin-top: 15px;
  }

  p {
    color: #666;
    line-height: 1.6;
  }

  ul {
    margin-left: 20px;
    color: #666;

    li {
      margin-bottom: 5px;
    }
  }
`;

const LastNote = styled.div`
  text-align: center;
  font-size: 14px;
  color: #555;
  margin-top: 20px;
`;
