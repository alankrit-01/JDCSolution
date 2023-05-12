import Sidebar from 'components/SuperAdmin/Sidebar';
import Footer from 'components/SuperAdmin/Footer';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import loader from "assets/img/loading.gif";
import calender from "assets/img/calendar.png";
import cumulative from "assets/img/cumulative.png";



const SuperAdminDetailedReports = () => {
  let issueReports = useLocation();
  const navigate = useNavigate();

  let issueReportsData = issueReports?.state?.detailedReportsData;
  let factoryReportIssue = issueReports?.state?.factoryReportIssue;
  let distributerReportIssue = issueReports?.state?.distributerReportIssue;
  let retailerReportIssue = issueReports?.state?.retailerReportIssue;
  let customerReportIssue = issueReports?.state?.customerReportIssue;

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
                                <h2 className="reports-part">Detailed Reports - {issueReportsData && issueReportsData.length}</h2>
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
                                    <span onClick={() => navigate('/superAdmin/factoryReports', { state: { factoryReportsData: factoryReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{factoryReportIssue && factoryReportIssue.length}</h6>
                                            <p>Factory</p>
                                        </div>
                                    </span>
                                </div>
                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <span onClick={() => navigate('/superAdmin/distributerReports', { state: { distributerReportsData: distributerReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{distributerReportIssue && distributerReportIssue.length}</h6>
                                            <p>Distributor</p>
                                        </div>
                                    </span>
                                </div>
                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                    <span onClick={() => navigate('/superAdmin/retailerReports', { state: { retailerReportsData: retailerReportIssue } })}>
                                        <div className="background-feedback-part">
                                            <h6>{retailerReportIssue && retailerReportIssue.length}</h6>
                                            <p>Retailer</p>
                                        </div>
                                    </span>
                                </div>
                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <span onClick={() => navigate('/superAdmin/customerReports', { state: { customerReportsData: customerReportIssue } })}>
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
export default SuperAdminDetailedReports
