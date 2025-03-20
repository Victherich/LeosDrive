// import React, { useState } from "react";
// import styled from "styled-components";
// import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";
// import logo from '../Images/logo.jpeg'
// import { adminLogout } from "../Features/Slice";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import { useEffect, useRef } from "react";

// // Styled Components
// const AppContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #f5f5f5;
// `;

// const PhoneFrame = styled.div`
//   width: 100%;
//   height: 100%;
//   background: white;
//   border-radius: 25px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   border: 2px solid #ccc;

  
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 15px;
//   background: #fe7c04;
//   color: white;
// `;

// const MenuIcon = styled(FaBars)`
//   font-size: 22px;
//   cursor: pointer;
// `;

// const Sidebar = styled.div`
//   position: absolute;
//   top: 0;
//   right: ${({ isOpen }) => (isOpen ? "0" : "-220px")}; /* Slide from right */
//   width: 220px;
//   height: 100%;
//   background: white;
//   box-shadow: ${({ isOpen }) => (isOpen ? "-2px 0 5px rgba(0, 0, 0, 0.2)" : "none")}; /* Shadow on left */
//   transition: right 5s ease; /* Animate right instead of left */
//   padding: 15px;
// `;


// const SidebarItem = styled.button`
//   width: 100%;
//   background: none;
//   border: none;
//   text-align: left;
//   padding: 10px;
//   font-size: 16px;
//   cursor: pointer;
//   color: #333;
//   &:hover {
//     background: #fe7c04;
//     color: white;
//     border-radius: 5px;
//   }
// `;

// const Content = styled.div`
//   flex: 1;
//   padding: 15px;
//   overflow-y: auto;
// `;

// const BottomNav = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   background: whitesmoke;
//   padding: 10px;
//   border-top: 1px solid #ddd;
// `;

// const NavIcon = styled.div`
//   font-size: 24px;
//   color: ${({ active }) => (active ? "#fe7c04" : "#666")};
//   cursor: pointer;
// `;


// const LogoWrap = styled.div`
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     gap:10px;
// `

// const Img = styled.img`
//     width:35px;
//     height:35px;
//     border-radius:50%;
// `

// const AdminDashboard = ({ children }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef()
//   const dispatch = useDispatch()


//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (menuRef.current && !menuRef.current.contains(event.target)) {
//           setMenuOpen(false); 
//         }
//       };
  
//       if (menuOpen) {
//         document.addEventListener("mousedown", handleClickOutside);
//       } else {
//         document.removeEventListener("mousedown", handleClickOutside);
//       }
  
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, [menuOpen, setMenuOpen]);


//   const handleLogout = () => {
//     Swal.fire({
//       // title: 'Are you sure?',
//       text: 'Do you want to log out?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, log out!',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//        dispatch(adminLogout()); // Perform the logout action
//         Swal.fire(
//           'Logged Out!',
//           'You have been logged out.',
//           'success'
//         );
//       }
//     });
//   };

//   return (
//     <AppContainer>
//       <PhoneFrame>
//         {/* Header */}
//         <Header>
//           <LogoWrap>
//           <Img src={logo} alt="logo"/>
//           <h2>LeosDrive</h2>
//           </LogoWrap>
//           <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />
//         </Header>

//         {/* Sidebar Navigation */}
//         {menuOpen&&<Sidebar isOpen={menuOpen} ref = {menuRef}>
//           <SidebarItem onClick={() => setMenuOpen(false)}>🏠 Home</SidebarItem>
//           <SidebarItem onClick={() => setMenuOpen(false)}>👤 Profile</SidebarItem>
//           <SidebarItem onClick={() => setMenuOpen(false)}>⚙️ Settings</SidebarItem>
//           <SidebarItem onClick={handleLogout}>🏃‍♂️ Logout</SidebarItem>
//         </Sidebar>}

//         {/* Main Content */}
//         <Content>{children}</Content>

//         {/* Bottom Navigation */}
//         <BottomNav>
//           <NavIcon active>
//             <FaHome />
//           </NavIcon>
//           <NavIcon>
//             <FaUser />
//           </NavIcon>
//           <NavIcon>
//             <FaCog />
//           </NavIcon>
//         </BottomNav>
//       </PhoneFrame>
//     </AppContainer>
//   );
// };

// export default AdminDashboard;




import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FaHome, FaUser, FaCog, FaBars, FaHamburger, FaTaxi } from "react-icons/fa";
import logo from '../Images/logo.jpeg';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { adminLogout } from "../Features/Slice";
import { Routes, Route, useNavigate } from "react-router-dom";
import BookARide from "./BookARide";
import UserProfile from "./UserProfile";
import UserRides from "./UserRides";
import BookARide2 from "./BookARide2";
import BookARide3 from "./BookARide3";
import AdminHome from "./AdminHome";
import { Context } from "./Context";
import AllUsers from "./AllUsers";
import AllDrivers from "./AllDrivers";
import SearchDriver from "./SearchDriver";
import RideRateManagement from "./RideRateManagement";
import CommissionRateManagement from "./CommisionRateManagement";


// Styled Components
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

const PhoneFrame = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #fe7c04;
  color: white;
`;

const MenuIcon = styled(FaBars)`
  font-size: 22px;
  cursor: pointer;
`;

const Sidebar = styled.div`
  position: absolute;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-220px")}; 
  width: 220px;
  height: 100%;
  background: white;
  box-shadow: ${({ isOpen }) => (isOpen ? "-2px 0 5px rgba(0, 0, 0, 0.2)" : "none")}; 
  transition: right 0.3s ease; 
  padding: 15px;
  z-index:9999;
`;

const SidebarItem = styled.button`
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  color: #333;
  
  &:hover {
    background: #fe7c04;
    color: white;
    border-radius: 5px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: whitesmoke;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const NavIcon = styled.div`
  font-size: 24px;
  color: ${({ active }) => (active ? "#fe7c04" : "#666")};
  cursor: pointer;
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor:pointer;
  &:hover{
    transform:scale(1.1)
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.userInfo);
  const {adminPages, setAdminPages} = useContext(Context);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    Swal.fire({
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(adminLogout());
        Swal.fire('Logged Out!', 'You have been logged out.', 'success');
        navigate('/');
      }
    });
  };

  return (
    <AppContainer>
      <PhoneFrame>
        {/* Header */}
        <Header>
          <LogoWrap onClick={()=>navigate('/')}>
            <Img src={logo} alt="logo" />
            <h2>LeosDrive</h2>
          </LogoWrap>
          <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />
        </Header>

        {/* Sidebar Navigation */}
        {menuOpen && (
          <Sidebar isOpen={menuOpen} ref={menuRef}>
            <SidebarItem onClick={() => { setAdminPages(0); setMenuOpen(false); }}>🏠 Home</SidebarItem>
            <SidebarItem onClick={() => { setAdminPages(3); setMenuOpen(false); }}>🔍 Search Driver</SidebarItem>
            <SidebarItem onClick={() => { setAdminPages(4); setMenuOpen(false); }}> Rate Management</SidebarItem>
            <SidebarItem onClick={() => { setAdminPages(5); setMenuOpen(false); }}> Commission Management</SidebarItem>
           
             <SidebarItem onClick={handleLogout}>🏃‍♂️ Logout</SidebarItem>
          </Sidebar>
        )}

        {/* Main Content (Render Based on Route) */}
        <Content>
         {adminPages===0&&<AdminHome/>}
         {adminPages===1&&<AllUsers/>}
         {adminPages===2&&<AllDrivers/>}
         {adminPages===3&&<SearchDriver/>}
         {adminPages===4&&<RideRateManagement/>}
         {adminPages===5&&<CommissionRateManagement/>}
        </Content>

        {/* Bottom Navigation */}
        <BottomNav>
          <NavIcon active onClick={() => navigate('/admindashboard')}>
            <FaHome />
          </NavIcon>
          {/* <NavIcon onClick={() => navigate('/userdashboard/userrides')}>
            <FaTaxi />
          </NavIcon> */}
          <NavIcon onClick={() => setMenuOpen(!menuOpen)}>
            <FaHamburger />
          </NavIcon>
        </BottomNav>
      </PhoneFrame>
    </AppContainer>
  );
};

export default AdminDashboard;


