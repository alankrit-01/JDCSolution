import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@material-tailwind/react";
import { getBatchDetail } from 'Services/action';

const BatchProductQr = () => {
    const dispatch = useDispatch();
    const [batchSize, setBatchSize] = useState('');
    const [productIdsRec, setProductIdsRec] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productTemplateID, setProductTemplateID] = useState('');
    const [batchDescription, setBatchDescription] = useState('');
    const [initialProductInfo, setInitialProductInfo] = useState('');


    let batchData = useLocation();
    let batchID = batchData.state.BatchID;

    useEffect(() => {
        const data = {
            batchID: batchID
        }
        dispatch(getBatchDetail(data))
    }, [])
    const initialBatchDetaildata = useSelector((state) => state.BatchDetailRecord.batchDetailRec.message);
    useMemo(() => {
        setProductTemplateID(initialBatchDetaildata && initialBatchDetaildata[0].ProductTemplateID);
        setBatchSize(initialBatchDetaildata && initialBatchDetaildata[0].BatchSize);
        setBatchDescription(initialBatchDetaildata && initialBatchDetaildata[0].BatchDescription);
        setInitialProductInfo(initialBatchDetaildata && initialBatchDetaildata[1].productInfo);

    }, [initialBatchDetaildata])

    const allProductQrlist = [];
    const qrRef = useRef();
    console.log("initialProductInfo", initialProductInfo)
    {
        initialProductInfo && initialProductInfo.map(initialProductInfoRes => {

            // const urlc = (
            //     `batchId:${batchID} 
            //     productId:${initialProductInfoRes.ProductID } 
            //     productTemplateID:${productTemplateID} 
            //     batchSize:${batchSize} 
            //     batchDescription:${batchDescription }
            // `);

            const urlc = (`${initialProductInfoRes.ProductID}`);
            let sidecheck = '';
            if(initialProductInfoRes.CompanyProductID !== 0){
                let serialtext = "S";
                let serialnbr = initialProductInfoRes.CompanyProductID;
                 sidecheck = serialtext + serialnbr;
                
            }
            allProductQrlist.push(
                <div className="qrCodeSection">
                    <span className="sidercheck">{sidecheck}</span>
                    <QRCodeSVG className="qrCode"
                        value={urlc}
                        size={280}
                        bgColor={"#ffffff"}
                        imageSettings={{ src: "https://richmint.com/img/navbar-logo.png", excavate: true }}
                        includeMargin
                        level={"H"}
                    />
                    <span className="rcheckRec">P-{initialProductInfoRes.ProductID}</span>
                </div>

            )
        }
        )
    }
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
                                    <div ref={qrRef}>{allProductQrlist}</div>
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
export default BatchProductQr;