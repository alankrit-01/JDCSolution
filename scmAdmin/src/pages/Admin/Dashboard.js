import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import { NavLink } from "react-router-dom";
import PieRechartComponent from "components/Admin/PieChart";
import ProgressCard from "components/Admin/ProgressCard";
import PieRechartComponents from 'components/Factory/PieChart';
import "react-multi-carousel/lib/styles.css";
import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardStatus from "@material-tailwind/react/CardStatus";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import cumulative from "assets/img/cumulative.png";
import { useEffect } from "react";
import {resetLoginData} from "Services/action";
import { useDispatch} from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
useEffect(()=>{
  dispatch(resetLoginData());
},
[]
)
  
  return (
    <>
      <Sidebar />
      <div className="md:ml-32">
        <div className="flex justify-between">
          <div className="px-2 mb-5 mt-5 ml-12 h-28 w-52">
            <Card className="main-tiles p-0 w-44">
              <CardRow className="inner-tiles mr-3 ">
                <button className="add-batch-dashboard-section mr-2 ">
                  <div className="add-batch-dashboard-plus h-10">
                    {" "}
                    <p className="-mt-2">+</p>
                  </div>
                  <div className="add-batch-dashboard-title mt-0">
                    <Dropdown
                     buttonText={
                      <h6 className="mr-10 text-xl mt-2 text-white font-weight-text">ADD</h6>
                         }
                      style={{
                        padding: 9,
                        color: "white",
                        // backgroundColor: "red",
                        backgroundColor: "#335980",
                        position: "relative",
                        marginLeft: "120px",
                        width: "40px",
                        hieght: "40px",
                        marginTop: "6px",
                        marginb: "20px", 
                        height: "22px"
                      }}
                    >
                      <DropdownItem >
                      <NavLink to="/admin/addfactory">
                       Add Factory
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                      <NavLink to="/admin/adddistributer">
                       Add Distributer
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                      <NavLink to="/admin/addretailer">
                       Add Retailer
                        </NavLink>
                      </DropdownItem>
                    </Dropdown>
                    {/* </div> */}
                  </div>
                </button>
              </CardRow>
            </Card>
          </div>

          <div className="received-part-two2 report-drop cumulative">
            <img src={cumulative} />

            <select id="colours" className="dd-button">
              <option value="red">Cumulative</option>
              <option value="green">Green</option>
              <option value="blue">Blue </option>
            </select>
          </div>

       
        </div>

        <div className="px-3 md:px-8 h-20" />
        <div className="px-3 md:px-8 -mt-24">
       
          <div>
            <MainStatusCard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-3">
            
          <div>
            <ProgressCard />
          </div>
          <div className="px-4 mb-10  max-w-56main-tiles-section">
            <PieRechartComponents />
          </div>

          </div>

          <div className="container mx-auto max-w-full h-96 ">
            {/* <PieRechartComponent /> */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Dashboard;
