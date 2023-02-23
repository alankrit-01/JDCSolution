import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDistributer } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import Papa from 'papaparse';
import { storeMultiUser } from 'Services/action';
import { CSVLink } from "react-csv";
import React from "react";


const Distributer = () => {
    const dispatch = useDispatch();
    const [Distributer, setDistributer] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterDistributer, setFilterDistributer] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [selectedData, setSelectedData] = React.useState([]);

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
            name: "Distributer Address",
            selector: (row) => row.address,
            sortable: true,
        },
        {
            name: "Distributer Hash Address",
            selector: (row) => row.hashAddress,
            sortable: true,
        },
    ];
    useEffect(() => {
        const columns = [
          {
            name: "Factory Name",
            email: "Factory Email",
            address: "Factory Address",
            hashAddress: "Factory Hash Address",
          },
        ];
        setExcelData(columns);
      }, []);

    useEffect(() => {
        dispatch(getDistributer())
    }, [])

    const initialdata = useSelector((state) => state.DistributerRecord);

    useEffect(() => {
        setDistributer(initialdata.distributerRec)
        setFilterDistributer(initialdata.distributerRec)
    }, [initialdata])

    useEffect(() => {
        const result = Distributer.filter((distributerval) => {
            return distributerval.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterDistributer(result)
    }, [Search])

    const getCsvData = () => {
        const csvData = [];
    
        if (excelData.length > 0 && FilterDistributer.length > 0) {
          excelData.map((ex) => {
            csvData.push([
              `${ex.name}`,
              `${ex.email}`,
              `${ex.address}`,
              `${ex.hashAddress}`,
            ]);
          });
          if (selRows.length > 0) {
            selRows.map((val) => {
              csvData.push([
                `${val.name}`,
                `${val.email}`,
                `${val.address}`,
                `${val.hashAddress}`,
              ]);
            });
          } 
          else {
            FilterDistributer.map((val) => {
              csvData.push([
                `${val.name}`,
                `${val.email}`,
                `${val.address}`,
                `${val.hashAddress}`,
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
                    <table>
                        <thead>
                            <tr>
                                {tableRows.map((rows, index) => {
                                    return <th key={index}>{rows}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {values.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        {value.map((val, i) => {
                                            return <td key={i}>{val}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 mb-16">
                            <DataTable
                                title="Distributer List"
                                columns={columns}
                                data={FilterDistributer}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                onSelectedRowsChange={handleChange}

                                actions={<NavLink
                                    to="/admin/adddistributer"><Button>Add</Button></NavLink>}
                                subHeader
                                subHeaderComponent={
                                    <div className='w-full'>
                                         <CSVLink filename="DistributerList.csv" data={getCsvData()}>
                                    {" "}
                                    <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                      <Button>Export CSV</Button>
                                    </div>
                                  </CSVLink>
                                        <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                        <Button><NavLink
                                    to="/admin/addMultiUser">Add Multi Distributer</NavLink></Button>
                                        </div>
                                        <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                            <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
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
}
export default Distributer


