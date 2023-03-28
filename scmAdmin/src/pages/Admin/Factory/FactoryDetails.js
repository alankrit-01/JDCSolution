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
const FactoryDetails = () => {
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
                                    <h2 className="head-cust-color">Add New Factory</h2>
                                </div>
                                <Card className="background-gray rounded-none">
                                    <CardBody>
                                        <form className="custom-form" onSubmit={handleSubmit}>
                                            <div className="flex flex-wrap mt-10">
                                                <div className="w-full lg:w-12/12 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="Name"
                                                        name="name"
                                                        value={name} onChange={(e) => setName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="Phone No."
                                                        name="phone"
                                                        value={phone} onChange={(e) => setPhone(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <Input
                                                        type="email"
                                                        color="white"
                                                        placeholder="Email Address"
                                                        name="email"
                                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                
                                                <div className="w-full lg:w-8/12 pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="Address"
                                                        name="address"
                                                        value={address} onChange={(e) => setAddress(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="City"
                                                        name="city"
                                                        value={city} onChange={(e) => setCity(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="State"
                                                        name="State"
                                                        value={city} onChange={(e) => setCity(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-4/12 pl-4 pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="Pincode"
                                                        name="city"
                                                        value={city} onChange={(e) => setCity(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="Country"
                                                        name="country"
                                                        value={country} onChange={(e) => setCountry(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="Latitude: 17.3850 N"
                                                        name="latitude"
                                                        value={latitude} onChange={(e) => setLatitude(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="Longitude: 78.4867 E"
                                                        name="longitude"
                                                        value={longitude} onChange={(e) => setLongitude(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-2/12 pl-4 mb-10 font-light"></div>
                                                <div className="w-full lg:w-8/12 pr-4 pl-4 mb-10 font-light custom-background">
                                                    <Input
                                                        type="text"
                                                        color="white"
                                                        placeholder="Location Url"
                                                        name="longitude"
                                                        value={longitude} onChange={(e) => setLongitude(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light btn-w-full">
                                                    <Button className="form-button " type="submit">Submit</Button>
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
export default FactoryDetails