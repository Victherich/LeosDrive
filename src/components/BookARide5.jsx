import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const ConfirmationMessage = styled.p`
  margin-top: 10px;
  color: green;
  font-size: 1rem;
`;

const TaxiBooking = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("Standard");
  const [confirmed, setConfirmed] = useState(false);

  const handleBooking = () => {
    setConfirmed(true);
  };

  return (
    <FormContainer>
      <h2>Book a Taxi</h2>
      <Input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Drop-off Location"
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
      />
      <Select value={rideType} onChange={(e) => setRideType(e.target.value)}>
        <option>Standard</option>
        <option>Executive</option>
        <option>SUV</option>
      </Select>
      <Button onClick={handleBooking}>Confirm Booking</Button>
      {confirmed && <ConfirmationMessage>Taxi booked successfully!</ConfirmationMessage>}
    </FormContainer>
  );
};

export default TaxiBooking;
