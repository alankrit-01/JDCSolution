import MainStatusCard from "components/Admin/MainStatusCard";
import Sidebar from "components/Admin/Sidebar";
import Footer from "components/Admin/Footer";
import ProgressCard from "components/Admin/ProgressCard";
import DashboardWarningChart from 'components/Admin/DashboardWarningChart';
import "react-multi-carousel/lib/styles.css";
import cumulative from "assets/img/cumulative.png";
import { useEffect } from "react";
import { resetLoginData } from "Services/action";
import { useDispatch } from "react-redux";
import Arrowdown from 'assets/img/down-arrow.png';

import MapLocation from 'components/Admin/MapLocation';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetLoginData());
  }, [])


  return (
    <>
      <Sidebar />
      <div className="md:ml-32">
        <div className="flex justify-between">
          <div className="px-2 mb-5 mt-5 ml-12 h-20 w-52">
            {/* <Card className="main-tiles p-0 w-44">
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
                  </div>
                </button>
              </CardRow>
            </Card> */}
          </div>

          <div className="received-part-two2 report-drop cumulative">
            <img src={cumulative} />
            <select id="colours" className="dd-button">
              <option value="red">Cumulative</option>
              <option value="green">Monthly</option>
              <option value="blue">Last 24hrs</option>
            </select>
          </div>
        </div>

        <div className="px-3 md:px-8 h-20" />
        <div className="px-3 md:px-8 -mt-24">

          <div>
            <MainStatusCard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-4">

            <div className="px-4 mb-10 main-tiles-section">
              <ProgressCard />
            </div>
            <div className="px-4 mb-10 main-tiles-section">
              <DashboardWarningChart />
            </div>

            <div className="px-4 mb-10 main-tiles-section">
              <div>
                <h2 className="heading-background">Locations</h2>
              </div>
              <div className='w-full h-96 map-padding-use'>
                <div className="flex justify-end">
                  <button className="cust-export-button">Export CSV <img src={Arrowdown} className="w-3 h-3" style={{ margin: "2px 0px 2px 2px" }} /> </button>
                </div>
                <MapLocation />
              </div>

            </div>


          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Dashboard;
