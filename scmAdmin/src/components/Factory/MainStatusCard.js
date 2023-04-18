import React, { useEffect, useMemo, useState } from "react";
import StatusCard from "./StatusCard";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Card from '@material-tailwind/react/Card';
import CardRow from '@material-tailwind/react/CardRow';
import CardStatus from '@material-tailwind/react/CardStatus';

import DistributerImg from 'assets/img/distributer.png';
import ProductTempImg from 'assets/img/products-template.png';
import BatchImg from 'assets/img/batches-sent.png';
import FeedbackImg from 'assets/img/Reports.png';
import ReportIssued from 'assets/img/ReportsExport.png';



import { getFactoryStatics } from 'Services/action';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
const MainStatusCard = () => {
    const dispatch = useDispatch();

    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [factoryUserId, setFactoryUserId] = useState(factoryData.factoryUserId);
    const initialFactoryStaticsdata = useSelector((state) => state.FactoryStaticsRecord);
    //  console.log("data here",initialFactoryStaticsdata)
   
    const totalDisributer = initialFactoryStaticsdata && initialFactoryStaticsdata.factoryStaticsRec.totalDisributer;
    const  totalreports = initialFactoryStaticsdata && initialFactoryStaticsdata.factoryStaticsRec.totalReport;
    const  totalBatches = initialFactoryStaticsdata && initialFactoryStaticsdata.factoryStaticsRec.totalBatches;
    const  totalProducts = initialFactoryStaticsdata && initialFactoryStaticsdata.factoryStaticsRec.totalProducts;

    
    useEffect(() => {
        const data = {
            factoryID: factoryUserId
        }
        dispatch(getFactoryStatics(data))
    }, [])
    

    const responsive = {
        superLargeDesktop: {
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
                <div className="px-4 mb-10 main-tiles-section">
                    <NavLink to="/factory/distributer">
                        <Card className="main-tiles p-0">
                            <CardRow className="inner-tiles">
                                <CardStatus className="tiles-title" title={totalDisributer && totalDisributer} />
                                <img src={DistributerImg} className="w-24 h-24" />
                                <CardStatus className="tiles-title-bottom" title={"Distributer"} />
                            </CardRow>
                        </Card>
                    </NavLink>
                </div>
                <div className="px-4 mb-10 main-tiles-section">
                    <NavLink to="/factory/batchSent">
                        <Card className="main-tiles p-0">
                            <CardRow className="inner-tiles">
                                <CardStatus className="tiles-title" title={totalBatches && totalBatches} />
                                <img src={BatchImg} className="w-24 h-24" />
                                <CardStatus className="tiles-title-bottom" title={"Batches Sent"} />
                            </CardRow>
                        </Card>
                    </NavLink>
                </div>
                <div className="px-4 mb-10 main-tiles-section">
                    <NavLink to="/factory/productTemplate">
                        <Card className="main-tiles p-0">
                            <CardRow className="inner-tiles">
                                <CardStatus className="tiles-title" title={totalProducts && totalProducts} />
                                <img src={ProductTempImg} className="w-24 h-24" />
                                <CardStatus className="tiles-title-bottom" title={"Products Sent"} />
                            </CardRow>
                        </Card>
                    </NavLink>
                </div>
                <div className="px-4 mb-10 main-tiles-section">
                <NavLink to="/factory/factorySelfReports">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={totalreports && totalreports} />
                            <img src={ReportIssued} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Reports issued"} />
                        </CardRow>
                    </Card>
                    </NavLink>
                </div>
                <div className="px-4 mb-10 main-tiles-section">
                    <Card className="main-tiles p-0">
                        <CardRow className="inner-tiles">
                            <CardStatus className="tiles-title" title={100} />
                            <img src={FeedbackImg} className="w-24 h-24" />
                            <CardStatus className="tiles-title-bottom" title={"Reports Received"} />
                        </CardRow>
                    </Card>
                </div>
                {/* <StatusCard
                color="purple"
                icon="groups"
                title="All Products"
            //amount={ProductTemplates.length && ProductTemplates.length}
            // percentage="1.10"
            // percentageIcon="arrow_downward"
            // percentageColor="orange"
            // date="Since yesterday"
            />
             */}
            </Carousel>
        </>
    )
}
export default MainStatusCard