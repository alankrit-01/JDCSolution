import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRetailers } from "Services/action";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import Input from "@material-tailwind/react/Input";
import { CSVLink } from "react-csv";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import loader from "assets/img/loading.gif";

const Retailer = () => {
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
  ];

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
  }, []);

  const initialdata = useSelector((state) => state.RetailerRecord);

  const initialRetailerStoredata = useSelector(
    (state) => state.RetailerStoreData
  );
  useMemo(() => {
    if (initialRetailerStoredata.success == true) {
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
      <div className="md:ml-64">
        <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
              <MainStatusCard />
            </div>
          </div>
        </div>
        <div className="px-3 md:px-8 h-auto -mt-24">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 px-4 mb-16">
              <DataTable
                title="Retailer List"
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
                actions={
                  <NavLink to="/admin/addretailer">
                    <Button>Add</Button>
                  </NavLink>
                }
                subHeader
                subHeaderComponent={
                  <div className="w-full">
                    <CSVLink filename="RetailerList.csv" data={getCsvData()}>
                      {" "}
                      <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                        <Button>Export CSV</Button>
                      </div>
                    </CSVLink>
                    <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                      <Button>
                        <NavLink to="/admin/addMultiUser">
                          Add Multi Retailer
                        </NavLink>
                      </Button>
                    </div>
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
    </>
  );
};
export default Retailer;
