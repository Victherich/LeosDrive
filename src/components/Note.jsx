  //   const handleBookRide = async () => {
    //     if (!destination) {
    //       Swal.fire({
    //         text: "Please enter your destination!",
    //         icon: "warning",
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });
    //       return;
    //     }
    
    //     if (!pickupCoords) {
    //       Swal.fire({
    //         text: "Fetching your location. Please wait!",
    //         icon: "info",
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });
    //       return;
    //     }
    
    //     const rideDetails = {
    //       user_id: 1, // Replace with actual user ID from authentication
    //       pickup_lat: pickupCoords.latitude,
    //       pickup_lng: pickupCoords.longitude,
    //       drop_off: destination,
    //       ride_status: "pending",
    //       booking_number: generateBookingNumber()
    //     };
    
    //     try {
    //       const response = await fetch("https://www.leosdrive.com/api/ride_booking.php", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(rideDetails),
    //       });
    
    //       const result = await response.json();
    
    //       if (result.success) {
    //         Swal.fire({
    //           text: `Ride booked successfully! Booking No: ${rideDetails.booking_number}`,
    //           icon: "success",
    //           showConfirmButton: false,
    //           timer: 3000,
    //         });
    
    //         setDestination("");
    //       } else {
    //         Swal.fire("Error", result.error || "Failed to book ride", "error");
    //       }
    //     } catch (error) {
    //       console.error("Booking error:", error);
    //       Swal.fire("Error", "Server not responding", "error");
    //     }
    //   };


    // const handleBookRide = async () => {
    //     if (!destination) {
    //       Swal.fire({ text: "Please enter your destination!", icon: "warning", timer: 2000 });
    //       return;
    //     }
      
    //     if (latitude === null || longitude === null) {
    //       Swal.fire({ text: "Fetching your location. Please wait!", icon: "info", timer: 2000 });
    //       return;
    //     }
        
    //     const rideDetails = {
    //       user_id: userInfo.id, // Replace with actual user ID
    //       pickup_lat: latitude,
    //       pickup_lng: longitude,
    //       drop_off: destination,
    //       ride_status: "pending",
    //       booking_number: generateBookingNumber(),
    //     };
      
    //     try {
    //       const response = await fetch("https://www.leosdrive.com/api/ride_booking.php", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(rideDetails),
    //       });
      
    //       const result = await response.json();
    //       if (result.success) {
    //         Swal.fire({ text: `Ride booked! Booking No: ${rideDetails.booking_number}`, icon: "success", timer: 3000 });
    //         setDestination("");
    //         setSlideSwitch(2)
    //        dispatch( updateBookingNumber(rideDetails.booking_number));

    //       } else {
    //         Swal.fire("Error", result.error || "Failed to book ride", "error");
    //       }
    //     } catch (error) {
    //       console.error("Booking error:", error);
    //       Swal.fire("Error", "Server not responding", "error");
    //     }
    //   };






//     <Form>
//     <Title>LoesDrive Logistics</Title>  
// <p>Send and Receive your Packages </p>
// <p>Fast and Easy </p>
//     <Input
//     type="text"
//     placeholder="Enter Destination"
//     value={deliveryDestination}
//     onChange={(e) => setDeliveryDestination(e.target.value.toUpperCase())}
//     />

//     <Input type="text"/>  
//     <ButtonWrap>
//     <Button onClick={handleBookRide}><img style={{width:"40px"}} src={bike} alt='taxi'/> <p style={{fontSize:"1rem"}}>Submit</p></Button>
//     <Button onClick={()=>setDeliveryForm(false)} style={{background:"gray", padding:"5px"}}>  <p style={{fontSize:"1rem"}}>Cancel</p></Button>

//     </ButtonWrap>   
//     </Form>

