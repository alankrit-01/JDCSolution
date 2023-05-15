import { useLoadScript } from "@react-google-maps/api";
import MyMap from "./MyMap";

export default function MapExample() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBgOM3Fu2nYCuNAJ7e1h9Xc35FHLT0-DPs" // Add your API key
  });

  return isLoaded ? <MyMap /> : null;
}

