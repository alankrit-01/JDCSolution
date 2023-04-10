import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBatchTemplate, checkBatchTemplateSuccessdata, resetBatchTemplateData } from 'Services/action';
import loader from "assets/img/loading.gif";
import sendfree from 'assets/img/free-send.png';

const BatchTemplate = () => {
    const [loading, setLoading] = useState(false);
    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [factoryUserID, setFactoryUserId] = useState(factoryData.factoryUserId);
    const successNotify = () => toast.success('Batch Added Successfully !.', {
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
    const [BatchTemplates, setBatchTemplates] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterBatchTemplates, setFilterBatchTemplates] = useState([]);


    const columns = [
        {
            name: "Batch Id",
            selector: (row) => row.BatchID,
            sortable: true,
            width: "200px"
        },
        {
            name: "Product Name",
            selector: (row) => row.BatchName,
            sortable: true,
            width: "200px"
        },
        {
            name: "Distributer Name",
            selector: (row) => row.DistributorName,
            sortable: true,
            width: "200px"
        },
        {
            name: "Batch Size",
            selector: (row) => row.BatchSize,
            sortable: true,
            width: "200px"
        },
        {
            name: "Batch Date", 
            selector: (row) => row.DateOfProduction,
            sortable: true,
            width: "200px"
        },
        {
            name: "Action",
            selector: (row) => <button className="custom-details-btn" onClick={() => navigate('/factory/BatchQr', { state: { BatchID:  row.BatchID } })}>Batch Qr</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "150px"
        },
        {
            selector: (row) => <button className="custom-details-btn" onClick={() => navigate('/factory/BatchProductQr', { state: { BatchID:  row.BatchID } })}>Batch Product Qr</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "150px"
        },
    ];
    useEffect(() => {
        const data = {
            factoryID:factoryUserID
        } 
        dispatch(getBatchTemplate(data)) 
        dispatch(resetBatchTemplateData())
    }, [])
    const initialBatchTemplatedata = useSelector((state) => state.BatchTemplateRecord);
    const initialBatchTemplateStoredata = useSelector((state) => state.StoreBatchTemplateData);

    console.log("initialBatchTemplatedata",initialBatchTemplateStoredata)

 
    useEffect(() => {
        if (initialBatchTemplateStoredata?.success) {
            successNotify();
        }
    }, [initialBatchTemplateStoredata])

    useEffect(() => {
        if(initialBatchTemplatedata?.batchTemplateRec){
        setBatchTemplates(initialBatchTemplatedata.batchTemplateRec.message && initialBatchTemplatedata.batchTemplateRec.message)
        setFilterBatchTemplates(initialBatchTemplatedata.batchTemplateRec.message && initialBatchTemplatedata.batchTemplateRec.message)
        }
        var a = [{ BatchSize: "There are no record to display" }];
       
        setLoading(true);
        if(initialBatchTemplatedata?.batchTemplateRec){
        if ( initialBatchTemplatedata.batchTemplateRec.message != 0 &&
            initialBatchTemplatedata.batchTemplateRec.message != null &&
            initialBatchTemplatedata.batchTemplateRec.message.message != ""
        ) {
            setFilterBatchTemplates(initialBatchTemplatedata.batchTemplateRec.message && initialBatchTemplatedata.batchTemplateRec.message);
            
        } } else {
          setLoading(false);
    
          setFilterBatchTemplates(a);
        }
    }, [initialBatchTemplatedata])

    useEffect(() => {
            const result = BatchTemplates.filter((allBatchTemplate) => {
                return allBatchTemplate.BatchName.toLowerCase().match(Search.toLowerCase());
            })
            setFilterBatchTemplates(result)
        }, [Search])

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
                                    <h2 className="head-cust-color">Batch List</h2>
                                </div>
                                <div>
                                    <input type="text" className="cust-input" placeholder="Search" value={Search}
                                        onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                <div className="right-button-section">
                                    
                                    <NavLink to="/factory/addBatchTemplate">
                                    <button className="cust-button change-add secound-b"> <span className="dash-bg2"> <img src={sendfree} /> </span>SEND BATCH</button>
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
                                data={FilterBatchTemplates}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default BatchTemplate

