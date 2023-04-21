import MainStatusCard from "components/Admin/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import { getUserDetail } from "Services/action";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import cumulative from "assets/img/cumulative.png";
import DistributerDetailChart from "components/Factory/distributerDetailChart";
const FactoryDistributerDetails = () => {

    const initialDistBatchProductChartData = useSelector((state) => state?.DistributerBatchProductChartData);
    const dataFetchedRef = useRef(false);
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
    }, [])

    const initialdata = useSelector((state) => state.UserDetailRecord);

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
            <FactorySidebar />
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
                                            <li className="factory-bg">Distributer Name  <span>: {userName && userName.charAt(0).toUpperCase() + userName.slice(1)}</span></li>
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

                                                <select id="colours" className="dd-button">
                                                    <option value="red">Cumulative</option>
                                                    <option value="green">Green</option>
                                                    <option value="blue">Blue </option>

                                                </select>
                                            </div>
                                            <div className="received-part-two batch eye-liner-part">

                                                <select id="colours" className="dd-button batch-selected option-down">
                                                    <option value="red"> All Products</option>
                                                   
                                                </select>
                                            </div>
                                        </div>
                                        <div className="liner-part">
                                            <p>Batches sent</p>
                                            <p><span className="bg-span-part"> </span>  <span className="bg-span-part2">
                                            { initialDistBatchProductChartData.distributerBatchProductRec.message == "Result is empty" ? 0 : initialDistBatchProductChartData?.distributerBatchProductRec?.message?.BatchesReceived}
                                                </span></p>
                                            <p>Products Received</p>
                                            <p><span className="bg-span-part3"> </span>  <span className="bg-span-part4"> 
                                            
                                            { initialDistBatchProductChartData.distributerBatchProductRec.message == "Result is empty" ? 0 : initialDistBatchProductChartData?.distributerBatchProductRec?.message?.ProductsReceived}
                                            </span></p>

                                            <p>Products Sold</p>
                                            <p><span className="bg-span-part3"> </span>  <span className="bg-span-part4"> 
                                            
                                            { initialDistBatchProductChartData.distributerBatchProductRec.message == "Result is empty" ? 0 : initialDistBatchProductChartData?.distributerBatchProductRec?.message?.ProductsSold}
                                            </span></p>

                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light self factoryDistributerDetail">
                                        <h3>Products Received</h3>

                                        <DistributerDetailChart distributerId={initialdata?.userDetailRec?.userRecord?._id} />
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
export default FactoryDistributerDetails