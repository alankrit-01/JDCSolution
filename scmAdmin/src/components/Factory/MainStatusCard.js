import React, { useEffect, useMemo, useState } from "react";
import StatusCard from "./StatusCard";
import { getProductTemplate, getBatchTemplate } from 'Services/action';
import {useDispatch, useSelector } from "react-redux";
const MainStatusCard = () => {
    const dispatch = useDispatch();

    const factoryData = useSelector((state) => state.FactoryLoginData);
    const [factoryUserId, setFactoryUserId] = useState(factoryData.factoryUserId);
    const [allBatchData, setAllBatchData] = useState([]);
    const [ProductTemplates, setProductTemplates] = useState(0);   
    useEffect(() => {
        const data = {
            factoryID:factoryUserId
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
            <StatusCard
                color="purple"
                icon="groups"
                title="All Products"
                //amount={ProductTemplates.length && ProductTemplates.length}
            // percentage="1.10"
            // percentageIcon="arrow_downward"
            // percentageColor="orange"
            // date="Since yesterday"
            />
            <StatusCard
                color="Blue"
                icon="groups"
                title="All Batchs"
                //amount={allBatchData.length && allBatchData.length}
            // percentage="12" 
            // percentageIcon="arrow_upward"
            // percentageColor="green"
            // date="Since last month"
            />
        </>
    )
}
export default MainStatusCard