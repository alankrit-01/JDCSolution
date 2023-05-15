import MainStatusCard from "components/SuperAdmin/MainStatusCard";
import Sidebar from "components/SuperAdmin/Sidebar";
import Footer from "components/SuperAdmin/Footer";
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import { storeCompany, resetConpanyData } from "Services/action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const AddCompany = () => {
    const initialdata = useSelector((state) => state.SuperAdminLoginData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
         dispatch(resetConpanyData());
        dispatch(storeCompany(data));
    }
    const initialCompanyStoredata = useSelector((state) => state.CompanyStoreData);
    useEffect(() => {
        if (initialCompanyStoredata?.success) {
          
            navigate('/superAdmin/company')
        }
        if (initialCompanyStoredata.error == 'Already Exist') {
            errorNotify();
        }
    }, [initialCompanyStoredata])

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
                                    <h2 className="head-cust-color">Add New Company</h2>
                                </div>
                                <Card className="background-gray rounded-none">
                                    <CardBody>
                                        <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex flex-wrap mt-10">
                                                <div className="w-full lg:w-12/12 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                    <input type="hidden" {...register("adminId", { required: true })} value={initialdata && initialdata?.superAdminUserId} />
                                                    <input type="hidden" {...register("role", { required: true })} value={"Admin"} />
                                                        <input type="text" {...register("name", { required: true })} placeholder="Name"  className="w-full h-full focus:outline-none" />
                                                        {errors.name && <span className="error"> Name is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="number" {...register("phone", { required: true })} placeholder="Phone" required className="w-full h-full focus:outline-none" />
                                                        {errors.phone && <span className="error"> Phone is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="email" {...register("email", { required: true })} placeholder="Email" required className="w-full h-full focus:outline-none" />
                                                        {errors.email && <span className="error"> Email is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-8/12 pr-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="text" {...register("address", { required: true })} placeholder="Address" required className="w-full h-full focus:outline-none" />
                                                        {errors.address && <span className="error"> Phone is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="text" {...register("city", { required: true })} placeholder="City" required className="w-full h-full focus:outline-none" />
                                                        {errors.city && <span className="error"> Email is required.</span>}

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="text" {...register("state", { required: true })} placeholder="State" required className="w-full h-full focus:outline-none" />
                                                        {errors.state && <span className="error"> State is required.</span>}

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 pr-4 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="text" {...register("pincode", { required: true })} placeholder="Pincode" required className="w-full h-full focus:outline-none" />
                                                        {errors.pincode && <span className="error"> Pincode is required.</span>}

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="text" {...register("country", { required: true })} placeholder="Country" required className="w-full h-full focus:outline-none" />
                                                        {errors.country && <span className="error"> Country is required.</span>}
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="text" {...register("latitude", { required: true })} placeholder="Latitude: 17.3850 N" required className="w-full h-full focus:outline-none" />
                                                        {errors.latitude && <span className="error"> Latitude is required.</span>}
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                                    <div class="w-full relative h-11">
                                                        <input type="text" {...register("longitude", { required: true })} placeholder="Longitude: 78.4867 E" required className="w-full h-full focus:outline-none" />
                                                        {errors.longitude && <span className="error"> Longitude is required.</span>}

                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 pl-4 mb-10 font-light"></div>
                                                <div className="w-full lg:w-8/12 pr-4 pl-4 mb-10 font-light custom-background">
                                                    <div class="w-full relative h-11">
                                                        <input type="text" {...register("locationurl", { required: true })} placeholder="Longitude: 78.4867 E" required className="w-full h-full focus:outline-none" />
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
export default AddCompany