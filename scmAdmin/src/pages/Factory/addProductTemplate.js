import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeProductTemplate  } from "Services/action";
import arrow from "assets/img/arrow-icon.png";

const AddProductTemplate = () => {
    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [productId, setProductId] = useState(null);
    const [productNameError, setproductNameError] = useState('');
    const [productDescriptionError, setproductDescriptionError] = useState('')
    const [factoryUserId, setFactoryUserId] = useState(factoryData.factoryUserId);

    function randomProductId() {
        let currentTimestamp = Date.now()
        return currentTimestamp;
    }

    useEffect(() => {
        setProductId(randomProductId());
    }, [])

    ////End need improve////

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const productNameRegex = /^[a-zA-Z ]+$/;
        const productDescriptionRegex = /^[a-zA-Z ]+$/;

        { productName == '' ? setproductNameError("Product Name is required") : (productNameRegex.test(productName) === false ? setproductNameError("Invalid Product Name") : setproductNameError(true)) }
        { productDescription == '' ? setproductDescriptionError("Product Name is required") : (productDescriptionRegex.test(productDescription) === false ? setproductDescriptionError("Invalid Product Description") : setproductDescriptionError(true)) }
    }

    useMemo(() => {
        const data = {
            productTemplateID: productId,
            productName: productName,
            productDescription: productDescription,
            factoryID: factoryUserId
        }
        if (productNameError == true && productDescriptionError == true) {
            dispatch(storeProductTemplate(data))
        }
    }, [productNameError, productDescriptionError])

    const initialProductTemplateStoredata = useSelector((state) => state.StoreProductTemplateData);
console.log("initialProductTemplateStoredata",initialProductTemplateStoredata)
    useEffect(() => {
        if (initialProductTemplateStoredata?.success) {
            navigate('/factory/productTemplate')
        }
    }, [initialProductTemplateStoredata])
    return ( 
        <>
            <FactorySidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        {/* <MainStatusCard /> */}
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                                <div>
                                    <h2 className="head-cust-color">Add Product</h2>
                                </div>
                                <Card className="background-gray rounded-none">
                                    <CardBody>
                                        <form onSubmit={handleSubmit} className="custom-form">
                                            <div className="flex flex-wrap mt-10">
                                                <div className="w-full lg:w-12/12 mb-10 font-light">
                                                    <div className="w-full lg:w-12/12 mb-10 font-light">
                                                        {/* <span><b>Products Title</b></span> */}
                                                        <Input
                                                            type="text"
                                                            color="purple"
                                                            placeholder="Product Name"
                                                            name="productName"
                                                            value={productName} onChange={(e) => setProductName(e.target.value)}
                                                            required
                                                        />
                                                        <span className="error">{productNameError}</span>
                                                    </div>
                                                    <div className="w-full lg:w-12/12 mb-10 font-light text-area-set">
                                                        {/* <span><b>Product Description</b></span> */}
                                                        <Textarea
                                                            type="text"
                                                            color="purple"
                                                            placeholder="Product Description"
                                                            name="productDescription"
                                                            value={productDescription} onChange={(e) => setProductDescription(e.target.value)}
                                                            required
                                                        />
                                                        <span>{productDescriptionError}</span>
                                                    </div>

                                                </div>
                                                <div className="flex mt-10 submit-button-factory">
                                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light btn-w-full">
                                                        <Button className="form-button" type="submit">Submit</Button>
                                                    </div>

                                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light btn-w-full">
                                                        <Button className="form-button send-batch-part" type="submit">Proceed To Send Batch <img className="arrow-image" src={arrow} /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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
export default AddProductTemplate