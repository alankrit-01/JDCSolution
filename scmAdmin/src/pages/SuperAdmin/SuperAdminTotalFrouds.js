import React, { useEffect, useState } from "react";
import Sidebar from "components/SuperAdmin/Sidebar";
import Footer from "components/SuperAdmin/Footer";
import cumulative from "assets/img/cumulative.png";
import GoogleMapReact from 'google-map-react';
import AnyReactComponent from 'google-map-react';
import Arrowdown from 'assets/img/down-arrow.png';
import { useDispatch } from "react-redux";

import ProgressCard from "components/SuperAdmin/ProgressCard"
import DashboardWarningChart from 'components/SuperAdmin/DashboardWarningChart';

const SuperAdminTotalFrouds = () => {
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
                <div className="flex justify-end  ">
                    <div className="received-part-two2 report-drop cumulative">
                        <img src={cumulative} />
                        <select id="colours" className="dd-button">
                            <option value="red">Cumulative</option>
                            <option value="green">Monthly</option>
                            <option value="blue">Last 24hrs </option>
                        </select>
                    </div>
                </div>
                <div className="ml-12 text-2xl text-[#0c3f6a]"><h3 className="">Total Frouds Detected</h3></div>
                <div className="flex mt-6">
                    <div>
                        <div className="px-4 mb-10 main-tiles-section fraud-section">
                            <ProgressCard />
                        </div>
                        <div className="px-4 mb-10 main-tiles-section warning-section">
                        <DashboardWarningChart />
                        </div>
                    </div>
                    <div className="px-0 mb-10 ml-5 mr-5 w-full bg-[#EDF6FB]  main-tiles-section">
                        <div>
                            <h2 className="heading-background ">Frouds Locations</h2>
                        </div>
                        <div className=" flex justify-end mt-5">
                            <button className="cust-export-button">Export CSV <img src={Arrowdown} className="w-3 h-3" style={{ margin: "2px 0px 2px 2px" }} /> </button>
                        </div>
                        <div className='w-full h-96 map-padding-use'>
                            <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyChufzuq8C_rWT2fSVe_0WLEqjiktQen-Q" }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom} >
                                <AnyReactComponent
                                    lat={26.859970}
                                    lng={75.806236}
                                    text="My Marker"
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                </div>
                <div className="py-84">
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default SuperAdminTotalFrouds;