// import React, { useState } from "react";
// import styled from "styled-components";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Message Sent! We will contact you soon.");
//     setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
//   };

//   return (
//     <Container>
//       <Title>Contact Us</Title>

//       <Content>
//         {/* Contact Information */}
//         <ContactInfo>
//           <h2>Get in Touch</h2>
//           <p>If you have any questions, feel free to reach out.</p>

//           <InfoItem>
//             📍 <strong>Address:</strong> 123 Main Street, Lagos, Nigeria
//           </InfoItem>
//           <InfoItem>📞 <strong>Phone:</strong> +234 800 123 4567</InfoItem>
//           <InfoItem>📧 <strong>Email:</strong> support@loesdrive.com</InfoItem>
//         </ContactInfo>

//         {/* Contact Form */}
//         <Form onSubmit={handleSubmit}>
//           <h2>Send Us a Message</h2>
//           <Input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             type="tel"
//             name="phone"
//             placeholder="Your Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <Textarea
//             name="message"
//             placeholder="Your Message"
//             rows="5"
//             value={formData.message}
//             onChange={handleChange}
//             required
//           />
//           <SubmitButton type="submit">Send Message</SubmitButton>
//         </Form>
//       </Content>
//     </Container>
//   );
// };

// export default ContactUs;

// /* ===================== Styled Components ===================== */
// const Container = styled.div`
//   max-width: 900px;
//   margin: 80px auto;
//   padding: 20px;
//   background: #fff;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h1`
//   text-align: center;
//   color: #FE7C04;
//   margin-bottom: 20px;
// `;

// const Content = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

// const ContactInfo = styled.div`
//   width: 45%;
//   padding: 20px;

//   h2 {
//     color: #FE7C04;
//     margin-bottom: 10px;
//   }

//   p {
//     color: #666;
//     margin-bottom: 15px;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//     text-align: center;
//   }
// `;

// const InfoItem = styled.p`
//   color: #444;
//   font-size: 1rem;
//   margin-bottom: 10px;
// `;

// const Form = styled.form`
//   width: 50%;
//   padding: 20px;
//   background: #f9f9f9;
//   border-radius: 8px;

//   h2 {
//     color: #FE7C04;
//     margin-bottom: 15px;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 1rem;
// `;

// const Textarea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 1rem;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   background: #FE7C04;
//   border: none;
//   color: white;
//   font-size: 1rem;
//   cursor: pointer;
//   border-radius: 5px;

//   &:hover {
//     background: #e66b00;
//   }
// `;



import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Sending...",
      text: "Please wait while we send your message.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("https://www.leosdrive.com/api/contact_form_endpoint.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: result.message,
        });
        setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <Container>
      <Title>Contact Us</Title>

      <Content>
        <ContactInfo>
          <h2>Get in Touch</h2>
          <p>If you have any questions, feel free to reach out.</p>
          <InfoItem>📍 <strong>Address:</strong> 123 Main Street, Lagos, Nigeria</InfoItem>
          <InfoItem>📞 <strong>Phone:</strong> +234 800 123 4567</InfoItem>
          <InfoItem>📧 <strong>Email:</strong> support@loesdrive.com</InfoItem>
        </ContactInfo>

        <Form onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <Input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required />
          <Textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default ContactUs;

const Container = styled.div`
  max-width: 900px;
  margin: 80px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #FE7C04;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ContactInfo = styled.div`
  width: 45%;
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const InfoItem = styled.p`
  color: #444;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Form = styled.form`
  width: 50%;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #FE7C04;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: #e66b00;
  }
`;

