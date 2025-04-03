import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

// Styled components
const DeliveryListContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
`;

const DeliveryCard = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 15px 0;
  padding: 20px;
  border-radius: 8px;
  cursor:pointer;
  p{
    margin:10px;
  }
    h3{
    color:orange;
    }
`;

const StatusBadge = styled.span`
  background-color: ${(props) => props.color || '#f1f1f1'};
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color:orange;
`;

const MyDeliveryBookings = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [userId] = useState(1); 
  const {user_id}=useParams()
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch deliveries from backend
    axios
      .get(`https://www.leosdrive.com/api/fetch_user_deliveries.php?user_id=${user_id}`)
      .then((response) => {
        if (response.data.success) {
          setDeliveries(response.data.deliveries);
        } else {
          console.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching deliveries:', error);
      });
  }, [userId]);

  // Function to map status to color
  const getStatusColor = (status) => {
    switch (status) {
      case 'created':
        return '#6c757d'; // Gray
      case 'collected':
        return '#28a745'; // Green
      case 'processing':
        return '#ffc107'; // Yellow
      case 'out_for_delivery':
        return '#17a2b8'; // Blue
      case 'delivered':
        return '#007bff'; // Blue
      default:
        return '#f1f1f1'; // Default gray color
    }
  };

  return (
    <DeliveryListContainer>
      <Title>Your Delivery Bookings</Title>
      {deliveries.length > 0 ? (
        deliveries.map((delivery) => (
          <DeliveryCard key={delivery.booking_number} onClick={()=>navigate(`/userdashboard/mydelivery/${delivery.id}`)}>
            <h3>Booking Number: {delivery.booking_number}</h3>
            <p>Sender: {delivery.sender_name}</p>
            <p>Receiver: {delivery.receiver_name}</p>
            <p>Pickup: {delivery.pickup_address}</p>
            <p>Drop-off: {delivery.dropoff_address}</p>
            <p>Status: 
              <StatusBadge color={getStatusColor(delivery.status)}>
                {delivery.status}
              </StatusBadge>
            </p>
          </DeliveryCard>
        ))
      ) : (
        <p>No deliveries found.</p>
      )}
    </DeliveryListContainer>
  );
};

export default MyDeliveryBookings;


