import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import { storeRetailer } from "Services/action";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddRetailer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hashAddress, setHashAddress] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
            hashAddress:hashAddress,
            name:name,
            email: email,
            address:address,
            role:"Retailer",
            city:city,
            country:country,
            latitude:latitude,
            longitude:longitude,
        }
        if (emailError == true) {
            dispatch(storeRetailer(data))
        }
    }, [emailError])

    return (
        <>
            <Sidebar />
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
                                            <h2 className="text-white text-2xl">Add Retailer</h2>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap mt-10">
                                                <div className="w-full pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Hash Address"
                                                        name="hashAddress"
                                                        value={hashAddress} onChange={(e) => setHashAddress(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pr-4 mb-10">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Name"
                                                        name="name"
                                                        value={name} onChange={(e) => setName(e.target.value)}
                                                        required
                                                        
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <Input
                                                        type="email"
                                                        color="purple"
                                                        placeholder="Email Address"
                                                        name="email"
                                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-12/12 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Address"
                                                        name="address"
                                                        value={address} onChange={(e) => setAddress(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="City"
                                                        name="city"
                                                        value={city} onChange={(e) => setCity(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 px-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Country"
                                                        name="country"
                                                        value={country} onChange={(e) => setCountry(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Latitude"
                                                        name="latitude"
                                                        value={latitude} onChange={(e) => setLatitude(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <Input
                                                        type="text"
                                                        color="purple"
                                                        placeholder="Longitude"
                                                        name="longitude"
                                                        value={longitude} onChange={(e) => setLongitude(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex">
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
export default AddRetailer