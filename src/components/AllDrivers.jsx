import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaPhone, FaCar, FaSearch, FaArrowLeft } from "react-icons/fa";
import { Context } from "./Context";
import Swal from "sweetalert2";

// Styled Components
const Container = styled.div`
//   padding: 20px;
  max-width: 900px;
  margin: auto;
//   text-align: center;
`;

const Title = styled.h2`
  color: #fe7c04;
  margin-bottom: 20px;
  text-align:center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 80vh;
  overflow-y: scroll;
`;

const UserCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease-in-out;
  border:1px solid lightgray;

  &:hover {
    // transform: scale(1.02);
  }
`;

const UserDetails = styled.div`
  text-align: left;
  width: 100%;
`;

const UserName = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
`;

const UserEmail = styled.p`
  font-size: 0.9rem;
  color: gray;
`;

const UserPhone = styled.p`
  font-size: 0.9rem;
  color: #fe7c04;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CarDetails = styled.div`
  font-size: 0.9rem;
  color: black;
  background: lightgray;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  display:flex;
  gap:10px;
  flex-wrap:wrap;
`;

const StatusBadge = styled.span`
  background: ${({ status }) => (status === "approved" ? "green" : status === "pending" ? "orange" : "red")};
  
  padding: 5px 5px;
    color:white;
  font-size: 0.9rem;
  font-weight:bold;
`;

const Button = styled.button`
  background:lightgray ;
  color: #333;
  border: none;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
  font-weight:bold;


  &:hover {
    text-decoration:underline;
  }
`;

// React Component
const AllDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { adminPages, setAdminPages } = useContext(Context);

 const fetchAllDrivers = ()=>{
    fetch("https://www.leosdrive.com/api/get_all_drivers.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setDrivers(data.drivers);
      } else {
        setError(data.error);
      }
      setLoading(false);
    })
    .catch((err) => {
      setError("Failed to fetch drivers.");
      setLoading(false);
    });
 }
  
 
      useEffect(() => {
        fetchAllDrivers();
    }, []);



  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(search.toLowerCase()) ||
      driver.email.toLowerCase().includes(search.toLowerCase())
  );






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
            fetchAllDrivers();
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
          fetchAllDrivers();
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
        <Button onClick={()=>setAdminPages(0)}><FaArrowLeft/>Back</Button>
      <Title>All Drivers</Title>
      <SearchInput
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading drivers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <UserList>
        {filteredDrivers.map((driver) => (
          <UserCard key={driver.driver_id}>
            <UserDetails>
              <UserName><FaUser /> {driver.name}</UserName>
              <UserEmail><FaEnvelope /> {driver.email}</UserEmail>
              <UserPhone><FaPhone /> {driver.phone}</UserPhone>
            </UserDetails>
            

            {driver.verification_id ? (
              <CarDetails>
                <p><FaCar /> <strong>Car:</strong> {driver.car_name} ({driver.car_model}) - {driver.car_color}</p>
                <p><strong>Plate:</strong> {driver.car_plate}</p>
                <p><strong>Status:</strong> <StatusBadge status={driver.status}>{driver.status.toUpperCase()}</StatusBadge></p>
              <Button onClick={()=>handleSuspendDriver(driver.driver_id)} >Suspend</Button>
              <Button onClick={()=>handleApproveDriver(driver.driver_id)}>Approve / Make Active</Button>
              </CarDetails>
            ):<h4 style={{color:"red"}}>Documents not submitted</h4>}
          </UserCard>
        ))}
      </UserList>

   
    </Container>
  );
};

export default AllDrivers;
