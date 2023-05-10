import MainStatusCard from 'components/SuperAdmin/MainStatusCard';
import Sidebar from 'components/SuperAdmin/Sidebar';
import Footer from 'components/SuperAdmin/Footer';

import { NavLink } from "react-router-dom";
import ProgressCard from "components/SuperAdmin/ProgressCard";
import DashboardWarningChart from 'components/SuperAdmin/DashboardWarningChart';
import "react-multi-carousel/lib/styles.css";
import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardStatus from "@material-tailwind/react/CardStatus";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import cumulative from "assets/img/cumulative.png";
import { useEffect } from "react";
import { resetLoginData } from "Services/action";
import { useDispatch } from "react-redux";
import GoogleMapReact from 'google-map-react';
import AnyReactComponent from 'google-map-react';



const SuperAdminDashboard = () => {
    const dispatch = useDispatch();
    const defaultProps = {
        center: {
          lat: 26.859970,
          lng: 75.806236
        },
        zoom: 11
      };

    return (
        <>
            <Sidebar />



            <div className="md:ml-32">
                <div className="flex justify-between">
                    <div className="px-2 mb-5 mt-5 ml-12 h-20 w-52">
                        <Card className="main-tiles p-0 w-44">
                            <CardRow className="inner-tiles mr-3 ">
                                <button className="add-batch-dashboard-section mr-2 ">
                                    <div className="add-batch-dashboard-plus h-10">
                                        {" "}
                                        <p className="-mt-2">+</p>
                                    </div>
                                    <div className="add-batch-dashboard-title mt-0">
                                        <Dropdown
                                            buttonText={
                                                <h6 className="mr-10 text-xl mt-2 text-white font-weight-text">ADD</h6>
                                            }
                                            style={{
                                                padding: 9,
                                                color: "white",
                                                // backgroundColor: "red",
                                                backgroundColor: "#335980",
                                                position: "relative",
                                                marginLeft: "120px",
                                                width: "40px",
                                                hieght: "40px",
                                                marginTop: "6px",
                                                marginb: "20px",
                                                height: "22px"
                                            }}
                                        >
                                            <DropdownItem >
                                                <NavLink to="/superAdmin/addCompany">
                                                    Add Company
                                                </NavLink>
                                            </DropdownItem>
                                            <DropdownItem >
                                                <NavLink to="/superAdmin/addFactory">
                                                    Add Factory
                                                </NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink to="/superAdmin/addDistributer">
                                                    Add Distributer
                                                </NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink to="/superAdmin/addRetailer">
                                                    Add Retailer
                                                </NavLink>
                                            </DropdownItem>
                                        </Dropdown>
                                    </div>
                                </button>
                            </CardRow>
                        </Card>
                    </div>

                    <div className="received-part-two2 report-drop cumulative">
                        <img src={cumulative} />
                        <select id="colours" className="dd-button">
                            <option value="red">Cumulative</option>
                            <option value="green">Monthly</option>
                            <option value="blue">Last 24hrs</option>
                        </select>
                    </div>
                </div>

                <div className="px-3 md:px-8 h-20" />
                <div className="px-3 md:px-8 -mt-24">
                    <div>
                        <MainStatusCard />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">

                        <div className="px-4 mb-10 main-tiles-section">
                            <ProgressCard />
                        </div>
                        <div className="px-4 mb-10 main-tiles-section">
                            <DashboardWarningChart />
                        </div>

                        <div className="px-4 mb-10 main-tiles-section">
                            <div>
                                <h2 className="heading-background">Locations</h2>
                            </div>
                            <div className='w-80 h-96 map-padding-use'>
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
                            </div>
                        </div>


                    </div>

                </div>
                <Footer />
            </div>
        </>
    );
}
export default SuperAdminDashboard
