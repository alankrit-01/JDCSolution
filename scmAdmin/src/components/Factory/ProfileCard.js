import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import Image from '@material-tailwind/react/Image';
import H5 from '@material-tailwind/react/Heading5';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import Button from '@material-tailwind/react/Button';
//import ProfilePicture from 'assets/img/team-1-800x800.jpg';
import ProfilePicture from 'assets/img/rech.png';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function ProfileCard() {
        const initialdata = useSelector((state) => state.FactoryLoginData);
    
    return (
        <Card>
            <div className="flex flex-wrap justify-center">
                <div className="w-48 px-4 -mt-24">
                    <Image src={ProfilePicture} rounded raised />
                </div>
                {/* <div className="w-full flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            22
                        </span>
                        <span className="text-sm text-gray-700">Friends</span>
                    </div>
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            89
                        </span>
                        <span className="text-sm text-gray-700">Comments</span>
                    </div>
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            10
                        </span>
                        <span className="text-sm text-gray-700">Photos</span>
                    </div>
                </div> */}
            </div>
            <div className="text-center">
                <H5 color="gray">{initialdata.factoryUserName && initialdata.factoryUserName}</H5>
                <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                    <Icon name="place" size="xl" />
                    Hyderabad, India
                </div>
                <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                    <Icon name="work" size="xl" />
                    Supplychain Solution Manager
                </div>
                {/* <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                    <Icon name="account_balance" size="xl" />
                    University of Computer Science
                </div> */}
            </div>
        </Card>
    );
}
