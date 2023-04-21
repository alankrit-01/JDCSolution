import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { distributerBatchProductChartData } from "Services/action";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-tailwind/react/Button";

const DistributerDetailChart = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  useEffect(() => {
    const data = {
        distributorID: props?.distributerId
    }
    dispatch(distributerBatchProductChartData(data));
  }, []);

  const initialDistBatchProductChartData = useSelector((state) => state?.DistributerBatchProductChartData);

  let allProductReceived = initialDistBatchProductChartData && initialDistBatchProductChartData?.distributerBatchProductRec?.message;
let allProductReceivedData  = allProductReceived?.ProductReceivedDetail

  var totalProduct = 0
  for (let i = 0; i < allProductReceivedData?.length; i++) {
    totalProduct = totalProduct + allProductReceivedData[i].ProductsReceived

  }


  let AuthenticationLevelData = [];

  for (let i = 0; i < allProductReceivedData?.length; i++) {

    let productPercentValue = allProductReceivedData[i].ProductsReceived / totalProduct * 100;
    let productPercentValueData = Math.round(productPercentValue);

    AuthenticationLevelData.push({
      name: allProductReceivedData[i].Name,
      value: productPercentValueData,
      productQty: allProductReceivedData[i].ProductsReceived
    })
  }

  const AuthenticationLevelCOLORS = [
    "#8884d8",
    "#82ca9d",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
  ];


  const AuthenticationLevelTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}`} %</label>
        </div>
      );
    }
    return null;
  };


  return (
    <>
      <div>
        <h2 className="heading-background">Factory Products</h2>


        { initialDistBatchProductChartData.distributerBatchProductRec.message == "Result is empty" ? <div className="no-record mt-20">No Product Received</div> : null}


        <PieChart width={400} height={400}>
          <Pie
            data={AuthenticationLevelData}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          >
            {AuthenticationLevelData.map((entry, index) => (
              <Cell

                key={`cell-${index}`}
                fill={
                  AuthenticationLevelCOLORS[
                  index % AuthenticationLevelCOLORS.length
                  ]
                }
              />
            ))}
          </Pie>
          <Tooltip content={<AuthenticationLevelTooltip />} />


          {/* <Legend
            layout="vertical"
            verticalAlign="bottom"
            align="center"
          /> */}
        </PieChart>

        {AuthenticationLevelData.map((entry, index) => (
          <>
            <div className="productData">
              <p className="productName" style={{color:AuthenticationLevelCOLORS[index]}} >{entry.name} ------------ {entry.productQty}</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
export default DistributerDetailChart;
