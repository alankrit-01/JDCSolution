import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedback } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Input from '@material-tailwind/react/Input';
import loader from "assets/img/loading.gif";
import star from "assets/img/star.png";
import star2 from "assets/img/star-se.png";
import calender from "assets/img/calendar.png";
import cumulative from "assets/img/cumulative.png";
import Popup from "reactjs-popup";
import img1 from "assets/img/qrcode.png";
import img2 from "assets/img/product.jpg";
import img3 from "assets/img/product2.png";
import img4 from "assets/img/product3.jpg";
const FactoryReports = () => {
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const dispatch = useDispatch();
    const [Feedback, setFeedback] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterFeedback, setFilterFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
    const columns = [
        {
            name: "Distributer Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Subject",
            selector: (row) => row.subject,
            sortable: true,
        },
        {
            name: "Descrition",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: "Report",
            selector: (row) => (
              //   <button className="custom-details-btn" onClick={() => Popup()}>View More</button>
              <Popup
                trigger={<Button className="view-more-part2">View more</Button>}
                position="left center"
                marginLeft="30px"
              >
                <div
                  class="popup"
                  className=" max-h-max bg-[#CCCCCC] ml-56 px-2 max-w-2xl pb-6 text-[#0c3f6a] pr-6 position-set-part3"
                >
                  <div className="flex">
                    <div className="mt-6 ml-6">
                      <h5 className="text-lg font-extrabold">
                        Issue Reported on 02-02-2023 21:30
                      </h5>
                      <br></br>
                      <div className="text-sm">
                        <div className="flex">
                          <input
                            className="w-4 h-4"
                            type="checkbox"
                            //   checked={checked}
                            //   onChange={handleChange}
                          />
                          <p className="pl-2">
                            Authentication Failed could be a Fake Product
                          </p>
                        </div>
                        <div className="flex">
                          <input
                            className="w-4 h-4"
                            type="checkbox"
                            //   checked={checked}
                            //   onChange={handleChange}
                          />
                          <p className="pl-2">
                            Unable to scan/Enter Qr Code Software Issue
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 ml-36  text-left text-sm">
                      <div className="flex">
                        <h5 className="font-medium">Customer Name</h5>
                        <p>: Alpha</p>
                      </div>
                      <div className="flex">
                        <h5 className="font-medium">Location</h5> <p>: Karnatka</p>
                      </div>
      
                      <div className="flex">
                        {" "}
                        <h5 className="font-medium">Email : alpha@gmail.com</h5>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="flex space-x-4 ml-6 mr-6">
                    <div className="w-60 h-32 border-4 border-[#0c3f6a]  bg-white">
                      <img className="h-28 ml-2" src={img1} />
                    </div>
                    <div className="w-60 h-32 border-4 border-[#0c3f6a]">
                      <img className="h-28 mt-1 " src={img2} />
                    </div>
                    <div className="w-60 h-32 border-4 border-[#0c3f6a]">
                      <img className="h-28 mt-1 " src={img3} />
                    </div>
                    <div className="w-60 h-32 border-4 border-[#0c3f6a]">
                      <img className="h-28 mt-1 " src={img4} />
                    </div>
                  </div>
                  <br></br>
      
                  <div className="ml-6  mr-6  h-20 text-left border-2 border-[#A3A3A3] rounded-md max-w-2xl px-2">
                    <p>
                      {" "}
                      Having issue with the product.The product are totally damaged
                      and cannot be able to scan. So,please kindly for returning the
                      product.
                    </p>
                  </div>
                  <br></br>
      
                  <div className="text-[243c5a] text-left ml-56">
                    <h3>Follow up requested</h3>
                  </div>
                  <div className="flex">
                    <div>
                      {" "}
                      <input
                        className=" w-80 h-7 border border-[#A3A3A3] ml-28 bg-[#CCCCCC]"
                        placeholder="Reply"
                      ></input>
                    </div>
                    <div className="pl-2">
                      {" "}
                      <button
                        className="bg-[#8E9EAD] w-14 h-7"
                        type="button"
                        placeholder="Reply"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            ),
            sortable: true,
          },
    ];

    useEffect(() => {
        const data = {
            receiverUserID: adminUserId,
            role: 'Distributer',
        }
        dispatch(getFeedback(data))
    }, [])

    const initialdata = useSelector((state) => state.FeedbackRecord);

    useEffect(() => {
        var a = [{ subject: "There are no record to display" }];
        setFeedback(initialdata.feedbackRec);
        setLoading(true);
        if (
            initialdata.feedbackRec != 0 &&
            initialdata.feedbackRec != null &&
            initialdata.feedbackRec != ""
        ) {
            setFilterFeedback(initialdata.feedbackRec);
        } else {
            setLoading(false);

            setFilterFeedback(a);
        }
    }, [initialdata])

    useEffect(() => {
        const result = Feedback.filter((feedbackval) => {
            return feedbackval.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterFeedback(result)
    }, [Search])
    return (
        <>
            <Sidebar />
            <div className="md:ml-32">
                <div className="pt-14 pb-28 px-3 md:px-8 h-auto">
                    <div className="container mx-auto max-w-full">
                        {/* <MainStatusCard /> */}
                    </div>
                </div>
                <div className="px-3 md:px-8 h-auto -mt-24">
                    <div className="container mx-auto max-w-full">
                        <div className="grid grid-cols-1 px-4 mb-16">



                            <div className="flex flex-wrap feedback-padding lg:w-12/12">
                                <div className="w-full lg:w-4/12 pr-4">
                                    <div>
                                        <h2 className="reports-part">Reports - <span className="factory-bold">Factory</span></h2>
                                        <h4 className="font-spano5"><span>05</span></h4>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 pl-4 font-light">
                                    <form class="searchbox-container" action="">
                                        <input type="search" class="searchbox reports-part-one" name="search" autocomplete="off" placeholder="Search" />
                                        <img src={calender} />
                                    </form>
                                </div>
                                <div className="w-full lg:w-4/12 pl-4 font-light">
                                    <div className="received-part-two">
                                        <img src={cumulative} />
                                        <select id="colours" className="dd-button">
                                            <option value="red">Cumulative</option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue </option>

                                        </select>
                                    </div>
                                    <ul className="sub-text">
                                        <li>New <span>04</span></li>
                                        <li>Solved <span>01</span></li>
                                        <li>Pending <span>04</span></li>
                                    </ul>




                                </div>
                            </div>
                            <DataTable
                                // title="Factory Feedback List"
                                columns={columns}
                                noDataComponent={
                                    <div>
                                        <h4>Loading....</h4>
                                        <img
                                            style={{ width: "20px", height: "20px" }}
                                            src={loader}
                                        ></img>
                                    </div>
                                }
                                data={FilterFeedback}
                                pagination
                                fixedHeader
                                selectableRows
                                selectableRowsHighlight
                                highlightOnHover
                            // subHeader
                            // subHeaderComponent={
                            //     <div className='w-full'>
                            //         <div className="float-left lg:w-6/12 d-flex pr-4 mb-10 font-light">
                            //             <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
                            //         </div>
                            //     </div>
                            // }
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default FactoryReports


