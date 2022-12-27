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
import { getDistributer } from 'Services/action';


//\/\/\/\/\/\/\/\/-need-improve-/\/\/\/\/\/\/\/\

import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import { ethers } from "ethers";
let supplyChainAddress = '0xD64337aDC5074f7a126d017fe1Cce854aB6F3e3C';


////End need improve////
const AddBatchTemplate = () => {




    ////need improve////

    const [defaultAccount, setDefaultAccount] = useState('');
    const [factoryAddress, setFactoryAddress] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [errorMessage, setErrorMessage] = useState(null)
    const [materiallist, setMateriallist] = useState(null);
    // const [SCContract, setSCContract] = useState();
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [supplychainContract, setsupplychainContract] = useState(null);

    const [batchTemplateId, setBatchTemplateId] = useState(null);


    const factoryData = useSelector((state) => state.FactoryLoginData);

    useEffect(() => {
        setFactoryAddress(factoryData.factoryUserAddress);
    }, [])

    const allsupplymateriallist = [];

    function randomBatchId() {
        let currentTimestamp = Date.now()
        return currentTimestamp;
    }

    useEffect(() => {
        setBatchTemplateId(randomBatchId());
    }, [])


    useEffect(() => {
        connectWalletHandler();

    }, [])


    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    //console.log("helllo then",result)
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');

                })
                .catch(error => {
                    console.log("error", error);
                    setErrorMessage()
                });

        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');

        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        updateEthers();

    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    // listen for account changes
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);


    // listen for account changes
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);

    const updateEthers = async () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let supplychainContract = new ethers.Contract(supplyChainAddress, Supplychain_abi.abi, tempSigner);
        setsupplychainContract(supplychainContract);
    }
    ////End need improve////
    const getProductId = async () => {
        let array = await (supplychainContract && supplychainContract.getAllProductTemplateIDs());
        if (array && array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                let data = await (supplychainContract && supplychainContract.ProductTemplateMAP(array[i]));
                allsupplymateriallist.push(
                    <>
                        <option value={data.productTemplateID}>{data.productTemplateID}</option>
                    </>
                )
            }
        }
        setMateriallist(allsupplymateriallist);
    }

    useMemo(() => {
        getProductId();
    }, [supplychainContract])


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    const [distributer, setDistributer] = useState('');

    
    const [batchSize, setBatchSize] = useState('');
    const [batchDescription, setBatchDescription] = useState('');
    const [batchManufacture, setBatchManufacture] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("productId productId", productId)
        const tx = await supplychainContract.addBatchTemplate(defaultAccount,distributer, batchSize, batchTemplateId.toString(), productId.toString(),factoryAddress,factoryAddress, batchManufacture);
        if (tx) {
            navigate("/factory/batchTemplate")
        }
    }

    useEffect(() => {
        dispatch(getDistributer())
    }, [])

    const distributerdata = useSelector((state) => state.DistributerRecord);

    let distributerdatarec = distributerdata.distributerRec

    const distributerlist = [];
    if (distributerdatarec && distributerdatarec.length > 0) {
        for (let i = 0; i < distributerdatarec.length; i++) {
            distributerlist.push(
                <>
                    <option value={distributerdatarec[i].hashAddress}>{distributerdatarec[i].name}</option>
                </>
            )
        }
    }

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
                                            <h2 className="text-white text-2xl">Add Batch </h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex flex-wrap mt-10">
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Product Template ID</b></span>
                                                    <select id="productId" name="productId" color="purple" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" onChange={(e) => setProductId(e.target.value)}>
                                                        <option selected>Choose a Product Template Id</option>
                                                        {materiallist}
                                                    </select>

                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Batch Size</b></span>
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        name="batchSize"
                                                        value={batchSize} onChange={(e) => setBatchSize(e.target.value)}
                                                    />
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Batch Description</b></span>
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        name="batchDescription"
                                                        value={batchDescription} onChange={(e) => setBatchDescription(e.target.value)}
                                                    />
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Select Distributer</b></span>
                                                    <select id="distributer" name="distributer" color="purple" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" onChange={(e) => setDistributer(e.target.value)}>
                                                        <option selected>Choose a Distributer </option>
                                                        {distributerlist}
                                                    </select>
                                                </div>
                                                <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Manufacture Date</b></span>
                                                    <Input type="date" color="purple" value={batchManufacture} onChange={(e) => setBatchManufacture(e.target.value)} required />
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
export default AddBatchTemplate