import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { adminLogout } from "../../Services/action";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import RichmintLogo from 'assets/img/richmint-logo.png';
import LogoutImg from 'assets/img/setting.png';
import ProductIcon from 'assets/img/Productcovered.png';
import BatchIcon from 'assets/img/Batchcovered.png';
import FactoryIcon from 'assets/img/Factory.png';
import DistributerIcon from 'assets/img/distributer.png';
import RetailerIcon from 'assets/img/Retailer.png';
import FraudsDetectedIcon from 'assets/img/Frauds-detected.png';
import ReportsIcon from 'assets/img/Reports.png';
import FeedbackIcon from 'assets/img/Feedback.png';

 
export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialdata = useSelector((state) => state.AdminLoginData);
  let admintokens = initialdata.admintoken;
  useEffect(() => {
    if (admintokens == "" || admintokens == null) {
      navigate("/admin");
    }
  });
  const logout = () => {
    dispatch(adminLogout());
    navigate("/admin");
  };

  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen custom-sidebar custom-sidebar fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-32 z-10 py-4 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <NavLink to="/admin/dashboard" className="mt-2 text-center w-full inline-block">
            <img className="w-16 h-16" src={RichmintLogo} style={{ margin: "auto" }} />
          </NavLink>
          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              {/* <li className="rounded-lg mb-4">
                <NavLink
                  to="/admin/dashboard"
                  exact
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                
                  <img src={DashboardImg} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li> */}
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/factory"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={FactoryIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/distributer"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={DistributerIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/retailer"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={RetailerIcon} className="w-24 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/retailer"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={FraudsDetectedIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/factoryFeedback"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  {/* <Icon name="person" size="2xl" />
                  Factory Feedback */}
                  <img src={FeedbackIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/distributerFeedback"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  {/* <Icon name="person" size="2xl" />
                  Distributer Feedback */}
                  <img src={FeedbackIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/retailerFeedback"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  {/* <Icon name="person" size="2xl" />
                  Retailer Feedback */}
                  <img src={FeedbackIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/companySelfFeedback"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  {/* <Icon name="person" size="2xl" />
                  Help */}
                  <img src={FeedbackIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/retailer"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={ProductIcon} className="w-16 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/retailer"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <img src={BatchIcon} className="w-24 h-16" style={{ margin: "auto" }} />
                </NavLink>
              </li>
              <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/retailer"
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
                  {" "}
                  {/* <Icon name="person" size="2xl" />
                  Logout */}
                  <img src={LogoutImg} className="w-8 h-8" style={{ margin: "auto" }} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
