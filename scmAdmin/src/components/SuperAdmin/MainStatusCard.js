import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCompany, getDistributer, getFactory, getRetailers } from 'Services/action';
import StatusCard from "./StatusCard";
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const MainStatusCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Company, setCompany] = useState([]);
    const [Distributer, setDistributer] = useState([]);
    const [Factories, setFactories] = useState([]);
    const [Retailer, setRetailer] = useState([]);

    useEffect(() => {
        dispatch(getCompany())
        dispatch(getDistributer())
        dispatch(getFactory())
        dispatch(getRetailers())
    }, [])

    const initialCompanydata = useSelector((state) => state.CompanyRecord);
    const initialdata = useSelector((state) => state.DistributerRecord);
    const initialFactorydata = useSelector((state) => state.FactoryRecord);
    const initialRetailerdata = useSelector((state) => state.RetailerRecord);
    useEffect(() => {
        setCompany(initialCompanydata.companyRec.length && initialCompanydata.companyRec.length)
        setDistributer(initialdata.distributerRec.length && initialdata.distributerRec.length)
        setFactories(initialFactorydata.factoryRec.length && initialFactorydata.factoryRec.length)
        setRetailer(initialRetailerdata.retailerRec.length && initialRetailerdata.retailerRec.length)
    }, [initialdata, initialFactorydata, initialRetailerdata])



    return (
        <>
            <span style={{cursor: "pointer"}} onClick={() => navigate('/superAdmin/company')}>
                <StatusCard
                    color="blue"
                    icon="groups"
                    title="Company"
                    amount={Company}
                // percentage="12"
                // percentageIcon="arrow_upward"
                // percentageColor="green"
                // date="Since last month"
                />
            </span>
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



        </>
    )
}
export default MainStatusCard