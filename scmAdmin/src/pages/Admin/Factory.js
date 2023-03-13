import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFactory } from "Services/action";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import Input from "@material-tailwind/react/Input";
import { CSVLink } from "react-csv";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import loader from "assets/img/loading.gif";
const Factory = () => {
  const successNotify = () =>
    toast.success("Factory Added Successfully !.", {
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
  const [Factories, setFactories] = useState([]);
  const [Search, setSearch] = useState("");
  const [FilterFactories, setFilterFactories] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [selectedData, setSelectedData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      name: "Factory Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Factory Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Factory Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Factory Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
  ];

  useEffect(() => {
    const columns = [
      {
        name: "Factory Name",
        email: "Factory Email",
        address: "Factory Address",
        phone: "Factory Phone",
      },
    ];
    setExcelData(columns);
  }, []);

  useEffect(() => {
    dispatch(getFactory());
  }, []);

  const initialdata = useSelector((state) => state.FactoryRecord);

  const initialFactoryStoredata = useSelector(
    (state) => state.FactoryStoreData
  );
  useMemo(() => {
    if (initialFactoryStoredata.success == true) {
      successNotify();
    }
  }, [initialFactoryStoredata]);

  useEffect(() => {
    var a = [{ email: "There are no record to display" }];
    setFactories(initialdata.factoryRec);

    setLoading(true);
    if (
      initialdata.factoryRec != 0 &&
      initialdata.factoryRec != null &&
      initialdata.factoryRec != ""
    ) {
      setFilterFactories(initialdata.factoryRec);
    } else {
      setLoading(false);

      setFilterFactories(a);
    }
  }, [initialdata]);

  useEffect(() => {
    const result = Factories.filter((retailer) => {
      return retailer.name.toLowerCase().match(Search.toLowerCase());
    });
    setFilterFactories(result);
  }, [Search]);

  const getCsvData = () => {
    const csvData = [];

    if (excelData.length > 0 && FilterFactories.length > 0) {
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
        FilterFactories.map((val) => {
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
        <div className="pt-14 pb-28 px-3 md:px-8 h-auto">
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
                title="Factory List"
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
                data={FilterFactories}
                pagination
                fixedHeader
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                onSelectedRowsChange={handleChange}
                actions={
                  <NavLink to="/admin/addfactory">
                    <Button>Add</Button>
                  </NavLink>
                }
                subHeader
                subHeaderComponent={
                  <div className="w-full">
                    <CSVLink filename="FactoryList.csv" data={getCsvData()}>
                      {" "}
                      <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                        <Button>Export CSV</Button>
                      </div>
                    </CSVLink>
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
export default Factory;
