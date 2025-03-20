// import React from "react";
// // import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";

// // Function to change map view when location changes
// const ChangeView = ({ center }) => {
//   const map = useMap();
//   map.setView(center, 13);
//   return null;
// };

// const MapComponent = ({ pickupCoords, destinationCoords }) => {
//   return (
//     <MapContainer
//       center={pickupCoords || [51.505, -0.09]} // Default to London
//       zoom={13}
//       style={{ height: "300px", width: "100%", borderRadius: "10px", overflow: "hidden" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {pickupCoords && <Marker position={pickupCoords} />}
//       {destinationCoords && <Marker position={destinationCoords} />}
//       <ChangeView center={pickupCoords || [51.505, -0.09]} />
//     </MapContainer>
//   );
// };

// export default MapComponent;
