import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaTaxi } from "react-icons/fa";
import { motion } from "framer-motion";


/* Footer */
const Footer = styled.footer`
  background: #181818;
  padding: 40px 0;
  text-align: center;
  color:lightgray;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 50px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    color: #FE7C04;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled(motion.p)`
  cursor: pointer;
  font-weight: bold;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: white;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #FE7C04;
  }
`;

const Copyright = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #aaa;
`;


const FooterComponent = () => {
    const location= useLocation()
    const navigate = useNavigate();


if (!["/", "/termsandconditions", "/contactus"].includes(location.pathname)) {
    return null;
}


  return (
        <Footer>
            <FooterContent>
              <Brand>
                <FaTaxi size={30} color="#FE7C04" />
                <h2>LoesDrive</h2>
              </Brand>
              <FooterNav>
                <NavItem whileHover={{ scale: 1.1 }}>Home</NavItem>
                {/* <NavItem whileHover={{ scale: 1.1 }}>About</NavItem> */}
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/termsandconditions')}>Terms and Conditions</NavItem>
                <NavItem whileHover={{ scale: 1.1 }} onClick={()=>navigate('/contactus')}>Contact Us</NavItem>
              </FooterNav>
              <SocialIcons>
                <motion.a whileHover={{ scale: 1.2 }} href="#"><FaFacebook size={24} /></motion.a>
                <motion.a whileHover={{ scale: 1.2 }} href="#"><FaTwitter size={24} /></motion.a>
                <motion.a whileHover={{ scale: 1.2 }} href="#"><FaInstagram size={24} /></motion.a>
              </SocialIcons>
            </FooterContent>
            <Copyright>
              &copy; {new Date().getFullYear()} Loe'sDrive. All rights reserved.
            </Copyright>
          </Footer>
  )
}

export default FooterComponent
