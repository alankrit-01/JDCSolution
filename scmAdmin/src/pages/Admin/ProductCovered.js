import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBatchProductForCeo } from "Services/action";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import Input from "@material-tailwind/react/Input";
import loader from "assets/img/loading.gif";
import star from "assets/img/star.png";
import star2 from "assets/img/star-se.png";
import cumulative from "assets/img/cumulative.png";
import Icon from "@material-tailwind/react/Icon";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
const ProductCovered = () => {
  const admindata = useSelector((state) => state.AdminLoginData);
  const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      adminId: adminUserId,
    };
    dispatch(getBatchProductForCeo(data));
  }, []);
  const initialBatchProductdata = useSelector((state) => state?.AllBatchProductForCeo?.batchProductForCeoRec);
  console.log("initialBatchProductdata", initialBatchProductdata)
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
              <div className="grid-section2">
                <div className="received-part-two batch">
                  <Dropdown className="batch-sent" buttonText={<h6>Products Covered</h6>}>
                    <DropdownItem
                      style={{
                        backgroundColor: " #0c3f6a",
                        color: "white"
                      }}
                    >
                      <NavLink to="/admin/batchCovered">
                        Batches Covered
                      </NavLink>
                    </DropdownItem>
                  </Dropdown>
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
                {initialBatchProductdata && initialBatchProductdata.message.map((initialBatchProductdataVal) => <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                  <span onClick={() => navigate('/admin/productCoveredDetail', { state: { factoryID: initialBatchProductdataVal?._id, factoryName: initialBatchProductdataVal?.name, factoryEmail: initialBatchProductdataVal?.email, factoryLocation: initialBatchProductdataVal?.city + " , " + initialBatchProductdataVal?.country, factoryPhone: initialBatchProductdataVal?.phone, factoryProductCovered: initialBatchProductdataVal?.productCount } })}>
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
export default ProductCovered;
