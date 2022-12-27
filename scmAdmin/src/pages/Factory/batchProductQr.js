import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

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
        anchor.download = `scm-product-detal.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        //setUrl("");
    };
    const qrCodeEncoder = (e) => {
        //setUrl(e.target.value);

        const productCompleteRecord = [];

        productCompleteRecord.push(
            <><table>
                <tr>
                    <th>Batch ID</th>
                    <th>Raw Material Supplier</th>
                    <th>Warehouse</th>
                    <th>Material Type</th>
                    <th>Yarn Quantity</th>
                    <th>Yarn Color</th>
                    <th>Yarn Type</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </table></>
        )
        //setUrl(productCompleteRecord)
    };


    const qrcode = (
        <QRCodeCanvas id="qrCode" value={url} size={400} bgColor={"#ffffff"} // fgColor={"#7f0000"}
            imageSettings={{ src: "https://richmint.com/full-logo-size_00dc00340_46620.png", excavate: true }}
            includeMargin
            level={"H"}
        />
    );


    // const qrcode = (
    //     <QRCodeCanvas
    //         id="qrCode"
    //         value={url}
    //         size={300}
    //         bgColor={"#ffffff"}
    //         level={"H"}
    //     />
    // );
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

                                <div className="bottom">
                                    <div className="right" style={{ textAlign: "center" }}>
                                        <div className="qrcode__container">
                                            <div ref={qrRef}>{qrcode}</div>
                                            <div className="input__group">
                                                <form onSubmit={downloadQRCode}>
                                                    {/* <label>Enter URL</label>
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={qrCodeEncoder}
                                        placeholder="https://hackernoon.com"
                                    /> */}
                                                    <button type="submit" >Download QR code</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <div className="new">
                <div className="newContainer">
                    <div className="top">
                        <h4>Check Product Authentication</h4>
                    </div>

                </div>
            </div>
        </>
    );
};
export default BatchProductQr;