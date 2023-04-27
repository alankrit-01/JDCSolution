import React, { useEffect, useState } from "react";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import cumulative from "assets/img/cumulative.png";
import PieRechartComponents from 'components/Factory/PieChart';
import GoogleMapReact from 'google-map-react';
import AnyReactComponent from 'google-map-react';
import Arrowdown from 'assets/img/down-arrow.png';
import { CSVLink } from "react-csv";
import { getTotalScans, getAllLevelFails } from "Services/action";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const TotalFrouds = () => {
    const dispatch = useDispatch();

    const defaultProps = {
        center: {
            lat: 26.859970,
            lng: 75.806236
        },
        zoom: 11
    };

    const [Failedlevel1, setFailedlevel1] = useState([]);
    const [Failedlevel2, setFailedlevel2] = useState([]);
    const [Failedlevel3, setFailedlevel3] = useState([]);
    const [Failedlevel4, setFailedlevel4] = useState([]);
    const [Failedlevel5, setFailedlevel5] = useState([]);


    useEffect(() => {
        dispatch(getTotalScans());
        dispatch(getAllLevelFails())
    }, []);

    const initialTotalScansData = useSelector((state) => state?.TotalScansData);
    var totalScansDone = initialTotalScansData?.totalScansRec?.length
    var totalFailScans = 0
    for (let i = 0; i < totalScansDone; i++) {
        if (initialTotalScansData?.totalScansRec[i].isValid !== true) {
            totalFailScans = totalFailScans + 1
        }
    }



    const initialFailsLeveldata = useSelector((state) => state.FailsLevelRecord);
    let allFailsLevelData = initialFailsLeveldata && initialFailsLeveldata?.failsLevelRec

    console.log("allFailsLevelData",allFailsLevelData)

    useEffect(() => {
        let FailDatalevel1 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 1);
        let FailDatalevel2 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 2);
        let FailDatalevel3 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 3);
        let FailDatalevel4 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 4);
        let FailDatalevel5 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 5);


        setFailedlevel1(FailDatalevel1)
        setFailedlevel2(FailDatalevel2)
        setFailedlevel3(FailDatalevel3)
        setFailedlevel4(FailDatalevel4)
        setFailedlevel5(FailDatalevel5)

    }, [initialFailsLeveldata])

    const AuthenticationLevelCOLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
    const AuthenticationLevelData = [
        {
            name: "Failed on Level 1",
            value: Failedlevel1.length && Failedlevel1.length
        },
        {
            name: "Failed on Level 2",
            value: Failedlevel2.length && Failedlevel2.length
        },
        {
            name: "Failed on Level 3",
            value: Failedlevel3.length && Failedlevel3.length
        },
        {
            name: "Failed on Level 4",
            value: Failedlevel4.length && Failedlevel4.length
        },
        {
            name: "Failed on Level 5",
            value: Failedlevel5.length && Failedlevel5.length
        }
    ];
    const AuthenticationLevelTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "#ffff", padding: "5px", border: "1px solid #cccc" }}>
                    <label>{`${payload[0].name} : ${payload[0].value}`}</label>
                </div>
            );
        }
        return null;
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
                        <div className="px-4 mb-10 main-tiles-section">
                            <div className="grid grid-cols-1 ml-7 mb-2  bg-[#0c3f6a]  w-96 h-full">
                                <div className=" text-white "><h5 className='mt-1 p-1  ml-3'>All Products</h5></div>
                                {/* <div className="px-0  main-tiles-section  inline-flex mt-3  bg-red-400"> */}
                                <div className=" w-full h-full  bg-[#EDF6FB] py-12  text-left ">
                                    <div>
                                        <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                                            Scans Done
                                        </div>
                                        <div className="w-24 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                                            <div className="bg-yellow-600 h-2.5 rounded-full text-yellow-700 dark:text-yellow-500"><span className="ml-28 ">{totalScansDone && totalScansDone}</span> </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div>
                                        <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                                            Frauds Detected
                                        </div>
                                        <div className="w-20 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                                            <div className="bg-red-600 h-2.5 rounded-full  text-red-700 dark:text-red-500"><span className="ml-24 mt-0">{totalFailScans && totalFailScans}</span></div>
                                        </div>
                                    </div>
                                    <br></br>

                                </div>


                                {/* </div> */}

                            </div>                </div>
                        <div className="px-4 mb-10 w-96  h- full  bg-[#EDF6FB] ml-9 ">
                            <h2 className="heading-background w-96 -ml-4">Frouds Detected By Levels</h2>
                            {/* {initialFailsLeveldata.distributerBatchProductRec.message == "Result is empty" ? <div className="no-record mt-20">No Product Received</div> : null} */}
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={AuthenticationLevelData}
                                    color="#000000"
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#8884d8"
                                >
                                    {AuthenticationLevelData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={AuthenticationLevelCOLORS[index % AuthenticationLevelCOLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<AuthenticationLevelTooltip />} />
                                {/* <Legend /> */}
                            </PieChart>
                            <div className="productData">
                                {Failedlevel1.length ? <p className="productName" style={{ color: "#8884d8" }} > {"Level (1)"} ------------ {Failedlevel1.length && Failedlevel1.length}</p> : null}
                                {Failedlevel2.length ? <p className="productName" style={{ color: "#82ca9d" }} > {"Level (2)"} ------------ {Failedlevel2.length && Failedlevel2.length}</p> : null}
                                {Failedlevel3.length ? <p className="productName" style={{ color: "#FFBB28" }} > {"Level (3)"} ------------ {Failedlevel3.length && Failedlevel3.length}</p> : null}
                                {Failedlevel4.length ? <p className="productName" style={{ color: "#FF8042" }} > {"Level (4)"} ------------ {Failedlevel4.length && Failedlevel4.length}</p> : null}
                                {Failedlevel5.length ? <p className="productName" style={{ color: "#AF19FF" }} > {"Level (5)"} ------------ {Failedlevel5.length && Failedlevel5.length}</p> : null}
                            </div>
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
export default TotalFrouds;