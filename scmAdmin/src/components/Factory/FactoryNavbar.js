import { useLocation } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import ProfilePicture from 'assets/img/richmint.png';
import RCheckLogo from 'assets/img/r-check-logo.png';
import bell from "assets/img/bell.png"
import mail from "assets/img/mail.png";
import { NavLink } from 'react-router-dom';

export default function FactoryNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;
    return (
        <nav className="custom-navbar md:ml-32 py-6 px-3">
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        iconOnly
                        rounded
                        ripple="light"
                        onClick={() => setShowSidebar('left-0')}
                    >
                        <Icon name="menu" size="2xl" color="white" />
                    </Button>
                    <div
                        className={`absolute top-2 md:hidden ${showSidebar === 'left-0' ? 'left-64' : '-left-64'
                            } z-50 transition-all duration-300`}
                    >
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('-left-64')}
                        >
                            <Icon name="close" size="2xl" color="white" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <img className='w-24 h-16' src={RCheckLogo} />
                    {/* <h4 className="uppercase text-white text-2xl tracking-wider mt-1">
                        {location === '/'
                            ? 'DASHBOARD sd'
                            : location.toUpperCase().replace('/', '')}
                    </h4> */}
                    <div className="flex">
                        <div className="w-5 h-5 rounded-full border-gray-700 bg-[#ff9c67] -mr-12 mb-5 text-center z-40 ">
                            <span>7</span>
                        </div>

                        <div className="w-12 h-6 inline-flex mr-28 mt-2">
                            <img src={mail} className="mr-12" />

                            <img src={bell} />
                        </div>

                        <div className="w-5 h-5 rounded-full border-gray-700 bg-[#ff9c67] bg -ml-16 mb-5 text-center ">
                            <span>5</span>
                        </div>
                        <div className="-mr-4 ml-6 profile-button">
                            <Dropdown
                                color="transparent"
                                buttonText={
                                    <div className="w-24 profile-section">
                                        <Image src={ProfilePicture} rounded />
                                        Factory
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: 'white',
                                }}
                            >
                                <NavLink
                                    to="/factory/settings">
                                    <DropdownItem color="lightBlue">
                                        Profile
                                    </DropdownItem>
                                </NavLink>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}