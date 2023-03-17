import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
export default function MapExample() {
    const defaultCenter = {
        lat: 40.748817,
        lng: -73.985428,
    }; 
    return (
        <div className="relative w-full rounded-xl shadow-lg h-16">
            <LoadScript googleMapsApiKey="AIzaSyBHBBzpGqfCzGuIabCUs-7LgV8ldRavdtU">
                <GoogleMap mapContainerClassName="w-full h-full rounded-xl" zoom={13} center={defaultCenter} >
                    <Marker key="location" position={defaultCenter} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
