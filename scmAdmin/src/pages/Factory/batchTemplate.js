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
import { getBatchTemplate, checkBatchTemplateSuccessdata } from 'Services/action';

const BatchTemplate = () => {

    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [factoryUserHash, setFactoryUserHash] = useState(factoryData.currentFactoryUserHash);

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
    ////need improve////
   
    // const allProductTemplatelist = [];

    const columns = [
        {
            name: "Batch Id",
            selector: (row) => row.BatchID,
            sortable: true,
            width: "150px"
        },
        {
            name: "Product Template ID",
            selector: (row) => row.ProductTemplateID,
            sortable: true,
            width: "150px"
        },
        {
            name: "Batch Size",
            selector: (row) => row.BatchSize,
            sortable: true,
            width: "150px"
        },
        {
            name: "Batch Description",
            selector: (row) => row.BatchDescription,
            sortable: true,
            width: "400px"
        },
        {
            name: "Action",
            selector: (row) => <Button variant="outline-success" onClick={() => navigate('/factory/BatchQr', { state: { BatchID:  row.BatchID } })}>Batch Qr</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "150px"
        },
        {
            selector: (row) => <Button variant="outline-success" onClick={() => navigate('/factory/BatchProductQr', { state: { BatchID:  row.BatchID } })}>Batch Product Qr</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "150px"
        },
    ];


    useEffect(() => {
        const data = {
            factoryID:factoryUserHash
        }
        dispatch(getBatchTemplate(data))
    }, [])

    const initialBatchTemplatedata = useSelector((state) => state.BatchTemplateRecord);
    const initialBatchTemplateStoredata = useSelector((state) => state.StoreBatchTemplateData);


    useMemo(() => {
        if (initialBatchTemplateStoredata.success == true) {
            successNotify();
        }
    }, [initialBatchTemplateStoredata])
    useEffect(() => {
        setBatchTemplates(initialBatchTemplatedata.batchTemplateRec.message && initialBatchTemplatedata.batchTemplateRec.message)
        setFilterBatchTemplates(initialBatchTemplatedata.batchTemplateRec.message && initialBatchTemplatedata.batchTemplateRec.message)
    }, [initialBatchTemplatedata])
    useEffect(() => {
            const result = BatchTemplates.filter((allBatchTemplate) => {
                return allBatchTemplate.BatchDescription.toLowerCase().match(Search.toLowerCase());
            })
            setFilterBatchTemplates(result)
        }, [Search])

    return (
        <>
            <ToastContainer />
            <FactorySidebar />
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
                                title="Batch List"
                                columns={columns}
                                data={FilterBatchTemplates}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                actions={<NavLink
                                    to="/factory/addBatchTemplate"><Button>Add</Button></NavLink>}
                                subHeader
                                subHeaderComponent={
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
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
export default BatchTemplate

