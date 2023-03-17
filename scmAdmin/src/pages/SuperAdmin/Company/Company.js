import MainStatusCard from "components/SuperAdmin/MainStatusCard";
import Sidebar from "components/SuperAdmin/Sidebar";
import Footer from "components/SuperAdmin/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import Input from "@material-tailwind/react/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCompany, checkCompanySuccessdata, handleUserStatus } from "Services/action";
import loader from "assets/img/loading.gif";
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
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      name: <div className="text-base">Company Name</div>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <div className="text-base">Company Email</div>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <div className="text-base">Company Address</div>,
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: <div className="text-base">Company Phone</div>,
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: <div className="text-base">Action</div>,
      selector: (row) => (
        <Button
          variant="outline-success"
          onClick={() =>
            navigate("/superAdmin/factory", { state: { adminId: row._id } })
          }
        >
          Factory <span>({row.totalFactory})</span>
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
    {
      selector: (row) => (
        <Button
          variant="outline-success"
          onClick={() =>
            navigate("/superAdmin/distributer", { state: { adminId: row._id } })
          }
        >
          Distributer <span>({row.totalDistributer})</span>
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
    {
      selector: (row) => (
        <Button
          variant="outline-success"
          onClick={() =>
            navigate("/superAdmin/retailer", { state: { adminId: row._id } })
          }
        >
          Retailer <span>({row.totalRetailer})</span>
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
    {
      selector: (row) => (
        <Button
          variant="outline-success"
          onClick={() => {
            let confirmBox = '';
            if(row.userStatus == "Active"){
               confirmBox = window.confirm(
                "Are you sure you want to deactive this Record?"
              );
            }
            if(row.userStatus == "Deactive"){
              confirmBox = window.confirm(
                "Are you sure you want to activate this Record?"
              );
            }
            if (confirmBox === true) {
              if(row.userStatus === 'Active'){
                handleDeactivateRecord(row._id, "Deactive");
              }else if(row.userStatus === 'Deactive'){
                handleDeactivateRecord(row._id, "Active");
              }
            }
          }}
        >
         {row.userStatus.startsWith('D') ? 'Activate' : 'Deactivate'}
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
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
    dispatch(getCompany());
  }, []);

  const initialdata = useSelector((state) => state.CompanyRecord);
  const initialUserStatusdata = useSelector((state) => state.handleUserStatusData);
  const initialCompanyStoredata = useSelector(
    (state) => state.CompanyStoreData
  );
  useMemo(() => {
    if (initialCompanyStoredata.success == true) {
      successNotify();
    }
  }, [initialCompanyStoredata]);
  
  useMemo(() => {
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
    const result = Company.filter((company) => {
      return company.name.toLowerCase().match(Search.toLowerCase());
    });
    setFilterCompany(result);
  }, [Search]);

  useEffect(() => {
    dispatch(checkCompanySuccessdata());
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="main-section bg-gray-500">
        <Sidebar />
        <div className="md:ml-32">
          <div className="bg-gray-500 pt-14 pb-28 px-3 md:px-8 h-auto">
            <div className="container mx-auto max-w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5">
                <MainStatusCard />
              </div>
            </div>
          </div>
          <div className="px-3 md:px-8 h-auto -mt-24">
            <div className="container mx-auto max-w-full">
              <div className="grid grid-cols-1 px-4 mb-16">
                <DataTable
                  title="Company List"
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
                  actions={
                    <NavLink to="/superAdmin/addCompany">
                      <Button>Add</Button>
                    </NavLink>
                  }
                  subHeader
                  subHeaderComponent={
                    <div className="w-full">
                      <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                        <Input
                          type="text"
                          color="purple"
                          placeholder="Search Here"
                          value={Search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};
export default Company;
