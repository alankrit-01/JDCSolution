import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllReportForCeo } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';

import cumulative from "assets/img/cumulative.png";

const Reports = () => {
    const admindata = useSelector((state) => state.AdminLoginData);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const data = {
            receiverUserID: admindata?.adminUserId,
        }
        dispatch(getAllReportForCeo(data))
    }, [])
    const reportScanIssuedata = useSelector((state) => state?.AllReportForCeo?.reportScansRec);


    let factoryReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Factory");
    let distributerReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Distributer");
    let retailerReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Retailer");
    let customerReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Customer");

    return (
        <>
            <Sidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        {/* <MainStatusCard /> */}
                    </div>
                </div>
                <div className="px-3 md:px-7 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 mb-16">
                            <div className="grid-section">
                                <h2 className="reports-part">Reports Received - {reportScanIssuedata && reportScanIssuedata.length}</h2>
                                <div className="received-part-two report-drop">
                                    <img src={cumulative} />
                                    <select id="filters" className="dd-button">
                                        <option value="cumulative">Cumulative</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="24hrs">Last 24hrs </option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                    <span onClick={() => navigate('/admin/factoryReports', { state: { factoryReportsData: factoryReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{factoryReportIssue && factoryReportIssue.length}</h6>
                                            <p>Factory</p>
                                        </div>
                                    </span>
                                </div>
                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <span onClick={() => navigate('/admin/distributerReports', { state: { distributerReportsData: distributerReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{distributerReportIssue && distributerReportIssue.length}</h6>
                                            <p>Distributor</p>
                                        </div>
                                    </span>
                                </div>
                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                    <span onClick={() => navigate('/admin/retailerReports', { state: { retailerReportsData: retailerReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{retailerReportIssue && retailerReportIssue.length}</h6>
                                            <p>Retailer</p>
                                        </div>
                                    </span>
                                </div>
                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <span onClick={() => navigate('/admin/customerReports', { state: { customerReportsData: customerReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{customerReportIssue && customerReportIssue.length}</h6>
                                            <p>Customer</p>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    );
}
export default Reports


