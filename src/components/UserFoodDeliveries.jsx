import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom"; 

// Styled Components
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
  width:100%;

//   max-width:800px;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff8000;
  margin-bottom: 20px;
`;

const DeliveryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  justify-content:center;
  padding:20px;
`;

const DeliveryCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const DeliveryInfo = styled.p`
  font-size: 14px;
  color: #333;
  margin: 5px 0;
  
  strong {
    color: #000;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
  background-color: ${(props) => {
    switch (props.status) {
      case "created": return "#6c757d"; // Grey
      case "processing": return "#007bff"; // Blue
      case "collected": return "#ffc107"; // Yellow
      case "out for delivery": return "#fd7e14"; // Orange
      case "delivered": return "#28a745"; // Green
      default: return "#6c757d"; // Default Grey
    }
  }};
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  text-align: left;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 11;


  h3{
  color:orange;
  }
`;

const CloseButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  
  &:hover {
    background: #c82333;
  }
`;

const UserFoodDeliveries = () => {
  const { user_id } = useParams();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // useEffect(() => {
  //   fetchUserDeliveries();
  // }, []);

  // Fetch User's Deliveries
  const fetchUserDeliveries = async () => {
    try {
      const response = await axios.get(`https://www.leosdrive.com/api/fetch_user_food_deliveries.php?user_id=${user_id}`);
      if (response.data.success) {
        setDeliveries(response.data.deliveries);
      }
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(()=>{
    const id = setInterval(()=>{
      fetchUserDeliveries()
    },3000)

    return ()=>clearInterval(id)
  },[])

  return (
    <PageContainer>
      <Title>Your Food Deliveries</Title>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <DeliveryList>
          {deliveries.length > 0 ? (
            deliveries.map((delivery) => (
              <DeliveryCard key={delivery.id} onClick={() => setSelectedDelivery(delivery)}>
                <DeliveryInfo><strong>Booking #:</strong> {delivery.booking_number}</DeliveryInfo>
                <DeliveryInfo><strong>Restaurant:</strong> {delivery.restaurant_name}</DeliveryInfo>
                <DeliveryInfo><strong>Customer:</strong> {delivery.customer_name}</DeliveryInfo>
                <DeliveryInfo><strong>Dropoff:</strong> {delivery.dropoff_address}</DeliveryInfo>
                <StatusBadge status={delivery.status}>{delivery.status}</StatusBadge>
              </DeliveryCard>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "red" }}>No food deliveries found.</p>
          )}
        </DeliveryList>
      )}

      {/* Modal for Delivery Details */}
      {selectedDelivery && (
        <ModalOverlay show={selectedDelivery} onClick={() => setSelectedDelivery(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedDelivery(null)}>Close</CloseButton>
            <h3>Delivery #{selectedDelivery.booking_number}</h3>
            <p><strong>Restaurant:</strong> {selectedDelivery.restaurant_name}</p>
            <p><strong>Booking Reference:</strong> {selectedDelivery.restaurant_booking_ref}</p>
            <p><strong>Food Details:</strong> {selectedDelivery.food_details}</p>
            <p><strong>Pickup Address:</strong> {selectedDelivery.pickup_address}</p>
            <p><strong>Dropoff Address:</strong> {selectedDelivery.dropoff_address}</p>
            <p><strong>Customer:</strong> {selectedDelivery.customer_name} ({selectedDelivery.customer_phone})</p>
            <p><strong>Email:</strong> {selectedDelivery.email}</p>
            <p><strong>Delivery Cost:</strong> NGN {selectedDelivery.delivery_cost}</p>
            <p><strong>Status:</strong> <StatusBadge status={selectedDelivery.status}>{selectedDelivery.status}</StatusBadge></p>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default UserFoodDeliveries;
