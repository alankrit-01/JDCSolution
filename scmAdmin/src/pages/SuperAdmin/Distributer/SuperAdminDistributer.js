import Sidebar from "components/SuperAdmin/Sidebar";
import Footer from "components/SuperAdmin/Footer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDistributer,getDistributerByCompany, getCompany, resetDistributerData } from "Services/action";
import { useEffect, useState, useRef, useMemo } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import loader from "assets/img/loading.gif";
import { handleUserStatus } from "Services/action";
import Arrowdown from 'assets/img/down-arrow.png';
import Select from "react-select";

const SuperAdminDistributer = () => {
  const dataFetchedRef = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Distributer, setDistributer] = useState([]);
  const [Search, setSearch] = useState("");
  const [FilterDistributer, setFilterDistributer] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [selectedData, setSelectedData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [SelectedCompany, setSelectedCompany] = React.useState();
 
  let companyUserData = useLocation();
  let companyUserId = companyUserData?.state?.userId;
  const columns = [
    {
      name: <div className="text-base">Distributer Name</div>,
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: <div className="text-base">Distributer Email</div>,
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: <div className="text-base">Distributer Address</div>,
      selector: (row) => row.address,
      sortable: false,
    },
    {
      name: <div className="text-base">Distributer Phone</div>,
      selector: (row) => row.phone,
      sortable: false,
    },
    {
      name: <div className="text-base">Information</div>,
      selector: (row) => (
        <button className="custom-details-btn" onClick={() => navigate('/superAdmin/distributerDetail', { state: { userId: row._id } })}>Details</button>
      ),
      sortable: false,
    },
    // {
    //   name: <div className="text-base">Action</div>, 
    //   if: row => row.userStatus.includes('Active'),
    //   selector: (row) => (
    //     <Button
    //       variant="outline-success"
    //       onClick={() => {
    //         let confirmBox = '';
    //         if (row.userStatus == "Active") {
    //           confirmBox = window.confirm(
    //             "Are you sure you want to deactive this Record?"
    //           );
    //         }

    //         if (row.userStatus == "Deactive") {
    //           confirmBox = window.confirm(
    //             "Are you sure you want to activate this Record?"
    //           );
    //         }
    //         if (confirmBox === true) {
    //           if (row.userStatus === 'Active') {
    //             handleDeactivateRecord(row._id, "Deactive");
    //           } else if (row.userStatus === 'Deactive') {
    //             handleDeactivateRecord(row._id, "Active");

    //           }
    //         }
    //       }}
    //     >
    //       {row.userStatus.startsWith('D') ? 'Activate' : 'Deactivate'}
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
      userStatus: userStatus,
    };
    dispatch(handleUserStatus(data));
  };

  useEffect(() => {
    const columns = [
      {
        name: "Distributer Name",
        email: "Distributer Email",
        address: "Distributer Address",
        phone: "Distributer Phone",
      },
    ];
    setExcelData(columns);
  }, []);


  useEffect(() => {
    dispatch(getCompany());
    dispatch(resetDistributerData());
    if(companyUserId){
      const data = {
        adminId : companyUserId
      }
    dispatch(getDistributerByCompany(data));
    }else{
      dispatch(getDistributer());
    }
  }, []);

  const companydata = useSelector((state) => state.CompanyRecord);

  const compRecord = companydata?.companyRec;


  const initialdata = useSelector((state) => state.DistributerRecord);
  const initialStoredata = useSelector((state) => state.DistributerStoreData);


  const successNotify = () =>
    toast.success("Distributer Added Successfully!.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  useEffect(() => {
    if (initialStoredata?.success) {
      successNotify();
    }
  }, [initialStoredata]);

  useEffect(() => {

    var a = [{ email: "There are no record to display" }];
    setDistributer(initialdata?.distributerRec);
    setLoading(true);
    if (
      initialdata.distributerRec != 0 &&
      initialdata.distributerRec != null &&
      initialdata.distributerRec != ""
    ) {
      setFilterDistributer(initialdata?.distributerRec);
    } else {
      setLoading(false);

      setFilterDistributer(a);
    }
  }, [initialdata]);

  useEffect(() => {

    var a = [{ email: "There are no record to display" }];
    const result = Distributer.filter((filterRec) => {
      return filterRec.name.toLowerCase().match(Search.toLowerCase()) && filterRec.adminId === SelectedCompany?._id;
    });

    console.log("result",result)

    if (result.length != 0) {
      setFilterDistributer(result);
    } else {
      setLoading(false);
      setFilterDistributer(a);
    }
  }, [Search, SelectedCompany]);

  const getCsvData = () => {
    const csvData = [];

    if (excelData.length > 0 && FilterDistributer.length > 0) {
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
        FilterDistributer.map((val) => {
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

  function selectCompany(data) {
    setSelectedCompany(data)
  }
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

              <div class="grid grid-cols-4 gap-4">
                <div>
                  <h2 className="head-cust-color">Distributer List - {FilterDistributer.length && FilterDistributer.length}</h2>
                </div>
                <div>
                  <input type="text" className="cust-input" placeholder="Search" value={Search}
                    onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div>
                  <Select
                    className="block border-gray-part py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer border_two2"
                    options={compRecord && compRecord}
                    placeholder={"Select a Company"}
                    value={SelectedCompany}
                    onChange={selectCompany}
                    getOptionValue={(compRecord) => compRecord?._id}
                    getOptionLabel={(compRecord) => `${compRecord?.name}`}
                  />
                </div>
                <div className="right-button-section">
                  
                    <div className="">
                    <CSVLink filename="DistributerList.csv" data={getCsvData()}>
                      <button className="cust-export-button">Export CSV <img src={Arrowdown} className="w-3 h-3" style={{ margin: "2px 0px 2px 2px" }} /> </button>
                      </CSVLink>
                    </div>
                  <NavLink to="/superAdmin/addDistributer">
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
                data={FilterDistributer}
                pagination
                fixedHeader
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                onSelectedRowsChange={handleChange}
                className="recordTable"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default SuperAdminDistributer;
