import React, { useEffect, useState } from "react";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import cumulative from "assets/img/cumulative.png";
import Arrowdown from 'assets/img/down-arrow.png';
import { CSVLink } from "react-csv";
import { getTotalScans, getAllLevelFails } from "Services/action";
import { useDispatch, useSelector } from "react-redux";

import ProgressCard from "components/Admin/ProgressCard"
import DashboardWarningChart from 'components/Admin/DashboardWarningChart';
import FraudLocationMap from 'components/Admin/FraudLocationMap';

const TotalFrouds = () => {
    const dispatch = useDispatch();
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
                            <FraudLocationMap />
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