import MainStatusCard from "components/Factory/MainStatusCard";
import FactorySidebar from "components/Factory/Sidebar";
import Footer from "components/Factory/Footer";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getBatchSentToDistributer } from "Services/action";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import Input from "@material-tailwind/react/Input";
import loader from "assets/img/loading.gif";
import cumulative from "assets/img/cumulative.png";
import Icon from "@material-tailwind/react/Icon";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
const ProductSent = () => {
  const factoryData = useSelector((state) => state.FactoryLoginData);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [Search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = {
      factoryID: factoryData.factoryUserId,
    };
    dispatch(getBatchSentToDistributer(data));
  }, []);

  const initialdata = useSelector((state) => state.BatchSentRecord);

  const batchSentRec = initialdata && initialdata.batchSentRec.message;

  const BatchSentList = [];
  var totalBatch = 0;
  if (batchSentRec && batchSentRec.length > 0) {
    for (let i = 0; i < batchSentRec.length; i++) {

      totalBatch = totalBatch + batchSentRec[i].Products;
      BatchSentList.push(
        <>
          <div className="w-full lg:w-6/12 pr-4 mb-10 font-light" >
            <div onClick={() => navigate('/factory/productSentDistributer', { state: { distributerID: batchSentRec && batchSentRec[i]._id, distributorName: batchSentRec && batchSentRec[i].name, email: batchSentRec && batchSentRec[i].email, phone: batchSentRec && batchSentRec[i].phone, address: batchSentRec && batchSentRec[i].address } })}>

              <div className="background-feedback-part">
                <h6>{batchSentRec && batchSentRec[i].Products}</h6>
                <p>{batchSentRec && batchSentRec[i].name}</p>
              </div>
              <div className="w-full h-36 lg:w-6/12 -mt-32 ml-40">
                <div className="background-factory">
                  <p className="click-open-btn"> <Icon name="phone" size="1xl" color="black" />{batchSentRec && batchSentRec[i].address}</p>
                  <p className="click-open-btn"> <Icon name="phone" size="1xl" color="black" />{batchSentRec && batchSentRec[i].phone}</p>
                  <p className="click-open-btn"> <Icon name="email" size="1xl" color="black" />{batchSentRec && batchSentRec[i].email}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <FactorySidebar />
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
                <div className="received-part-two batch flex">
                  <Dropdown className="batch-sent" buttonText={<h6>Product Sent</h6>}>
                    <DropdownItem
                      style={{
                        backgroundColor: " #0c3f6a",
                        color: "white"
                      }}
                    >
                      <NavLink to="/factory/batchSent">
                        Batches Sent
                      </NavLink>
                    </DropdownItem>
                  </Dropdown>

                  <span className="fifty-seven">{totalBatch && totalBatch}</span>
                </div>
                <div className="received-part-two report-drop">
                  <img src={cumulative} />
                  <select id="colours" className="dd-button">
                    <option value="red">Cumulative</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue </option>
                  </select>
                </div>
                <div className="search-div">
                  <input type="text" className="cust-input" placeholder="Search" value={Search}
                    onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="flex flex-wrap">

                {BatchSentList && BatchSentList}


              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default ProductSent;

