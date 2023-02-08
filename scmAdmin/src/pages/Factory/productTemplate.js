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
import { getProductTemplate, checkProductTemplateSuccessdata } from 'Services/action';

import { useDispatch, useSelector } from 'react-redux';

const ProductTemplate = () => {
    const navigate = useNavigate();
    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [factoryUserHash, setFactoryUserHash] = useState(factoryData.currentFactoryUserHash);


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
            sortable: true,
        },
        {
            name: "Product Name",
            selector: (row) => row.Name,
            sortable: true,
        },
        {
            name: "Product Description",
            selector: (row) => row.Description,
            sortable: true,
        },
    ];
    useEffect(() => {
        const data = {
            factoryID:factoryUserHash
        }
        dispatch(getProductTemplate(data))
    }, [])
    const initialProductTemplatedata = useSelector((state) => state.ProductTemplateRecord);
    const initialProductTemplateStoredata = useSelector((state) => state.StoreProductTemplateData);

    useMemo(() => {
        if (initialProductTemplateStoredata.success == true) {
            successNotify();
        }
    }, [initialProductTemplateStoredata])
    useEffect(() => {
        setProductTemplates(initialProductTemplatedata.productTemplateRec.message)
        setFilterProductTemplates(initialProductTemplatedata.productTemplateRec.message)
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
                                title="Product Template List"
                                columns={columns}
                                data={FilterProductTemplates}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                                actions={<NavLink
                                    to="/factory/addProductTemplate"><Button>Add</Button></NavLink>}
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
export default ProductTemplate

