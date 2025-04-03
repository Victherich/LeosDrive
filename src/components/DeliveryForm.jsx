    // import React, { useState } from "react";
    // import styled from "styled-components";

    // // Styled Components
    // const FormContainer = styled.div`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    // background-color: #f7f7f7;
    // padding: 30px;
    // border-radius: 10px;
    // max-width: 600px;
    // margin: 20px auto;
    // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    // `;

    // const Title = styled.h2`
    // color: #333;
    // margin-bottom: 20px;
    // font-size: 1.8rem;
    // font-weight: bold;
    // `;

    // const Input = styled.input`
    // width: 100%;
    // padding: 12px;
    // margin: 8px 0;
    // border: 1px solid #ccc;
    // border-radius: 8px;
    // font-size: 1rem;
    // outline: none;
    // box-sizing: border-box;
    // &:focus {
    //     border-color: #fe7c04;
    //     box-shadow: 0 0 5px rgba(254, 124, 4, 0.4);
    // }
    // `;

    // const TextArea = styled.textarea`
    // width: 100%;
    // padding: 12px;
    // margin: 8px 0;
    // border: 1px solid #ccc;
    // border-radius: 8px;
    // font-size: 1rem;
    // outline: none;
    // box-sizing: border-box;
    // resize: vertical;
    // &:focus {
    //     border-color: #fe7c04;
    //     box-shadow: 0 0 5px rgba(254, 124, 4, 0.4);
    // }
    // `;

    // const Button = styled.button`
    // background-color: #fe7c04;
    // color: white;
    // padding: 12px 20px;
    // border: none;
    // border-radius: 8px;
    // font-size: 1.1rem;
    // cursor: pointer;
    // transition: background-color 0.3s ease;
    // width: 100%;
    // margin-top: 15px;

    // &:hover {
    //     background-color: #ff8000;
    // }

    // &:active {
    //     background-color: #e77a00;
    // }
    // `;

    // const DeliveryForm = () => {
    // const [formData, setFormData] = useState({
    //     senderName: "",
    //     senderPhone: "",
    //     pickupAddress: "",
    //     receiverName: "",
    //     receiverPhone: "",
    //     dropoffAddress: "",
    //     packageDescription: "",
    //     packageWeight: "",
    // });

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Delivery Details:", formData);
    //     // You can add API call logic here to save the delivery details.
    // };

    // return (
    //     <FormContainer>
    //     <Title>Book a Delivery</Title>
    //     <form onSubmit={handleSubmit}>
    //         <Input
    //         type="text"
    //         name="senderName"
    //         placeholder="Sender's Name"
    //         onChange={handleChange}
    //         value={formData.senderName}
    //         required
    //         />
    //         <Input
    //         type="text"
    //         name="senderPhone"
    //         placeholder="Sender's Phone"
    //         onChange={handleChange}
    //         value={formData.senderPhone}
    //         required
    //         />
    //         <Input
    //         type="text"
    //         name="pickupAddress"
    //         placeholder="Pickup Address"
    //         onChange={handleChange}
    //         value={formData.pickupAddress}
    //         required
    //         />
    //         <Input
    //         type="text"
    //         name="receiverName"
    //         placeholder="Receiver's Name"
    //         onChange={handleChange}
    //         value={formData.receiverName}
    //         required
    //         />
    //         <Input
    //         type="text"
    //         name="receiverPhone"
    //         placeholder="Receiver's Phone"
    //         onChange={handleChange}
    //         value={formData.receiverPhone}
    //         required
    //         />
    //         <Input
    //         type="text"
    //         name="dropoffAddress"
    //         placeholder="Drop-off Address"
    //         onChange={handleChange}
    //         value={formData.dropoffAddress}
    //         required
    //         />
    //         <TextArea
    //         name="packageDescription"
    //         placeholder="Package Description"
    //         onChange={handleChange}
    //         value={formData.packageDescription}
    //         required
    //         />
    //         <Input
    //         type="number"
    //         name="packageWeight"
    //         placeholder="Package Weight (kg)"
    //         onChange={handleChange}
    //         value={formData.packageWeight}
    //         required
    //         />
    //         <Button type="submit">Book Delivery</Button>
    //     </form>
    //     </FormContainer>
    // );
    // };

    // export default DeliveryForm;







    import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PaystackPop from "@paystack/inline-js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

// Styled Components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #fe7c04;
    box-shadow: 0 0 5px rgba(254, 124, 4, 0.4);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    border-color: #fe7c04;
    box-shadow: 0 0 5px rgba(254, 124, 4, 0.4);
  }
`;

const Button = styled.button`
  background-color: #fe7c04;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 15px;

  &:hover {
    background-color: #ff8000;
  }

  &:active {
    background-color: #e77a00;
  }
`;

const PriceDisplay = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 10px;
`;

// Delivery Form Component
const DeliveryForm = () => {
    const {user_id} = useParams();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    pickupAddress: "",
    receiverName: "",
    receiverPhone: "",
    dropoffAddress: "",
    packageDescription: "",
    packageWeight: "",
    packageLength: "",
    packageWidth: "",
    packageHeight: "",
    email: "",
  });

  const [deliveryCost, setDeliveryCost] = useState(0);

  // Calculate Delivery Amount
  const calculateTotal = () => {
    const weightCost = formData.packageWeight * 500; // Cost per kg
    const volume =
      (formData.packageLength * formData.packageWidth * formData.packageHeight) /
      5000; // Dimensional weight formula
    const volumeCost = volume * 700; // Cost per volume unit
    const total = Math.max(weightCost, volumeCost); // Use the higher cost
    setDeliveryCost(total);
    // return total;
  };

  useEffect(()=>{
    calculateTotal()
  },[formData])

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Paystack Payment
  const payWithPaystack = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
      amount: deliveryCost * 100,
      email: formData.email,
      firstname: formData.senderName,
      onSuccess: (transaction) => {
        console.log("Payment successful:", transaction);
        Swal.fire({icon:"success", text:"Payment successful! You can now submit your form."});
        handleSubmit(transaction);
      },
      onCancel: () => {
        Swal.fire({text:"Payment cancelled."});
      },
      onError: (error) => {
        Swal.fire({text:`Payment failed: ${error.message}`});
      },
    });
  };

 

  // Handle Form Submission
  const handleSubmit = async (transaction) => {
   // Get the actual user ID from your authentication system

   
  
    const requestData = {
      user_id: user_id,
      ...formData,
      deliveryCost: deliveryCost,
      transactionReference: transaction.reference, // Capture the Paystack transaction reference
    };
  
    try {
      const response = await fetch("https://www.leosdrive.com/api/submit_delivery_form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        Swal.fire({ icon: "success", text: `Delivery booked! Your Booking Number: ${result.bookingNumber}` });
 
        navigate('/userdashboard');
    } else {
        Swal.fire({ icon: "error", text: result.error });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: "Something went wrong. Please try again." });
    }
  };
  
  



  return (
    <FormContainer>
      <Title>Book a Delivery</Title>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="senderName" placeholder="Sender's Name" onChange={handleChange} value={formData.senderName} required />
        <Input type="text" name="senderPhone" placeholder="Sender's Phone" onChange={handleChange} value={formData.senderPhone} required />
        <Input type="text" name="pickupAddress" placeholder="Pickup Address" onChange={handleChange} value={formData.pickupAddress} required />
        <Input type="text" name="receiverName" placeholder="Receiver's Name" onChange={handleChange} value={formData.receiverName} required />
        <Input type="text" name="receiverPhone" placeholder="Receiver's Phone" onChange={handleChange} value={formData.receiverPhone} required />
        <Input type="text" name="dropoffAddress" placeholder="Drop-off Address" onChange={handleChange} value={formData.dropoffAddress} required />
        <TextArea name="packageDescription" placeholder="Package Description" onChange={handleChange} value={formData.packageDescription} required />

        <Input type="number" name="packageWeight" placeholder="Package Weight (kg)" onChange={handleChange} value={formData.packageWeight} required />
        <Input type="number" name="packageLength" placeholder="Package Length (cm)" onChange={handleChange} value={formData.packageLength} required />
        <Input type="number" name="packageWidth" placeholder="Package Width (cm)" onChange={handleChange} value={formData.packageWidth} required />
        <Input type="number" name="packageHeight" placeholder="Package Height (cm)" onChange={handleChange} value={formData.packageHeight} required />
        <Input type="email" name="email" placeholder="Your Email" onChange={handleChange} value={formData.email} required />

        <PriceDisplay>Delivery Cost: NGN {deliveryCost}</PriceDisplay>
        <Button type="button" onClick={payWithPaystack}>Proceed</Button>
        {/* <Button type="submit">Submit Delivery</Button> */}
      </form>
    </FormContainer>
  );
};

export default DeliveryForm;

