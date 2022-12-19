import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeProductTemplate } from "Services/action";
const AddProductTemplate = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [additionalInformation, setAdditionalInformation] = useState('');
    const [productExpDate, setProductExpDate] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        // const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const data = {
            productId:productId,
            productName:productName,
            productQty: productQty,
            productDescription:productDescription,
            additionalInformation:additionalInformation,
            productExpDate:productExpDate,
        }
        console.log("data data data", data)

        dispatch(storeProductTemplate(data))
    }

    // useMemo(() => {
    //     const data = {
    //         productId:productId,
    //         productName:productName,
    //         productQty: productQty,
    //         productDescription:productDescription,
    //         additionalInformation:additionalInformation,
    //         productExpDate:productExpDate,
    //     }
    //     if (!!productName) {
    //         console.log("data data data", data)
    //         //dispatch(storeDistributer(data))
    //     }
    // }, [productName])

    return (
        <>
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
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                                <Card>
                                    <CardHeader color="purple" contentPosition="none">
                                        <div className="w-full flex items-center justify-between">
                                            <h2 className="text-white text-2xl">Add Product Template</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex flex-wrap mt-10">
                                            <div className="w-full pr-4 font-light">
                                                    <span><b>Products ID</b></span>
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        name="productId"
                                                        value={productId} onChange={(e) => setProductId(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Products Title</b></span>
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        name="productName"
                                                        value={productName} onChange={(e) => setProductName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Product Qty</b></span>
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        name="productQty"
                                                        value={productQty} onChange={(e) => setProductQty(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Product Description</b></span>
                                                    <Textarea
                                                        type="text"
                                                        color="purple"
                                                        name="productDescription"
                                                        value={productDescription} onChange={(e) => setProductDescription(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Additional Information</b></span>
                                                    <Textarea
                                                        type="text"
                                                        color="purple"
                                                        name="additionalInformation"
                                                        value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                {/* <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Manufacture Date</b></span>
                                                    <Input type="date" color="purple" required />
                                                </div> */}
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Expiry Date</b></span>
                                                    <Input
                                                        type="date"
                                                        color="purple"
                                                        name="productExpDate"
                                                        value={productExpDate} onChange={(e) => setProductExpDate(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mt-10">
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <Button type="submit">Submit</Button>
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