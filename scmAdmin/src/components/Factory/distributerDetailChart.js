import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getAllLevelFails, sentProductListByFactory } from "Services/action";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-tailwind/react/Button";

const DistributerDetailChart = () => {

  const factoryData = useSelector((state) => state.FactoryLoginData);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const data = {
      factoryID: factoryData.factoryUserId
    }
    dispatch(sentProductListByFactory(data));
  }, []);

  const initialFactoryProductSentData = useSelector((state) => state.FactorySentProductListRecord);

  let allProductSentData = initialFactoryProductSentData && initialFactoryProductSentData.factorySentProductRec.message;


  var totalProduct = 0
  for (let i = 0; i < allProductSentData?.length; i++) {
    totalProduct = totalProduct + allProductSentData[i].Products
  }


  let AuthenticationLevelData = [];

  for (let i = 0; i < allProductSentData?.length; i++) {

    let value = allProductSentData[i].Products / totalProduct * 100;
    let args = Math.round(value);

    AuthenticationLevelData.push({
      name: allProductSentData[i].Name,
      value: args,
      productQty: allProductSentData[i].Products
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
