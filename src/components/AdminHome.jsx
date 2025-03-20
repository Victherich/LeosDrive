

import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaUsers, FaSave, FaTimes, FaCog, FaChartBar, FaSignOutAlt, FaUser, FaEnvelope, FaPhone, FaEdit, FaTaxi } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Context } from "./Context";

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  // padding: 20px;
`;

const Card = styled.div`
  background: white;
  color: #333;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 450px;
  text-align: center;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  color: #fe7c04;
  margin-bottom: 15px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: gray;
`;

const InfoBox = styled.div`
  margin: 15px 0;
  padding: 15px;
  border-radius: 10px;
  background: #f8f8f8;
  text-align: left;
  color: #333;
`;

const InfoItem = styled.p`
  font-size: 1rem;
  margin: 5px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const ActionButton = styled.button`
  background: ${(props) => props.bgColor || "#fe7c04"};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.3s;
  font-weight: bold;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: gray;
  }
`;

// Styled modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin-bottom: 15px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;



const Button = styled.button`
  background: ${(props) => props.bgColor || "#fe7c04"};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: gray;
  }
`;

const AdminHome = () => {
  const { adminId, userId } = useParams();
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const adminInfo = useSelector(state => state.adminInfo)
  const id = adminInfo.id
  console.log(adminInfo.id)
  const [newPhone, setNewPhone]=useState('')
  const [message, setMessage]=useState('')
  const [showModal, setShowModal]=useState(false)
  const {adminPages, setAdminPages} = useContext(Context)


  // Fetch admin details
  const fetchAdminById = async () => {
    try {
      const response = await fetch(`https://www.leosdrive.com/api/get_admin_by_id.php?id=${adminInfo.id}`);
      if (!response.ok) throw new Error("Failed to fetch admin details");
      const data = await response.json();
      if (data.success) {
        setAdmin(data.user);
        setLoading(false)
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(()=>{
    fetchAdminById()
  },[])


  
  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://www.leosdrive.com/api/admin_update_phone.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, phone: newPhone }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Phone number updated successfully!");
        setUser({ ...user, phone: newPhone }); // Update UI immediately
        setShowModal(false); // Close modal
        fetchAdminById();
      } else {
        setMessage(data.error || "Failed to update phone number.");
      }
    } catch (error) {
      setMessage("An error occurred.");
      console.error("Error updating phone:", error);
    }

    setLoading(false);
  };



  return (
    <AdminContainer>
      <Card>
        <Title>Welcome, Admin!</Title>
        <Subtitle>Manage users, monitor stats, and configure settings.</Subtitle>

        {loading ? <p>Loading data...</p> : null}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Admin Details */}
        {admin && (
          <InfoBox>
            <h3 style={{color:"#fe7c04"}}>Admin Details</h3>
            <InfoItem><FaUser /> Name: {admin.name}</InfoItem>
            <InfoItem><FaEnvelope /> Email: {admin.email}</InfoItem>
            <InfoItem><FaPhone/> Phone: {admin.phone} </InfoItem>
            <InfoItem 
            onClick={()=>setShowModal(true)}
            style={{color:"#fe7c04", textDecoration:"underline", marginTop:"10px", cursor:"pointer"}}><FaEdit/> Edit Phone</InfoItem>
          <p>{message}</p>
          </InfoBox>
          
        )}



        <ButtonGroup>
          <ActionButton bgColor="#fe7c04" onClick={()=>setAdminPages(1)}>
            <FaUsers /> Manage Users
          </ActionButton>

          <ActionButton bgColor="#28a745" onClick={()=>setAdminPages(2)}>
            <FaTaxi /> Manage Drivers
          </ActionButton>

          
        </ButtonGroup>
      </Card>

       {/* Modal for Editing Phone */}
       {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Edit Phone Number</ModalTitle>
            <Input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Enter new phone number"
            />
            <ButtonGroup>
              <Button bgColor="#28a745" onClick={handleUpdate}>
                <FaSave /> Save
              </Button>
              <Button bgColor="#dc3545" onClick={() => setShowModal(false)}>
                <FaTimes /> Cancel
              </Button>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </AdminContainer>
  );
};

export default AdminHome;

