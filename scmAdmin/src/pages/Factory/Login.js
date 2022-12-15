import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { factoryLogin, getFactoryLocalStoreData } from "../../Services/action";
import InputWithLabel from "components/Common/inputWithLabel";
import SmartButton from "components/Common/smartButton";
import {useNavigate } from "react-router-dom";
import ProfilePicture from 'assets/img/rech.png';
import Image from '@material-tailwind/react/Image';

const FactoryLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');

    useEffect(() => {
        dispatch(getFactoryLocalStoreData())
    }, [])
    const initialdata = useSelector((state) => state.FactoryLoginData);
    let factorytokens = initialdata.factorytoken;
    useEffect(() => {
        if (factorytokens != '' && factorytokens != null) {
            navigate('/factory/dashboard');
        }
    })

    function handleSubmit(event) {
        event.preventDefault();
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const passwordRegex = /^.{6,}$/;
        { email == '' ? setemailError("Email is required") : (emailRegex.test(email) === false ? setemailError("Invalid Email") : setemailError(true)) }
        { password == '' ? setpasswordError("Password is required") : (passwordRegex.test(password) === false ? setpasswordError("Password should be 6 character") : setpasswordError(true)) };
    }
    useMemo(() => {
        const data = {
            email: email,
            password: password
        }
        if (emailError == true && passwordError == true) {
            dispatch(factoryLogin(data))
        }
    }, [emailError, passwordError])

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                    <Image className="mx-auto h-12 w-1/4" src={ProfilePicture}  />

                        {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" /> */}
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Richmint Factory Login</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <InputWithLabel name="Email" type="email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" inputPlaceHolder="Email Address" labelClassName="block text-md font-semibold text-gray-800" labelTitle="Email Address" value={email} fun={setEmail} error={emailError} />
                            </div>
                            <div>
                                <InputWithLabel name="password" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" inputPlaceHolder="Password" labelClassName="block text-md font-semibold text-gray-800" labelTitle="Password" value={password} fun={setPassword} error={passwordError} />
                            </div>
                        </div>
                        <div>
                            <SmartButton type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" btnValue="Sign in" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default FactoryLogin
