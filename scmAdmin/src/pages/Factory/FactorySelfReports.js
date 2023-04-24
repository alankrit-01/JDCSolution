import MainStatusCard from "components/Factory/MainStatusCard";
import Sidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelfReport, resetFactoryReportData } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from "assets/img/loading.gif";
import cumulative from "assets/img/cumulative.png";
import Popup from "reactjs-popup";
import img1 from "assets/img/qrcode.png";
import img2 from "assets/img/product.jpg";
import img3 from "assets/img/product2.png";
import img4 from "assets/img/product3.jpg";
import reporticon from "assets/img/report-icon.png";
const FactorySelfReports = () => {
  const factorydata = useSelector((state) => state.FactoryLoginData);
  const [loading, setLoading] = useState(false);

  const successNotify = () => toast.success('Issue Report Added Successfully !.', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const dispatch = useDispatch();
  const [IssueReport, setIssueReport] = useState([]);
  const [Search, setSearch] = useState("");
  const [FilterIssueReport, setFilterIssueReport] = useState([]);
  let issues;
  const columns = [
    {
      name: "Comment",
      selector: (row) => row.comment.substring(0, 150) + "...",
      sortable: true,
      width: "750px"
    },
    {
      name: "Date",
      selector: (row) => row.created,
      sortable: true,
    },
    {
      name: "Report",
      selector: (row) => (
         
        //   <button className="custom-details-btn" onClick={() => Popup()}>View More</button>
        <Popup
          trigger={<Button className="view-more-part2">View more</Button>}
          position="left center"
          marginLeft="30px"
        >
          <div
            class="popup"
            className=" max-h-max bg-[#CCCCCC] ml-56 px-2 max-w-2xl pb-6 text-[#0c3f6a] pr-6 position-set-part"
          >
            <p  style={{display: "none"}}>{issues = row.scanIssue.split(',')}</p>
            <div className="flex">
              <div className="mt-6 ml-6">
                <h5 className="text-lg font-extrabold">
                  Issue Reported on {row.created && row.created}
                </h5>
                <br></br>
                <div className="text-sm">
                  {issues && issues.map((issuesval)=><div className="flex">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={"checked"}
                    //   onChange={handleChange}
                    />
                    <p className="pl-2">
                      {issuesval && issuesval}
                    </p>
                  </div>)}
                  
                </div>
              </div>
              <div className="mt-6 ml-36  text-left text-sm">
                <div className="flex">
                  <h5 className="font-medium">Customer Name</h5>
                  <p>: {row.name && row.name}</p>
                </div>
                <div className="flex">
                  <h5 className="font-medium">Location</h5> <p>: {factorydata && factorydata.factoryUserCity} , {factorydata && factorydata.factoryUserCountry}</p>
                </div>
                <div className="flex">
                  <h5 className="font-medium">Email : {row.email && row.email}</h5>
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
                {row.comment && row.comment}
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
    const data = {
      senderUserID: factorydata.factoryUserId,
    }
    dispatch(resetFactoryReportData())
    dispatch(getSelfReport(data))
  }, [])
  const initialdata = useSelector((state) => state.SelfReportRecord);
  const initialFactoryReportStoredata = useSelector((state) => state.FactoryReportRecord);

  useEffect(() => {
    if (initialFactoryReportStoredata?.success) {
      successNotify();
    }
  }, [initialFactoryReportStoredata])
  useEffect(() => {
    setIssueReport(initialdata.selfReportRec)
    setFilterIssueReport(initialdata.selfReportRec)

    var a = [{ comment: "There are no record to display" }];

    setLoading(true);
    if (
      initialdata.selfReportRec != 0 &&
      initialdata.selfReportRec != null &&
      initialdata.selfReportRec != ""
    ) {
      setFilterIssueReport(initialdata.selfReportRec);

    } else {
      setLoading(false);

      setFilterIssueReport(a);
    }
  }, [initialdata])

  useEffect(() => {
    const result = IssueReport.filter((issuereportval) => {
      return issuereportval.comment.toLowerCase().match(Search.toLowerCase());
    })
    setFilterIssueReport(result)
  }, [Search])
  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="md:ml-32">
        <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
          <div className="container mx-auto max-w-full">
            {/* <MainStatusCard /> */}

          </div>
        </div>






        <div className="px-3 md:px-8 h-auto -mt-24">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 px-4 mb-16">


              <div className="received-part-two report-drop">
                <img src={cumulative} />

                <select id="colours" className="dd-button right-button-set">
                  <option value="red">Cumulative</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue </option>

                </select>


              </div>
              <div className="right-button-section report-top-part">
                <NavLink to="/factory/addFactoryReport">
                  <button className="cust-button"> <span className="report-image"><img src={reporticon} /></span> Report</button>
                </NavLink>
              </div>
              <div class="grid grid-cols-3 gap-4">

                <div>
                  <h2 className="head-cust-color">Reports Sent To CEO</h2>
                </div>
                <div>
                  <input type="text" className="cust-input" placeholder="Search" value={Search}
                    onChange={(e) => setSearch(e.target.value)} />
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
export default FactorySelfReports


