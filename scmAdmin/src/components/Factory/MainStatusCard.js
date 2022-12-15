import React from "react";
import StatusCard from "./StatusCard";
const MainStatusCard = () => {

    return (
        <>
            {/* <StatusCard
                color="pink"
                icon="groups"
                title="Factory"
                amount="1"
            // percentage="3.48"
            // percentageIcon="arrow_upward"
            // percentageColor="green"
            // date="Since last month"
            /> */}
            <StatusCard
                color="purple"
                icon="groups"
                title="Distributer"
                amount="10"
            // percentage="1.10"
            // percentageIcon="arrow_downward"
            // percentageColor="orange"
            // date="Since yesterday"
            />
            <StatusCard
                color="orange"
                icon="groups"
                title="Retailer"
                amount="20"
            // percentage="3.48"
            // percentageIcon="arrow_downward"
            // percentageColor="red"
            // date="Since last week"
            />

            <StatusCard
                color="blue"
                icon="groups"
                title="Products"
                amount="10"
            // percentage="12"
            // percentageIcon="arrow_upward"
            // percentageColor="green"
            // date="Since last month"
            />
        </>
    )
}
export default MainStatusCard