import React, { useRef, useState,useEffect } from 'react'
import styled from 'styled-components';
import logo from '../Images/logo.jpeg'
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaHamburger } from 'react-icons/fa';

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

  @media(max-width:428px){
  padding: 10px 10px;
  }
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

  @media(max-width:768px){
    display:none;
  }
`;

const FooterNav2 = styled.nav`
  display: none;
  gap: 20px;
  color:white;
  flex-direction:column;
  position:absolute;
  top:70px;
  right:0px;
  background:#FE7C04;
  padding:20px;
  // width:60%;
  box-shadow: rgba(0, 0, 0, 0.9) 0px 3px 8px;

  @media(max-width:768px){
    display:flex;
    
  }
`;

const NavItem = styled(motion.p)`
  cursor: pointer;
  font-weight: bold;
`;

const Icon = styled.div`
  color:white;
  display:none;
  cursor:pointer;
@media(max-width:768px){
  display:flex;
}
`


const HeaderComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenu, setMobileMenu]=useState(false);
    const menuRef = useRef();


      useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMobileMenu(false);
          }
        };
    
        if (mobileMenu) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [mobileMenu]);


    if (!["/", "/termsandconditions", "/contactus"].includes(location.pathname)) {
        return null;
    }
  return (
      <Header>
        <div
        onClick={()=>navigate('/')}
        style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px", cursor:"pointer"}}>
        <Img src={logo} alt="logo"/>
        <Logo>LoesDrive</Logo>
        </div>
          

           <FooterNav>
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/')}>Home</NavItem>
                {/* <NavItem whileHover={{ scale: 1.1 }}>About</NavItem> */}
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/termsandconditions')}>Terms and Conditions</NavItem>
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/contactus')}>Contact Us</NavItem>
              </FooterNav>


               <Icon onClick={()=>setMobileMenu(!mobileMenu)}>
                  <FaHamburger/>
                </Icon>
              {mobileMenu&&<FooterNav2 ref={menuRef}>
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/')}>Home</NavItem>
                {/* <NavItem whileHover={{ scale: 1.1 }}>About</NavItem> */}
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/termsandconditions')}>Terms and Conditions</NavItem>
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/contactus')}>Contact Us</NavItem>
              </FooterNav2>}
         </Header>
  )
}

export default HeaderComponent
