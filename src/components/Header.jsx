import React from 'react'
import styled from 'styled-components';
import logo from '../Images/logo.jpeg'
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

/* Header */
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
  align-items:center;
  background: #FE7C04;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Img = styled.img`
width:50px;
border-radius:50%;
`

const Logo = styled.h1`
  font-size: 24px;
  color: white;
`;

/* Sections */
const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 80px 50px;
  text-align: center;

  img {
    width: 45%;
    max-width: 300px;
    border-radius: 10px;
  }

  .text {
    width: 45%;
    max-width: 500px;
  }

  h1, h2 {
    color: #FE7C04;
    font-size: 2rem;
  }

  p {
    font-size: 1.1rem;
    color: #444;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    img {
      width: 70%;
      margin-top: 20px;
    }
  }
`;



const FooterNav = styled.nav`
  display: flex;
  gap: 20px;
  color:white;
`;

const NavItem = styled(motion.p)`
  cursor: pointer;
  font-weight: bold;
`;


const HeaderComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();


    if (!["/", "/termsandconditions", "/contactus"].includes(location.pathname)) {
        return null;
    }
  return (
      <Header>
        <div
        onClick={()=>navigate('/')}
        style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px", cursor:"pointer"}}>
        <Img src={logo} alt="logo"/>
        <Logo>🚖 LoesDrive</Logo>
        </div>
          

           <FooterNav>
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/')}>Home</NavItem>
                {/* <NavItem whileHover={{ scale: 1.1 }}>About</NavItem> */}
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/termsandconditions')}>Terms and Conditions</NavItem>
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/contactus')}>Contact Us</NavItem>
              </FooterNav>
         </Header>
  )
}

export default HeaderComponent
