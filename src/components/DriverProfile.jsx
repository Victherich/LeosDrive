
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser, FaPhone, FaEnvelope, FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: #f4f4f4;
  padding: 20px;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  cursor: pointer;
`;

const Icon = styled.div`
  color: #fe7c04;
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
`;

const Button = styled.button`
  background: #fe7c04;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background: gray;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #fe7c04;
`;

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
  max-width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: #fe7c04;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
`;

const DriverProfile = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  // Fetch driver details
  const fetchDriverById = async () => {
    try {
      const response = await fetch(`https://www.leosdrive.com/api/get_driver_by_id.php?id=${id}&_=${new Date().getTime()}`);
      if (!response.ok) throw new Error("Failed to fetch driver");
      const data = await response.json();
      if (data.success) {
        setDriver(data.user);
        setNewPhone(data.user.phone); // Set phone for modal
      } else throw new Error(data.error);
    } catch (error) {
      console.error("Error fetching driver:", error.message);
    }
  };

  useEffect(() => {
    fetchDriverById();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://www.leosdrive.com/api/driver_update_phone.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, phone: newPhone }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Phone number updated successfully!");
        setDriver({ ...driver, phone: newPhone }); // Update UI immediately
        setIsModalOpen(false); // Close modal
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
    <Container>
      <ProfileCard>
        <Title>Driver Profile</Title>

        <InputWrapper>
          <Icon><FaUser /></Icon>
          <Input type="text" value={driver.name || ""} disabled />
        </InputWrapper>

        <InputWrapper>
          <Icon><FaEnvelope /></Icon>
          <Input type="email" value={driver.email || ""} disabled />
        </InputWrapper>

        <InputWrapper>
          <Icon><FaPhone /></Icon>
          <Input type="tel" value={driver.phone || ""} readOnly />
          <Icon onClick={() => setIsModalOpen(true)}><FaEdit /></Icon>
        </InputWrapper>

        {message && <p>{message}</p>}
      </ProfileCard>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Edit Phone Number</h3>
            <input
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px", fontSize: "16px" }}
            />
            <CloseButton onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Save"}
            </CloseButton>
            <CloseButton onClick={() => setIsModalOpen(false)} style={{ background: "gray" }}>
              Cancel
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default DriverProfile;

