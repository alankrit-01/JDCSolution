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
import loader from "assets/img/loading.gif";

const DistributerScansFail = () => {

    const dispatch = useDispatch();
    const [DistributerScansFail, setDistributerScansFail] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterDistributerScansFail, setFilterDistributerScansFail] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [selectedData, setSelectedData] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [parsedData, setParsedData] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    //State to store the values
    const [values, setValues] = useState([]);

    const columns = [
        {
            name: "Name",
            selector: (row) => row.Name,
            sortable: false,
        },
        {
            name: "Email",
            selector: (row) => row.Email,
            sortable: false,
        },
        {
            name: "Scanned Distance",
            selector: (row) => row.distanceSeprated + " Km",
            sortable: false,
        },
        {
            name: "Scanned Location",
            selector: (row) => row.currentLocation,
            sortable: false,
        },
        {
            name: "Actual Location",
            selector: (row) => row.orignalLocation,
            sortable: false,
        },
    ];

    useEffect(() => {
        const columns = [
            {
                Name: "Name",
                Email: "Email",
                scannedDistance: "Scanned Distance",
                scannedLocation: "Scanned Location",
                orignalLocation: "Actual Location",
            },
        ];
        setExcelData(columns);
    }, []);

    useEffect(() => {
        dispatch(getFraudScans())
    }, [])

    const initialFraudScansdata = useSelector((state) => state.FraudScansRecord);
    let allFraudScansData = initialFraudScansdata.fraudScansRec

    console.log("allFraudScansData", allFraudScansData)

    useEffect(() => {
        let distributerFailData = allFraudScansData.filter((arr) => arr.isDistributor === true);

        setDistributerScansFail(distributerFailData)
        setFilterDistributerScansFail(distributerFailData)


        var a = [{ scannedDistance: "There are no record to display" }];


        setLoading(true);
        if (
            distributerFailData != 0 &&
            distributerFailData != null &&
            distributerFailData != ""
        ) {
            setFilterDistributerScansFail(distributerFailData);
        } else {
            setLoading(false);

            setFilterDistributerScansFail(a);
        }

    }, [initialFraudScansdata])

    useEffect(() => {
        const result = DistributerScansFail.filter((distributerfailval) => {
            return distributerfailval.Name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterDistributerScansFail(result)
    }, [Search])

    const getCsvData = () => {
        const csvData = [];
        if (excelData.length > 0 && DistributerScansFail.length > 0) {
            excelData.map((ex) => {
                csvData.push([
                    `${ex.Name}`,
                    `${ex.Email}`,
                    `${ex.scannedDistance}`,
                    `${ex.scannedLocation}`,
                    `${ex.orignalLocation}`,
                ]);
            });
            if (selRows.length > 0) {
                selRows.map((val) => {
                    csvData.push([
                        `${val.Name}`,
                        `${val.Email}`,
                        `${val.distanceSeprated}`,
                        `${val.currentLocation}`,
                        `${val.orignalLocation}`,

                    ]);
                });
            } else {
                FilterDistributerScansFail.map((val) => {
                    csvData.push([
                        `${val.Name}`,
                        `${val.Email}`,
                        `${val.distanceSeprated}`,
                        `${val.currentLocation}`,
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
                        <MainStatusCard />
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 mb-16">
                            <DataTable
                                title="Distributer Failed Scan List"
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
export default DistributerScansFail


