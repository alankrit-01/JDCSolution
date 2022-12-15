import { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import FactoryNavbar from './FactoryNavbar';
import { factoryLogout } from "../../Services/action";
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';
import { Button } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';

export default function FactorySidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const initialdata = useSelector((state) => state.FactoryLoginData);
    let factorytokens = initialdata.factorytoken;
    useEffect(() => {
        if (factorytokens == '' || factorytokens == null) {
            navigate('/factory');
        }
    })
    const logout =() =>{
        dispatch(factoryLogout());
        navigate('/factory')
    }

    return (
        <>
            <FactoryNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                <NavLink
                                    to="/"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <H6 color="gray">SCM</H6>
                    </NavLink>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/factory/dashboard"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/factory/productTemplate"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Product Template
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/factory/batchTemplate"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Batch Template
                                </NavLink>
                            </li>

                            <li className="rounded-lg mb-4">
                                <NavLink
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Batch Shipment
                                </NavLink>
                            </li>
                            
                            {/* <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/factory/product"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Products
                                </NavLink>
                            </li> */}
                            <li className="rounded-lg mb-2">
                                <button onClick={logout}
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"> <Icon name="person" size="2xl" />Logout
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
}
