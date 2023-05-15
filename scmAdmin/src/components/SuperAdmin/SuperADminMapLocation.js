import { useLoadScript } from "@react-google-maps/api";
import SuperAdminMyMap from "./SuperAdminMyMap";

export default function SuperADminMapLocation() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBgOM3Fu2nYCuNAJ7e1h9Xc35FHLT0-DPs" // Add your API key
  });

  return isLoaded ? <SuperAdminMyMap /> : null;
}

