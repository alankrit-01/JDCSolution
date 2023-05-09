import Sidebar from "components/SuperAdmin/Sidebar";
import Footer from "components/SuperAdmin/Footer";
import { getUserDetail, getCeoStatistics } from "Services/action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import degreeBatch from "assets/img/degree3.jpg";

const CompanyDetails = () => {
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


    const [TotalFactory, setTotalFactory] = useState('');
    const [TotalDisributer, setTotalDisributer] = useState('');
    const [TotalRetailer, setTotalRetailer] = useState('');
    const [TotalFrauds, setTotalFrauds] = useState('');
    const [TotalIssueReport, setTotalIssueReport] = useState('');
    // const [TotalFactory, setTotalFactory] = useState('');
    // const [TotalFactory, setTotalFactory] = useState('');
    const [TotalFeedback, setTotalFeedback] = useState('');

    
    let userData = useLocation();
    let userId = userData.state.userId;
    useEffect(() => {
        const data = {
            _id: userId
        }
        dispatch(getUserDetail(data))

        const adminUserData = {
            adminID: userId
        }
        dispatch(getCeoStatistics(adminUserData))
    }, [])



    const initialdata = useSelector((state) => state.UserDetailRecord);

    const CeoStaticsRecord = useSelector((state) => state.CeoStaticsRecord);

    let CeoStaticsData = CeoStaticsRecord?.ceoStaticsRec
console.log("CeoStaticsRecord",CeoStaticsData)

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

            setTotalFactory(CeoStaticsData?.totalFactory);
            setTotalDisributer(CeoStaticsData?.totalDisributer);
            setTotalRetailer(CeoStaticsData?.totalRetailer);
            setTotalFrauds(CeoStaticsData?.totalFrauds);
            setTotalIssueReport(CeoStaticsData?.totalIssueReport);
            // setTotalDisributer(CeoStaticsData?.totalDisributer);
            // setTotalDisributer(CeoStaticsData?.totalDisributer);
            setTotalFeedback(CeoStaticsData?.totalFeedback);


            

        }
    }, [initialdata, CeoStaticsRecord]);


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
                                    <h2 className="head-cust-color">Company - {userName && userName.charAt(0).toUpperCase() + userName.slice(1)} Details</h2>
                                </div>
                                <div className="flex flex-wrap mt-5">
                                    <div className="w-full lg:w-7/12 pr-4 mb-10 font-light">
                                        <ul className="factory-beta">
                                            <li className="factory-bg">CEO Name  <span>: {userName && userName.charAt(0).toUpperCase() + userName.slice(1)}</span></li>
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
                                        <div>
                                            <div className=" text-white "><h5 className='mt-1  ml-3'>All Products</h5></div>
                                            <div className="flex w-full main-tiles-section  inline-flex mt-2">
                                                <div className=" w-full h-full  bg-[#EDF6FB] py-12  text-left ">
                                                    <div>
                                                        <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                                                            Scans Done
                                                        </div>
                                                        <div className="w-24 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                                                            <div className="bg-yellow-600 h-2.5 rounded-full text-yellow-700 dark:text-yellow-500"><span className="ml-28 ">225</span> </div>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <div>
                                                        <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                                                            Products sold
                                                        </div>
                                                        <div className="w-12 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                                                            <div className="bg-blue-600 h-2.5 rounded-full  text-blue-700 dark:text-blue-500"><span className="ml-14 mt-0">15</span></div>
                                                        </div>

                                                    </div>
                                                    <br></br>
                                                    <div>
                                                        <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                                                            Frauds Detected
                                                        </div>
                                                        <div className="w-20 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                                                            <div className="bg-red-600 h-2.5 rounded-full  text-red-700 dark:text-red-500"><span className="ml-24 mt-0">75</span></div>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                    <div>
                                                        <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                                                            Revenue Saved
                                                        </div>
                                                        <div className="w-24 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                                                            <div className="bg-green-600 h-2.5 rounded-full  text-green-700 dark:text-green-500"><span className="ml-28 mt-0">$2500</span></div>
                                                        </div>
                                                    </div>
                                                    <br></br>
                                                </div>

                                                <div className=" w-full h-88  bg-[#B9CCDA] py-20 text-center">
                                                    <div>
                                                        <p>Authenticity</p>
                                                        <p>Certificates</p>
                                                        <p>Generated</p>
                                                    </div>
                                                    <div className=" w-12 h-12 py-2 mt-5 ml-16 ">
                                                        <img src={degreeBatch} />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/12"></div>
                                    <div className="w-full lg:w-4/12 pl-4 mb-10 font-light self factoryDistributerDetail">                                      
                                      <div className="statistics-main flex " onClick={() => navigate('/superAdmin/factory', { state: { userId: userId } })}>
                                        <div className="statistics-pre bg-[#dca63d]"></div>
                                        <div className="statistics-title">Factory</div>
                                        <div className="statistics-counter">{TotalFactory && TotalFactory}</div>
                                      </div>

                                      <div className="statistics-main flex" onClick={() => navigate('/superAdmin/distributer', { state: { userId: userId } })}>
                                        <div className="statistics-pre bg-[#b44e94]"></div>
                                        <div className="statistics-title">Distributer</div>
                                        <div className="statistics-counter">{TotalDisributer && TotalDisributer}</div>
                                      </div>

                                      <div className="statistics-main flex">
                                        <div className="statistics-pre bg-[#52b3c7]"></div>
                                        <div className="statistics-title">Retailer</div>
                                        <div className="statistics-counter">{TotalRetailer && TotalRetailer}</div>
                                      </div>

                                      <div className="statistics-main flex">
                                        <div className="statistics-pre bg-[#92a3b3]"></div>
                                        <div className="statistics-title">Frauds Detected</div>
                                        <div className="statistics-counter">{TotalFrauds && TotalFrauds}</div>
                                      </div>

                                      <div className="statistics-main flex">
                                        <div className="statistics-pre bg-[#8a73af]"></div>
                                        <div className="statistics-title">Reports</div>
                                        <div className="statistics-counter">{TotalIssueReport && TotalIssueReport}</div>
                                      </div>
                                      
                                      <div className="statistics-main flex">
                                        <div className="statistics-pre bg-[#b44e94]"></div>
                                        <div className="statistics-title">Batches Covered</div>
                                        <div className="statistics-counter">{TotalFactory && TotalFactory}</div>
                                      </div>

                                      <div className="statistics-main flex">
                                        <div className="statistics-pre bg-[#dca63d]"></div>
                                        <div className="statistics-title">Products Covered</div>
                                        <div className="statistics-counter">{TotalFactory && TotalFactory}</div>
                                      </div>

                                      <div className="statistics-main flex">
                                        <div className="statistics-pre bg-[#8a73af]"></div>
                                        <div className="statistics-title">Feedback</div>
                                        <div className="statistics-counter">{TotalFeedback && TotalFeedback}</div>
                                      </div>
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
export default CompanyDetails