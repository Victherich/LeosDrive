// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import Swal from 'sweetalert2'

// // Styled Components
// const Container = styled.div`
//   padding: 20px;
//   background-color: #f7f7f7;
//   min-height: 100vh;
//   width:100%;
//   max-width:800px;
//   margin: 0 auto;

//   h1{
//   color:orange;
//   }
// `;

// const DeliveryCard = styled.div`
//   background: #fff;
//   padding: 15px;
//   margin: 10px 0;
//   border-radius: 8px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
//   transition: transform 0.3s ease;


//   h3{
//   margin:5px;
  
//   }

//   p{
//   margin:10px;
//   }

//   &:hover {
//     transform: scale(1.01);
//   }
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Modal = styled.div`
//   background: #fff;
//   padding: 30px;
//   width: 400px;
//   border-radius: 8px;
//   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
//   overflow-y: auto;
// `;

// const StatusBadge = styled.span`
//   padding: 8px 15px;
//   color: white;
//   border-radius: 20px;
//   background-color: ${({ status }) => {
//     switch (status) {
//       case "created":
//         return "#6c757d";
//       case "processing":
//         return "#007bff";
//       case "collected":
//         return "#ffc107";
//       case "out for delivery":
//         return "#fd7e14";
//       case "delivered":
//         return "#28a745";
//       default:
//         return "#6c757d";
//     }
//   }};
//   font-weight: bold;
// `;

// const Title = styled.h2`
//   font-size: 1.8rem;
//   color: orange;
// `;

// const DeliveryDetails = ({ delivery, closeModal, handleFetchAllFoodDeliveries}) => {
//   const [status, setStatus] = useState(delivery.status);
//   const [newStatus,setNewStatus] = useState('') 
//   console.log(newStatus)
//   console.log(delivery.id)
  
  
//   const handleStatusChange = async () => {
//     if (!newStatus || newStatus === status) {
//       Swal.fire({ icon: "error", text: "Please select a new status!" });
//       return;
//     }
  
//     const loadingAlert = Swal.fire({ text: "Updating status...", allowOutsideClick: false });
//     Swal.showLoading();
  
//     try {
//       const response = await axios.post("https://www.leosdrive.com/api/update_delivery_status.php", {
//         delivery_id: delivery.id,
//         status: newStatus,
//       });
  
//       console.log(response.data);
  
//       if (response.data.success) {
//         setStatus(newStatus); // Update local state immediately
//         Swal.fire({ icon: "success", text: "Status updated successfully!" });
  
//         // Optional: Refresh the list
//         handleFetchAllFoodDeliveries(); 
  
//         closeModal();
//       } else {
//         Swal.fire({ icon: "error", text: response.data.error || "Failed to update status!" });
//       }
//     } catch (error) {
//       Swal.fire({ icon: "error", text: "Error updating status. Please try again." });
//     } finally {
//       loadingAlert.close();
//     }
//   };
  



//   return (
//     <ModalOverlay>
//       <Modal>
//         <Title>Delivery Details</Title>
//         <p><strong>Restaurant:</strong> {delivery.restaurant_name}</p>
//         <p><strong>Booking Reference:</strong> {delivery.restaurant_booking_ref || "N/A"}</p>
//         <p><strong>Food Details:</strong> {delivery.food_details}</p>
//         <p><strong>Pickup Address:</strong> {delivery.pickup_address}</p>
//         <p><strong>Dropoff Address:</strong> {delivery.dropoff_address}</p>
//         <p><strong>Customer Name:</strong> {delivery.customer_name}</p>
//         <p><strong>Customer Phone:</strong> {delivery.customer_phone}</p>
//         <p><strong>Email:</strong> {delivery.email}</p>
//         <p><strong>Delivery Cost:</strong> NGN {delivery.delivery_cost}</p>
//         <p><strong>Status:</strong> 
//           <StatusBadge status={status}>{status}</StatusBadge>
//         </p>
        
//         {/* Dropdown to update status */}
//         <select value={newStatus || status} onChange={(e) => setNewStatus(e.target.value.trim())}>
//   <option value="" disabled>-- Select Status --</option>
//   <option value="created">Created</option>
//   <option value="processing">Processing</option>
//   <option value="collected">Collected</option>
//   <option value="out for delivery">Out for delivery</option>
//   <option value="delivered">Delivered</option>
// </select>


//         <button onClick={handleStatusChange}>Update Status </button>
        
//         <button onClick={closeModal}>Close</button>
//       </Modal>
//     </ModalOverlay>
//   );
// };

// const AdminFoodDeliveries = () => {
//   const [deliveries, setDeliveries] = useState([]);
//   const [selectedDelivery, setSelectedDelivery] = useState(null);

  

//   const handleFetchAllFoodDeliveries=()=>{
//     // Fetch all food deliveries from the backend
//     axios
//       .get("https://www.leosdrive.com/api/fetch_all_food_deliveries.php")
//       .then((response) => {
//         if (response.data.success) {
//           setDeliveries(response.data.deliveries);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching deliveries:", error);
//       });

//     }

//       useEffect(() => {   
//         handleFetchAllFoodDeliveries(); 
//   }, []);

//   const openModal = (delivery) => {
//     setSelectedDelivery(delivery);
//   };

//   const closeModal = () => {
//     setSelectedDelivery(null);
//   };

// //   const handleStatusUpdate = (deliveryId, newStatus) => {
// //     // Update the delivery status in the UI without re-fetching all deliveries
// //     setDeliveries((prevDeliveries) =>
// //       prevDeliveries.map((delivery) =>
// //         delivery.id === deliveryId ? { ...delivery, status: newStatus } : delivery
// //       )
// //     );
// //   };

//   return (
//     <Container>
//       <h1>All Food Deliveries</h1>
//       {deliveries.length === 0 ? (
//         <p>No deliveries found.</p>
//       ) : (
//         deliveries.map((delivery) => (
//           <DeliveryCard key={delivery.id} onClick={() => openModal(delivery)}>
//             <h3>{delivery.restaurant_name}</h3>
//             <p>Booking Reference: {delivery.restaurant_booking_ref || "N/A"}</p>
//             <p>Status: <StatusBadge status={delivery.status}>{delivery.status}</StatusBadge></p>
//           </DeliveryCard>
//         ))
//       )}

//       {selectedDelivery && (
//         <DeliveryDetails
//           delivery={selectedDelivery}
//           closeModal={closeModal}
//           handleFetchAllFoodDeliveries={handleFetchAllFoodDeliveries}
//         //   onStatusUpdate={handleStatusUpdate}
//         />
//       )}
//     </Container>
//   );
// };

// export default AdminFoodDeliveries;


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    color: orange;
  }
`;

const DeliveryCard = styled.div`
  background: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  h3 {
    margin: 5px;
  }

  p {
    margin: 10px;
  }

  &:hover {
    transform: scale(1.01);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: #fff;
  padding: 30px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  p{
  margin:10px;  
  }

  select {
    padding:10px;
    cursor:pointer;

  }

      button{
  padding:5px;
  border:none;
  margin:5px;
  background-color:light-gray;
  cursor:pointer;
  }

 
`;

const ButtonWrap = styled.button`
    display:flex;
    flex-direction:column;


 
`

const StatusBadge = styled.span`
  padding: 8px 15px;
  color: white;
  border-radius: 20px;
  background-color: ${({ status }) => {
    switch (status) {
      case "created":
        return "#6c757d";
      case "processing":
        return "#007bff";
      case "collected":
        return "#ffc107";
      case "out for delivery":
        return "#fd7e14";
      case "delivered":
        return "#28a745";
      default:
        return "#6c757d";
    }
  }};
  font-weight: bold;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: orange;
`;

const DeliveryDetails = ({ delivery, closeModal, handleFetchAllFoodDeliveries }) => {
  const [status, setStatus] = useState(delivery.status);
  const [newStatus, setNewStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async () => {
    if (!newStatus || newStatus === status) {
      Swal.fire({ icon: "error", text: "Please select a new status!" });
      return;
    }

    setIsUpdating(true);

    try {
      const response = await axios.post("https://www.leosdrive.com/api/update_food_delivery_status.php", {
        id: delivery.id,
        status: newStatus,
      });

      if (response.data.success) {
        setStatus(newStatus); // Update UI immediately
        Swal.fire({ icon: "success", text: "Status updated successfully!" });

        handleFetchAllFoodDeliveries();
        closeModal();
      } else {
        Swal.fire({ icon: "error", text: response.data.error || "Failed to update status!" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: "Error updating status. Please try again." });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ModalOverlay>
      <Modal>
        <Title>Delivery Details</Title>
        <p><strong>Restaurant:</strong> {delivery.restaurant_name}</p>
        <p><strong>Booking Reference:</strong> {delivery.restaurant_booking_ref || "N/A"}</p>
        <p><strong>Food Details:</strong> {delivery.food_details}</p>
        <p><strong>Pickup Address:</strong> {delivery.pickup_address}</p>
        <p><strong>Dropoff Address:</strong> {delivery.dropoff_address}</p>
        <p><strong>Customer Name:</strong> {delivery.customer_name}</p>
        <p><strong>Customer Phone:</strong> {delivery.customer_phone}</p>
        <p><strong>Email:</strong> {delivery.email}</p>
        <p><strong>Delivery Cost:</strong> NGN {delivery.delivery_cost}</p>
        <p><strong>Status:</strong> 
          <StatusBadge status={status}>{status}</StatusBadge>
        </p>
        
        <select value={newStatus || status} onChange={(e) => setNewStatus(e.target.value)}>
          <option value="" disabled>-- Select Status --</option>
          <option value="created">Created</option>
          <option value="processing">Processing</option>
          <option value="collected">Collected</option>
          <option value="out for delivery">Out for delivery</option>
          <option value="delivered">Delivered</option>
        </select>

        <button onClick={handleStatusChange} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Status"}
        </button>

        <button onClick={closeModal} disabled={isUpdating}>Close</button>
      </Modal>
    </ModalOverlay>
  );
};

const AdminFoodDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleFetchAllFoodDeliveries = () => {
    axios
      .get("https://www.leosdrive.com/api/fetch_all_food_deliveries.php")
      .then((response) => {
        if (response.data.success) {
          setDeliveries(response.data.deliveries);
        }
      })
      .catch((error) => {
        console.error("Error fetching deliveries:", error);
      });
  };

  useEffect(() => {
    handleFetchAllFoodDeliveries();
  }, []);

  const openModal = (delivery) => {
    setSelectedDelivery(delivery);
  };

  const closeModal = () => {
    setSelectedDelivery(null);
  };

  return (
    <Container>
      <h1>All Food Deliveries</h1>
      {deliveries.length === 0 ? (
        <p>No deliveries found.</p>
      ) : (
        deliveries.map((delivery) => (
          <DeliveryCard key={delivery.id} onClick={() => openModal(delivery)}>
            <h3>{delivery.restaurant_name}</h3>
            <p>Booking Reference: {delivery.restaurant_booking_ref || "N/A"}</p>
            <p>Status: <StatusBadge status={delivery.status}>{delivery.status}</StatusBadge></p>
          </DeliveryCard>
        ))
      )}

      {selectedDelivery && (
        <DeliveryDetails
          delivery={selectedDelivery}
          closeModal={closeModal}
          handleFetchAllFoodDeliveries={handleFetchAllFoodDeliveries}
        />
      )}
    </Container>
  );
};

export default AdminFoodDeliveries;

