import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ref, get, push, set, remove } from "firebase/database";
import { database } from "./firebaseConfig"; // Adjust this import
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "./Context";
// 🌟 Styled Components for Beautiful UI
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const RideCard = styled.div`
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 15px 0;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const RideInfo = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
`;

const PassengerDetails = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
    padding:10px;
    background:orange;
    color:white;
    cursor:pointer;
    &:hover{
    background:gray
    }
`

// 🚀 Component to Display Accepted Rides
const DriverAcceptedRides = () => {
    const {driverId}=useParams();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
//   console.log(driverId)
  const [user, setUser] = useState({})
  const {rates} = useContext(Context)

//   console.log(user)





  



  useEffect(() => {
    const fetchAcceptedRides = async () => {
      try {
        const ridesRef = ref(database, "acceptedRides"); // ✅ Correct reference
        const snapshot = await get(ridesRef);
  
        if (snapshot.exists()) {
          const ridesData = snapshot.val();
        //   console.log("All Rides:", ridesData); // ✅ Log fetched rides
  
          // ✅ Convert data to an array and filter
          const driverRides = Object.keys(ridesData)
            .map((key) => ({
              id: key,
              ...ridesData[key],
            }))
            .filter((ride) => {
            //   console.log(`Checking ride ${ride.id}:`, ride); // ✅ Log each ride
              return (
                String(ride.driver_id) === String(driverId) && ride.ride_status === "accepted"
              );
            });
  
          console.log("Filtered Rides:", driverRides); // ✅ Log after filtering
  
          setRides(driverRides.length > 0 ? driverRides : []); // ✅ Update state
          fetchUserById(driverRides[0].user_id)
        } else {
          setRides([]); // ✅ Handle empty data
        }
      } catch (error) {
        console.error("Error fetching rides:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAcceptedRides();
  }, [driverId]);



   // Fetch user details
   const fetchUserById = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`https://www.leosdrive.com/api/get_user_by_id.php?id=${id}&_=${new Date().getTime()}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        // setNewPhone(data.user.phone); // Set phone for modal
      } else throw new Error(data.error);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };




  const startRide = (rideId) => {
    // Reference to the accepted ride
    const acceptedRideRef = ref(database, `acceptedRides/${rideId}`);
  
    // Fetch the accepted ride data
    get(acceptedRideRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const rideData = snapshot.val();
  
          // Move the ride to the "ongoingRides" table
          const ongoingRideRef = push(ref(database, "ongoingRides"));
          set(ongoingRideRef, rideData)
            .then(() => {
              // Remove the ride from "acceptedRides" after moving it
              remove(acceptedRideRef)
                .then(() => {
                  Swal.fire("Ride Started!", "This ride is now ongoing.", "success");
                  fetchAcceptedRides(); // Fetch accepted rides to update UI
                  fetchOngoingRides();
                  fetchOngoingRides2();

                })
                .catch((error) => {
                  console.error("Error deleting ride from acceptedRides:", error);
                  Swal.fire("Error", "Could not delete ride from acceptedRides.", "error");
                });
            })
            .catch((error) => {
              console.error("Error moving ride to ongoingRides:", error);
              Swal.fire("Error", "Could not start the ride.", "error");
            });
        } else {
          Swal.fire("Error", "Ride not found in accepted rides.", "error");
        }
      })
      .catch((error) => {
        console.error("Error fetching accepted ride:", error);
        Swal.fire("Error", "Could not fetch ride details.", "error");
      });
  };



  const fetchAcceptedRides = async () => {
    try {
      const ridesRef = ref(database, "acceptedRides");
      const snapshot = await get(ridesRef);
  
      if (snapshot.exists()) {
        const ridesData = snapshot.val();
        const driverRides = Object.keys(ridesData)
          .map((key) => ({
            id: key,
            ...ridesData[key],
          }))
          .filter((ride) => ride.driver_id === driverId && ride.ride_status === "accepted");
  
        setRides(driverRides); // ✅ Update UI with accepted rides
      } else {
        setRides([]); // ✅ Empty UI when no accepted rides exist
      }
    } catch (error) {
      console.error("Error fetching accepted rides:", error);
    }
  };
  
  
  


    const [ongoingRides, setOngoingRides] = useState([]);
 
  

    
    const fetchOngoingRides = async () => {
        try {
          const ridesRef = ref(database, "ongoingRides");
          const snapshot = await get(ridesRef);
      
          if (snapshot.exists()) {
            const ridesData = snapshot.val();
      
            console.log("Fetched ridesData:", ridesData); // ✅ Debugging
      
            if (!driverId) {
              console.error("Driver ID is missing!");
              return;
            }
      
            // Ensure driverId is a string if stored that way in Firebase
            const formattedDriverId = String(driverId);
      
            // ✅ Filter only the ongoing rides assigned to this driver
            const driverOngoingRides = Object.keys(ridesData)
              .map((key) => ({
                id: key,
                ...ridesData[key],
              }))
              .filter((ride) => {
                console.log(`Checking ride: ${ride.id}, driver_id: ${ride.driver_id}`);
                return String(ride.driver_id) === formattedDriverId;
              });
      
            console.log("Filtered ongoing rides:", driverOngoingRides); // ✅ Debugging
      
            setOngoingRides(driverOngoingRides);
            fetchUserById(driverOngoingRides[0].user_id)
          } else {
            console.warn("No ongoing rides found.");
            setOngoingRides([]);
          }
        } catch (error) {
          console.error("Error fetching ongoing rides:", error);
        } finally {
          setLoading(false);
        }
      };
      


    useEffect(() => {
      fetchOngoingRides();
    }, [driverId]);


    












// @@@@@@@@@@@@@@@@@@@
// number 1
const [rideUpdate, setRideUpdate] = useState({
    location: null,
    distance: 0,
    amount: 0,
  });
  const [startLocation, setStartLocation] = useState(null); // Start location
  const [currentLocation, setCurrentLocation] = useState(null); // Current location of the driver
  const ratePerKm = rates // Example rate per km, adjust accordingly

// number 2
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
  
        if (startLocation) {
          const distance = calculateDistance(
            startLocation.latitude,
            startLocation.longitude,
            latitude,
            longitude
          );
          setRideUpdate((prevState) => ({
            ...prevState,
            location: `${latitude}, ${longitude}`,
            distance: distance,
            amount: distance * ratePerKm, // Calculate amount based on distance
          }));
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  

// number3
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  
// number 4
  useEffect(() => {
    const intervalId = setInterval(getCurrentLocation, 10000); // Update every 10 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [startLocation]);
  


//   number 5
const fetchOngoingRides2 = async () => {
    try {
      const ridesRef = ref(database, "ongoingRides"); // Fetch from ongoingRides table
      const snapshot = await get(ridesRef);
      
      if (snapshot.exists()) {
        const ridesData = snapshot.val();
        
        // Filter ongoing rides for the specific driver
        const driverRides = Object.keys(ridesData)
          .map((key) => ({
            id: key,
            ...ridesData[key],
          }))
          .filter((ride) => {
            return String(ride.driver_id) === String(driverId) && ride.ride_status === "accepted"; // Ensuring we're looking at ongoing rides
          });
  
        if (driverRides.length > 0) {
          // Set start location from the ongoing ride's pickup location
          const ongoingRide = driverRides[0];
          setStartLocation({
            latitude: ongoingRide.pickup_lat,
            longitude: ongoingRide.pickup_lng,
          });
  
          console.log(ongoingRide);
        //   alert("Start location picked for ongoing ride");
        } else {
          console.log("No ongoing rides for this driver.");
        }
      }
    } catch (error) {
      console.error("Error fetching ongoing rides:", error);
    }
  };


  useEffect(()=>{
    fetchOngoingRides2()
  },[])
  
  


// end ride ##################
const endRide = (rideId) => {
    // Reference to the ongoing ride
    const ongoingRideRef = ref(database, `ongoingRides/${rideId}`);
  
    // Fetch the ongoing ride data
    get(ongoingRideRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const rideData = snapshot.val();
  
          // Prepare the completed ride data
          const completedRideData = {
            ...rideData, // Spread the existing ride data
            final_location: rideUpdate.location,  // Final location from rideUpdate
            final_distance: rideUpdate.distance,  // Total distance traveled during the ride
            final_amount: rideUpdate.amount,      // Total fare based on distance (or other factors)
            ride_status: "completed",             // Update status to completed
            end_time: new Date().toISOString(),  // Timestamp of when the ride ended
          };
  
          // Move the ride to the "completedRides" table
          const completedRideRef = push(ref(database, "completedRides"));
          set(completedRideRef, completedRideData)
            .then(() => {
              // Remove the ride from "ongoingRides" after moving it to completed
              remove(ongoingRideRef)
                .then(() => {
                  Swal.fire("Ride Ended!", "This ride has been marked as completed. Proceed to your completed Rides", "success");
                  fetchOngoingRides(); // Fetch ongoing rides to update UI
                 
                })
                .catch((error) => {
                  console.error("Error deleting ride from ongoingRides:", error);
                  Swal.fire("Error", "Could not remove ride from ongoingRides.", "error");
                });
            })
            .catch((error) => {
              console.error("Error moving ride to completedRides:", error);
              Swal.fire("Error", "Could not end the ride.", "error");
            });
        } else {
          Swal.fire("Error", "Ride not found in ongoing rides.", "error");
        }
      })
      .catch((error) => {
        console.error("Error fetching ongoing ride:", error);
        Swal.fire("Error", "Could not fetch ongoing ride details.", "error");
      });
  };
  
  


  

  
  return (
    <>
      {ongoingRides.length<=0 &&  <Container>
      <Title>Accepted Rides / Ongoing Rides</Title>
      {loading ? (
        <p>Loading rides...</p>
      ) : rides.length === 0 ? (
        <p>No accepted rides available</p>
      ) : (
        rides.map((ride) => (
          <RideCard key={ride.id}>
            <RideInfo><strong>Booking Number:</strong> {ride.booking_number}</RideInfo>
            <RideInfo><strong>Pickup Location:</strong> {ride.pickup_lat}, {ride.pickup_lng}</RideInfo>
            <RideInfo><strong>Drop-off:</strong> {ride.drop_off}</RideInfo>
            <RideInfo><strong>Status:</strong> {ride.ride_status}</RideInfo>
         
            

            {user && (
              <PassengerDetails>
                <strong>Passenger Details</strong>
                <RideInfo><strong>Name:</strong> {user.name}</RideInfo>
                <RideInfo><strong>Phone:</strong>{user.phone}</RideInfo>
                <RideInfo><strong>Email:</strong> {user.email}</RideInfo>
              </PassengerDetails>
            )}

            <Button onClick={()=>startRide(ride.id)}>
                Start Ride
            </Button>   
          </RideCard>
        ))
      )}
    </Container>}


   {ongoingRides?.length > 0 && <Container>
      <Title>Accepted Rides / Ongoing Rides</Title>
      {loading ? (
        <p>Loading rides...</p>
      ) : ongoingRides.length === 0 ? (
        <p>No ongoing rides available</p>
      ) : (
        ongoingRides.map((ride) => (
          <RideCard key={ride.id}>
            <RideInfo><strong>Booking Number:</strong> {ride.booking_number}</RideInfo>
            <RideInfo><strong>Pickup Location:</strong> {ride.pickup_lat}, {ride.pickup_lng}</RideInfo>
            <RideInfo><strong>Drop-off:</strong> {ride.drop_off}</RideInfo>
            <RideInfo><strong>Status:</strong> {ride.ride_status}</RideInfo>
       
            
            
            {user && (
              <PassengerDetails>
                <strong>Passenger Details</strong>
                <RideInfo><strong>Name:</strong> {user.name}</RideInfo>
                <RideInfo><strong>Phone:</strong>{user.phone}</RideInfo>
                <RideInfo><strong>Email:</strong> {user.email}</RideInfo>
              </PassengerDetails>
            )}

            <Button onClick={()=>endRide(ride.id)}>
                End Ride
            </Button>   
                <PassengerDetails>
                    <strong>Ride Updates</strong>
                    <RideInfo><strong>Current Location:</strong> {rideUpdate.location}</RideInfo>
                    <RideInfo><strong>Distance Covered:</strong> {rideUpdate.distance}</RideInfo>
                    <RideInfo><strong>Current Amount:</strong> NGN {rideUpdate.amount}</RideInfo>
                    
                </PassengerDetails>
            
          </RideCard>
        ))
      )}
    </Container>}
    </>
    
  );
};

export default DriverAcceptedRides;
