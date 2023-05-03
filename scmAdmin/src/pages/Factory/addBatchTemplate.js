import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDistributer, getProductTemplate, storeBatchTemplate } from 'Services/action';
import Papa from 'papaparse';
import Select from "react-select";
const AddBatchTemplate = () => {
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedDistributer, setSelectedDistributer] = useState();

    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [factoryUserLocation, setFactoryUserLocation] = useState(factoryData.factoryUserAddress);
    const [factoryUserId, setFactoryUserId] = useState(factoryData.factoryUserId);
    useEffect(() => {
        const data = {
            factoryID: factoryUserId
        }
        dispatch(getProductTemplate(data))
    }, [])

    const initialProductTemplatedata = useSelector((state) => state.ProductTemplateRecord.productTemplateRec);
    const allProductTemplatedata = initialProductTemplatedata.message;


    const [batchTemplateId, setBatchTemplateId] = useState(null);
    const [materialtype, setMaterialtype] = useState('');
    const [productIdsData, setproductIdsData] = useState('');

    function randomBatchId() {
        let currentTimestamp = Date.now()
        return currentTimestamp;
    }

    useEffect(() => {
        setBatchTemplateId(randomBatchId());
    }, [])

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    const [distributer, setDistributer] = useState('');
    const [batchSize, setBatchSize] = useState('');
    const [batchDescription, setBatchDescription] = useState('');
    const [companyBatchID, setCompanyBatchID] = useState('');
    const batchManufacture = new Date().toLocaleString();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const productIds = [];
        const companyProductIDs = [];


        let batchSizeData = '';

        if (materialtype == 'csv') {

            batchSizeData = values.length

            for (let i = 0; i < values.length; i++) {

                let arr = parseInt(values[i])
                companyProductIDs.push(arr)
                productIds.push(
                    batchTemplateId + i
                )
            }


        } else {
            for (let i = 1; i <= batchSize; i++) {
                productIds.push(
                    batchTemplateId + i
                )
                companyProductIDs.push(0)
            }
            batchSizeData = batchSize
        }
        const data = {
            batchID: batchTemplateId.toString(),
            companyBatchID: companyBatchID,
            productIDs: productIds,
            companyProductIDs: companyProductIDs,
            batchSize: batchSizeData,
            batchName:selectedProduct.Name.toString(),
            batchDescription: batchDescription,
            productTemplateID: selectedProduct.ProductTemplateID.toString(),
            factoryID: factoryUserId,
            distributorID: selectedDistributer._id.toString(),
            distributorName: selectedDistributer.name,
            factoryLocation: factoryUserLocation,
            dateOfProduction: batchManufacture
        }
        dispatch(storeBatchTemplate(data))
    }
 
    const initialBatchTemplateStoredata = useSelector((state) => state.StoreBatchTemplateData);
    useMemo(() => {
        if (initialBatchTemplateStoredata.success == true) {
            navigate('/factory/batchTemplate')
        }
    }, [initialBatchTemplateStoredata])

    useEffect(() => {
        dispatch(getDistributer())
    }, [])

    const distributerdata = useSelector((state) => state.DistributerRecord);
    let distributerdatarec = distributerdata.distributerRec

    const [parsedData, setParsedData] = useState([]);
    //State to store the values
    const [values, setValues] = useState([]);


    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const valuesArray = [];
                results.data.map((d) => {
                    valuesArray.push(Object.values(d).toString());
                });
                setParsedData(results.data);
                setValues(valuesArray);
            },
        });
    };

    function selectDistibuter(data) {
        setSelectedDistributer(data);
    }
    function selectProductTem(data) {
        setSelectedProduct(data);
    }

    return (
        <>
            <FactorySidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5">
                            {/* <MainStatusCard /> */}
                        </div>
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                            <div>
                                    <h2 className="head-cust-color">Send Batch</h2>
                                </div>

                                <Card  className="background-gray rounded-none">
                                    <CardBody>

                                        {materialtype == 'csv' ? (<span>Total Product Id : {values.length}</span>) : ('')}
                                        {productIdsData}
                                        <form onSubmit={handleSubmit}  className="custom-form">
                                            <div className="flex flex-wrap mt-10">
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Company Batch ID"
                                                        name="companyBatchID"
                                                        required
                                                        value={companyBatchID} onChange={(e) => setCompanyBatchID(e.target.value)}
                                                    />
                                                </div>
                                                 <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <Select
                                                        id="productId"
                                                        name="productId"
                                                        color="purple"
                                                        className="block border-gray-part py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer border_two2"
                                                        options={allProductTemplatedata}
                                                        placeholder="Choose a Product Template Id"
                                                        value={selectedProduct}
                                                        onChange={selectProductTem}
                                                        isSearchable={true}
                                                        getOptionValue={(option) => option.ProductTemplateID}
                                                        getOptionLabel={(option) => `${option.ProductTemplateID} - ${option.Name}`}
                                                        required
                                                    />
                                                    {/* <select id="productId" name="productId" color="purple" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" onChange={(e) => setProductId(e.target.value)}>
                                                        <option selected>Choose a Product Template Id</option>
                                                        {
                                                            allProductTemplatedata && allProductTemplatedata.map((allProductTemplateRec) =>
                                                                <option value={allProductTemplateRec.ProductTemplateID}>
                                                                    {allProductTemplateRec.ProductTemplateID} - {allProductTemplateRec.Name}
                                                                </option>
                                                            )
                                                        }
                                                    </select> */}
                                                </div>
                                               
                                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">

                                                    <select id="productType" name="productType" color="purple" required class="block border-gray-part border_two py-2.5 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" defaultValue={materialtype} onChange={(e) => setMaterialtype(e.target.value)}>
                                                         <option selected>Select Product Id</option> 
                                                        <option value={'Auto'} selected>Auto Generate</option>
                                                        <option value={'csv'}>Import Product CSV</option>
                                                    </select>
                                                </div>

                                                {materialtype == 'csv' ? (
                                                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                            <Input
                                                                type="file"
                                                                name="file"
                                                                accept=".csv"
                                                                onChange={changeHandler}
                                                                style={{ display: "block", margin: "10px auto" }}
                                                                required
                                                            />
                                                        </div>
                                                ) : (
                                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                        <Input
                                                            type="text"
                                                            color="purple"
                                                            placeholder="Batch Size"
                                                            name="batchSize"
                                                            value={batchSize} onChange={(e) => setBatchSize(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                )}
                                                <div className="w-full lg:w-12/12 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Batch Description"
                                                        name="batchDescription"
                                                        value={batchDescription} onChange={(e) => setBatchDescription(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 mb-10 font-light  drop-set">

                                                    <Select
                                                        id="distributer"
                                                        name="distributer"
                                                        color="purple"
                                                        className="block border-gray-part py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer border_two2"
                                                        options={distributerdatarec}
                                                        placeholder="Select a Distributer"
                                                        value={selectedDistributer}
                                                        onChange={selectDistibuter}
                                                        getOptionValue={(option) => option._id.toString()}
                                                        getOptionLabel={(option) => `${option.name}`}
                                                        isSearchable={true}
                                                        required
                                                    />
                                                </div>

                                            </div>
                                            <div className="flex mt-10">
                                                <div className="w-full lg:w-10/12 pr-4 mb-10 font-light">
                                                    <Button  className="form-button" type="submit">Submit</Button>
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
export default AddBatchTemplate