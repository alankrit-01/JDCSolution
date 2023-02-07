import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';

export default function SettingsForm() {

    const dispatch = useDispatch();
    const initialdata = useSelector((state) => state.SuperAdminLoginData);

    const[userName,setUserName] = useState(initialdata.factoryUserName);
    const[userEmail,setUserEmail] = useState(initialdata.factoryUserEmail);
    const[userAddress,setUserAddress] = useState(initialdata.factoryUserAddress);
    const[userCity,setUserCity] = useState(initialdata.factoryUserCity);
    const[userCountry,setUserCountry] = useState(initialdata.factoryUserCountry);
    const [emailError, setemailError] = useState('');
    function handleSubmit(event) {
        event.preventDefault();
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        { userEmail == '' ? setemailError("Email is required") : (emailRegex.test(userEmail) === false ? setemailError("Invalid Email") : setemailError(true)) }
    }

    useMemo(() => {
        const data = {
            name: userName,
            email: userEmail,
            address: userAddress,
            city: userCity,
            country: userCountry,
        }
        if (emailError == true) {
            dispatch()
        }
    }, [emailError])

    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">My Account</h2>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                        User Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Username"
                                value={initialdata.superAdminUserName}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="email"
                                color="purple"
                                placeholder="Email Address"
                                value={initialdata.superAdminUserEmail}
                            />
                        </div>
                    </div>

                    <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        Contact Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-12/12 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Address"
                                value={initialdata.superAdminUserAddress}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="City"
                                value={initialdata.superAdminUserCity}
                            />
                        </div> 
                        <div className="w-full lg:w-6/12 px-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Country"
                                value={initialdata.superAdminUserCountry}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 px-4 mb-10 font-light">
                            <Input
                                type="file"
                                color="purple"
                                name="image"
                            />
                        </div>

                    </div>
                    <div className="flex">
                        <div className="w-full lg:w-6/12 pr-4 mb-10">
                            <Button type="submit">Submit</Button>
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
