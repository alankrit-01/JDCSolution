import React, { useEffect, useMemo, useState } from "react";
import StatusCard from "./StatusCard";


import Card from '@material-tailwind/react/Card';
import CardRow from '@material-tailwind/react/CardRow';
import CardStatus from '@material-tailwind/react/CardStatus';

import DashboardImg from 'assets/img/distributer.png';
import ProductTempImg from 'assets/img/products-template.png';
import BatchImg from 'assets/img/batches-sent.png';
import FeedbackImg from 'assets/img/reports.png';



import { getProductTemplate, getBatchTemplate } from 'Services/action';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
const MainStatusCard = () => {
    const dispatch = useDispatch();

    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [factoryUserId, setFactoryUserId] = useState(factoryData.factoryUserId);
    const [allBatchData, setAllBatchData] = useState([]);
    const [ProductTemplates, setProductTemplates] = useState(0);
    useEffect(() => {
        const data = {
            factoryID: factoryUserId
        }
        dispatch(getProductTemplate(data))
        dispatch(getBatchTemplate(data))
    }, [])
    const initialBatchTemplatedata = useSelector((state) => state.BatchTemplateRecord);
    const initialProductTemplatedata = useSelector((state) => state.ProductTemplateRecord);
    useEffect(() => {
        // setAllBatchData(initialBatchTemplatedata.batchTemplateRec.message)
        // setProductTemplates(initialProductTemplatedata.productTemplateRec.message)
    }, [initialProductTemplatedata, initialBatchTemplatedata])
    return (
        <>

            <div className="px-4 mb-10 main-tiles-section">
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
            </div>
            <div className="px-4 mb-10 main-tiles-section">
                <Card className="main-tiles p-0">
                    <CardRow className="inner-tiles">
                        <button className="add-batch-dashboard-section">
                            <span className="add-batch-dashboard-plus">+</span>
                            <h5 className="add-batch-dashboard-title"> ADD BATCH</h5>
                        </button>
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

        </>
    )
}
export default MainStatusCard