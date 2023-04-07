import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink } from "react-router-dom";

import Card from '@material-tailwind/react/Card';
import CardRow from '@material-tailwind/react/CardRow';
import CardStatus from '@material-tailwind/react/CardStatus';
import MapExample from 'components/Factory/MapExample';
import DashboardVector from 'assets/img/vactor.jpg';

import PieRechartComponent from 'components/Factory/PieChart';

import  GoogleMapReact  from 'google-map-react';
import  AnyReactComponent  from 'google-map-react';

const FactoryDashboard = () => {


    const defaultProps = {
        center: {
            lat: 26.859970,
            lng: 75.806236
        },
        zoom: 11
    };

    return (
        <>
            <FactorySidebar />
            <div className="md:ml-32">
                <div className="px-3 md:px-8 h-40" />
                <div className="px-3 md:px-8 -mt-24">
                    <div className="container mx-auto max-w-full">
                            <MainStatusCard />
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">
                            <div className="px-4 mb-10 main-tiles-section">
                            <NavLink to="/factory/productTemplate">
                            <button className="cust-button"> + ADD PRODUCT</button>  
                            </NavLink>
                            <NavLink to="/factory/batchTemplate">
                            <button className="cust-button"> + SEND BATCH</button>
                            </NavLink>

                                <Card className="main-tiles p-0">
                                    <CardRow className="inner-tiles">
                                        <img src={DashboardVector} />
                                    </CardRow>
                                </Card>
                            </div>
                            <div className="px-4 mb-10 main-tiles-section">
                                <PieRechartComponent />
                            </div>
                            <div className="px-4 mb-10 main-tiles-section">
                                <div className='w-80 h-96'>

                                    {/* <div style={{ height: '100vh', width: '100%' }}> */}
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: "AIzaSyChufzuq8C_rWT2fSVe_0WLEqjiktQen-Q" }}
                                        defaultCenter={defaultProps.center}
                                        defaultZoom={defaultProps.zoom}
                                    >
                                        <AnyReactComponent
                                    lat={26.859970}
                                    lng={75.806236}
                                    text="My Marker"
                                /> 
                                    </GoogleMapReact>
                                    {/* </div> */}


                                </div>
                            </div>

                            <div>
                                <MapExample />
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default FactoryDashboard
