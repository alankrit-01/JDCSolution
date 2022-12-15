import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import { useSelector } from 'react-redux';

export default function SettingsForm() {
    const initialdata = useSelector((state) => state.AdminLoginData);

    console.log("initialdata",initialdata)

    return (
        <Card>
            <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">My Account</h2>
                    {/* <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                        Settings
                    </Button> */}
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                        User Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Username"
                                value={initialdata.adminUserName}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="email"
                                color="purple"
                                placeholder="Email Address"
                                value={initialdata.adminUserEmail}
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
                                value={initialdata.adminUserAddress}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="City"
                                value={initialdata.adminUserCity}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 px-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Country"
                                value={initialdata.adminUserCountry}
                            />
                        </div>
                        
                    </div>
                    {/* <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        About Me
                    </h6>
                    <div className="flex flex-wrap mt-10 font-light">
                        <Textarea color="purple" placeholder="About Me" />
                    </div> */}
                </form>
            </CardBody>
        </Card>
    );
}
