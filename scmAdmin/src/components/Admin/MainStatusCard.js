import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDistributer, getFactory, getRetailers } from 'Services/action';
import StatusCard from "./StatusCard";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Card from '@material-tailwind/react/Card';
import CardRow from '@material-tailwind/react/CardRow';
import CardStatus from '@material-tailwind/react/CardStatus';

import DashboardImg from 'assets/img/distributer.png';
import ProductIcon from 'assets/img/Productcovered.png';
import BatchIcon from 'assets/img/Batchcovered.png';
import FactoryIcon from 'assets/img/Factory.png';
import DistributerIcon from 'assets/img/distributer.png';
import RetailerIcon from 'assets/img/Retailer.png';
import FraudsDetectedIcon from 'assets/img/Frauds-detected.png';
import ReportsIcon from 'assets/img/Reports.png';
import FeedbackIcon from 'assets/img/Feedback.png';







const MainStatusCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Distributer, setDistributer] = useState([]);
    const [Factories, setFactories] = useState([]);
    const [Retailer, setRetailer] = useState([]);


    useEffect(() => {
        dispatch(getDistributer())
        dispatch(getFactory())
        dispatch(getRetailers())
    }, [])
    const initialdata = useSelector((state) => state.DistributerRecord);
    const initialFactorydata = useSelector((state) => state.FactoryRecord);
    const initialRetailerdata = useSelector((state) => state.RetailerRecord);
    useEffect(() => {
        setDistributer(initialdata.distributerRec.length)
        setFactories(initialFactorydata.factoryRec.length)
        setRetailer(initialRetailerdata.retailerRec.length)

    }, [initialdata, initialFactorydata, initialRetailerdata])



    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <Carousel responsive={responsive}>
                <div className="px-6 mb-10 main-tiles-section">
                    <NavLink to="/admin/factory">
                        <Card className="main-tiles p-0">
                            <CardRow className="inner-tiles">
                                <CardStatus className="tiles-title" title={100} />
                                <img src={FactoryIcon} className="w-24 h-24" />
                                <CardStatus className="tiles-title-bottom" title={"Factory"} />
                            </CardRow>
                        </Card>
                    </NavLink>
                </div>
                <div className="px-6 mb-10 main-tiles-section">
                    <NavLink to="/admin/distributer">
                        <Card className="main-tiles p-0">
                            <CardRow className="inner-tiles">
                                <CardStatus className="tiles-title" title={100} />
                                <img src={DistributerIcon} className="w-24 h-24" />
                                <CardStatus className="tiles-title-bottom" title={"Distributer"} />
                            </CardRow>
                        </Card>
                    </NavLink>
                </div>
                <div className="px-6 mb-10 main-tiles-section">
                    <NavLink to="/admin/retailer">
                        <Card className="main-tiles p-0">
                            <CardRow className="inner-tiles">
                                <CardStatus className="tiles-title" title={100} />
                                <img src={RetailerIcon} className="w-32 h-24" />
                                <CardStatus className="tiles-title-bottom" title={"Retailer"} />
                            </CardRow>
                        </Card>
                    </NavLink>
                </div>
                <div className="px-6 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={FraudsDetectedIcon} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Total Fraud Detected"} />
                        </CardRow>
                    </Card>
                </div>
                <div className="px-6 mb-10 main-tiles-section"> 
                    <NavLink to="/admin/reports">
                        <Card className="main-tiles p-0">
                            <CardRow className="inner-tiles">
                                <CardStatus className="tiles-title" title={100} />
                                <img src={ReportsIcon} className="w-24 h-24" />
                                <CardStatus className="tiles-title-bottom" title={"Reports Received"} />
                            </CardRow>
                        </Card>
                    </NavLink>
                </div>
                <div className="px-6 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={ProductIcon} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Products Covered"} />
                        </CardRow>
                    </Card>
                </div>
                <div className="px-6 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={BatchIcon} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Batches Covered"} />
                        </CardRow>
                    </Card>
                </div>
                <div className="px-6 mb-10 main-tiles-section">
                    <NavLink to="/admin/feedback">
                        <Card className="main-tiles p-0">
                            <CardRow className="inner-tiles">
                                <CardStatus className="tiles-title" title={100} />
                                <img src={FeedbackIcon} className="w-24 h-24" />
                                <CardStatus className="tiles-title-bottom" title={"Feedback"} />
                            </CardRow>
                        </Card>
                    </NavLink>
                </div>

            </Carousel>

            {/* <div className="px-4 mb-10 main-tiles-section">
                <Card className="main-tiles p-0">
                    <CardRow className="inner-tiles">
                        <CardStatus className="tiles-title" title={100} />
                        <img src={DashboardImg} className="w-24 h-24" />
                        <CardStatus className="tiles-title-bottom" title={"Distributer"} />
                    </CardRow>
                </Card>
            </div>
            <div className="px-4 mb-10 main-tiles-section">
                <Card className="main-tiles p-0">
                    <CardRow className="inner-tiles">
                        <CardStatus className="tiles-title" title={100} />
                        <img src={BatchImg} className="w-24 h-24" />
                        <CardStatus className="tiles-title-bottom" title={"Batches Sent"} />
                    </CardRow>
                </Card>
            </div>
            <div className="px-4 mb-10 main-tiles-section">
                <Card className="main-tiles p-0">
                    <CardRow className="inner-tiles">
                        <CardStatus className="tiles-title" title={100} />
                        <img src={ProductTempImg} className="w-24 h-24" />
                        <CardStatus className="tiles-title-bottom" title={"Products Sent"} />
                    </CardRow>
                </Card>
            </div>
            <div className="px-4 mb-10 main-tiles-section">
                <Card className="main-tiles p-0">
                    <CardRow className="inner-tiles">
                        <CardStatus className="tiles-title" title={100} />
                        <img src={FeedbackImg} className="w-24 h-24" />
                        <CardStatus className="tiles-title-bottom" title={"Reports Received"} />
                    </CardRow>
                </Card>
            </div> */}
            {/* <span style={{ cursor: "pointer" }} onClick={() => navigate('/admin/factory')}>
                <StatusCard
                    color="pink"
                    icon="groups"
                    title="Factory"
                    amount={Factories}
                // percentage="3.48"
                // percentageIcon="arrow_upward"
                // percentageColor="green"
                // date="Since last month"
                />
            </span> */}

            {/* <span style={{ cursor: "pointer" }} onClick={() => navigate('/admin/distributer')}>
                <StatusCard
                    color="purple"
                    icon="groups"
                    title="Distributer"
                    amount={Distributer}
                // percentage="1.10"
                // percentageIcon="arrow_downward"
                // percentageColor="orange"
                // date="Since yesterday"
                />
            </span> */}

            {/* <span style={{ cursor: "pointer" }} onClick={() => navigate('/admin/retailer')}>

                <StatusCard
                    color="orange"
                    icon="groups"
                    title="Retailer"
                    amount={Retailer}
                // percentage="3.48"
                // percentageIcon="arrow_downward"
                // percentageColor="red"
                // date="Since last week"
                />
            </span> */}
        </>
    )
}
export default MainStatusCard