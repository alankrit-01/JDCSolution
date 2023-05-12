import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getSuperAdminStatistics } from 'Services/action';
import { useDispatch, useSelector } from 'react-redux';
import warningimg from "assets/img/warning.png";

const DashboardWarningChart = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [TotalProductsNotValidatedByDistributor, setTotalProductsNotValidatedByDistributor] = useState([]);
   const [TotalProductsNotValidatedByRetailer, setTotalProductsNotValidatedByRetailer] = useState([]);
   const [TotalLocationMisMatch, setTotalLocationMisMatch] = useState([]);
   const [TotalWarnings, setTotalWarnings] = useState([]);


   useEffect(() => {
      dispatch(getSuperAdminStatistics())
   }, [])
   const SuperAdminStaticsRecord = useSelector((state) => state.SuperAdminStaticsRecord);

   useEffect(() => {
      setTotalProductsNotValidatedByDistributor(SuperAdminStaticsRecord?.superAdminStaticsRec?.productsNotValidatedByDistributor)
      setTotalProductsNotValidatedByRetailer(SuperAdminStaticsRecord?.superAdminStaticsRec?.productsNotValidatedByRetailer)
      setTotalLocationMisMatch(SuperAdminStaticsRecord?.superAdminStaticsRec?.locationMismatch)
      setTotalWarnings(SuperAdminStaticsRecord?.superAdminStaticsRec?.totalWarnings)

   }, [SuperAdminStaticsRecord])

   let prodNotValidByDistPer = TotalProductsNotValidatedByDistributor / TotalWarnings * 100;
   prodNotValidByDistPer = Math.round(prodNotValidByDistPer);

   let prodNotValidByRetPer = TotalProductsNotValidatedByRetailer / TotalWarnings * 100;
   prodNotValidByRetPer = Math.round(prodNotValidByRetPer);

   let prodLocationMisMatch = TotalLocationMisMatch / TotalWarnings * 100;
   prodLocationMisMatch = Math.round(prodLocationMisMatch);

   const AuthenticationLevelCOLORS = ["#33cc33", "#ff6699", "#33cccc"];
   const AuthenticationLevelData = [
      {
         name: "Products not validated by distributer",
         value: prodNotValidByDistPer && prodNotValidByDistPer
      },
      {
         name: "Products not validated by Retailer",
         value: prodNotValidByRetPer && prodNotValidByRetPer
      },
      {
         name: "Location Mismatch",
         value: prodLocationMisMatch && prodLocationMisMatch
      }
   ];

   const AuthenticationLevelTooltip = ({ active, payload, label }) => {
      if (active) {
         return (
            <div className="custom-tooltip" style={{ backgroundColor: "#ffff", padding: "5px", border: "1px solid #cccc" }}>
               <label>{`${payload[0].name} : ${payload[0].value}`} %</label>
            </div>
         );
      }
      return null;
   };

   return (
      <div className="px-4 mb-10  h- full  bg-[#EDF6FB] ml-9 ">
         <h2 className="heading-background w-96 -ml-4 flex mr-4"><img className="w-8" src={warningimg} />Warnings</h2>
         {TotalProductsNotValidatedByDistributor && TotalProductsNotValidatedByRetailer && TotalLocationMisMatch == 0 ? <div className="no-record mt-20">No Product Received</div> : null}
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
                     fill={AuthenticationLevelCOLORS[index % AuthenticationLevelCOLORS.length]}
                  />
               ))}
            </Pie>
            <Tooltip content={<AuthenticationLevelTooltip />} />
         </PieChart>
         <div className="productData">
            <p className="productName" style={{ color: "#33cc33" }} > {"Products not validated by distributer"} ------------ {TotalProductsNotValidatedByDistributor && TotalProductsNotValidatedByDistributor}</p>
            <p className="productName" style={{ color: "#ff6699" }} > {"Products not validated by Retailer"} ------------ {TotalProductsNotValidatedByRetailer && TotalProductsNotValidatedByRetailer}</p>
            <p className="productName" style={{ color: "#33cccc" }} > {"Location Mismatch"} ------------ {TotalLocationMisMatch && TotalLocationMisMatch}</p>
         </div>
      </div>
   )
}
export default DashboardWarningChart;

