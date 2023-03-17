import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDistributer, getFactory, getRetailers } from 'Services/action';
import StatusCard from "./StatusCard";
import { useNavigate } from 'react-router-dom';


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Card from '@material-tailwind/react/Card';
import CardRow from '@material-tailwind/react/CardRow';
import CardStatus from '@material-tailwind/react/CardStatus';

import DashboardImg from 'assets/img/distributer.png';
import ProductTempImg from 'assets/img/products-template.png';
import BatchImg from 'assets/img/batches-sent.png';
import FeedbackImg from 'assets/img/reports.png';



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
                <div className="px-5 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={DashboardImg} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Distributer"} />
                        </CardRow>
                    </Card>
                </div>
                <div className="px-5 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={DashboardImg} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Distributer"} />
                        </CardRow>
                    </Card>
                </div>
                <div className="px-5 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={DashboardImg} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Distributer"} />
                        </CardRow>
                    </Card>
                </div>
                <div className="px-5 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={DashboardImg} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Distributer"} />
                        </CardRow>
                    </Card>
                </div>
                <div className="px-5 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={DashboardImg} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Distributer"} />
                        </CardRow>
                    </Card>
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