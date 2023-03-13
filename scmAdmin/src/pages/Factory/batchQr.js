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
    let companybatchtId = batchData.state.BatchID;
    const [batchSize, setBatchSize] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');

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
            <div className="md:ml-32">
                <div className="pt-14 pb-28 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5">
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
                                    <div className="batchqrCodeSection">
                                        <span className="sidercheckbatch">S-{companybatchtId && companybatchtId}</span>
                                        <div className="mainBatch" ref={qrRef}>
                                            {qrcode}
                                            <span className="mainBatchNumber">B-{batchtId && batchtId}</span>
                                        </div>
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