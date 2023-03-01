import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFraudScans } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import Papa from 'papaparse';
import { storeMultiUser } from 'Services/action';
import { CSVLink } from "react-csv";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';


const RetailerScansFail = () => {
   
    const dispatch = useDispatch();
    const [DistributerScansFail, setDistributerScansFail] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterDistributerScansFail, setFilterDistributerScansFail] = useState([]);
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
            name: "Distributer Phone",
            selector: (row) => row.phone,
            sortable: true,
        },
    ];

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
        dispatch(getFraudScans())
    }, [])

    const initialFraudScansdata = useSelector((state) => state.FraudScansRecord);
    let allFraudScansData = initialFraudScansdata.fraudScansRec

    console.log("allFraudScansData",allFraudScansData)

    useEffect(() => {
        let distributerFailData = allFraudScansData.filter((arr) => arr.isDistributor === true);

        setDistributerScansFail(distributerFailData)
        setFilterDistributerScansFail(distributerFailData)
    }, [initialFraudScansdata])

    useEffect(() => {
        const result = DistributerScansFail.filter((distributerfailval) => {
            return distributerfailval.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterDistributerScansFail(result)
    }, [Search])

    const getCsvData = () => {
        const csvData = [];
        if (excelData.length > 0 && DistributerScansFail.length > 0) {
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
            }else {
                FilterDistributerScansFail.map((val) => {
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
                                title="Distributer Failed Scan List"
                                columns={columns}
                                data={FilterDistributerScansFail}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                onSelectedRowsChange={handleChange}
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
export default RetailerScansFail


