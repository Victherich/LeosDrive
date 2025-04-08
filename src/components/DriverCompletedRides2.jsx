

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ref, get } from 'firebase/database';
import { database } from "./firebaseConfig";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Context } from './Context';

// Styled Components for UI Design
const Container = styled.div`
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const SummaryBox = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  margin: 0 auto 20px;
`;

const SummaryText = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const AmountHighlight = styled.span`
  color: #28a745;
  font-size: 18px;
`;

const RideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RideCard = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const RideInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const Amount = styled.span`
  font-size: 16px;
  color: #28a745;
  font-weight: bold;
`;

const Status = styled.span`
  font-size: 14px;
  color: ${({ status }) => (status === 'completed' ? '#28a745' : '#ffc107')};
  font-weight: bold;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #666;
`;



const DriverCompletedRides2 = () => {
  const [completedRides, setCompletedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [driverEarnings, setDriverEarnings] = useState(0);
  
  const driverInfo = useSelector(state => state.driverInfo);
//   const driverId = driverInfo.id;
const {driverId} = useParams();

const {commissionRates}=useContext(Context);

 // Fixed percentage for driver's commission
const DRIVER_COMMISSION = commissionRates/100;

useEffect(() => {
  const fetchCompletedRides = async () => {
    try {
      const ridesRef = ref(database, 'completedRides');
      const snapshot = await get(ridesRef);

      if (snapshot.exists()) {
        const ridesData = snapshot.val();
        const driverCompletedRides = Object.keys(ridesData)
          .map((key) => ({
            id: key,
            ...ridesData[key],
          }))
          .filter((ride) => String(ride.driver_id) === String(driverId));

        setCompletedRides(driverCompletedRides);

        // Calculate Total Amount
        const total = driverCompletedRides.reduce((sum, ride) => sum + (ride.final_amount || 0), 0);
        setTotalAmount(total)
          
        
    
        // Calculate Driver's Earnings (20% of total)
       
      } else {
        setCompletedRides([]);
        setTotalAmount(0);
        setDriverEarnings(0);
      }
    } catch (error) {
      console.error('Error fetching completed rides:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchCompletedRides();
}, [driverId]);

// calculating drier earning
useEffect(()=>{
  setDriverEarnings(parseFloat(totalAmount) * DRIVER_COMMISSION);    
},[totalAmount])

  return (
    <Container>
      <Title>Completed Rides</Title>

      {/* Earnings Summary */}
      <SummaryBox>
  <SummaryText>Total Earnings from Rides: <AmountHighlight>NGN {parseFloat(totalAmount).toFixed(2)}</AmountHighlight></SummaryText>
  <SummaryText>Driver's Commission ({commissionRates}% of Total): <AmountHighlight>NGN {(driverEarnings).toFixed(2)}</AmountHighlight></SummaryText>
</SummaryBox>


      {loading ? (
        <Loader>Loading completed rides...</Loader>
      ) : (
        <RideList>
          {completedRides.length === 0 ? (
            <RideInfo>No completed rides found</RideInfo>
          ) : (
            completedRides
            .sort((a, b) => new Date(b.end_time) - new Date(a.end_time))
            .map((ride) => (
              <RideCard key={ride.id}>
                  <RideInfo><strong>Booking Number:</strong> {ride.booking_number}</RideInfo>
                  {/* <RideInfo><strong>Pickup Location:</strong> {ride.pickup_lat}, {ride.pickup_lng}</RideInfo> */}
                  <RideInfo><strong>Pickup Location:</strong> {ride.pickup_location}</RideInfo>
                  <RideInfo><strong>Drop-off Location:</strong> {ride.drop_off}</RideInfo>
                  <RideInfo><strong>Status:</strong> <Status status={ride.ride_status}>{ride.ride_status}</Status></RideInfo>
                  {/* <RideInfo><strong>Distance Covered:</strong> {ride.final_distance} km</RideInfo> */}
                  <RideInfo><strong>Start Time:</strong> {ride.start_time}</RideInfo>
                  <RideInfo><strong>Duration:</strong> {ride.ride_duration}</RideInfo>
                  <RideInfo><strong>End Time:</strong> {ride.end_time}</RideInfo>
                <RideInfo><strong>Amount:</strong> <Amount>NGN {parseFloat(ride.final_amount).toFixed(2)}</Amount></RideInfo>
               
              </RideCard>
            ))
          )}
        </RideList>
      )}
    </Container>
  );
};

export default DriverCompletedRides2;

