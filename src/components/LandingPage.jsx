// import React from "react";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import { FaFacebook, FaTwitter, FaInstagram, FaTaxi } from "react-icons/fa";
// import taxiHero from "../Images/ridewithus.webp";
// import aboutImage from "../Images/abt.webp";
// import rideImage from "../Images/ridewithus.webp";
// import driveImage from "../Images/drivewithus.webp";
// import Hero from "./Hero";

// const LandingPage = () => {
//   return (
//     <Container>
//       {/* Header */}
//       <Header>
//         <Logo>🚖 LoesDrive</Logo>
    
//       </Header>

//       {/* Hero Section */}
//       <Hero/>
    

//       {/* About Section */}
//       <AboutSection>
//         <motion.img src={aboutImage} alt="About Us" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} />
//         <AboutText>
//           <h1>About LoesDrive</h1>
//           <p>We are revolutionizing the way you move with reliable and affordable taxi services.</p>
//         </AboutText>
//       </AboutSection>

//       {/* Ride With Us Section */}
//       <RideSection>
//         <RideText>
//           <h2>Ride With Us</h2>
//           <p>Book a taxi with ease and reach your destination safely.</p>
//         </RideText>
//         <motion.img src={rideImage} alt="Ride with us" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} />
//       </RideSection>

//       {/* Drive With Us Section */}
//       <DriveSection>
//         <motion.img src={driveImage} alt="Drive with us" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} />
//         <DriveText>
//           <h2>Drive With Us</h2>
//           <p>Earn money by driving on your own schedule.</p>
//         </DriveText>
//       </DriveSection>

//       {/* Footer Section */}
//       <Footer>
//         <FooterContent>
//           <Brand>
//             <FaTaxi size={30} color="#FE7C04" />
//             <h2>Loe'sDrive</h2>
//           </Brand>
//           <FooterNav>
//             <NavItem whileHover={{ scale: 1.1 }}>Home</NavItem>
//             <NavItem whileHover={{ scale: 1.1 }}>About</NavItem>
//             <NavItem whileHover={{ scale: 1.1 }}>Ride With Us</NavItem>
//             <NavItem whileHover={{ scale: 1.1 }}>Drive With Us</NavItem>
//           </FooterNav>
//           <SocialIcons>
//             <motion.a whileHover={{ scale: 1.2 }} href="#"><FaFacebook size={24} /></motion.a>
//             <motion.a whileHover={{ scale: 1.2 }} href="#"><FaTwitter size={24} /></motion.a>
//             <motion.a whileHover={{ scale: 1.2 }} href="#"><FaInstagram size={24} /></motion.a>
//           </SocialIcons>
//         </FooterContent>
//         <Copyright>
//           &copy; {new Date().getFullYear()} Loe'sDrive. All rights reserved.
//         </Copyright>
//       </Footer>
//     </Container>
//   );
// };

// export default LandingPage;

// /* =============== Styled Components =============== */
// const Container = styled.div`
//   font-family: 'Poppins', sans-serif;

//   // background: #121212;
// `;

// /* Header */
// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   padding: 20px 50px;
//   background: #FE7C04;
//   position: fixed;
//   width: 100%;
//   top: 0;
//   left: 0;
//   z-index: 10;
// `;

// const Logo = styled.h1`
//   font-size: 24px;
//   color: white;
// `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 20px;
// `;

// const NavItem = styled(motion.p)`
//   cursor: pointer;
//   font-weight: bold;
// `;

// /* Hero Section */
// const HeroSection = styled.section`
//   background: url(${taxiHero}) no-repeat center center/cover;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
// `;

// const HeroText = styled.div`
//   h1 {
//     font-size: 3rem;
//     color: #FE7C04;
//   }

//   p {
//     font-size: 1.2rem;
//     margin: 10px 0;
//   }

//   button {
//     padding: 10px 20px;
//     background: #FE7C04;
//     border: none;
//     color: white;
//     font-size: 1rem;
//     cursor: pointer;
//   }
// `;

// /* About Section */
// const AboutSection = styled.section`
//   display: flex;
//   padding: 100px 50px;
//   align-items: center;
//   justify-content:center;
//   // background: #1a1a1a;

//   img {
//     width: 20%;
//     border-radius: 10px;
//   }
// `;

// const AboutText = styled.div`
//   padding-left: 20px;
//   h1 {
//     color: #FE7C04;
//     font-size:2rem;
//     font-weight:bold;
//   }
// `;

// /* Ride With Us */
// const RideSection = styled.section`
//   display: flex;
//   padding: 100px 50px;
//   align-items: center;
//   background: #222;

//   img {
//     width: 50%;
//     border-radius: 10px;
//   }
// `;

// const RideText = styled.div`
//   padding-right: 20px;
//   h2 {
//     color: #FE7C04;
//   }
// `;

// /* Drive With Us */
// const DriveSection = styled.section`
//   display: flex;
//   padding: 100px 50px;
//   align-items: center;
//   background: #1a1a1a;

//   img {
//     width: 50%;
//     border-radius: 10px;
//   }
// `;

// const DriveText = styled.div`
//   padding-left: 20px;
//   h2 {
//     color: #FE7C04;
//   }
// `;

// /* Footer */
// const Footer = styled.footer`
//   background: #181818;
//   padding: 40px 0;
//   text-align: center;
// `;

// const FooterContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-wrap: wrap;
//   padding: 0 50px;
// `;

// const Brand = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   h2 {
//     color: #FE7C04;
//   }
// `;

// const FooterNav = styled.nav`
//   display: flex;
//   gap: 20px;
// `;

// const SocialIcons = styled.div`
//   display: flex;
//   gap: 15px;

//   a {
//     color: white;
//     transition: color 0.3s ease;
//   }

//   a:hover {
//     color: #FE7C04;
//   }
// `;

// const Copyright = styled.p`
//   margin-top: 20px;
//   font-size: 14px;
//   color: #aaa;
// `;


import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaTaxi } from "react-icons/fa";
import Hero from "./Hero";


// Import Images
import aboutImage from "../Images/abt2.jpg";
import rideImage from "../Images/ridewithus.webp";
import driveImage from "../Images/drivewithus.webp";
import tbg from '../Images/tbg.jpg'

const LandingPage = () => {
  return (
    <Container>
      {/* Header */}
   

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <AboutSection>
        <div
      
        >
          <h1>About LoesDrive</h1>
          <p>
            At LoesDrive, we provide safe, fast, and reliable transportation 
            across the city. Whether you're heading to work, meeting friends, or 
            exploring new places, we've got you covered.
          </p>
        </div>
        <img src={aboutImage} alt="abtimg"
         
        />
      </AboutSection>

      {/* Ride & Drive Section (Merged) */}
      <RideDriveSection>
        <Card
          as={motion.div}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={rideImage} alt="Ride with us" />
          <h2>Ride With Us</h2>
          <p>
            Book a ride in seconds and get affordable, comfortable trips with 
            top-rated drivers. Just enter your location and let us take care of the rest.
          </p>
        </Card>

        <Card
          as={motion.div}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img src={driveImage} alt="Drive with us" />
          <h2>Drive With Us</h2>
          <p>
            Earn money on your schedule. Join our team of drivers and get 
            access to thousands of riders every day.
          </p>
        </Card>
      </RideDriveSection>


  
    </Container>
  );
};

export default LandingPage;

/* =============== Styled Components =============== */
const Container = styled.div`

`;

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

/* About Section */
const AboutSection = styled.div`
  background: #f4f4f4;
  text-align:left;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:50px 0px;

  div{
  width:50%;

  h1{
  color:#FE7C04
  }
  }
  img{
  border-radius:10px;
  width:300px;
  }



  @media(max-width:768px){
  flex-direction:column;
  padding:50px 20px;
  gap:50px;
  text-align:center;  
    div{
    width:100%;
    }

  }
`;



/* Ride & Drive Section (Merged) */
const RideDriveSection = styled.section`
  display: flex;
  justify-content: space-around;
  // align-items: center;
  flex-wrap: wrap;
  padding: 100px 50px;
  background: #fff;
  gap: 20px;
  background-image:url(${tbg});

@media(max-width:768px){
  padding:100px 10px;
}

`;

/* Cards for Ride & Drive */
const Card = styled.div`
  width: 300px;
  background: rgba(255,255,255,0.8);
  border-radius: 10px;
  padding: 20px;
  // text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  img {
    width: 100%;
    border-radius: 10px;
  }

  h2 {
    color: #FE7C04;
    margin: 10px 0;
  }

  p {
    font-size: 1rem;
    color: #444;
  }
`;


