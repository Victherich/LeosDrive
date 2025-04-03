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

const FoodDeliveryForm = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [deliveryCost, setDeliveryCost] = useState(2000); // Flat rate for delivery
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantBookingRef: "",
    foodDetails: "",
    pickupAddress: "",
    dropoffAddress: "",
    customerName: "",
    customerPhone: "",
    email: "",
  });

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
      firstname: formData.customerName,
      onSuccess: (transaction) => {
        console.log("Payment successful:", transaction);
        Swal.fire({ icon: "success", text: "Payment successful! Booking your order" });
        handleSubmit(transaction);
      },
      onCancel: () => {
        Swal.fire({ text: "Payment cancelled." });
      },
      onError: (error) => {
        Swal.fire({ text: `Payment failed: ${error.message}` });
      },
    });
  };

  // Handle Form Submission
  const handleSubmit = async (transaction) => {

    const loadingAlert = Swal.fire({text:'Please wait...'});
    Swal.showLoading();

    const requestData = {
      user_id: user_id,
      ...formData,
      deliveryCost: deliveryCost,
      transactionReference: transaction.reference,
    };

    try {
      const response = await fetch("https://www.leosdrive.com/api/submit_food_delivery_form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          text: `Order booked! Your Order ID: ${result.bookingNumber}`,
        });

        navigate("/userdashboard");
      } else {
        Swal.fire({ icon: "error", text: result.error });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: "Something went wrong. Please try again." });
    }finally{

        loadingAlert.close();
    }
  };

  return (
    <FormContainer>
      <Title>Order Food Delivery</Title>
      <form onSubmit={(e) => e.preventDefault()}>
            <Input type="text" name="restaurantName" placeholder="Restaurant Name" onChange={handleChange} required />
        <Input type="text" name="restaurantBookingRef" placeholder="Restaurant Booking Reference (Optional)" onChange={handleChange} />

        <TextArea name="foodDetails" placeholder="Food Items Ordered (e.g., 2 Burgers, 1 Large Coke)" onChange={handleChange} required />

        <Input type="text" name="pickupAddress" placeholder="Restaurant Address" onChange={handleChange} required />
        <Input type="text" name="dropoffAddress" placeholder="Delivery Address" onChange={handleChange} required />

        <Input type="text" name="customerName" placeholder="Your Name" onChange={handleChange} required />
        <Input type="text" name="customerPhone" placeholder="Your Phone Number" onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />

        <PriceDisplay>Delivery Fee: NGN {deliveryCost}</PriceDisplay>
        <Button type="button" onClick={payWithPaystack}>
          Pay & Order
        </Button>
      </form>
    </FormContainer>
  );
};

export default FoodDeliveryForm;
