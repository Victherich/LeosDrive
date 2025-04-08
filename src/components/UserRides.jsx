// import React, { useState } from "react";
// import styled from "styled-components";
// import { FaMapMarkerAlt, FaCar, FaDollarSign, FaClock } from "react-icons/fa";

// // Styled Components
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   width: 100%;
//   background: #f4f4f4;
//   padding: 20px;
// `;

// const Title = styled.h1`
//   font-size: 1.8rem;
//   margin-bottom: 20px;
//   color: #fe7c04;
// `;

// const RideCard = styled.div`
//   background: white;
//   padding: 15px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   width: 90%;
//   max-width: 400px;
//   margin-bottom: 15px;
// `;

// const RideInfo = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Icon = styled.div`
//   color: #fe7c04;
//   margin-right: 10px;
// `;

// const InfoText = styled.p`
//   font-size: 1rem;
//   color: #333;
//   margin: 0;
// `;

// const Status = styled.span`
//   font-size: 0.9rem;
//   font-weight: bold;
//   padding: 5px 10px;
//   border-radius: 20px;
//   color: white;
//   background: ${({ status }) =>
//     status === "Completed" ? "green" : status === "Upcoming" ? "#fe7c04" : "gray"};
// `;

// const UserRides = () => {
//   const [rides, setRides] = useState([
//     {
//       id: 1,
//       pickup: "123 Main St, City",
//       destination: "Airport",
//       date: "March 15, 2025",
//       price: "$15.00",
//       status: "Completed",
//     },
//     {
//       id: 2,
//       pickup: "Mall Avenue",
//       destination: "Hotel Grand",
//       date: "March 20, 2025",
//       price: "$10.00",
//       status: "Upcoming",
//     },
//     {
//       id: 3,
//       pickup: "Park Street",
//       destination: "Downtown Office",
//       date: "March 10, 2025",
//       price: "$8.00",
//       status: "Cancelled",
//     },
//   ]);

//   return (
//     <Container>
//       <Title>My Rides</Title>
//       {rides.map((ride) => (
//         <RideCard key={ride.id}>
//           <RideInfo>
//             <Icon>
//               <FaMapMarkerAlt />
//             </Icon>
//             <InfoText>
//               <strong>From:</strong> {ride.pickup}
//             </InfoText>
//           </RideInfo>

//           <RideInfo>
//             <Icon>
//               <FaCar />
//             </Icon>
//             <InfoText>
//               <strong>To:</strong> {ride.destination}
//             </InfoText>
//           </RideInfo>

//           <RideInfo>
//             <Icon>
//               <FaClock />
//             </Icon>
//             <InfoText>
//               <strong>Date:</strong> {ride.date}
//             </InfoText>
//           </RideInfo>

//           <RideInfo>
//             <Icon>
//               <FaDollarSign />
//             </Icon>
//             <InfoText>
//               <strong>Price:</strong> {ride.price}
//             </InfoText>
//           </RideInfo>

//           <Status status={ride.status}>{ride.status}</Status>
//         </RideCard>
//       ))}
//     </Container>
//   );
// };

// export default UserRides;




import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaCar, FaDollarSign, FaClock } from "react-icons/fa";
import { ref, get } from "firebase/database";
import { database } from "./firebaseConfig";
import { useSelector } from "react-redux";

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

const Loader = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const Amount = styled.span`
  font-size: 16px;
  color: #28a745;
  font-weight: bold;
`;


// Fetch and display user's completed rides
const UserRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.userInfo); // Get user info from Redux
  const userId = userInfo?.id;

  // Fetch completed rides for the logged-in user
  useEffect(() => {
    if (!userId) return;

    const fetchCompletedRides = async () => {
      try {
        const completedRidesRef = ref(database, "completedRides");
        const snapshot = await get(completedRidesRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const userCompletedRides = Object.keys(data)
            .map((key) => ({ id: key, ...data[key] }))
            .filter((ride) => String(ride.user_id) === String(userId));

          setRides(userCompletedRides);
        } else {
          setRides([]);
        }
      } catch (error) {
        console.error("Error fetching completed rides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedRides();
  }, [userId]);

  return (
    <Container>
      <Title>My Completed Rides</Title>
      {loading ? (
        <Loader>Loading completed rides...</Loader>
      ) : rides.length === 0 ? (
        <Loader>No completed rides found</Loader>
      ) : (
        rides
        .sort((a, b) => new Date(b.end_time) - new Date(a.end_time))
        .map((ride) => (
          <RideCard key={ride.id}>
          <RideInfo><strong>Booking Number: </strong> {ride.booking_number}</RideInfo>
          {/* <RideInfo><strong>Pickup Location:</strong> {ride.pickup_lat}, {ride.pickup_lng}</RideInfo> */}
          <RideInfo><strong>Pickup Location: </strong> {ride.pickup_location}</RideInfo>
          <RideInfo><strong>Drop-off Location: </strong> {ride.drop_off}</RideInfo>
          {/* <RideInfo><strong>Distance Covered:</strong> {ride.final_distance} km</RideInfo> */}
          <RideInfo><strong>Start Time: </strong> {ride.start_time}</RideInfo>
          <RideInfo><strong>Duration: </strong> {ride.ride_duration}</RideInfo>
          <RideInfo><strong>End Time: </strong> {ride.end_time}</RideInfo>
        <RideInfo><strong>Amount: </strong> <Amount>NGN {parseFloat(ride.final_amount).toFixed(2)}</Amount></RideInfo>
        <RideInfo><strong>Status: </strong> <Status status={ride.ride_status}>{ride.ride_status}</Status></RideInfo>
         
      </RideCard>
        ))
      )}
    </Container>
  );  
};

export default UserRides;

