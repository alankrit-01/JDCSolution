import MainStatusCard from 'components/Admin/MainStatusCard';
import Sidebar from 'components/Admin/Sidebar';
import Footer from 'components/Admin/Footer';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedback } from 'Services/action';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Popup from "reactjs-popup";

import Input from '@material-tailwind/react/Input';
import loader from "assets/img/loading.gif";
import star from "assets/img/star.png";
import starGrey from "assets/img/star-se.png";
import cumulative from "assets/img/cumulative.png";

import star1 from "assets/img/star1.png";
import star2 from "assets/img/star2.png";
import star3 from "assets/img/star3.png";
import star4 from "assets/img/star4.png";
import star5 from "assets/img/star5.png";
import star6 from "assets/img/star6.png";
import star7 from "assets/img/star7.png";
import star8 from "assets/img/star8.png";
import star9 from "assets/img/star9.png";


const FactoryFeedback = () => {
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const dispatch = useDispatch();
    const [Feedback, setFeedback] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterFeedback, setFilterFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    let starimg = <img className='w-4 h-4' src={star} />;


    function StarRating(props) {
        let leftRating = 5 - props.rating;
        let mainRating = [];
        for (let i = 0; i < props.rating; i++) {
            mainRating.push(<img className='shrink w-6 h-6 ml-3' src={star} />);
        }
        for (let i = 0; i < leftRating; i++) {
            mainRating.push(<img className='shrink w-6 h-6 ml-3' src={starGrey} />);
        }
        return mainRating;
    }
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Rating",
            selector: (row) =>
                <div className='flex'><p>{row.rating} </p> <p>{starimg}</p></div>,
            sortable: false,
        },
        {
            name: "Comment",
            selector: (row) => row.comment,
            sortable: false,
        },
        {
            name: "Services",
            selector: (row) => row.services,
            sortable: false,
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: false,
        },
        {
            name: "Feedback",
            selector: (row) => (
                <Popup trigger=
                    {<Button className="view-more-part2">View Feedback</Button>}
                    position="left center" marginLeft="30px">
                    <div class="popup" className=" h-92 bg-[#CCCCCC] ml-50 px-2 max-w-2xl text-[#0c3f6a] pr-6 p-9 position-set-part2">                    <div className='flex'>
                        <div className='mt-6 ml-6'><h2 className='text-xl font-extrabold'>Feedback by Distributer</h2><br></br>
                            <div className="image-part1 img w-36 h-14 flex ">

                                <StarRating rating={row?.rating} />
                                <p className='text-[#0c3f6a] font-extrabold text-2xl'> - {row.rating}</p>

                            </div>
                        </div>
                        <div className='mt-6 ml-6  text-left'>

                            <div className='flex'><h5 className='font-medium'>Distributor Name</h5><p>: {row.name && row.name}</p></div>
                            <div className='flex'><h5 className='font-medium'>Location</h5> <p>: {row.location && row.location}</p></div>
                            <div className='flex'><h5 className='font-medium'>Phone No</h5> <p>: {row.phone && row.phone}</p></div>
                            <div className='flex'> <h5 className='font-medium'>Email</h5> <p>:{row.email && row.email}</p></div>
                        </div>
                    </div><br></br>
                        <div className='ml-6  font-extrabold'><h3>Remarks</h3></div>
                        <br></br>

                        <div className='ml-6  mr-6  h-20 text-left border border-[#243c5a] rounded-md max-w-2xl px-2'>
                            <p>{row.comment && row.comment}</p>
                        </div>

                    </div>

                </Popup>
            ),
            sortable: false,
        },
    ];
    useEffect(() => {
        const data = {
            role: 'Factory',
        }
        dispatch(getFeedback(data))
    }, [])

    const initialdata = useSelector((state) => state.FeedbackRecord);

    useEffect(() => {
        var a = [{ subject: "There are no record to display" }];
        setFeedback(initialdata?.feedbackRec);
        setLoading(true);
        if (
            initialdata?.feedbackRec != 0 &&
            initialdata?.feedbackRec != null &&
            initialdata?.feedbackRec != ""
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

    var distributerRatingSum = 0;
    for (let i = 0; i < FilterFeedback.length; i++) {
        distributerRatingSum += parseInt(FilterFeedback[i].rating);
    }
    var numberOfDistRating = FilterFeedback.length;
    var distAverageRating = distributerRatingSum / numberOfDistRating;

    if (isNaN(distAverageRating)) {
        distAverageRating = 0;
    }

    var distFullRating = String(distAverageRating).charAt(0);
    var distFullRatingNumber = Number(distFullRating);

    var distLeftRatingNumber = 5 - distAverageRating;

    var distLeftFullRating = String(distLeftRatingNumber).charAt(0);
    var distLeftFullRatingNumber = Number(distLeftFullRating);

    var distpointRating = String(distAverageRating).charAt(2);
    var distpointRatingNumber = Number(distpointRating);

    let distributerMainRating = [];
    for (let i = 0; i < distFullRatingNumber; i++) {
        distributerMainRating.push(<img src={star} />);
    }

    let distributerPointRating = [];
    if (distpointRatingNumber > 0) {

        if (distpointRatingNumber == 1) {
            distributerPointRating.push(<img src={star1} />);
        } else if (distpointRatingNumber == 2) {
            distributerPointRating.push(<img src={star2} />);
        } else if (distpointRatingNumber == 3) {
            distributerPointRating.push(<img src={star3} />);
        } else if (distpointRatingNumber == 4) {
            distributerPointRating.push(<img src={star4} />);
        } else if (distpointRatingNumber == 5) {
            distributerPointRating.push(<img src={star5} />);
        } else if (distpointRatingNumber == 6) {
            distributerPointRating.push(<img src={star6} />);
        } else if (distpointRatingNumber == 7) {
            distributerPointRating.push(<img src={star7} />);
        } else if (distpointRatingNumber == 8) {
            distributerPointRating.push(<img src={star8} />);
        } else if (distpointRatingNumber == 9) {
            distributerPointRating.push(<img src={star9} />);
        }

    }

    let distributerLeftRating = [];
    for (let i = 0; i < distLeftFullRatingNumber; i++) {
        distributerLeftRating.push(<img src={starGrey} />);
    }
    var totalfeedback = 0
    if (distAverageRating !== 0) {
        totalfeedback = FilterFeedback.length;
    }

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
                            <div>
                                <h2 className="head-cust-color">Feedback (Distributer - {totalfeedback && totalfeedback})</h2>
                            </div>
                            <div className="flex flex-wrap feedback-padding lg:w-12/12">
                                <div className="w-full lg:w-6/12 pr-4 font-light">
                                    <div className="feedback-detail-image-part">
                                        {distributerMainRating && distributerMainRating}
                                        {distributerPointRating && distributerPointRating}
                                        {distributerLeftRating && distributerLeftRating}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/12 pl-4 font-light">
                                    <h2 className='dashicon-details dish-part'>-</h2>
                                </div>
                                <div className="w-full lg:w-3/12 pl-4 font-light">
                                    <div className="detail-button-review">
                                        <span className="point-part review-part">{distAverageRating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/12 pl-4 font-light">
                                    <div className="received-part-two report-drop image-sets">
                                        <img src={cumulative} />
                                        <select id="filters" className="dd-button">
                                            <option value="cumulative">Cumulative</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="24hrs">Last 24hrs </option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <DataTable
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
export default FactoryFeedback


