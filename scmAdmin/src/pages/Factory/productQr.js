import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const ProductQr = () => {
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
            <div className="qrcode__container">
                <div ref={qrRef}>{qrcode}</div>
                <div className="input__group">
                    <form onSubmit={downloadQRCode}>
                        <button type="submit" >Download QR code</button>
                    </form>
                </div>
            </div>

        </>
    );
};
export default ProductQr;