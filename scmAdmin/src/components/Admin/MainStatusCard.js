import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDistributer, getFactory, getRetailers } from 'Services/action';
import StatusCard from "./StatusCard";
import { useNavigate } from 'react-router-dom';



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

    
    return (
        <>
            <span style={{ cursor: "pointer" }} onClick={() => navigate('/admin/factory')}>
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
            </span>
            
            <span style={{ cursor: "pointer" }} onClick={() => navigate('/admin/distributer')}>
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
            </span>

            <span style={{ cursor: "pointer" }} onClick={() => navigate('/admin/retailer')}>

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
            </span>

            {/* <StatusCard
                color="blue"
                icon="groups"
                title="Products"
                amount="10"
            // percentage="12"
            // percentageIcon="arrow_upward"
            // percentageColor="green"
            // date="Since last month"
            /> */}


        </>
    )
}
export default MainStatusCard