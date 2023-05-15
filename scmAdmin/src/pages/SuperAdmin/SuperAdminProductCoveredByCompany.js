import Sidebar from "components/SuperAdmin/Sidebar";
import Footer from "components/SuperAdmin/Footer";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBatchProductForCeo } from "Services/action";
import { useEffect, useMemo, useState } from "react";

import cumulative from "assets/img/cumulative.png";
import Icon from "@material-tailwind/react/Icon";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
const SuperAdminProductCoveredByCompany = () => {
 
//   let userData = useLocation()
//   let adminId = userData.state.adminId
//   let companyName = userData.state.companyName

// console.log("adminId", adminId)
// console.log("companyName", companyName)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userData = useLocation();
  let adminId = userData.state.adminId;
  let companyName = userData.state.companyName;

  useEffect(() => {
    const data = {
      adminId: adminId,
    };
    dispatch(getBatchProductForCeo(data));
  }, []);
  const allBatchProductdata = useSelector((state) => state?.AllBatchProductForCeo?.batchProductForCeoRec?.message);
  let ProductCount = 0;
  allBatchProductdata && allBatchProductdata.forEach(value => {
    ProductCount += value?.productCount;
  });
  return (
    <>
      <Sidebar />
      <div className="md:ml-32">
        <div className="pt-14 pb-20 px-3 md:px-8 h-auto">
          <div className="container mx-auto max-w-full">
            {/* <MainStatusCard /> */}
          </div>
        </div>
        <div className="px-3 md:px-7 h-auto -mt-24">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 px-4 mb-16">
              <div>
                <h2 className="head-cust-color">Company - {companyName && companyName}</h2>
              </div>
              <div className="grid-section2">
                <div className="received-part-two batch flex">
                  <Dropdown className="batch-sent" buttonText={<h6>Product Covered</h6>}>
                    <DropdownItem
                      style={{
                        backgroundColor: " #0c3f6a",
                        color: "white"
                      }}
                    >
                      <Link to="/superAdmin/batchCoveredByCompany" state={{ adminId: adminId, companyName: companyName }}>
                      Batches Covered
                      </Link>
                    </DropdownItem>
                  </Dropdown>

                  <div className="batch-count">{ProductCount && ProductCount}</div>

                </div>
                <div className="received-part-two report-drop">
                  <img src={cumulative} />
                  <select id="filters" className="dd-button">
                    <option value="cumulative">Cumulative</option>
                    <option value="monthly">Monthly</option>
                    <option value="24hrs">Last 24hrs </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap">

                {allBatchProductdata && allBatchProductdata?.map((initialBatchProductdataVal) => <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">

                  <span onClick={() => navigate('/superAdmin/productCoveredDetail', { state: { factoryID: initialBatchProductdataVal?._id, factoryName: initialBatchProductdataVal?.name, factoryEmail: initialBatchProductdataVal?.email, factoryLocation: initialBatchProductdataVal?.city + " , " + initialBatchProductdataVal?.country, factoryPhone: initialBatchProductdataVal?.phone, factoryProductCovered: initialBatchProductdataVal?.productCount, companyName: companyName } })}>
                    <div className="background-feedback-part">
                      <h6>{initialBatchProductdataVal?.productCount}</h6>
                      <p>{initialBatchProductdataVal?.name}</p>
                    </div>
                  </span>
                  <div className="w-full h-36 lg:w-6/12 -mt-32 ml-40">
                    <div className="background-factory">
                      <p className="click-open-btn"> <Icon name="phone" size="1xl" color="black" />{initialBatchProductdataVal?.city}, {initialBatchProductdataVal?.country}</p>
                      <p className="click-open-btn"> <Icon name="phone" size="1xl" color="black" />{initialBatchProductdataVal?.phone}</p>
                      <p className="click-open-btn"> <Icon name="email" size="1xl" color="black" />{initialBatchProductdataVal?.email}</p>
                    </div>
                  </div>
                </div>)}

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default SuperAdminProductCoveredByCompany;
