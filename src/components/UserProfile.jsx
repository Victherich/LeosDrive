// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { FaUser, FaPhone, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
// import { useParams } from "react-router-dom";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   width: 100%;
//   background: #f4f4f4;
//   padding: 20px;
// `;

// const ProfileCard = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 15px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   width: 90%;
//   max-width: 400px;
//   text-align: center;
// `;

// const AvatarWrapper = styled.div`
//   position: relative;
//   width: 100px;
//   height: 100px;
//   margin: 0 auto;
// `;

// const Avatar = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 3px solid #fe7c04;
// `;

// const CameraIcon = styled.label`
//   position: absolute;
//   bottom: 5px;
//   right: 5px;
//   background: #fe7c04;
//   color: white;
//   border-radius: 50%;
//   padding: 5px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   background: #e0e0e0;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 10px 0;
// `;

// const Icon = styled.div`
//   color: #fe7c04;
//   margin-right: 10px;
// `;

// const Input = styled.input`
//   flex: 1;
//   border: none;
//   background: transparent;
//   outline: none;
//   font-size: 1rem;
//   ::placeholder {
//     color: rgba(0, 0, 0, 0.6);
//   }
// `;

// const Button = styled.button`
//   background: #fe7c04;
//   color: white;
//   padding: 12px 24px;
//   font-size: 1rem;
//   font-weight: bold;
//   border: none;
//   border-radius: 25px;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   width: 100%;
//   margin-top: 10px;

//   &:hover {
//     background: gray;
//   }
// `;

// const Title = styled.h2`
// text-align:center;
// color:#fe7c04;

// `

// const UserProfile = () => {
//   const {id}=useParams();
//   const [user, setUser] = useState({});



//   const fetchUserById = async (userId) => {
//     try {
//       const response = await fetch(`https://www.leosdrive.com/api/get_user_by_id.php?id=${id}`);
      
//       if (!response.ok) {
//         throw new Error("Failed to fetch user");
//       }
  
//       const data = await response.json();
  
//       if (data.success) {
//         setUser(data.user)
//       } else {
//         throw new Error(data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error.message);
      
//     }
//   };


//   useEffect(()=>{
//     fetchUserById()
//   },[])



//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };



//   return (
//     <Container>
//       <ProfileCard>
      
//         <Title>User Profile</Title>

//         {/* User Details */}
//         <InputWrapper>
//           <Icon>
//             <FaUser />
//           </Icon>
//           <Input
//             type="text"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//           />
//         </InputWrapper>

        

//         <InputWrapper>
//           <Icon>
//             <FaEnvelope />
//           </Icon>
//           <Input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//           />
//         </InputWrapper>

//         <InputWrapper>
//           <Icon>
//             <FaPhone />
//           </Icon>
//           <Input
//             type="tel"
//             name="phone"
//             value={user.phone}
//             onChange={handleChange}
//           />
//         </InputWrapper>

     

//         <Button>Update Profile</Button>
//       </ProfileCard>
//     </Container>
//   );
// };

// export default UserProfile;

// 33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
// import { useParams } from "react-router-dom";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   width: 100%;
//   background: #f4f4f4;
//   padding: 20px;
// `;

// const ProfileCard = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 15px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   width: 90%;
//   max-width: 400px;
//   text-align: center;
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   background: #e0e0e0;
//   padding: 10px;
//   border-radius: 5px;
//   margin: 10px 0;
// `;

// const Icon = styled.div`
//   color: #fe7c04;
//   margin-right: 10px;
// `;

// const Input = styled.input`
//   flex: 1;
//   border: none;
//   background: transparent;
//   outline: none;
//   font-size: 1rem;
//   ::placeholder {
//     color: rgba(0, 0, 0, 0.6);
//   }
// `;

// const Button = styled.button`
//   background: #fe7c04;
//   color: white;
//   padding: 12px 24px;
//   font-size: 1rem;
//   font-weight: bold;
//   border: none;
//   border-radius: 25px;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   width: 100%;
//   margin-top: 10px;

//   &:hover {
//     background: gray;
//   }
// `;

// const Title = styled.h2`
//   text-align: center;
//   color: #fe7c04;
// `;

// const UserProfile = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch user details
//   const fetchUserById = async () => {
//     try {
//       const response = await fetch(`https://www.leosdrive.com/api/get_user_by_id.php?id=${id}`);
//       if (!response.ok) throw new Error("Failed to fetch user");
//       const data = await response.json();
//       if (data.success) setUser(data.user);
//       else throw new Error(data.error);
//     } catch (error) {
//       console.error("Error fetching user:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserById();
//   }, []);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch("https://www.leosdrive.com/api/user_update_phone.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, phone: user.phone }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         console.log(data)
//         setMessage("Phone number updated successfully!");
//         fetchUserById()
//       } else {
//         setMessage(data.error || "Failed to update phone number.");
//       }
//     } catch (error) {
//       setMessage("An error occurred.");
//       console.error("Error updating phone:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <Container>
//       <ProfileCard>
//         <Title>User Profile</Title>

//         <InputWrapper>
//           <Icon><FaUser /></Icon>
//           <Input type="text" name="name" value={user.name || ""} disabled />
//         </InputWrapper>

//         <InputWrapper>
//           <Icon><FaEnvelope /></Icon>
//           <Input type="email" name="email" value={user.email || ""} disabled />
//         </InputWrapper>

//         <InputWrapper>
//           <Icon><FaPhone /></Icon>
//           <Input type="tel" name="phone" value={user.phone || ""} onChange={handleChange} />
//         </InputWrapper>

//         <Button onClick={handleUpdate} disabled={loading}>
//           {loading ? "Updating..." : "Update Phone Number"}
//         </Button>

//         {message && <p>{message}</p>}
//       </ProfileCard>
//     </Container>
//   );
// };

// export default UserProfile;



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

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");

  // Fetch user details
  const fetchUserById = async () => {
    try {
      const response = await fetch(`https://www.leosdrive.com/api/get_user_by_id.php?id=${id}&_=${new Date().getTime()}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setNewPhone(data.user.phone); // Set phone for modal
      } else throw new Error(data.error);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://www.leosdrive.com/api/user_update_phone.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, phone: newPhone }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Phone number updated successfully!");
        setUser({ ...user, phone: newPhone }); // Update UI immediately
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
        <Title>User Profile</Title>

        <InputWrapper>
          <Icon><FaUser /></Icon>
          <Input type="text" value={user.name || ""} disabled />
        </InputWrapper>

        <InputWrapper>
          <Icon><FaEnvelope /></Icon>
          <Input type="email" value={user.email || ""} disabled />
        </InputWrapper>

        <InputWrapper>
          <Icon><FaPhone /></Icon>
          <Input type="tel" value={user.phone || ""} readOnly />
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

export default UserProfile;

