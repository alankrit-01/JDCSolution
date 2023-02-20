import { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import SuperAdminNavbar from './SuperAdminNavbar';
import { superAdminLogout } from "../../Services/action";
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';
import { Button } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';

export default function SuperAdminSidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialdata = useSelector((state) => state.SuperAdminLoginData);
    let superAdmintokens = initialdata.superAdmintoken;
    useEffect(() => {
        if (superAdmintokens == '' || superAdmintokens == null) {
            navigate('/superAdmin');
        }
    })
    const logout =() =>{
        dispatch(superAdminLogout());
        navigate('/superAdmin')
    }

    return (
        <>
            <SuperAdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-customm-color w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                <NavLink
                                    to="/"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <H6 color="white">SCM</H6>
                    </NavLink>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/superAdmin/dashboard"
                                    exact
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Dashboard
                                </NavLink>
                            </li>
                             <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/superAdmin/company"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="person" size="2xl" />
                                    Companies
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/superAdmin/companyFeedback"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="person" size="2xl" />
                                    Companies Feedback
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2">
                                <button onClick={logout}
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
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
