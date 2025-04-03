import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaPhone, FaSearch, FaCar } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h2`
  color: #fe7c04;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  background: #fe7c04;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: gray;
  }
`;

const DriverList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DriverCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const DriverDetails = styled.div`
  font-size: 0.9rem;
  color: #333;
  margin-top: 10px;
`;


const Button = styled.button`
  background:white ;
  color: #fe7c04;
  border: none;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
  font-weight:bold;


  &:hover {
    text-decoration:underline;
  }
`

const ButtonWrap = styled.div`
display:flex;
flex-wrap:wrap;
gap:10px;
background:lightgray;
padding:10px;
border-radius:5px;
margin-top:10px;
`

// React Component
const SearchDriver = () => {
  const [email, setEmail] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSearch = async () => {
    if (!email.trim()) {
      Swal.fire("Error", "Please enter an email to search.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://www.leosdrive.com/api/search_driver.php?email=${email}`);
      const data = await response.json();

      if (data.success) {
        setDrivers(data.drivers);
        Swal.fire("Success", "Drivers found!", "success");
        console.log(data.drivers)
      } else {  
        setDrivers([]);
        Swal.fire("No Results", "No drivers found with that email.", "warning");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch drivers.", "error");
    }
    setLoading(false);
  };


  
    const handleApproveDriver = async (driverId) => {
        // Show loading alert
        Swal.fire({
            title: "Processing...",
            text: "Please wait while we approve the driver.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    
        try {
            const response = await fetch("https://www.leosdrive.com/api/approve_driver.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ driver_id: driverId })
            });
    
            const data = await response.json();
            
            if (data.success) {
              handleSearch()
                // Show success message
                Swal.fire({
                    icon: "success",
                    title: "Approved!",
                    text: data.message,
                    confirmButtonColor: "#fe7c04"
                });
            } else {
                // Show error message
                Swal.fire({
                    icon: "error",
                    title: "Approval Failed",
                    text: data.error,
                    confirmButtonColor: "#d33"
                });
            }
        } catch (error) {
            // Handle request failure
            Swal.fire({
                icon: "error",
                title: "Network Error",
                text: "Something went wrong. Please try again later.",
                confirmButtonColor: "#d33"
            });
        }
    };
    
  
    const handleSuspendDriver = async (driverId) => {
      // Show loading alert
      Swal.fire({
          title: "Processing...",
          text: "Please wait while we approve the driver.",
          allowOutsideClick: false,
          didOpen: () => {
              Swal.showLoading();
          },
      });
  
      try {
          const response = await fetch("https://www.leosdrive.com/api/suspend_driver.php", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ driver_id: driverId })
          });
  
          const data = await response.json();
          
          if (data.success) {
            handleSearch()
              // Show success message
              Swal.fire({
                  icon: "success",
                  title: "Suspended!",
                  text: data.message,
                  confirmButtonColor: "#fe7c04"
              });
          } else {
              // Show error message
              Swal.fire({
                  icon: "error",
                  title: "Suspend Failed",
                  text: data.error,
                  confirmButtonColor: "#d33"
              });
          }
      } catch (error) {
          // Handle request failure
          Swal.fire({
              icon: "error",
              title: "Network Error",
              text: "Something went wrong. Please try again later.",
              confirmButtonColor: "#d33"
          });
      }
  };
  
  

  return (
    <Container>
      <Title>Search Drivers</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Enter driver email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>
          <FaSearch /> Search
        </SearchButton>
      </SearchContainer>

      {loading && <p>Loading...</p>}

      <DriverList>
        {drivers.map((driver) => (
          <DriverCard key={driver?.driver_id}>
            <h3 style={{color:"#fe7c04"}}><FaUser /> {driver?.name}</h3>
            <DriverDetails><FaEnvelope /> {driver?.email}</DriverDetails>
            <DriverDetails><FaPhone /> {driver?.phone}</DriverDetails>
            <DriverDetails><FaCar /> {driver?.car_model} ({driver.car_color})</DriverDetails>
            <DriverDetails>Plate: {driver?.car_plate}</DriverDetails>
            <DriverDetails style={{fontWeight:"bold"}}>Status: {driver?.status?.toUpperCase()}</DriverDetails>
            <ButtonWrap>
            <Button onClick={()=>handleSuspendDriver(driver.driver_id)}>Suspend</Button>
            <Button onClick={()=>handleApproveDriver(driver.driver_id)}>Approve / Make Active</Button>
            <Button onClick={()=>navigate(`/driverdashboard/completedRides2/${driver.driver_id}`)}>Rides and Earnings</Button>
            {/* <Button>Rides</Button> */}
            </ButtonWrap>
          </DriverCard>
        ))}
      </DriverList>
    </Container>
  );
};

export default SearchDriver;
