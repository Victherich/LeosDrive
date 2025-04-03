import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllDeliveriesPage = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusOptions] = useState([
        'created', 'collected', 'processing', 'out for delivery', 'delivered'
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get('https://www.leosdrive.com/api/fetch_all_deliveries.php');
                if (response.data.success) {
                    setDeliveries(response.data.deliveries);

                } else {
                    Swal.fire({text:'Error fetching deliveries'});
                }
            } catch (error) {
                console.error('Error fetching deliveries:', error);
                Swal.fire({text:'Error fetching deliveries'});
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    const handleStatusChange = async (deliveryId, newStatus) => {
        try {
            const response = await axios.post('http://localhost/api/update_delivery_status.php', {
                delivery_id: deliveryId,
                status: newStatus
            });

            if (response.data.success) {
                alert('Status updated successfully!');
                setDeliveries(prevState =>
                    prevState.map(delivery =>
                        delivery.id === deliveryId ? { ...delivery, status: newStatus } : delivery
                    )
                );
            } else {
                alert('Failed to update the status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update the status');
        }
    };

    return (
        <Container>
            {loading ? (
                <LoadingMessage>Loading deliveries...</LoadingMessage>
            ) : (
                <DeliveriesGrid>
                    {deliveries.map((delivery) => (
                        <DeliveryCard key={delivery.id} onClick={()=>navigate(`/deliverydetail/${delivery.id}`)}>
                            <CardHeader>
                                <BookingNumber>Booking #: {delivery.booking_number}</BookingNumber>
                                <StatusBadge className={delivery.status}>
                                    {delivery.status}
                                </StatusBadge>
                            </CardHeader>
                            <CardBody>
                                <InfoRow>
                                    <strong>Sender:</strong> {delivery.sender_name}
                                </InfoRow>
                                <InfoRow>
                                    <strong>Receiver:</strong> {delivery.receiver_name}
                                </InfoRow>
                                <InfoRow>
                                    <strong>Package Description:</strong> {delivery.package_description}
                                </InfoRow>
                                <InfoRow>
                                    <strong>Package Weight:</strong> {delivery.package_weight} kg
                                </InfoRow>
                            </CardBody>
                            <CardFooter>
                                {/* <SelectStatus
                                    value={delivery.status}
                                    onChange={(e) => handleStatusChange(delivery.id, e.target.value)}
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </SelectStatus> */}
                            </CardFooter>
                        </DeliveryCard>
                    ))}
                </DeliveriesGrid>
            )}
        </Container>
    );
};

export default AllDeliveriesPage;

// Styled Components
const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const LoadingMessage = styled.div`
    font-size: 24px;
    color: #ff6347;
    text-align: center;
`;

const DeliveriesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 20px 0;
`;

const DeliveryCard = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // height: 300px;/
    cursor:pointer;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BookingNumber = styled.h3`
    font-size: 18px;
    color: #333;
`;

const StatusBadge = styled.span`
    padding: 6px 12px;
    border-radius: 15px;
    color: #fff;
    font-weight: bold;
    text-transform: capitalize;
    &.created {
        background-color: #ffa500;
    }
    &.collected {
        background-color: #00bfff;
    }
    &.processing {
        background-color: #ff4500;
    }
    &.out-for-delivery {
        background-color: #32cd32;
    }
    &.delivered {
        background-color: #008000;
    }
`;

const CardBody = styled.div`
    margin-top: 15px;
`;

const InfoRow = styled.div`
    margin-bottom: 10px;
    font-size: 14px;
    color: #555;
    strong {
        font-weight: bold;
    }
`;

const CardFooter = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const SelectStatus = styled.select`
    padding: 8px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
`;

