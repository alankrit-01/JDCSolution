

import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getLocalStoreData } from "../../Services/action";
import Button from '@material-tailwind/react/Button';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProfilePicture from 'assets/img/rech.png';
import Image from '@material-tailwind/react/Image';
import { ToastContainer, toast } from "react-toastify";

const AdminLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(getLocalStoreData())
    }, [])
    const initialdata = useSelector((state) => state.AdminLoginData);
    console.log("initialdata",initialdata)

    let admintoken = initialdata.admintoken;
    useEffect(() => {
        if (admintoken != '' && admintoken != null) {
            navigate('/admin/dashboard');
        }
    })
    useEffect(() => {
        if (initialdata?.error) {
            let error = initialdata.error;
            errorNotify(error);
        }
    }, [initialdata])

    function onSubmit(data) {
        dispatch(adminLogin(data));
    }

    const errorNotify = (error) =>
        toast.error(error, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    return (
        <>
            <ToastContainer />
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Image className="mx-auto h-12 w-1/4" src={ProfilePicture} />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Richmint Admin Login</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-12/12 mb-10 font-light">
                                <div class="w-full relative h-11">
                                    <label className="form-label">Email Address</label>
                                    <input {...register("email", { required: true })} placeholder="Email" className="w-full h-full focus:outline-none border border-gray-300 focus:border-indigo-500" />
                                    {errors.email && <span className="error"> Email is required.</span>}
                                </div>
                            </div>
                            <div className="w-full lg:w-12/12 mb-10 font-light">
                                <div class="w-full relative h-11">
                                    <label className="form-label">Password</label>
                                    <input type="password" {...register("password", { required: true })} placeholder="Password" className="w-full h-full focus:outline-none border border-gray-300 focus:border-indigo-500" />
                                    {errors.password && <span className="error"> Password is required.</span>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex">
                                <div className="w-full lg:w-12/12 pr-4 mb-10 font-light btn-w-full">
                                    <Button className="form-button " type="submit">Sign in</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default AdminLogin

