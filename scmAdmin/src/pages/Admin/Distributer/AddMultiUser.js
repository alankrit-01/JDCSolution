import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Papa from 'papaparse';
import { storeMultiUser } from 'Services/action';
const AddMultiUser = () => { 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [parsedData, setParsedData] = useState([]);
    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);
    //State to store the values
    const [values, setValues] = useState([]);

    
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
 
    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];
                // Iterating data to get column name and their values
                results.data.map((d) => {
                    const currentvalarray = Object.values(d);
                    currentvalarray.splice(3,0, adminUserId)
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(currentvalarray);
                });
                setParsedData(results.data);
                setTableRows(rowsArray[0]);
                // Filtered Values 
                dispatch(storeMultiUser(valuesArray))
                setValues(valuesArray);
            },
        });
    };

    const initialDistributerStoredata = useSelector((state) => state.DistributerStoreData);
    const initialRetailerStoredata = useSelector((state) => state.RetailerStoreData);
    useMemo(() => {
        if (initialDistributerStoredata.success == true) {
            navigate('/admin/distributer')
        }
    }, [initialDistributerStoredata])
    useMemo(() => {
        if (initialRetailerStoredata.success == true) {
            navigate('/admin/retailer')
        }
    }, [initialRetailerStoredata])
    return (
        <>
            <Sidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-28 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                            <MainStatusCard />
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                                <Card>
                                    <CardHeader color="purple" contentPosition="none">
                                        <div className="w-full flex items-center justify-between">
                                            <h2 className="text-white text-2xl">Add Multi User</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody> 
                                        <div className="flex flex-wrap mt-10">
                                            <div className="w-full pr-4 mb-10 font-light">
                                                <input
                                                    type="file"
                                                    name="file"
                                                    accept=".csv"
                                                    onChange={changeHandler}
                                                    style={{ display: "block", margin: "10px auto" }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            {/* <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                            <Button type="submit">Submit</Button>
                                            </div> */}
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default AddMultiUser