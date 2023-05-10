import Sidebar from 'components/SuperAdmin/Sidebar';
import Footer from 'components/SuperAdmin/Footer';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import loader from "assets/img/loading.gif";
import calender from "assets/img/calendar.png";
import cumulative from "assets/img/cumulative.png";
import Popup from "reactjs-popup";
import img1 from "assets/img/qrcode.png";
import img2 from "assets/img/product.jpg";
import img3 from "assets/img/product2.png";
import img4 from "assets/img/product3.jpg";


const SuperAdminReportsSentToCeo = () => {
  let issueReports = useLocation();
  let issueReportsData = issueReports?.state?.reportsSentToCeoData;
  const [initialdata, setInitialdata] = useState([]);
  const [newReportIssue, setNewReportIssue] = useState([]);
  const [pendingReportIssue, setPendingReportIssue] = useState([]);
  const [solvedReportIssue, setSolvedReportIssue] = useState([]);
  const [IssueReport, setIssueReport] = useState([]);
  const [Search, setSearch] = useState("");
  const [FilterIssueReport, setFilterIssueReport] = useState([]);
  const [loading, setLoading] = useState(false);

  let issues;
  const columns = [
    {
      name: "Distributer Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.created,
      sortable: true,
    },
    {
      name: "Report",
      selector: (row) => row.comment,
      sortable: true,
    },
    {
      selector: (row) => (
        <Popup
          trigger={<Button className="view-more-part2">View more</Button>}
          position="left center"
          marginLeft="30px"
        >
          <div
            class="popup"
            className=" max-h-max bg-[#CCCCCC] ml-56 px-2 max-w-2xl pb-6 text-[#0c3f6a] pr-6 position-set-part3"
          >
            <div className="flex">
              <div className="mt-6 ml-6">
                <h5 className="text-lg font-extrabold">
                  Issue Reported on {row?.created}
                </h5>
                <br></br>
                <div className="text-sm">
                                    <p style={{ display: "none" }}>{issues = row.scanIssue.split(',')}</p>

                  {issues && issues.map((issuesVal) => <div className="flex">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={"checked"}
                    />
                    <p className="pl-2">
                      {issuesVal && issuesVal}
                    </p>
                  </div>)}
                </div>
              </div>
              <div className="mt-6 ml-36  text-left text-sm">
                <div className="flex">
                  <h5 className="font-medium">Name</h5>
                  <p>: {row?.name}</p>
                </div>
                <div className="flex">
                  <h5 className="font-medium">Location</h5> <p>: {row?.location}</p>
                </div>

                <div className="flex">
                  <h5 className="font-medium">Email : {row?.email}</h5>
                </div>
              </div>
            </div>
            <br></br>
            <div className="flex space-x-4 ml-6 mr-6">
              <div className="w-60 h-32 border-4 border-[#0c3f6a]  bg-white">
                <img className="h-28 ml-2" src={img1} />
              </div>
              <div className="w-60 h-32 border-4 border-[#0c3f6a]">
                <img className="h-28 mt-1 " src={img2} />
              </div>
              <div className="w-60 h-32 border-4 border-[#0c3f6a]">
                <img className="h-28 mt-1 " src={img3} />
              </div>
              <div className="w-60 h-32 border-4 border-[#0c3f6a]">
                <img className="h-28 mt-1 " src={img4} />
              </div>
            </div>
            <br></br>
            <div className="ml-6  mr-6  h-20 text-left border-2 border-[#A3A3A3] rounded-md max-w-2xl px-2">
              <p>
                {row?.comment}
              </p>
            </div>
            <br></br>
          </div>
        </Popup>
      ),
      sortable: true,
    },
  ];
  useEffect(() => {

    if (issueReportsData !== undefined) {
      setInitialdata(issueReportsData);

      let newReportIssue = issueReportsData.filter((reportissue) => reportissue.status == "Unread");
      let pendingReportIssue = issueReportsData.filter((reportissue) => reportissue.status == "Pending");
      let solvedReportIssue = issueReportsData.filter((reportissue) => reportissue.status == "Solved");

      setNewReportIssue(newReportIssue);
      setPendingReportIssue(pendingReportIssue);
      setSolvedReportIssue(solvedReportIssue);
    }else {
      var issueReportempty = [{ email: "There are no record to display" }];
      setInitialdata(issueReportempty);
    }
  }, [issueReportsData])
  useEffect(() => {
    var a = [{ comment: "There are no record to display" }];
    setIssueReport(initialdata);
    setLoading(true);
    if (initialdata != 0 && initialdata != null && initialdata != "") {
      setFilterIssueReport(initialdata);
    } else {
      setLoading(false);
      setFilterIssueReport(a);
    }
  }, [initialdata])

  useEffect(() => {    
    const result = IssueReport.filter((issueReportVal) => {
      return issueReportVal.name.toLowerCase().match(Search.toLowerCase());
    })
    setFilterIssueReport(result)
  }, [Search])
  return (
    <>
      <Sidebar />
      <div className="md:ml-32">
        <div className="pt-14 pb-28 px-3 md:px-8 h-auto">
          <div className="container mx-auto max-w-full">
            {/* <MainStatusCard /> */}
          </div>
        </div>
        <div className="px-3 md:px-8 h-auto -mt-24">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 px-4 mb-16">
              <div className="flex flex-wrap feedback-padding lg:w-12/12">
                <div className="w-full lg:w-4/12 pr-4">
                  <div>
                    <h2 className="reports-part">Reports - <span className="factory-bold">Distributer</span></h2>
                    <h4 className="font-spano5"><span>{issueReportsData && issueReportsData.length}</span></h4>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 pl-4 font-light">
                  <form class="searchbox-container" action="">
                    <input type="text" className="searchbox reports-part-one" placeholder="Search" value={Search}
                      onChange={(e) => setSearch(e.target.value)} />
                    <img src={calender} />
                  </form>
                </div>
                <div className="w-full lg:w-4/12 pl-4 font-light">
                  <div className="received-part-two">
                    <img src={cumulative} />
                    <select id="filters" className="dd-button">
                      <option value="cumulative">Cumulative</option>
                      <option value="monthly">Monthly</option>
                      <option value="24hrs">Last 24hrs </option>
                    </select>
                  </div>
                  <ul className="sub-text">
                    <li>New <span>{newReportIssue && newReportIssue.length}</span></li>
                    <li>Solved <span>{pendingReportIssue && pendingReportIssue.length}</span></li>
                    <li>Pending <span>{solvedReportIssue && solvedReportIssue.length}</span></li>
                  </ul>
                </div>
              </div>
              <DataTable
                columns={columns}
                noDataComponent={
                  <div>
                    <h4>Loading....</h4>
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={loader}
                    ></img>
                  </div>
                }
                data={FilterIssueReport}
                pagination
                fixedHeader
                selectableRows
                selectableRowsHighlight
                highlightOnHover
              
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default SuperAdminReportsSentToCeo
