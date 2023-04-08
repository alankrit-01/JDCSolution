import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDistributerByCompany } from "Services/action";
import { useEffect, useMemo, useState,useRef} from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import Input from "@material-tailwind/react/Input";
import Papa from "papaparse";
import { storeMultiUser } from "Services/action";
import { CSVLink } from "react-csv";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import loader from "assets/img/loading.gif";
import {handleUserStatus } from "Services/action";
import Arrowdown from 'assets/img/down-arrow.png';

const FactoryDistributer = () => {
  const dataFetchedRef = useRef(false);
  const factoryData = useSelector((state) => state.FactoryLoginData);

  const successNotify = () =>
    toast.success("Distributer Added Successfully !.", {
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
  const [Distributer, setDistributer] = useState([]);
  const [Search, setSearch] = useState("");
  const [FilterDistributer, setFilterDistributer] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [selectedData, setSelectedData] = React.useState([]);
  const [loading, setLoading] = useState(false);

  const [parsedData, setParsedData] = useState([]);
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);

  const columns = [ 
    {
      name: "Distributer Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Distributer Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Phone No.",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Information",
      selector: (row) => (
        <button className="custom-details-btn" onClick={() => navigate('/factory/distributerDetails', { state: { userId:  row._id } })}>Details</button>
      ),
      sortable: true,
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
    const columns = [
      {
        name: "Distributer Name",
        email: "Distributer Email",
        address: "Location",
        phone: "Phone No.",
      },
    ];
    setExcelData(columns);
  }, []);

  useEffect(() => {
    const data = {
      adminId:factoryData.factoryUserAdminId
  }
    dispatch(getDistributerByCompany(data));
  }, []);

  const initialdata = useSelector((state) => state.DistributerRecord);

  useEffect(() => {
    var a = [{ email: "There are no record to display" }];
    setDistributer(initialdata.distributerRec);

    setLoading(true);
    if (
      initialdata.distributerRec != 0 &&
      initialdata.distributerRec != null &&
      initialdata.distributerRec != ""
    ) {
      setFilterDistributer(initialdata.distributerRec);
    } else {
      setLoading(false);

      setFilterDistributer(a);
    }
  }, [initialdata]);

  useEffect(() => {
    const result = Distributer.filter((distributerval) => {
      return distributerval.name.toLowerCase().match(Search.toLowerCase());
    });
    setFilterDistributer(result);
  }, [Search]);

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

  return (
    <>
      <ToastContainer />
      <FactorySidebar />
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
                  <h2 className="head-cust-color">Distributer List - {FilterDistributer.length && FilterDistributer.length}</h2>
                </div> 
                <div>
                  <input type="text" className="cust-input" placeholder="Search" value={Search}
                    onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="right-button-section">
                  <CSVLink filename="DistributerList.csv" data={getCsvData()} >
                    {" "}
                    <div className="">
                      <button className="cust-export-button">Export CSV <img src={Arrowdown} className="w-3 h-3" style={{ margin: "2px 0px 2px 2px" }} /> </button>
                    </div>
                  </CSVLink>
                 
                  
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
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default FactoryDistributer;
