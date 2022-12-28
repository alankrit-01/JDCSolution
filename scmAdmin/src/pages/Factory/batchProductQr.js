import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import ProductQr from "./productQr";

const BatchProductQr = () => {
    const [url, setUrl] = useState(
        `ProductName:${"Lorem Ipsum is simply dummy text of the printing and typesetting."} ProductDescription:${"Lorem Ipsum is simply dummy text of the printing and typesetting."}
        Quantity:${"Lorem Ipsum is simply dummy text of the printing and typesetting"} 
    `);
    const qrRef = useRef();
    const downloadQRCode = (e) => {
        e.preventDefault();
        let canvas = qrRef.current.querySelector("canvas");
        let image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = `scm-batch-detal.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        //setUrl("");
    };
    const qrcode = (
        <QRCodeCanvas id="qrCode"
            value={url}
            size={400}
            bgColor={"#ffffff"}
            imageSettings={{ src: "https://richmint.com/img/navbar-logo.png", excavate: true }}
            includeMargin
            level={"H"}
        />
    );
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
                                <ProductQr/>
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