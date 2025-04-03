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
  // align-items: center;
  gap: 10px;
  flex-direction:column;
  text-align:left;

  h2 {
    color: #FE7C04;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 20px;
  flex-direction:column;
  text-align:left;
@media(max-width:768px){
  
  padding: 50px 0px;
  
}

`;

const NavItem = styled(motion.p)`
  
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


if (!["/",'/aboutus',  "/termsandconditions", "/contactus"].includes(location.pathname)) {
    return null;
}


  return (
        <Footer>
            <FooterContent>
              <Brand>
                <FaTaxi size={30} color="#FE7C04" />
                <h2>LoesDrive</h2>
             
                <NavItem>123 Main Street, Lagos, Nigeria</NavItem>

                <NavItem>support@loesdrive.com</NavItem>
                <NavItem>+234 800 123 4567</NavItem>
           
              </Brand>
              <FooterNav>
                <NavItem style={{cursor:"pointer"}} whileHover={{ scale: 1.1 }} onClick={()=>navigate('/')}>Home</NavItem>
                <NavItem style={{cursor:"pointer"}} whileHover={{ scale: 1.1 }} onClick={()=>navigate('/aboutus')}>About Us</NavItem>
                <NavItem style={{cursor:"pointer"}} whileHover={{ scale: 1.1 }} onClick={()=>navigate('/termsandconditions')}>Terms and Conditions</NavItem>
                <NavItem style={{cursor:"pointer"}} whileHover={{ scale: 1.1 }} onClick={()=>navigate('/contactus')}>Contact Us</NavItem>
              </FooterNav>
              
              <SocialIcons>
                <motion.a whileHover={{ scale: 1.2 }} href="#"><FaFacebook size={24} /></motion.a>
                <motion.a whileHover={{ scale: 1.2 }} href="#"><FaTwitter size={24} /></motion.a>
                <motion.a whileHover={{ scale: 1.2 }} href="#"><FaInstagram size={24} /></motion.a>
              </SocialIcons>
            </FooterContent>
            <Copyright>
              &copy; {new Date().getFullYear()} LoesDrive. All rights reserved.
            </Copyright>
          </Footer>
  )
}

export default FooterComponent
