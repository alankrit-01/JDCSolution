import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getFraudScans } from 'Services/action';
import { useDispatch, useSelector } from 'react-redux';


const PieRechartComponent = () => {
   const dispatch = useDispatch();

   const [Level1FraudScans, setLevel1FraudScans] = useState([]);
   const [Level2FraudScans, setLevel2FraudScans] = useState([]);

   useEffect(() => {
      dispatch(getFraudScans())
  }, [])

  const initialFraudScansdata = useSelector((state) => state.FraudScansRecord);
  let allFraudScansData = initialFraudScansdata.fraudScansRec
    useEffect(() => {
        let level1FailData = allFraudScansData.filter((arr) => arr.isDistributor === true);
        let level2FailData = allFraudScansData.filter((arr) => arr.isRetailer === true);
        setLevel1FraudScans(level1FailData)
        setLevel2FraudScans(level2FailData)

    }, [initialFraudScansdata])

   const COLORS = ["#8884d8", "#82ca9d"];
   const pieData = [
       {
          name: "Distributer Scans Failed",
          value: Level1FraudScans.length
       },
       {
          name: "Retailer Scans Failed",
          value: Level2FraudScans.length
       },
    ];
    const CustomTooltip = ({ active, payload, label }) => {
       if (active) {
          return (
          <div className="custom-tooltip" style={{ backgroundColor: "#ffff", padding: "5px", border: "1px solid #cccc" }}>
             <label onClick={() => Navigate('/factory/BatchQr', { state: { BatchID: "2" } })}>{`${payload[0].name} : ${payload[0].value}`}</label>
          </div>
       );
    }
    return null;
 };
 




 
 const AuthenticationLevelCOLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
 const AuthenticationLevelData = [
     {
        name: "Failed on Level 1",
        value: 30
     },
     {
        name: "Failed on Level 2",
        value: 20
     },
     {
        name: "Failed on Level 3",
        value: 16
     },
     {
        name: "Failed on Level 4",
        value: 16
     },
     {
        name: "Failed on Level 5",
        value: 70
     }
  ];
  const AuthenticationLevelTooltip = ({ active, payload, label }) => {
     if (active) {
        return (
        <div className="custom-tooltip" style={{ backgroundColor: "#ffff", padding: "5px", border: "1px solid #cccc" }}>
           <label onClick={() => Navigate('/factory/BatchQr', { state: { BatchID: "2" } })}>{`${payload[0].name} : ${payload[0].value}`}</label>
        </div>
     );
  }
  return null;
};



    return (
      <>
      <div  style={{width: "50%",float:"left"}}>
      <h2>Distributer & Retailer Scan Fail History</h2>
       <PieChart width={400} height={400}>
       <Pie
          data={pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
       >
          {pieData.map((entry, index) => (
             <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
             />
          ))}
       </Pie>
       <Tooltip content={<CustomTooltip />} />
       <Legend />
       </PieChart>
       </div>
       <div style={{width: "50%",float:"right"}}>
      <h2>Authentication Fail History</h2>
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
       <Legend />
       </PieChart>
       </div>
       </>
       );
 }
 export default PieRechartComponent;







//  import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


// const PieRechartComponent = () => {

//    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];

//    const pieData = [
//       {
//          name: "Failed on Level 1",
//          value: 54
//       },
//       {
//          name: "Failed on Level 2",
//          value: 47
//       },
//       {
//          name: "Failed on Level 3",
//          value: 16
//       },
//       {
//          name: "Failed on Level 4",
//          value: 16
//       },
//       {
//          name: "Failed on Level 5",
//          value: 10
//       }
//    ];


//    return (
//       <PieChart width={730} height={300}>
//          <Pie
//             data={pieData}
//             color="#000000"
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             fill="#8884d8"
//          >
//             {pieData.map((entry, index) => (
//                <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                />
//             ))}
//          </Pie>
//          <Legend />
//       </PieChart>

//    );
// }

// export default PieRechartComponent;




