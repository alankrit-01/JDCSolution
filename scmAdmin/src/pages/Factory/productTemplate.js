import MainStatusCard from 'components/Factory/MainStatusCard';
import FactorySidebar from 'components/Factory/Sidebar';
import Footer from 'components/Factory/Footer';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProductTemplate, checkProductTemplateSuccessdata, resetProductTemplateData } from 'Services/action';

import { useDispatch, useSelector } from 'react-redux';
import loader from "assets/img/loading.gif";

const ProductTemplate = () => {
    const navigate = useNavigate();
    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [factoryUserId, setFactoryUserId] = useState(factoryData.factoryUserId);
    const [loading, setLoading] = useState(false);

    const successNotify = () => toast.success('Product Template Added Successfully !.', {
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

    const [ProductTemplates, setProductTemplates] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterProductTemplates, setFilterProductTemplates] = useState([]);
    const columns = [
        {
            name: "	Product Template ID",
            selector: (row) => row.ProductTemplateID,
            sortable: false,
        },
        {
            name: "Product Name",
            selector: (row) => row.Name,
            sortable: false,
        },
        {
            name: "Product Description",
            selector: (row) => row.Description,
            sortable: false,
        },
    ];
    useEffect(() => {
        const data = {
            factoryID: factoryUserId
        }
        dispatch(getProductTemplate(data))
        dispatch(resetProductTemplateData())
    }, [])
    const initialProductTemplatedata = useSelector((state) => state.ProductTemplateRecord);
    const initialProductTemplateStoredata = useSelector((state) => state.StoreProductTemplateData);
    useEffect(() => {
        if (initialProductTemplateStoredata?.success) {
            successNotify();
        }
    }, [initialProductTemplateStoredata])


    useEffect(() => {
        setProductTemplates(initialProductTemplatedata.productTemplateRec.message && initialProductTemplatedata.productTemplateRec.message)
        // setFilterProductTemplates(initialProductTemplatedata.productTemplateRec.message && initialProductTemplatedata.productTemplateRec.message)

        var a = [{ Name: "There are no record to display" }];

        setLoading(true);
        if (
            initialProductTemplatedata.productTemplateRec.message != 0 &&
            initialProductTemplatedata.productTemplateRec.message != null &&
            initialProductTemplatedata.productTemplateRec.message != ""
        ) {
            setFilterProductTemplates(initialProductTemplatedata.productTemplateRec.message && initialProductTemplatedata.productTemplateRec.message);

        } else {
            setLoading(false);

            setFilterProductTemplates(a);
        }
    }, [initialProductTemplatedata])
    useEffect(() => {
        const result = ProductTemplates.filter((allProductTemplate) => {
            return allProductTemplate.Name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterProductTemplates(result)
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
                                    <h2 className="head-cust-color">Product List</h2>
                                </div>
                                <div>
                                    <input type="text" className="cust-input" placeholder="Search" value={Search}
                                        onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                <div className="right-button-section">
                                    <NavLink to="/factory/addProductTemplate">
                                        <button className="cust-button change-add"> <span className="dash-bg">+</span> ADD PRODUCT</button>
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
                                data={FilterProductTemplates}
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
export default ProductTemplate

