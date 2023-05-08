import MainStatusCard from "components/SuperAdmin/MainStatusCard";
import Sidebar from "components/SuperAdmin/Sidebar";
import Footer from "components/SuperAdmin/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { getCompany, checkCompanySuccessdata, handleUserStatus } from "Services/action";
import loader from "assets/img/loading.gif";
import Arrowdown from 'assets/img/down-arrow.png';
import { CSVLink } from "react-csv";

const Company = () => {
  const dataFetchedRef = useRef(false);
  const navigate = useNavigate();
  const successNotify = () =>
    toast.success("Company Added Successfully !.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const userStatusUpdate = () =>
    toast.success("Status updated successfully !.", {
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
  const [Company, setCompany] = useState([]);
  const [Search, setSearch] = useState("");
  const [FilterCompany, setFilterCompany] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [selectedData, setSelectedData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      name: <div className="text-base">Company Name</div>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <div className="text-base">Email</div>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <div className="text-base"> Location</div>,
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: <div className="text-base"> Phone</div>,
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Information",
      selector: (row) => (
        <button className="custom-details-btn" onClick={() => navigate('/superAdmin/companyDetails', { state: { userId:  row._id } })}>Details</button>
      ),
      sortable: true,
    },
    // {
    //   name: <div className="text-base">Action</div>,
    //   selector: (row) => (
    //     <Button
    //       variant="outline-success"
    //       onClick={() =>
    //         navigate("/superAdmin/factory", { state: { adminId: row._id } })
    //       }
    //     >
    //       Factory <span>({row.totalFactory})</span>
    //     </Button>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    //   width: "150px",
    // },
    // {
    //   selector: (row) => (
    //     <Button
    //       variant="outline-success"
    //       onClick={() =>
    //         navigate("/superAdmin/distributer", { state: { adminId: row._id } })
    //       }
    //     >
    //       Distributer <span>({row.totalDistributer})</span>
    //     </Button>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    //   width: "150px",
    // },
    // {
    //   selector: (row) => (
    //     <Button
    //       variant="outline-success"
    //       onClick={() =>
    //         navigate("/superAdmin/retailer", { state: { adminId: row._id } })
    //       }
    //     >
    //       Retailer <span>({row.totalRetailer})</span>
    //     </Button>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    //   width: "150px",
    // },
    // {
    //   selector: (row) => (
    //     <Button
    //       variant="outline-success"
    //       onClick={() => {
    //         let confirmBox = '';
    //         if(row.userStatus == "Active"){
    //            confirmBox = window.confirm(
    //             "Are you sure you want to deactive this Record?"
    //           );
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
    //      {row?.userStatus?.startsWith('D') ? 'Activate' : 'Deactivate'}

    //     </Button>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    //   width: "150px",
    // },
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
        name: "Company Name",
        email: "Company Email",
        address: "Address",
        phone: "Company Phone",
      },
    ];
    setExcelData(columns);
  }, []);

  useEffect(() => {
    dispatch(getCompany());
  }, []);

  const initialdata = useSelector((state) => state.CompanyRecord);
  const initialUserStatusdata = useSelector((state) => state.handleUserStatusData);
  const initialCompanyStoredata = useSelector(
    (state) => state.CompanyStoreData
  );
  useEffect(() => {
    if (initialCompanyStoredata.success == true) {
      successNotify();
    }
  }, [initialCompanyStoredata]);
  
  useEffect(() => {
    if (initialUserStatusdata.success == true) {
      userStatusUpdate();
    }
  }, [initialUserStatusdata]);
  useEffect(() => {
    var a = [{ address: "There are no record to display" }];
    setCompany(initialdata.companyRec);

    setLoading(true);
    if (
      initialdata.companyRec != 0 &&
      initialdata.companyRec != null &&
      initialdata.companyRec != ""
    ) {
      setFilterCompany(initialdata.companyRec);
    } else {
      setLoading(false);
      setFilterCompany(a);
    }
  }, [initialdata]);

  useEffect(() => {
    var a = [{ address: "There are no record to display" }];
    const result = Company.filter((company) => {
      return company.name.toLowerCase().match(Search.toLowerCase());
    });

    console.log("result",result.length)
    if(result.length !== 0){
      setFilterCompany(result);

    }else{
      setLoading(false);
       setFilterCompany(a);
    }

    

  }, [Search]);

  const getCsvData = () => {
    const csvData = [];

    if (excelData.length > 0 && FilterCompany.length > 0) {
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
        FilterCompany.map((val) => {
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

  useEffect(() => {
    dispatch(checkCompanySuccessdata());
  }, []);

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
                  <h2 className="head-cust-color">Company List - {FilterCompany && FilterCompany == "There are no record to display" ? "0"  : FilterCompany.length}</h2>
                </div> 
                <div>
                  <input type="text" className="cust-input" placeholder="Search" value={Search}
                    onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="right-button-section">
                  <CSVLink filename="CompanyList.csv" data={getCsvData()}>
                    <div className="">
                      <button className="cust-export-button">Export CSV <img src={Arrowdown} className="w-3 h-3" style={{ margin: "2px 0px 2px 2px" }} /> </button>
                    </div>
                  </CSVLink>
                  <NavLink to="/superAdmin/addCompany">
                    <button className="cust-button">Add +</button>
                  </NavLink>
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
                  data={FilterCompany}
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
export default Company;
