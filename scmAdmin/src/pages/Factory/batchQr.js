import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
// import Supplychain_abi from '../../artifacts/contracts/Supplychain.sol/Supplychain.json';
import { ethers } from "ethers";
import { Button } from "@material-tailwind/react";
let supplyChainAddress = '0xFd0C39B94CF349a1f72B9D1510a94EBFF8E4D128';
const BatchQr = () => {

    let batchData = useLocation();
    let batchtId = batchData.state.BatchID;
    const [batchSize, setBatchSize] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    ////need improve////
    const [defaultAccount, setDefaultAccount] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [errorMessage, setErrorMessage] = useState(null)
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [supplychainContract, setsupplychainContract] = useState('');
    // useEffect(() => {
    //     connectWalletHandler();
    // }, [])
    // const connectWalletHandler = () => {
    //     if (window.ethereum && window.ethereum.isMetaMask) {
    //         window.ethereum.request({ method: 'eth_requestAccounts' })
    //             .then(result => {
    //                 accountChangedHandler(result[0]);
    //                 setConnButtonText('Wallet Connected');
    //             })
    //             .catch(error => {
    //                 console.log("error", error);
    //                 setErrorMessage()
    //             });
    //     } else {
    //         console.log('Need to install MetaMask');
    //         setErrorMessage('Please install MetaMask browser extension to interact');

    //     }
    // }

    // const accountChangedHandler = (newAccount) => {
    //     setDefaultAccount(newAccount);
    //     updateEthers();
    // }
    // const chainChangedHandler = () => {
    //     window.location.reload();
    // }
    // listen for account changes
    // window.ethereum.on('accountsChanged', accountChangedHandler);
    // window.ethereum.on('chainChanged', chainChangedHandler);
    // useEffect(() => {
    //     updateEthers()
    // }, [])
    // const updateEthers = async () => {
    //     let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    //     setProvider(tempProvider);
    //     let tempSigner = tempProvider.getSigner();
    //     setSigner(tempSigner);
    //     let supplychainContract = new ethers.Contract(supplyChainAddress, Supplychain_abi.abi, tempSigner);
    //     //console.log("Ether updates", supplychainContract)
    //     setsupplychainContract(supplychainContract);
    // }
    
    ////End need improve////
    const [url1, setUrl1] = useState();
    useMemo(() => {
        const url = (`${batchtId}`);
        setUrl1(url)
    }, [productName, productDescription, batchSize])

    const qrRef = useRef();
    const qrcode = (
        <QRCodeSVG id="qrCode"
            value={url1 && url1}
            size={400}
            bgColor={"#ffffff"}
            imageSettings={{ src: "https://richmint.com/img/navbar-logo.png", excavate: true }}
            includeMargin
            level={"H"}
        />
    );
    const Print = () => {
        let printContents = document.getElementById('qrcode__container').innerHTML;
        var winPrint = window.open();
        winPrint.document.write('<title>Richmint Product Authentication</title><br />', printContents);
        winPrint.document.close();
        winPrint.focus();
        winPrint.print();
        winPrint.close();
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
                                <div>
                                    <Button type="button" onClick={Print} > Print</Button>
                                </div>
                                <div id="qrcode__container" className="qrcode__container">
                                    <div className="mainBatch" ref={qrRef}>
                                        {qrcode}
                                        <span className="mainBatchNumber">B-{batchtId && batchtId}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                <Footer />
            </div>
        </>
    );
};
export default BatchQr;