import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Styled Components for better UI
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
`;

const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: orange;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 20px;
  color: white;
  background-color: ${({ status }) => {
    switch (status) {
      case "created":
        return "#6c757d";
      case "processing":
        return "#007bff";
      case "collected":
        return "#ffc107";
      case "out for delivery":
        return "#fd7e14";
      case "delivered":
        return "#28a745";
      default:
        return "#6c757d";
    }
  }};
`;

const InfoContainer = styled.div`
  margin-top: 15px;
`;

const InfoRow = styled.p`
  font-size: 16px;
  color: #555;
  margin: 8px 0;
  strong {
    color: #333;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-weight: bold;
  margin-top: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #007bff;
  font-weight: bold;
  margin-top: 20px;
`;

const DeliveryDetails = () => {
  const { id } = useParams(); // Get `id` from URL
  const [delivery, setDelivery] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://www.leosdrive.com/api/fetch_delivery_by_id.php?id=${id}&_=${new Date().getTime()}`
      )
      .then((response) => {
        if (response.data.success) {
          setDelivery(response.data.delivery);
        } else {
          setError(response.data.error);
        }
      })
      .catch((error) => {
        setError("Failed to fetch delivery details.");
        console.error(error);
      });
  }, [id]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!delivery) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <Container>
      <Card>
        <Title>Delivery Details</Title>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{color:"orange"}}>Booking: {delivery.booking_number}</h2>
          <StatusBadge status={delivery.status}>{delivery.status.toUpperCase()}</StatusBadge>
        </div>

        <InfoContainer>
          <InfoRow>
            <strong>Sender:</strong> {delivery.sender_name} ({delivery.sender_phone})
          </InfoRow>
          <InfoRow>
            <strong>Pickup Address:</strong> {delivery.pickup_address}
          </InfoRow>
          <InfoRow>
            <strong>Receiver:</strong> {delivery.receiver_name} ({delivery.receiver_phone})
          </InfoRow>
          <InfoRow>
            <strong>Dropoff Address:</strong> {delivery.dropoff_address}
          </InfoRow>
          <InfoRow>
            <strong>Package Description:</strong> {delivery.package_description}
          </InfoRow>
          <InfoRow>
            <strong>Dimensions (L × W × H):</strong> {delivery.package_length} × {delivery.package_width} × {delivery.package_height} cm
          </InfoRow>
          <InfoRow>
            <strong>Weight:</strong> {delivery.package_weight} kg
          </InfoRow>
          <InfoRow>
            <strong>Delivery Cost:</strong> NGN {delivery.delivery_cost}
          </InfoRow>
          <InfoRow>
            <strong>Transaction Reference:</strong> {delivery.transaction_reference}
          </InfoRow>
          {/* <InfoRow>
            <strong>Email:</strong> {delivery.email}
          </InfoRow> */}
          <InfoRow>
            <strong>Created At:</strong> {new Date(delivery.created_at).toLocaleString()}
          </InfoRow>
        </InfoContainer>
      </Card>
    </Container>
  );
};

export default DeliveryDetails;
