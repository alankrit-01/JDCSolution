import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import { storeFactory } from "Services/action";
import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cumulative from "assets/img/cumulative.png";
const RetailerDetails = () => {
    const dataFetchedRef = useRef(false);
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [emailError, setemailError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        { email == '' ? setemailError("Email is required") : (emailRegex.test(email) === false ? setemailError("Invalid Email") : setemailError(true)) }
    }

    useMemo(() => {
        const data = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            role: "Factory",
            city: city,
            country: country,
            latitude: latitude,
            longitude: longitude,
            adminId: adminUserId,
        }
        if (emailError == true) {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            dispatch(storeFactory(data))
        }
    }, [emailError])


    const initialFactoryStoredata = useSelector((state) => state.FactoryStoreData);

    useMemo(() => {
        if (initialFactoryStoredata.success == true) {
            navigate('/admin/factory')
        }
    }, [initialFactoryStoredata])

    return (
        <>
            <Sidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        {/* <MainStatusCard /> */}
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 xl:grid-cols-6">
                            <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                                <div>
                                    <h2 className="head-cust-color">Retailer -  Beta Details</h2>
                                    
                                </div>
                               
                                            <div className="flex flex-wrap mt-5">
                                                
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                <ul className="factory-beta">
                                        <li className="factory-bg">Retailer Name  <span>: Beta</span></li>
                                        <li className="factory-bg2">Email <span>: beta@gmail.com</span></li>
                                        <li className="factory-bg">Phone No  <span className="space-l">: +91 9304334373</span></li>
                                        <li className="factory-bg2">PIN  <span className="space-l2 ">: 600012</span></li>
                                        <li className="main-details"> 
                                        <li className="factory-bg3">City : Chennai</li>
                                        <li className="factory-bg4">State: Tamilnadu</li></li>
                                        <li className="main-details"> 
                                        <li className="factory-bg5">Latitude  <span>13.0827' N</span></li>
                                        <li className="factory-bg6">Longitude <span> 80.2707' E</span></li></li>
                                        <li className="factory-bg7">Wallet address  <span className="space-l2 ">: 0x9bc444fc09f366adO9b668f4a73b639c</span></li>
                                    </ul>
                                    <div className="button-buttom-part">
                                    <label class="dropdown">

  <div class="dd-button">
  <img src={cumulative} /> Cumulative
  </div>

  <input type="checkbox" class="dd-input" id="test" />

  <ul class="dd-menu">
    <li>Action</li>
    <li>Another action</li>
    <li>Something else here</li>    
  </ul>
  
</label>

<label class="dropdown bottom-dropdown-set">

<div class="dd-button">
Eye Liner
</div>

<input type="checkbox" class="dd-input" id="test" />

<ul class="dd-menu">
  <li>Action</li>
  <li>Another action</li>
  <li>Something else here</li>    
</ul>

</label>
</div>

<div className="liner-part">
   <p>Batches sent</p>
   <p><span className="bg-span-part"> </span>  <span className="bg-span-part2"> 50</span></p>

   <p>Products Sent</p>
   <p><span className="bg-span-part3"> </span>  <span className="bg-span-part4"> 200</span></p>
</div>

                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light self">
                                                  <h3>Products Sent</h3>
                                                </div>
                                            </div>
                                            
                                    
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default RetailerDetails