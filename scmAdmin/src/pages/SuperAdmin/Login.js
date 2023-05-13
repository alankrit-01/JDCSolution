import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { superAdminLogin, getSuperAdminLocalStoreData } from "../../Services/action";
import Button from '@material-tailwind/react/Button';
import {useNavigate } from "react-router-dom";
import Image from '@material-tailwind/react/Image';
import ProfilePicture from 'assets/img/rech.png';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const SuperAdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(getSuperAdminLocalStoreData())
    }, [])
    const initialdata = useSelector((state) => state.SuperAdminLoginData);

    console.log("initialdata",initialdata)

    let superAdmintokens = initialdata.superAdmintoken;
    useEffect(() => {
        if (superAdmintokens != '' && superAdmintokens != null) {
            navigate('/superAdmin/dashboard');
        }
    })

    useEffect(() => {
        console.log("error sdsd",initialdata)

        if (initialdata?.error) {
            let error = initialdata.error;
            console.log("error", error)
            errorNotify(error);
        }
    }, [initialdata])
    function onSubmit(data) {
        dispatch(superAdminLogin(data));
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
                    <Image className="mx-auto h-12 w-1/4" src={ProfilePicture}  />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Richmint SuperAdmin Login</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-md shadow-sm -space-y-px">
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
                        <div className="w-full lg:w-12/12 pr-4 mb-10 font-light btn-w-full">
                                    <Button className="form-button " type="submit">Sign in</Button>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default SuperAdminLogin
