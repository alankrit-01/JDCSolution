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
import star from "assets/img/star.png";
import star2 from "assets/img/star-se.png";
import cumulative from "assets/img/cumulative.png";
import Icon from "@material-tailwind/react/Icon";

const BatchSent = () => {
  const factoryData = useSelector((state) => state.FactoryLoginData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      totalBatch = totalBatch + batchSentRec[i].Batches;
      BatchSentList.push(
        <> 
          <div className="w-full lg:w-6/12 pr-4 mb-10 font-light" > 
            <div onClick={() => navigate('/factory/batchSentDistributer', { state: { distributerID: batchSentRec && batchSentRec[i]._id.DistributorID , distributorName: batchSentRec && batchSentRec[i]._id.DistributorName, totalBatchSent: totalBatch} })}>
            {/* <NavLink to="/factory/batchSentDistributer"> */}

              <div className="background-feedback-part">
                <h6>{batchSentRec && batchSentRec[i].Batches}</h6>
                <p>{batchSentRec && batchSentRec[i]._id.DistributorName}</p>
              </div>
            <div className="w-full h-36 lg:w-6/12 -mt-32 ml-40">
              <div className="background-factory">
                <p className="click-open-btn"> <Icon name="phone" size="1xl" color="black" />GachiBowli sd,HYderabad</p>
                <p className="click-open-btn"> <Icon name="phone" size="1xl" color="black" />+91 6304334373</p>
                <p className="click-open-btn"> <Icon name="email" size="1xl" color="black" />Distributer1@gmail.com</p>
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
                <div className="received-part-two batch">
                  <select id="colours" className="dd-button batch-selected">
                    <option value="red">Batches Sent</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue </option>
                  </select>
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
export default BatchSent;
