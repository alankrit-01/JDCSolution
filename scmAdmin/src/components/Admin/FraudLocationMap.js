import { useLoadScript } from "@react-google-maps/api";
import FraudLocation from "./FraudLocation";
const FraudLocationMap = () =>{
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBgOM3Fu2nYCuNAJ7e1h9Xc35FHLT0-DPs" // Add your API key
      });
    
      return isLoaded ? <FraudLocation /> : null;
}
export default FraudLocationMap