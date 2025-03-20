import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaPhone, FaSearch, FaArrowLeft } from "react-icons/fa";
import { Context } from "./Context";

// Styled Components
const Container = styled.div`
  // padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h2`
  color: #fe7c04;
  margin-bottom: 20px;
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
  height:80vh;
  overflow-y:scroll;
`;

const UserCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
  border:1px solid lightgray;
  
  &:hover {
    // transform: scale(1.02);
  }
`;

const UserDetails = styled.div`
  text-align: left;
  flex: 1;
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

const Button = styled.button`
  background:#fe7c04;
  color: white;
  border: none;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: gray;
  }
`;

// React Component
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {adminPages, setAdminPages} = useContext(Context)

  useEffect(() => {
    fetch("https://www.leosdrive.com/api/get_all_users.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      
      <Button onClick={()=>setAdminPages(0)}><FaArrowLeft/>Back</Button>
      <Title>All Users</Title>
      <SearchInput
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <UserList>
        {filteredUsers.map((user) => (
          <UserCard key={user.id}>
            <UserDetails>
              <UserName><FaUser /> {user.name}</UserName>
              <UserEmail><FaEnvelope /> {user.email}</UserEmail>
              <UserPhone><FaPhone /> {user.phone}</UserPhone>
            </UserDetails>
          </UserCard>
        ))}
      </UserList>
    </Container>
  );
};

export default AllUsers;
