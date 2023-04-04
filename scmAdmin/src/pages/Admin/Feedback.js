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

const Feedback = () => {
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const dispatch = useDispatch();
    const [Feedback, setFeedback] = useState([]);

    useEffect(() => {
        const feedreqdata = {
            receiverUserID: adminUserId,
        }
        dispatch(getFeedback(feedreqdata))
    }, [])
    const feedbackinitialdata = useSelector((state) => state.FeedbackRecord);
    useEffect(() => {
        setFeedback(feedbackinitialdata.feedbackRec)
    }, [feedbackinitialdata])

    // console.log("distFeedinitialdata",Feedback)



    //const filteredPeople = Feedback.filter((role) => Feedback.role = "Distributer");
    //const filteredPeople = Feedback.filter((allFeedback) => allFeedback.name  === "Distributer");

    const distributerFeedback = Feedback.filter((allFeedback) => {
        return allFeedback.role === "Distributer";
    });

    const retailerFeedback = Feedback.filter((allFeedback) => {
        return allFeedback.role === "Retailer";
    });

    const customerFeedback = Feedback.filter((allFeedback) => {
        return allFeedback.role === "Customer";
    });
    console.log("distributerFeedback", distributerFeedback)
    console.log("retailerFeedback", retailerFeedback)

    console.log("customerFeedback", customerFeedback)

    var distributerRatingSum = 0;
    for (let i = 0; i < distributerFeedback.length; i++) {
        distributerRatingSum += parseInt(distributerFeedback[i].rating);
    }
    var numberOfDistRating = distributerFeedback.length;
    var distAverageRating = distributerRatingSum / numberOfDistRating;

    var retailerRatingSum = 0;
    for (let i = 0; i < retailerFeedback.length; i++) {
        retailerRatingSum += parseInt(retailerFeedback[i].rating);
    }
    var numberOfRetailerRating = retailerFeedback.length;
    var retailerAverageRating = retailerRatingSum / numberOfRetailerRating;

    var customerRatingSum = 0;
    for (let i = 0; i < customerFeedback.length; i++) {
        customerRatingSum += parseInt(customerFeedback[i].rating);
    }
    var numberOfCustRating = customerFeedback.length;
    var custAverageRating = customerRatingSum / numberOfCustRating;


    let seasonsList = [];
    for (let i = 0; i < distAverageRating; i++) {
        seasonsList.push(<img src={star} />);
    }

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
                                <h2 className="head-cust-color">Feedback - 5</h2>
                            </div>
                            <div className="flex flex-wrap feedback-padding">
                                <div className="w-full lg:w-7/12 pr-4 mb-10 font-light">
                                    <h3>Distributor</h3>
                                    <h4>{distributerFeedback.length && distributerFeedback.length}</h4>
                                    <div className="image-part">

                                       {seasonsList && seasonsList}
                                        {/* <img src={star} />
                                        <img src={star} />
                                        <img src={star} />
                                        <img src={star} />
                                        <img src={star2} /> */}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/12 pl-4 mb-10 font-light">
                                    <h2 className='dashicon'>-</h2>
                                </div>
                                <div className="w-full lg:w-3/12 pl-4 mb-10 font-light">
                                    <div className="button-review">
                                        <NavLink to="/admin/distributerFeedback" className="point-part">{distAverageRating && distAverageRating}</NavLink>
                                        <NavLink to="/admin/distributerFeedback" className="view-more-part">View more</NavLink>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-wrap feedback-padding">
                                <div className="w-full lg:w-7/12 pr-4 mb-10 font-light">
                                    <h3>Retailer</h3>
                                    <h4>{retailerFeedback.length && retailerFeedback.length}</h4>
                                    <div className="image-part">
                                        <img src={star} />
                                        <img src={star} />
                                        <img src={star} />
                                        <img src={star} />
                                        <img src={star2} />

                                    </div>
                                </div>
                                <div className="w-full lg:w-1/12 pl-4 mb-10 font-light">
                                    <h2 className='dashicon'>-</h2>
                                </div>
                                <div className="w-full lg:w-3/12 pl-4 mb-10 font-light">
                                    <div className="button-review">
                                        <NavLink to="/admin/retailerFeedback" className="point-part">{retailerAverageRating && retailerAverageRating}</NavLink>
                                        <NavLink to="/admin/retailerFeedback" className="view-more-part">View more</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap feedback-padding">
                                <div className="w-full lg:w-7/12 pr-4 mb-10 font-light">
                                    <h3>Customer</h3>
                                    <h4>{customerFeedback.length && customerFeedback.length}</h4>
                                    <div className="image-part">
                                        <img src={star} />
                                        <img src={star} />
                                        <img src={star} />
                                        <img src={star} />
                                        <img src={star2} />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/12 pl-4 mb-10 font-light">
                                    <h2 className='dashicon'>-</h2>
                                </div>
                                <div className="w-full lg:w-3/12 pl-4 mb-10 font-light">
                                    <div className="button-review">
                                        <NavLink to="/admin/customerFeedback" className="point-part">{custAverageRating && custAverageRating}</NavLink>
                                        <NavLink to="/admin/customerFeedback" className="view-more-part">View more</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default Feedback


