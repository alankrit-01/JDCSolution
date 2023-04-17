import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBatchTemplate, checkBatchTemplateSuccessdata } from 'Services/action';
import loader from "assets/img/loading.gif";
import cumulative from "assets/img/cumulative.png";
import Icon from "@material-tailwind/react/Icon";

const BatchSentDetail = () => {

    let batchData = useLocation();
    let BatchID = batchData.state.BatchID;
    let companyBatchID = batchData.state.companyBatchID;
    let productName = batchData.state.productName;
 
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [BatchTemplates, setBatchTemplates] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterBatchTemplates, setFilterBatchTemplates] = useState([]);


    const columns = [
        {
            name: "Product Id",
            selector: (row) => row.BatchID,
            sortable: true,

        },
        {
            name: "Richmint Product Code",
            selector: (row) => "P-"+row.BatchID,
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => <button className="custom-details-btn">Product Status</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width:"200px"
        },
        // {
        //     selector: (row) => <button className="custom-details-btn" onClick={() => navigate('/factory/BatchProductQr', { state: { BatchID: row.BatchID } })}>Batch Product Qr</button>,
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        //     width: "150px"
        // },
    ];
    useEffect(() => {
        const data = {
            factoryID: "63b2b20d8e21a6111d6b4265"
        }
        dispatch(getBatchTemplate(data))
    }, [])
    const initialBatchTemplatedata = useSelector((state) => state.BatchTemplateRecord);


    useEffect(() => {
        setBatchTemplates(initialBatchTemplatedata.batchTemplateRec.message && initialBatchTemplatedata.batchTemplateRec.message)
        setFilterBatchTemplates(initialBatchTemplatedata.batchTemplateRec.message && initialBatchTemplatedata.batchTemplateRec.message)

        var a = [{ BatchSize: "There are no record to display" }];

        setLoading(true);
        if (
            initialBatchTemplatedata.batchTemplateRec.message != 0 &&
            initialBatchTemplatedata.batchTemplateRec.message != null &&
            initialBatchTemplatedata.batchTemplateRec.message.message != ""
        ) {
            setFilterBatchTemplates(initialBatchTemplatedata.batchTemplateRec.message && initialBatchTemplatedata.batchTemplateRec.message);

        } else {
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
            <FactorySidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-10 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">


                        {/* <MainStatusCard /> */}


                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 mb-16">

                            <div className="flex flex-wrap mt-10">
                                <div className="w-full lg:w-12/12 pl-4 font-light">
                                    <div className="received-part-two report-drop">
                                        <img src={cumulative} />
                                        <select id="colours" className="dd-button">
                                            <option value="red">Cumulative</option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue </option>
                                        </select>
                                    </div>


                                </div>
                                <div className="w-full lg:w-3/12 pr-4 mb-10 font-light top-space">
                                    <ul className="id-batch">
                                        <li>Batch ID  <br /><span>{BatchID && BatchID}</span></li>
                                    </ul>

                                </div>

                                <div className="w-full lg:w-3/12 pr-4 mb-10 font-light top-space">
                                    <ul className="id-batch">
                                        <li>Richmint Batch Code <br /><span>B-{companyBatchID && companyBatchID}</span></li>
                                    </ul>

                                </div>
                                <div className="w-full lg:w-3/12 pr-4 mb-10 font-light top-space">
                                    <ul className="id-batch">
                                        <li>Product Name <br /><span>{productName && productName}</span></li>
                                    </ul>

                                </div>
                                <div className="w-full lg:w-3/12 pr-4 mb-10 font-light top-space">
                                    <div className="right-button-section cust-part2">

                                        <NavLink to="/factory/addBatchTemplate">
                                            <button className="cust-button">Product Sent <span className="batches-sent">55</span></button>
                                        </NavLink>
                                    </div>

                                </div>
                            </div>


                            <DataTable
                                columns={columns}
                                noDataComponent={
                                    <div>
                                        <h4>Loading....</h4>
                                        <img style={{ width: "20px", height: "20px" }}
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
export default BatchSentDetail

