// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// export default function MapExample() {
//     const defaultCenter = {
//         lat: 40.748817,
//         lng: -73.985428,
//     };
 
//     return ( 
//         <div className="relative w-full rounded-xl shadow-lg">
//             <LoadScript googleMapsApiKey="AIzaSyCN5RsuQUGXEAd3TqNpEkHygtmhFxNiDZk">
//                 <GoogleMap
//                     mapContainerClassName="w-full h-full rounded-xl"
//                     zoom={13}
//                     center={defaultCenter}
//                 >
//                     <Marker key="location" position={defaultCenter} />
//                 </GoogleMap>
//             </LoadScript>
//         </div>
//     );
// }



import React from 'react';
import GoogleMapReact from 'google-map-react';

let latitude = "26.859970";
let longitude = "75.806236";

const MapExample = ({ latitude, longitude }) => {
 const renderMarkers = (map, maps) => {
  let marker = new maps.Marker({
  position: { lat: latitude, lng: longitude },
  map,
  title: 'Hello World!'
  });
  return marker;
 };

 return (
   <div style={{ height: '50vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyCN5RsuQUGXEAd3TqNpEkHygtmhFxNiDZk' }}
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultZoom={16}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
    >
    </GoogleMapReact>
   </div>
 );
};

export default MapExample;