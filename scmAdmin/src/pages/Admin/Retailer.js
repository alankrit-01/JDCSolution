import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRetailers } from 'Services/action';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import { CSVLink } from "react-csv";
import React from "react";

const Retailer = () => {
    const dispatch = useDispatch();
    const[Retailer,setRetailer] = useState([]);
    const[Search,setSearch] = useState("");
    const[FilterRetailer,setFilterRetailer] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [selectedData, setSelectedData] = React.useState([]);

    const columns = [
        {
            name:"Retailer Name",
            selector:(row) => row.name,
            sortable:true,
        },
        {
            name:"Retailer Email",
            selector:(row) => row.email,
            sortable:true,
        },
        {
            name:"Retailer Address",
            selector:(row) => row.address,
            sortable:true,
        },
        {
            name:"Retailer Hash Address",
            selector:(row) => row.hashAddress,
            sortable:true,
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
        dispatch(getRetailers())
    }, [])

    const initialdata = useSelector((state) => state.RetailerRecord);
    
    useEffect(() => {
        setRetailer(initialdata.retailerRec)
        setFilterRetailer(initialdata.retailerRec)
    }, [initialdata])
   
    useEffect(() =>{
        const result = Retailer.filter((retailer) => {
            return retailer.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterRetailer(result)
    },[Search]) 

    const getCsvData = () => {
        const csvData = [];
    
        if (excelData.length > 0 && FilterRetailer.length > 0) {
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
            FilterRetailer.map((val) => {
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
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 mb-16">
                              <DataTable
                                title="Retailer List"
                                columns={columns}
                                data={FilterRetailer}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                onSelectedRowsChange={handleChange}
                                actions={ <NavLink
                                    to="/admin/addretailer"><Button>Add</Button></NavLink>}
                                subHeader
                                subHeaderComponent={
                                    <div className='w-full'>
                                         <CSVLink filename="RetailerList.csv" data={getCsvData()}>
                                    {" "}
                                    <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                      <Button>Export CSV</Button>
                                    </div>
                                  </CSVLink>
                                        <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                                        <Button><NavLink
                                    to="/admin/addMultiUser">Add Multi Retailer</NavLink></Button>
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
export default Retailer
