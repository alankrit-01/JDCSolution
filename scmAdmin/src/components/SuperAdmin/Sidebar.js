import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SuperAdminNavbar from "./SuperAdminNavbar";
import { superAdminLogout } from "../../Services/action";
import { useDispatch, useSelector } from "react-redux";
import RichmintLogo from 'assets/img/richmint-logo.png';
import LogoutImg from 'assets/img/setting.png';
import ProductIcon from 'assets/img/products-template.png';
import BatchIcon from 'assets/img/batches-sent.png';
import CompanyIcon from 'assets/img/Company.png';
import FactoryIcon from 'assets/img/Factory.png';
import DistributerIcon from 'assets/img/distributer.png';
import RetailerIcon from 'assets/img/Retailer.png';
import FraudsDetectedIcon from 'assets/img/Frauds-detected.png';
import ReportsIcon from 'assets/img/Reports.png';
import FeedbackIcon from 'assets/img/Feedback.png';

export default function SuperAdminSidebar() {
    const [showSidebar, setShowSidebar] = useState("-left-64");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialdata = useSelector((state) => state.SuperAdminLoginData);
    let superAdmintokens = initialdata.superAdmintoken;
    useEffect(() => {
        if (superAdmintokens == "" || superAdmintokens == null) {
            navigate("/superAdmin");
        }
    });
    const logout = () => {
        dispatch(superAdminLogout());
        navigate("/superAdmin");
    };

    return (
        <>
            <SuperAdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

            <div
        className={`h-screen custom-sidebar custom-sidebar fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-32 z-10 py-4 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <NavLink to="/superAdmin/dashboard" className="mt-2 text-center w-full inline-block">
            <img className="w-16 h-16" src={RichmintLogo} style={{ margin: "auto" }} />
          </NavLink>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />
            <ul className="flex-col min-w-full flex list-none">
            <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/company"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={CompanyIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/factory"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={FactoryIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/distributer"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={DistributerIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/retailer"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={RetailerIcon} className="w-24 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/totalFrouds"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={FraudsDetectedIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/reports"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={ReportsIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/batchCovered"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={BatchIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/dashboard"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={ProductIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/superAdmin/feedback"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={FeedbackIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <button
                  onClick={() => {
                    const confirmBox = window.confirm("Are you sure you want to logout?");
                    if (confirmBox === true) {
                      logout();
                    }
                  }}
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                  style={{margin: "auto"}}
                >                  
                  <img src={LogoutImg} className="w-16 h-16" style={{ margin: "auto" }} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>






            {/* <div
                className={`h-screen custom-sidebar fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-customm-color w-32 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <NavLink to="/" className="mt-2 text-center w-full inline-block">
                        <H6 color="white">SCM</H6>
                    </NavLink>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                           
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
                                <button
                                    onClick={() => {
                                        const confirmBox = window.confirm("Are you sure you want to logout?");
                                        if (confirmBox === true) {
                                            logout();
                                        }
                                    }}
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {" "}
                                    <Icon name="person" size="2xl" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </>
    );
}
