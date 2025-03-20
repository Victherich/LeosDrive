import React, { useState } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaCar, FaDollarSign, FaClock } from "react-icons/fa";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: #f4f4f4;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #fe7c04;
`;

const RideCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  margin-bottom: 15px;
`;

const RideInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Icon = styled.div`
  color: #fe7c04;
  margin-right: 10px;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0;
`;

const Status = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  color: white;
  background: ${({ status }) =>
    status === "Completed" ? "green" : status === "Upcoming" ? "#fe7c04" : "gray"};
`;

const UserRides = () => {
  const [rides, setRides] = useState([
    {
      id: 1,
      pickup: "123 Main St, City",
      destination: "Airport",
      date: "March 15, 2025",
      price: "$15.00",
      status: "Completed",
    },
    {
      id: 2,
      pickup: "Mall Avenue",
      destination: "Hotel Grand",
      date: "March 20, 2025",
      price: "$10.00",
      status: "Upcoming",
    },
    {
      id: 3,
      pickup: "Park Street",
      destination: "Downtown Office",
      date: "March 10, 2025",
      price: "$8.00",
      status: "Cancelled",
    },
  ]);

  return (
    <Container>
      <Title>My Rides</Title>
      {rides.map((ride) => (
        <RideCard key={ride.id}>
          <RideInfo>
            <Icon>
              <FaMapMarkerAlt />
            </Icon>
            <InfoText>
              <strong>From:</strong> {ride.pickup}
            </InfoText>
          </RideInfo>

          <RideInfo>
            <Icon>
              <FaCar />
            </Icon>
            <InfoText>
              <strong>To:</strong> {ride.destination}
            </InfoText>
          </RideInfo>

          <RideInfo>
            <Icon>
              <FaClock />
            </Icon>
            <InfoText>
              <strong>Date:</strong> {ride.date}
            </InfoText>
          </RideInfo>

          <RideInfo>
            <Icon>
              <FaDollarSign />
            </Icon>
            <InfoText>
              <strong>Price:</strong> {ride.price}
            </InfoText>
          </RideInfo>

          <Status status={ride.status}>{ride.status}</Status>
        </RideCard>
      ))}
    </Container>
  );
};

export default UserRides;
