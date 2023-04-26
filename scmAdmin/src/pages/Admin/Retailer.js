import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRetailers ,resetRetailerData} from "Services/action";
import { useEffect, useMemo, useState,useRef } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import Input from "@material-tailwind/react/Input";
import { CSVLink } from "react-csv";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import loader from "assets/img/loading.gif";
import {handleUserStatus } from "Services/action";
import Arrowdown from 'assets/img/down-arrow.png';

const Retailer = () => {
  const dataFetchedRef = useRef(false);
  const successNotify = () =>
    toast.success("Retailer Added Successfully !.", {
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
  const navigate = useNavigate();
  const [Retailer, setRetailer] = useState([]);
  const [Search, setSearch] = useState("");
  const [FilterRetailer, setFilterRetailer] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [selectedData, setSelectedData] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "Retailer Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Retailer Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Retailer Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Retailer Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Information",
      selector: (row) => (
        <button className="custom-details-btn" onClick={() => navigate('/admin/retailerDetails', { state: { userId:  row._id } })}>Details</button>
      ),
      sortable: true,
    },
    // {
    //   name: <div className="text-base">Action</div>,
    //   if: row => row.userStatus.includes('Active'),
    //   selector: (row) => (
    //     <Button
    //       variant="outline-success"
    //       onClick={() => {
    //         let confirmBox = '';
    //         if(row.userStatus == "Active"){
    //            confirmBox = window.confirm(
    //             "Are you sure you want to deactive this Record?"
    //            );
    //         }
  
    //         if(row.userStatus == "Deactive"){
    //           confirmBox = window.confirm(
    //             "Are you sure you want to activate this Record?"
    //           );
    //         }
    //         if (confirmBox === true) {
    //           if(row.userStatus === 'Active'){
    //             handleDeactivateRecord(row._id, "Deactive");
    //           }else if(row.userStatus === 'Deactive'){
    //             handleDeactivateRecord(row._id, "Active");
  
    //           }
    //         }
    //       }}
    //     >
    //      {row.userStatus.startsWith('D') ? 'Activate' : 'Deactivate'}
    //     </Button>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    //   width: "150px",
    // }
  ];

  const handleDeactivateRecord = (userID, userStatus) => {

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const data = {
      userID: userID,
      userStatus:userStatus
  }
    dispatch(handleUserStatus(data))

  };

  useEffect(() => {
    const columns = [
      {
        name: "Retailer Name",
        email: "Retailer Email",
        address: "Retailer Address",
        phone: "Retailer Phone",
      },
    ];
    setExcelData(columns);
  }, []);

  useEffect(() => {
    dispatch(getRetailers());
    dispatch(resetRetailerData());
  }, []);

  const initialdata = useSelector((state) => state.RetailerRecord);

  const initialRetailerStoredata = useSelector(
    (state) => state.RetailerStoreData
  );
  useEffect(() => {
    if (initialRetailerStoredata?.success) {
      successNotify();
    }
  }, [initialRetailerStoredata]);

  useEffect(() => {
    var a = [{ email: "There are no record to display" }];
    setRetailer(initialdata.retailerRec);

    setLoading(true);
    if (
      initialdata.retailerRec != 0 &&
      initialdata.retailerRec != null &&
      initialdata.retailerRec != ""
    ) {
      setFilterRetailer(initialdata.retailerRec);
    } else {
      setLoading(false);

      setFilterRetailer(a);
    }
  }, [initialdata]);

  useEffect(() => {
    const result = Retailer.filter((retailer) => {
      return retailer.name.toLowerCase().match(Search.toLowerCase());
    });
    setFilterRetailer(result);
  }, [Search]);

  const getCsvData = () => {
    const csvData = [];

    if (excelData.length > 0 && FilterRetailer.length > 0) {
      excelData.map((ex) => {
        csvData.push([
          `${ex.name}`,
          `${ex.email}`,
          `${ex.address}`,
          `${ex.phone}`,
        ]);
      });
      if (selRows.length > 0) {
        selRows.map((val) => {
          csvData.push([
            `${val.name}`,
            `${val.email}`,
            `${val.address}`,
            `${val.phone}`,
          ]);
        });
      } else {
        FilterRetailer.map((val) => {
          csvData.push([
            `${val.name}`,
            `${val.email}`,
            `${val.address}`,
            `${val.phone}`,
          ]);
        });
      }
    }

    return csvData;
  };

  var selRows = selectedData;
  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

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

            <div class="grid grid-cols-3 gap-4">
                <div>
                  <h2 className="head-cust-color">Retailer List - {FilterRetailer.length && FilterRetailer.length}</h2>
                </div> 
                <div>
                  <input type="text" className="cust-input" placeholder="Search" value={Search}
                    onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="right-button-section">
                  <CSVLink filename="RetailerList.csv" data={getCsvData()}>
                    {" "}
                    <div className="">
                      <button className="cust-export-button">Export CSV <img src={Arrowdown} className="w-3 h-3" style={{ margin: "2px 0px 2px 2px" }} /> </button>
                    </div>
                  </CSVLink>
                  <NavLink to="/admin/addretailer">
                    <button className="cust-button">Add +</button>
                  </NavLink>
                  {/* <NavLink to="/admin/addMultiUser">
                    <button className="cust-button">Add Multi User+</button>
                  </NavLink> */}
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
                data={FilterRetailer}
                pagination
                fixedHeader
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                onSelectedRowsChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Retailer;
