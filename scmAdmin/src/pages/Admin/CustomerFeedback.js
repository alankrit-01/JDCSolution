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
const CustomerFeedback = () => {
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const dispatch = useDispatch();
    const [Feedback, setFeedback] = useState([]);
    const [Search, setSearch] = useState("");
    const [FilterFeedback, setFilterFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            name: "Customer Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Rating",
            selector: (row) => row.rating,
            sortable: true,
        },
        {
            name: "Comment",
            selector: (row) => row.comment,
            sortable: true,
        },
        {
            name: "Services",
            selector: (row) => row.services,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
    ];
    useEffect(() => {
        const data = {
            receiverUserID: adminUserId,
            role: 'Customer',
        }
        dispatch(getFeedback(data))
    }, [])

    const initialdata = useSelector((state) => state.FeedbackRecord);
    useEffect(() => {
        var a = [{ comment: "There are no record to display" }];
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


    var customerRatingSum = 0;
    for (let i = 0; i < FilterFeedback.length; i++) {
        customerRatingSum += parseInt(FilterFeedback[i].rating);
    }
    var numberOfCustRating = FilterFeedback.length;
    var custAverageRating = customerRatingSum / numberOfCustRating;

    if(isNaN(custAverageRating)){
        custAverageRating = 0;
    }

    var custFullRating = String(custAverageRating).charAt(0);
    var custFullRatingNumber = Number(custFullRating);

    var custLeftRatingNumber = 5 - custAverageRating;

    var custLeftFullRating = String(custLeftRatingNumber).charAt(0);
    var custLeftFullRatingNumber = Number(custLeftFullRating);
   
    var custpointRating = String(custAverageRating).charAt(2);
    var custpointRatingNumber = Number(custpointRating);

    let customerMainRating = [];
    for (let i = 0; i < custFullRatingNumber; i++) {
        customerMainRating.push(<img src={star} />);
    }

    let customerPointRating = [];
    if (custpointRatingNumber > 0) {

        if (custpointRatingNumber == 1) {
            customerPointRating.push(<img src={star1} />);
        } else if (custpointRatingNumber == 2) {
            customerPointRating.push(<img src={star2} />);
        } else if (custpointRatingNumber == 3) {
            customerPointRating.push(<img src={star3} />);
        } else if (custpointRatingNumber == 4) {
            customerPointRating.push(<img src={star4} />);
        } else if (custpointRatingNumber == 5) {
            customerPointRating.push(<img src={star5} />);
        } else if (custpointRatingNumber == 6) {
            customerPointRating.push(<img src={star6} />);
        } else if (custpointRatingNumber == 7) {
            customerPointRating.push(<img src={star7} />);
        } else if (custpointRatingNumber == 8) {
            customerPointRating.push(<img src={star8} />);
        } else if (custpointRatingNumber == 9) {
            customerPointRating.push(<img src={star9} />);
        }

    }

    let customerLeftRating = [];
    for (let i = 0; i < custLeftFullRatingNumber; i++) {
        customerLeftRating.push(<img src={starGrey} />);
    }

    var totalfeedback = 0
    if(custAverageRating !== 0){
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
                                <h2 className="head-cust-color">Feedback (Customer - {totalfeedback && totalfeedback})</h2>
                            </div>
                            <div className="flex flex-wrap feedback-padding lg:w-12/12">
                                <div className="w-full lg:w-6/12 pr-4 font-light">
                                    <div className="feedback-detail-image-part">
                                        {customerMainRating && customerMainRating}
                                        {customerPointRating && customerPointRating}
                                        {customerLeftRating && customerLeftRating}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/12 pl-4 font-light">
                                    <h2 className='dashicon-details dish-part'>-</h2>
                                </div>
                                <div className="w-full lg:w-3/12 pl-4 font-light">
                                    <div className="detail-button-review">
                                        <span className="point-part review-part">
                                             {custAverageRating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full lg:w-2/12 pl-4 font-light">
                                    <div className="received-part-two report-drop image-sets">
                                        <img src={cumulative} />
                                        <select id="colours" className="dd-button">
                                            <option value="red">Cumulative</option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue </option>

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
export default CustomerFeedback


