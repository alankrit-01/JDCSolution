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

import star1 from "assets/img/star1.png";
import star2 from "assets/img/star2.png"; 
import star3 from "assets/img/star3.png";
import star4 from "assets/img/star4.png";
import star5 from "assets/img/star5.png";
import star6 from "assets/img/star6.png";
import star7 from "assets/img/star7.png";
import star8 from "assets/img/star8.png";
import star9 from "assets/img/star9.png";

const Feedback = () => {
    const admindata = useSelector((state) => state.AdminLoginData);
    const [adminUserId, setAdminUserId] = useState(admindata.adminUserId);
    const dispatch = useDispatch();
    const [Feedback, setFeedback] = useState([]);

    useEffect(() => {
        dispatch(getFeedback())
    }, [])
    const feedbackinitialdata = useSelector((state) => state.FeedbackRecord);
    console.log("feedbackinitialdata",feedbackinitialdata)
    useEffect(() => {
        setFeedback(feedbackinitialdata.feedbackRec)
    }, [feedbackinitialdata])


    const distributerFeedback = Feedback.filter((allFeedback) => {
        return allFeedback.role === "Distributer";
    });

    const retailerFeedback = Feedback.filter((allFeedback) => {
        return allFeedback.role === "Retailer";
    });

    const customerFeedback = Feedback.filter((allFeedback) => {
        return allFeedback.role === "Customer";
    });

    var distributerRatingSum = 0;
    for (let i = 0; i < distributerFeedback.length; i++) {
        distributerRatingSum += parseInt(distributerFeedback[i].rating);
    }
    var numberOfDistRating = distributerFeedback.length;
    var distAverageRating = distributerRatingSum / numberOfDistRating;

    if(isNaN(distAverageRating)){
        distAverageRating = 0;
    }



    var retailerRatingSum = 0;
    for (let i = 0; i < retailerFeedback.length; i++) {
        retailerRatingSum += parseInt(retailerFeedback[i].rating);
    }
    var numberOfRetailerRating = retailerFeedback.length;
    var retailerAverageRating = retailerRatingSum / numberOfRetailerRating;

    if(isNaN(retailerAverageRating)){
        retailerAverageRating = 0;
    }

    var customerRatingSum = 0;
    for (let i = 0; i < customerFeedback.length; i++) {
        customerRatingSum += parseInt(customerFeedback[i].rating);
    }
    var numberOfCustRating = customerFeedback.length;
    var custAverageRating = customerRatingSum / numberOfCustRating;


    if(isNaN(custAverageRating)){
        custAverageRating = 0;
    }

    /////////////////Distributer Feedback Start ///////////


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

        if(distpointRatingNumber == 1){
            distributerPointRating.push(<img src={star1} />);
        }else if(distpointRatingNumber == 2){
            distributerPointRating.push(<img src={star2} />);
        }else if(distpointRatingNumber == 3){
            distributerPointRating.push(<img src={star3} />);
        }else if(distpointRatingNumber == 4){
            distributerPointRating.push(<img src={star4} />);
        }else if(distpointRatingNumber == 5){
            distributerPointRating.push(<img src={star5} />);
        }else if(distpointRatingNumber == 6){
            distributerPointRating.push(<img src={star6} />);
        }else if(distpointRatingNumber == 7){
            distributerPointRating.push(<img src={star7} />);
        }else if(distpointRatingNumber == 8){
            distributerPointRating.push(<img src={star8} />);
        }else if(distpointRatingNumber == 9){
            distributerPointRating.push(<img src={star9} />);
        }
        
    }

    let distributerLeftRating = [];
    for (let i = 0; i < distLeftFullRatingNumber; i++) {
        distributerLeftRating.push(<img src={starGrey} />);
    }

    var disttotalfeedback = 0
    if(distAverageRating !== 0){
        disttotalfeedback = distributerFeedback.length;
    }

/////////////////Distributer Feedback End ///////////


/////////////////Retailer Feedback Start ///////////

    var retFullRating = String(retailerAverageRating).charAt(0);
    var retFullRatingNumber = Number(retFullRating);

    var retLeftRatingNumber = 5 - retailerAverageRating;

    var retLeftFullRating = String(retLeftRatingNumber).charAt(0);
    var retLeftFullRatingNumber = Number(retLeftFullRating);

    var retpointRating = String(retailerAverageRating).charAt(2);
    var retpointRatingNumber = Number(retpointRating);

    let retailerMainRating = [];
    for (let i = 0; i < retFullRatingNumber; i++) {
        retailerMainRating.push(<img src={star} />);
    }

    let retailerPointRating = [];
    if (retpointRatingNumber > 0) {

        if(retpointRatingNumber == 1){
            retailerPointRating.push(<img src={star1} />);
        }else if(retpointRatingNumber == 2){
            retailerPointRating.push(<img src={star2} />);
        }else if(retpointRatingNumber == 3){
            retailerPointRating.push(<img src={star3} />);
        }else if(retpointRatingNumber == 4){
            retailerPointRating.push(<img src={star4} />);
        }else if(retpointRatingNumber == 5){
            retailerPointRating.push(<img src={star5} />);
        }else if(retpointRatingNumber == 6){
            retailerPointRating.push(<img src={star6} />);
        }else if(retpointRatingNumber == 7){
            retailerPointRating.push(<img src={star7} />);
        }else if(retpointRatingNumber == 8){
            retailerPointRating.push(<img src={star8} />);
        }else if(retpointRatingNumber == 9){
            retailerPointRating.push(<img src={star9} />);
        }
        
    }

    let retailerLeftRating = [];
    for (let i = 0; i < retLeftFullRatingNumber; i++) {
        retailerLeftRating.push(<img src={starGrey} />);
    }

    var rettotalfeedback = 0
    if(retailerAverageRating !== 0){
        rettotalfeedback = retailerFeedback.length;
    }


/////////////////Retailer Feedback End ///////////


/////////////////Customer Feedback start ///////////


    
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

        if(custpointRatingNumber == 1){
            customerPointRating.push(<img src={star1} />);
        }else if(custpointRatingNumber == 2){
            customerPointRating.push(<img src={star2} />);
        }else if(custpointRatingNumber == 3){
            customerPointRating.push(<img src={star3} />);
        }else if(custpointRatingNumber == 4){
            customerPointRating.push(<img src={star4} />);
        }else if(custpointRatingNumber == 5){
            customerPointRating.push(<img src={star5} />);
        }else if(custpointRatingNumber == 6){
            customerPointRating.push(<img src={star6} />);
        }else if(custpointRatingNumber == 7){
            customerPointRating.push(<img src={star7} />);
        }else if(custpointRatingNumber == 8){
            customerPointRating.push(<img src={star8} />);
        }else if(custpointRatingNumber == 9){
            customerPointRating.push(<img src={star9} />);
        }
    }
    let customerLeftRating = [];
    for (let i = 0; i < custLeftFullRatingNumber; i++) {
        customerLeftRating.push(<img src={starGrey} />);
    }

    var custtotalfeedback = 0
    if(custAverageRating !== 0){
        custtotalfeedback = customerFeedback.length;
    }

/////////////////Customer Feedback End ///////////

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
                                <h2 className="head-cust-color">Feedback - {Feedback.length && Feedback.length}</h2>
                            </div>
                            <div className="flex flex-wrap feedback-padding">
                                <div className="w-full lg:w-7/12 pr-4 mb-10 font-light">
                                    <h3>Distributor</h3>
                                    <h4>{disttotalfeedback && disttotalfeedback}</h4>
                                    <div className="image-part">
                                        {distributerMainRating && distributerMainRating}
                                        {distributerPointRating && distributerPointRating}
                                        {distributerLeftRating && distributerLeftRating}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/12 pl-4 mb-10 font-light">
                                    <h2 className='dashicon'>-</h2>
                                </div>
                                <div className="w-full lg:w-3/12 pl-4 mb-10 font-light">
                                    <div className="button-review">
                                        <NavLink to="/admin/distributerFeedback" className="point-part">{distAverageRating.toFixed(1)}</NavLink>
                                        <NavLink to="/admin/distributerFeedback" className="view-more-part">View more</NavLink>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-wrap feedback-padding">
                                <div className="w-full lg:w-7/12 pr-4 mb-10 font-light">
                                    <h3>Retailer</h3>
                                    <h4>{rettotalfeedback && rettotalfeedback}</h4>
                                    <div className="image-part">

                                    {retailerMainRating && retailerMainRating}
                                        {retailerPointRating && retailerPointRating} 
                                        {retailerLeftRating && retailerLeftRating}
                                        

                                    </div>
                                </div>
                                <div className="w-full lg:w-1/12 pl-4 mb-10 font-light">
                                    <h2 className='dashicon'>-</h2>
                                </div>
                                <div className="w-full lg:w-3/12 pl-4 mb-10 font-light">
                                    <div className="button-review">
                                        <NavLink to="/admin/retailerFeedback" className="point-part">{retailerAverageRating.toFixed(1)}</NavLink>
                                        <NavLink to="/admin/retailerFeedback" className="view-more-part">View more</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap feedback-padding">
                                <div className="w-full lg:w-7/12 pr-4 mb-10 font-light">
                                    <h3>Customer</h3>
                                    <h4>{custtotalfeedback && custtotalfeedback}</h4>
                                    <div className="image-part">
                                    {customerMainRating && customerMainRating}
                                        {customerPointRating && customerPointRating} 
                                        {customerLeftRating && customerLeftRating}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/12 pl-4 mb-10 font-light">
                                    <h2 className='dashicon'>-</h2>
                                </div>
                                <div className="w-full lg:w-3/12 pl-4 mb-10 font-light">
                                    <div className="button-review">
                                        <NavLink to="/admin/customerFeedback" className="point-part">{custAverageRating.toFixed(1)}</NavLink>
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


