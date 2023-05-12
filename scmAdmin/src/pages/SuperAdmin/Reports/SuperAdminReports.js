import Sidebar from 'components/SuperAdmin/Sidebar';
import Footer from 'components/SuperAdmin/Footer';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllReportForSuperAdmin } from 'Services/action';
import { useEffect} from 'react';

import cumulative from "assets/img/cumulative.png";

const SuperAdminReports = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllReportForSuperAdmin())
    }, [])
    const reportScanIssuedata = useSelector((state) => state?.AllReportForSuperAdmin?.reportScansRec);

    let superADminReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "SuperAdmin");
    let companyReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Admin");
    let factoryReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Factory");
    let distributerReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Distributer");
    let retailerReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Retailer");
    let customerReportIssue = reportScanIssuedata.filter((reportissue) => reportissue.role == "Customer");

    let detailedReportsData = reportScanIssuedata.filter((reportissue) => reportissue.role !== "SuperAdmin" && reportissue.role !== "Admin");

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
                                    <span onClick={() => navigate('/superAdmin/reportsSentToCeo', { state: { reportsSentToCeoData: superADminReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{superADminReportIssue && superADminReportIssue.length }</h6>
                                            <p>Reports Issued</p>
                                        </div>
                                    </span>
                                </div>
                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <span onClick={() => navigate('/superAdmin/companyReportsReceived', { state: { reportsSentFromCeoData: companyReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{companyReportIssue && companyReportIssue.length }</h6>
                                            <p>Companies Reports</p>
                                        </div>
                                    </span>
                                </div> 
                                <div className="w-full lg:w-3/12 pr-4 mb-10 font-light"></div>
                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                    <span onClick={() => navigate('/superAdmin/detailedReports', { state: { detailedReportsData: detailedReportsData, factoryReportIssue : factoryReportIssue, distributerReportIssue: distributerReportIssue,  retailerReportIssue : retailerReportIssue, customerReportIssue :customerReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{detailedReportsData && detailedReportsData.length}</h6>
                                            <p>Detailed Reports</p>
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
export default SuperAdminReports


