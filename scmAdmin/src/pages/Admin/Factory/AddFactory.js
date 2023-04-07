import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import { storeFactory, resetFactoryData } from "Services/action";
import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const AddFactory = () => {
    const dataFetchedRef = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const errorNotify = () =>
    toast.error("Email Already Exist!.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        dispatch(resetFactoryData())
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        dispatch(storeFactory(data));
    }

    const initialFactoryStoredata = useSelector((state) => state.FactoryStoreData);

    console.log("initialFactoryStoredata", initialFactoryStoredata)

    useMemo(() => {
        if (initialFactoryStoredata.success == true) {
            navigate('/admin/factory')
        }
        if (initialFactoryStoredata.error == 'Already Exist') {
            errorNotify();
        }
    }, [initialFactoryStoredata])


    
    return (
        <>
              <ToastContainer />
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
                                        <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex flex-wrap mt-10">
                                                <div className="w-full lg:w-12/12 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                    <input type="hidden" {...register("adminId", { required: true })} value={adminUserId && adminUserId} />
                                                    <input type="hidden" {...register("role", { required: true })} value={"Factory"} />
                                                        <input {...register("name", { required: true })} placeholder="Name" className="w-full h-full focus:outline-none" />
                                                        {errors.name && <span className="error"> Name is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="number" {...register("phone", { required: true })} placeholder="Phone" className="w-full h-full focus:outline-none" />
                                                        {errors.phone && <span className="error"> Phone is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("email", { required: true })} placeholder="Email" className="w-full h-full focus:outline-none" />
                                                        {errors.email && <span className="error"> Email is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-8/12 pr-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("address", { required: true })} placeholder="Address" className="w-full h-full focus:outline-none" />
                                                        {errors.address && <span className="error"> Phone is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("city", { required: true })} placeholder="City" className="w-full h-full focus:outline-none" />
                                                        {errors.city && <span className="error"> Email is required.</span>}

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("state", { required: true })} placeholder="State" className="w-full h-full focus:outline-none" />
                                                        {errors.state && <span className="error"> State is required.</span>}

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 pr-4 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("pincode", { required: true })} placeholder="Pincode" className="w-full h-full focus:outline-none" />
                                                        {errors.pincode && <span className="error"> Pincode is required.</span>}

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("country", { required: true })} placeholder="Country" className="w-full h-full focus:outline-none" />
                                                        {errors.country && <span className="error"> Country is required.</span>}

                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("latitude", { required: true })} placeholder="Latitude: 17.3850 N" className="w-full h-full focus:outline-none" />
                                                        {errors.latitude && <span className="error"> Latitude is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("longitude", { required: true })} placeholder="Longitude: 78.4867 E" className="w-full h-full focus:outline-none" />
                                                        {errors.longitude && <span className="error"> Longitude is required.</span>}

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 pl-4 mb-10 font-light"></div>
                                                <div className="w-full lg:w-8/12 pr-4 pl-4 mb-10 font-light custom-background">
                                                    <div class="w-full relative h-11">
                                                        <input {...register("locationurl", { required: true })} placeholder="Longitude: 78.4867 E" className="w-full h-full focus:outline-none" />
                                                        {errors.locationurl && <span className="error"> location url is required.</span>}
                                                    </div>
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
export default AddFactory