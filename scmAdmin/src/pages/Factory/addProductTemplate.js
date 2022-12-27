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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeProductTemplate } from "Services/action";

////need improve////
import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import { ethers } from "ethers";
let supplyChainAddress = '0x9fB784B725a2EB089A97f8c86c4f352F9c1bD2B9';
////End need improve////

const AddProductTemplate = () => {


    ////need improve////

    const [productId, setProductId] = useState(null);

    const [defaultAccount, setDefaultAccount] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [errorMessage, setErrorMessage] = useState(null)

    // const [SCContract, setSCContract] = useState();
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [supplychainContract, setsupplychainContract] = useState(null);


    function randomProductId() {
        let currentTimestamp = Date.now()
        return currentTimestamp;
    }

    useEffect(() => {
        setProductId(randomProductId());
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

        //localStorage.setItem('currentFactoryUserHash', newAccount);
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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [additionalInformation, setAdditionalInformation] = useState('');
    const [productExpDate, setProductExpDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const tx = await supplychainContract.addProductTemplate(productId.toString(), productName, productDescription);
        if (tx) {
            navigate("/factory/productTemplate")
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
                                            <h2 className="text-white text-2xl">Add Product Template</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex flex-wrap mt-10">
                                                {/* <div className="w-full pr-4 font-light">
                                                    <span><b>Products ID</b></span>
                                                    <Input
                                                        type="hidden"
                                                        color="purple"
                                                        name="productId"
                                                        value={productId}
                                                        required
                                                    />
                                                </div> */}
                                                {/* <Input
                                                        type="hidden"
                                                        // color="purple"
                                                        name="productId"
                                                        value={productId}
                                                        required
                                                    /> */}
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
                                                {/* <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Product Qty</b></span>
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        name="productQty"
                                                        value={productQty} onChange={(e) => setProductQty(e.target.value)}
                                                        required
                                                    />
                                                </div> */}
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

                                                {/* <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Additional Information</b></span>
                                                    <Textarea
                                                        type="text"
                                                        color="purple"
                                                        name="additionalInformation"
                                                        value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)}
                                                        required
                                                    />
                                                </div> */}

                                                {/* <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Manufacture Date</b></span>
                                                    <Input type="date" color="purple" required />
                                                </div> */}
                                                {/* <div className="w-screen flex flex-wrap mt-10 font-light">
                                                    <span><b>Expiry Date</b></span>
                                                    <Input
                                                        type="date"
                                                        color="purple"
                                                        name="productExpDate"
                                                        value={productExpDate} onChange={(e) => setProductExpDate(e.target.value)}
                                                        required
                                                    />
                                                </div> */}
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