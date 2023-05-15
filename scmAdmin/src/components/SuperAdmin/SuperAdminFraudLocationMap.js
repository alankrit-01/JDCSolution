import { useLoadScript } from "@react-google-maps/api";
import SuperAdminFraudLocation from "./SuperAdminFraudLocation"
const SuperAdminFraudLocationMap = () =>{
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBgOM3Fu2nYCuNAJ7e1h9Xc35FHLT0-DPs" // Add your API key
      });
    
      return isLoaded ? <SuperAdminFraudLocation /> : null;
}
export default SuperAdminFraudLocationMap