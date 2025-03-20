

import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaHome, FaUser, FaCog, FaBars, FaHamburger, FaTaxi } from "react-icons/fa";
import logo from '../Images/logo.jpeg';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { driverLogout } from "../Features/Slice";
import { Routes, Route, useNavigate } from "react-router-dom";
import BookARide from "./BookARide";
import DriverHomePage from "./DriverHome";
import DriverSuspended from "./DriverSuspendedPage";
import DriverPendingVerification from "./DriverPendingVerificationPage";
import DriverVerification from "./DriverVerification";
import { useContext } from "react";
import { Context } from "./Context";
// import DriverProfile from "./DriverProfile";
// import DriverRides from "./DriverRides";
// import BookARide2 from "./BookARide2";
// import BookARide3 from "./BookARide3";


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

const DriverDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const driverInfo = useSelector(state=>state.driverInfo)
  const {verificationStatus, setVerificationStatus,fetchDriverById }=useContext(Context)
  console.log(driverInfo.id)

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
        dispatch(driverLogout());
        setVerificationStatus('')
        Swal.fire('Logged Out!', 'You have been logged out.', 'success');
        navigate('/');
      }
    });
  };

  useEffect(()=>{
    fetchDriverById(driverInfo.id)
  },[])

  return (
    <AppContainer>
      <PhoneFrame>
        {/* Header */}
        <Header>
          <LogoWrap onClick={()=>navigate('/')}>
            <Img src={logo} alt="logo" />
            <h2>LeosDrive</h2>
          </LogoWrap>
          {/* <select onChange={(e)=>setVerificationStatus(e.target.value)  }>
            <option value="not_verified">Not verified</option>
            <option value="pending">pending</option>
            <option value="verified">verified</option>
            <option value="suspended">suspended</option>
          </select> */}
          {verificationStatus === "approved" &&<MenuIcon onClick={() => setMenuOpen(!menuOpen)} />}
        </Header>

        {/* Sidebar Navigation */}
        {menuOpen && (
          <Sidebar isOpen={menuOpen} ref={menuRef}>
            <SidebarItem onClick={() => { navigate('/driverdashboard'); setMenuOpen(false); }}>🏠 Home</SidebarItem>
            <SidebarItem onClick={() => { navigate(`/driverdashboard/driverprofile/${driverInfo.id}`); setMenuOpen(false); }}>👤 Profile</SidebarItem>
            <SidebarItem onClick={() => { navigate('/driverdashboard/driverrides'); setMenuOpen(false); }}>🚖 My Rides</SidebarItem>
            <SidebarItem onClick={() => { navigate('/driverdashboard/driverearnings'); setMenuOpen(false); }}>💸 My Earnings</SidebarItem>
            
            <SidebarItem onClick={handleLogout}>🏃‍♂️ Logout</SidebarItem>
          </Sidebar>
        )}

<Content>
      <Routes>
        {/* Dynamically Render Based on Verification Status */}
        {verificationStatus === "" && <Route path="/" element={<DriverVerification driver_id={driverInfo.id}/>} />}
        {verificationStatus === "pending" && <Route path="/" element={<DriverPendingVerification />} />}
        {verificationStatus === "approved" && <Route path="/" element={<DriverHomePage />} />}
        {verificationStatus === "suspended" && <Route path="/" element={<DriverSuspended />} />}

      
      </Routes>
    </Content>

        {/* Bottom Navigation */}
       {verificationStatus === "approved" && <BottomNav>
          <NavIcon active onClick={() => navigate(`/driverdashboard/driverprofile/${driverInfo.id}`)}>
            <FaUser />
          </NavIcon>
          <NavIcon onClick={() => navigate('/driverdashboard/driverrides')}>
            <FaTaxi />
          </NavIcon>
          <NavIcon onClick={() => setMenuOpen(!menuOpen)}>
            <FaHamburger />
          </NavIcon>
        </BottomNav>}
      </PhoneFrame>
    </AppContainer>
  );
};

export default DriverDashboard;

