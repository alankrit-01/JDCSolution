import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import { getUserDetail, retailerBatchProductChartData } from "Services/action";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import cumulative from "assets/img/cumulative.png";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const RetailerDetails = () => {
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

        const retailerdata = {
            retailerID: userId
        }
        dispatch(retailerBatchProductChartData(retailerdata));
    }, [])



    const initialdata = useSelector((state) => state.UserDetailRecord);

    const initialRetailBatchProductChartData = useSelector((state) => state?.RetailerBatchProductChartData);
    console.log("retail page", initialRetailBatchProductChartData);

    let allProductReceived = initialRetailBatchProductChartData && initialRetailBatchProductChartData?.retailerBatchProductRec?.message;
    console.log(" retail product details", allProductReceived)
    let allProductReceivedData = allProductReceived?.ProductReceivedDetail

    console.log("allProductReceivedData",allProductReceivedData)

    var totalProduct = 0
    for (let i = 0; i < allProductReceivedData?.length; i++) {
        totalProduct = totalProduct + allProductReceivedData[i].ProductsReceived

    }



    let AuthenticationLevelData = [];

    for (let i = 0; i < allProductReceivedData?.length; i++) {

        let productPercentValue = allProductReceivedData[i].ProductsReceived / totalProduct * 100;
        let productPercentValueData = Math.round(productPercentValue);

        AuthenticationLevelData.push({
            name: allProductReceivedData[i].ProductName,
            value: productPercentValueData,
            productQty: allProductReceivedData[i].ProductsReceived
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
                                    <h2 className="head-cust-color">Distributer - {userName && userName.charAt(0).toUpperCase() + userName.slice(1)} Details</h2>
                                </div>
                                <div className="flex flex-wrap mt-5">
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <ul className="factory-beta">
                                            <li className="factory-bg">Retailer Name  <span>: {userName && userName.charAt(0).toUpperCase() + userName.slice(1)}</span></li>
                                            <li className="factory-bg2">Email <span>: {userEmail && userEmail}</span></li>
                                            <li className="factory-bg">Phone No  <span className="space-l">: {userPhone && userPhone}</span></li>
                                            <li className="factory-bg2">PIN  <span className="space-l2 ">: {userPincode && userPincode}</span></li>
                                            <li className="main-details">
                                                <li className="factory-bg3">City : {userCity && userCity.charAt(0).toUpperCase() + userCity.slice(1)}</li>
                                                <li className="factory-bg4">State: {userState && userState.charAt(0).toUpperCase() + userState.slice(1)}</li></li>
                                            <li className="main-details">
                                                <li className="factory-bg5">Latitude  <span>{userLatitude && userLatitude}</span></li>
                                                <li className="factory-bg6">Longitude <span> {userLongitude && userLongitude}</span></li></li>
                                            {/* <li className="factory-bg7">Wallet address  <span className="space-l2 ">: 0x9bc444fc09f366adO9b668f4a73b639c</span></li> */}
                                        </ul>
                                        <div className="button-buttom-part center-width">
                                            <div className="received-part-two report-drop buttion-cumulative">
                                                <img src={cumulative} />
                                                <select id="colours" className="dd-button">
                                                    <option value="red">Cumulative</option>
                                                    <option value="green">Green</option>
                                                    <option value="blue">Blue </option>
                                                </select>
                                            </div>
                                            <div className="received-part-two batch eye-liner-part">
                                                <select id="colours" className="dd-button batch-selected option-down">
                                                    <option value="red"> All Products</option>
                                                    {/* <option value="green">Green</option>
                                                <option value="blue">Blue </option> */}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="liner-part">
                                            <p>Products Received</p>
                                            <p><span className="bg-span-part3"> </span>  <span className="bg-span-part4">
                                                {initialRetailBatchProductChartData?.retailerBatchProductRec?.message == "Result is empty" ? 0 : initialRetailBatchProductChartData?.retailerBatchProductRec?.message?.ProductsReceived}
                                            </span></p>
                                            <p>Products Sold</p>
                                            <p><span className="bg-span-part3"> </span>  <span className="bg-span-part4">
                                                {initialRetailBatchProductChartData?.retailerBatchProductRec?.message == "Result is empty" ? 0 : initialRetailBatchProductChartData?.retailerBatchProductRec?.message?.ProductsSold}
                                            </span></p>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light self factoryDistributerDetail">
                                        <h3>Products Received</h3>
                                        {initialRetailBatchProductChartData?.retailerBatchProductRec?.message == "Result is empty" ? <div className="no-record mt-20">No Product Received</div> : null}
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
                                                        fill={
                                                            AuthenticationLevelCOLORS[
                                                            index % AuthenticationLevelCOLORS.length
                                                            ]
                                                        }
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<AuthenticationLevelTooltip />} />


                                            {/* <Legend
                                            layout="vertical"
                                            verticalAlign="bottom"
                                            //align="center"
                                            /> */}

                                        </PieChart>

                                        {AuthenticationLevelData.map((entry, index) => (
                                            <>
                                            {console.log("entry",entry)
}
                                                <div className="productData">
                                                    <p className="productName" style={{ color: AuthenticationLevelCOLORS[index] }} >{entry.name} ------------ {entry.productQty}</p>
                                                </div>
                                            </>
                                        ))}

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
export default RetailerDetails