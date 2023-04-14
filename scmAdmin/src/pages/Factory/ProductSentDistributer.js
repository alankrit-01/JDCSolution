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
import { getBatchByDistributer } from 'Services/action';
import loader from "assets/img/loading.gif";
import cumulative from "assets/img/cumulative.png";
import Icon from "@material-tailwind/react/Icon";

const ProductSentDistributer = () => {
    const factoryData = useSelector((state) => state.FactoryLoginData);
    let batchData = useLocation();
    let distributerID = batchData.state.distributerID;

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [BatchTemplates, setBatchTemplates] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterBatchTemplates, setFilterBatchTemplates] = useState([]);


    const columns = [
       
        {
            name: "Product Name",
            selector: (row) => row.BatchName,
            sortable: true,
        },
        {
            name: "Product Id",
            selector: (row) => row.BatchID,
            sortable: true,
        },
        {
            name: "Richmint Product Code",
            selector: (row) => "P-" + row.CompanyBatchID,
            sortable: true,
        },
        {
            name: "Batch Id",
            selector: (row) => row.BatchID,
            sortable: true,
        },
        {
            name: "Action",
            selector: (row) => <button className="custom-details-btn" onClick={() => navigate('/factory/batchSentDetail', { state: { BatchID: row.BatchID } })}>View Batch</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
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
            factoryID: factoryData.factoryUserId,
            distributerID: distributerID
        }
        dispatch(getBatchByDistributer(data))
    }, [])
    const initialBatchTemplatedata = useSelector((state) => state.BatchSentRecord);



    useEffect(() => {
        setBatchTemplates(initialBatchTemplatedata.batchSentRec.message && initialBatchTemplatedata.batchSentRec.message)
        setFilterBatchTemplates(initialBatchTemplatedata.batchSentRec.message && initialBatchTemplatedata.batchSentRec.message)

        var a = [{ BatchSize: "There are no record to display" }];

        setLoading(true);
        if (
            initialBatchTemplatedata.batchSentRec.message != 0 &&
            initialBatchTemplatedata.batchSentRec.message != null &&
            initialBatchTemplatedata.batchSentRec.message.message != ""
        ) {
            setFilterBatchTemplates(initialBatchTemplatedata.batchSentRec.message && initialBatchTemplatedata.batchSentRec.message);

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
                            <div className="w-full lg:w-1/12"></div>
                                <div className="w-full lg:w-9/12 pr-4 mb-10 font-light back-set-gray">
                                    <div className="background-factory details-background-color">
                                    <h2>Distributor - 1</h2>
                                        <p className="click-open-btn btn-one"> <Icon className="chage-c" name="phone" size="1xl" color="black" />GachiBowli,HYderabad</p>
                                        <p className="click-open-btn btn-one"> <Icon className="chage-c" name="phone" size="1xl" color="black" />+91 6304334373</p>
                                        <p className="click-open-btn btn-one"> <Icon className="chage-c" name="email" size="1xl" color="black" />Factory1@gmail.com</p>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/12 pl-4 font-light">
                                    <div className="received-part-two report-drop">
                                        <img src={cumulative} />
                                        <select id="colours" className="dd-button">
                                            <option value="red">Cumulative</option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue </option>
                                        </select>
                                    </div>

                                    <div className="right-button-section cust-part">

                                    <NavLink to="/factory/addBatchTemplate">
                                        <button className="cust-button">Product Sent <span className="batches-sent">15</span></button>
                                    </NavLink>
                                </div>
                                </div></div>

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
export default ProductSentDistributer

