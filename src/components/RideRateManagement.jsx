import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
  max-width:800px;
  margin:0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-in-out;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #fe7c04;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-right:10px;

  &:hover {
    background:gray;
  }
`;

const RateCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

const RideRateManagement = () => {
  const [amount, setAmount] = useState('');
  const [rates, setRates] = useState([]);
  const [editingRate, setEditingRate] = useState(null);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const res = await fetch('https://www.leosdrive.com/api/fetch_rates.php');
      const data = await res.json();
      if (data.success) setRates(data.rates);
    } catch (err) {
      Swal.fire('Error', 'Failed to fetch rates', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingRate ? 'https://www.leosdrive.com/api/update_rate.php' : 'https://www.leosdrive.com/api/create_rate.php';
    const payload = editingRate ? { id: editingRate.id, amount } : { amount };

    Swal.fire({ text: 'Processing...', showConfirmButton: false });
    Swal.showLoading();
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      Swal.fire('Success', data.message, 'success');
      fetchRates();
      setAmount('');
      setEditingRate(null);
    } catch {
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  const deleteRate = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch('https://www.leosdrive.com/api/delete_rate.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        fetchRates();
      }
    });
  };

  return (
    <Container>
        <h2 style={{color:'#fe7c04'}}>MANAGE RATES</h2>
      <Form onSubmit={handleSubmit}>
        <p>Enter Ride Rate: eg (0, 1, 2, 3.2, 4.1 etc)</p>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <Button type="submit">{editingRate ? 'Update' : 'Create'} Rate</Button>
      </Form>
      {rates.map((rate) => (
        <RateCard key={rate.id}>
          <p>Amount: ${rate.amount}</p>
          <Button onClick={() => {setEditingRate(rate);setAmount(rate.amount)}}>Edit</Button>
          {/* <Button onClick={() => deleteRate(rate.id)}>Delete</Button> */}
        </RateCard>
      ))}
    </Container>
  );
};

export default RideRateManagement;
