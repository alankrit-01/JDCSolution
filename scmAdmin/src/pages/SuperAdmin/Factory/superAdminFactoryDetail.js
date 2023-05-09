import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/SuperAdmin/Sidebar";
import Footer from "components/SuperAdmin/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { getUserDetail, sentProductListByFactory } from "Services/action";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import cumulative from "assets/img/cumulative.png";
const SuperAdminFactoryDetail = () => {
    const dataFetchedRef = useRef(false);
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPincode, setUserPincode] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userState, setUserState] = useState('');
    const [userLatitude, setUserLatitude] = useState('');
    const [userLongitude, setUserLongitude] = useState('');

    let userData = useLocation();
    let userId = userData.state.userId;
    useEffect(() => {
        const data = {
            _id: userId
        }
        dispatch(getUserDetail(data))

        const ProductUserId = {
            factoryID: userId
        }
        dispatch(sentProductListByFactory(ProductUserId));

    }, [])
    const initialdata = useSelector((state) => state.UserDetailRecord);


    const initialFactoryProductSentData = useSelector((state) => state.FactorySentProductListRecord);

    let allProductSentData = initialFactoryProductSentData && initialFactoryProductSentData.factorySentProductRec.message;

    console.log("initialDistBatchProductChartData", allProductSentData)

    var totalProduct = 0;
    var totalBatch = 0;
    for (let i = 0; i < allProductSentData?.length; i++) {
        totalProduct = totalProduct + allProductSentData[i].Products
        totalBatch = totalBatch + allProductSentData[i].Batches
    }
    let productDataInPercent = [];

    for (let i = 0; i < allProductSentData?.length; i++) {

        let value = allProductSentData[i].Products / totalProduct * 100;
        let args = Math.round(value);

        productDataInPercent.push({
            name: allProductSentData[i].Name,
            value: args,
            productQty: allProductSentData[i].Products
        })
    }


    const AuthenticationLevelCOLORS = [
        "#8884d8",
        "#82ca9d",
        "#FFBB28",
        "#FF8042",
        "#AF19FF",
    ];



    const AuthenticationLevelTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: "#ffff",
                        padding: "5px",
                        border: "1px solid #cccc",
                    }}
                >
                    <label>{`${payload[0].name} : ${payload[0].value}`} %</label>
                </div>
            );
        }
        return null;
    };


    useEffect(() => {
        if (initialdata) {
            setUserName(initialdata?.userDetailRec?.userRecord?.name);
            setUserEmail(initialdata?.userDetailRec?.userRecord?.email);
            setUserPhone(initialdata?.userDetailRec?.userRecord?.phone);
            setUserPincode(initialdata?.userDetailRec?.userRecord?.pincode);
            setUserCity(initialdata?.userDetailRec?.userRecord?.city);
            setUserState(initialdata?.userDetailRec?.userRecord?.state);
            setUserLatitude(initialdata?.userDetailRec?.userRecord?.longitude);
            setUserLongitude(initialdata?.userDetailRec?.userRecord?.latitude);
        }
    }, [initialdata]);
    return (
        <>
            <Sidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        {/* <MainStatusCard /> */}
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                                <div>
                                    <h2 className="head-cust-color">Factory -  {userName && userName.charAt(0).toUpperCase() + userName.slice(1)} Details</h2>
                                </div>
                                <div className="flex flex-wrap mt-5">
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <ul className="factory-beta">
                                            <li className="factory-bg">Factory Name  <span>: {userName && userName.charAt(0).toUpperCase() + userName.slice(1)}</span></li>
                                            <li className="factory-bg2">Email <span>: {userEmail && userEmail}</span></li>
                                            <li className="factory-bg">Phone No  <span className="space-l">: {userPhone && userPhone}</span></li>
                                            <li className="factory-bg2">PIN  <span className="space-l2 ">: {userPincode && userPincode}</span></li>
                                            <li className="main-details">
                                                <li className="factory-bg3">City : {userCity && userCity.charAt(0).toUpperCase() + userCity.slice(1)}</li>
                                                <li className="factory-bg4">State: {userState && userState.charAt(0).toUpperCase() + userState.slice(1)}</li></li>
                                            <li className="main-details">
                                                <li className="factory-bg5">Latitude  <span>{userLatitude && userLatitude}</span></li>
                                                <li className="factory-bg6">Longitude <span> {userLongitude && userLongitude}</span></li></li>
                                        </ul>
                                        <div className="button-buttom-part center-width">
                                            <div className="received-part-two report-drop buttion-cumulative">
                                                <img src={cumulative} />
                                                <select id="filters" className="dd-button">
                                                    <option value="cumulative">Cumulative</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="24hrs">Last 24hrs </option>
                                                </select>
                                            </div>
                                            <div className="received-part-two batch eye-liner-part">

                                                <select id="colours" className="dd-button batch-selected option-down">
                                                    <option>All Product</option>

                                                    {productDataInPercent.map((entry, index) => (
                                                        <>
                                                            <option value="red"> {entry && entry?.name}</option>
                                                        </>
                                                    ))}

                                                </select>
                                            </div>

                                        </div>


                                        <div className="liner-part">
                                            <p>Batches sent</p>
                                            <p><span className="bg-span-part"> </span>  <span className="bg-span-part2">
                                                {totalBatch && totalBatch}                                            </span></p>

                                            <p>Products Sent</p>
                                            <p><span className="bg-span-part3"> </span>  <span className="bg-span-part4"> {totalProduct && totalProduct}</span></p>
                                        </div>

                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light self">
                                        <h3>Products Sent</h3>
                                        {allProductSentData?.length == 0 ? <div className="no-record mt-20">No Product Sent</div> : null}
                                        <PieChart width={400} height={400}>
                                            <Pie
                                                data={productDataInPercent}
                                                color="#000000"
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={120}
                                                fill="#8884d8"
                                            >
                                                {productDataInPercent.map((entry, index) => (
                                                    <Cell

                                                        key={`cell-${index}`}
                                                        fill={
                                                            AuthenticationLevelCOLORS[
                                                            index % AuthenticationLevelCOLORS.length
                                                            ]
                                                        }
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<AuthenticationLevelTooltip />} />
                                        </PieChart>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default SuperAdminFactoryDetail