import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import FactoryNavbar from "./FactoryNavbar";
import { factoryLogout } from "../../Services/action";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import RichmintLogo from 'assets/img/richmint-logo.png';
import DashboardImg from 'assets/img/distributer.png';
import ProductTempImg from 'assets/img/products-template.png';
import BatchImg from 'assets/img/batches-sent.png';
import FeedbackImg from 'assets/img/Reports.png';
import LogoutImg from 'assets/img/setting.png';


export default function FactorySidebar() {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialdata = useSelector((state) => state.FactoryLoginData);
  let factorytokens = initialdata.factorytoken;
  useEffect(() => {
    if (factorytokens == "" || factorytokens == null) {
      navigate("/factory");
    }
  });
  const logout = () => {
    dispatch(factoryLogout());
    navigate("/factory");
  };

  return (
    <>
      <FactoryNavbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <div
        className={`h-screen custom-sidebar fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-32 z-10 py-4 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <NavLink to="/factory/dashboard" className="mt-2 text-center w-full inline-block">
            <img className="w-16 h-16" src={RichmintLogo} style={{margin: "auto"}}/>
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
                  {/* <Icon name="dashboard" size="2xl" /> */}
                  <img src={DashboardImg} className="w-8 h-8" style={{margin: "auto"}}/>
                </NavLink>
              </li>
              <li className="rounded-lg mb-4">
                <NavLink
                  to="/factory/productTemplate"
                  exact
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  {/* <Icon name="dashboard" size="2xl" /> */}
                  <img src={ProductTempImg} className="w-8 h-8" style={{margin: "auto"}}/>
                  {/* Product Template */}
                </NavLink>
              </li>
              <li className="rounded-lg mb-4">
                <NavLink
                  to="/factory/batchTemplate"
                  exact
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  {/* <Icon name="dashboard" size="2xl" /> */}
                  <img src={BatchImg} className="w-8 h-8" style={{margin: "auto"}}/>
                </NavLink>
              </li>
              <li className="rounded-lg mb-4">
                <NavLink
                  to="/factory/factorySelfFeedback"
                  exact
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  {/* <Icon name="dashboard" size="2xl" /> */}
                  <img src={FeedbackImg} className="w-8 h-8" style={{margin: "auto"}}/>
                </NavLink>
              </li>

              {/* <li className="rounded-lg mb-4">
                                <NavLink
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Batch Shipment
                                </NavLink>
                            </li> */}

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
                  {/* <Icon name="person" size="2xl" /> */}
                  <img src={LogoutImg} className="w-8 h-8" style={{margin: "auto"}}/>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
