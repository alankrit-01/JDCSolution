import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getFraudScans, getAllLevelFails } from 'Services/action';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-tailwind/react/Button';


const PieRechartComponent = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [Level1FraudScans, setLevel1FraudScans] = useState([]);
   const [Level2FraudScans, setLevel2FraudScans] = useState([]);

   const [Failedlevel1, setFailedlevel1] = useState([]);
   const [Failedlevel2, setFailedlevel2] = useState([]);
   const [Failedlevel3, setFailedlevel3] = useState([]);
   const [Failedlevel4, setFailedlevel4] = useState([]);
   const [Failedlevel5, setFailedlevel5] = useState([]);

   useEffect(() => {
      dispatch(getFraudScans())
      dispatch(getAllLevelFails())
  }, [])

  const initialFraudScansdata = useSelector((state) => state.FraudScansRecord);
  const initialFailsLeveldata = useSelector((state) => state.FailsLevelRecord);

 console.log("initialFraudScansdata", initialFraudScansdata)
  
  let allFraudScansData = initialFraudScansdata && initialFraudScansdata.fraudScansRec
  let allFailsLevelData = initialFailsLeveldata && initialFailsLeveldata.failsLevelRec


    useEffect(() => {
        let level1FailData = allFraudScansData.filter((arr) => arr?.isDistributor);
        let level2FailData = allFraudScansData.filter((arr) => arr?.isRetailere);
        setLevel1FraudScans(level1FailData)
        setLevel2FraudScans(level2FailData)

        let FailDatalevel1 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 1);
        let FailDatalevel2 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 2);
        let FailDatalevel3 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 3);
        let FailDatalevel4 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 4);
        let FailDatalevel5 = allFailsLevelData.filter((failsLevel) => failsLevel.level === 5);


        setFailedlevel1(FailDatalevel1)
        setFailedlevel2(FailDatalevel2)
        setFailedlevel3(FailDatalevel3)
        setFailedlevel4(FailDatalevel4)
        setFailedlevel5(FailDatalevel5)

    }, [initialFraudScansdata,initialFailsLeveldata])


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
             <label>{`${payload[0].name} : ${payload[0].value}`}{label}</label>
          </div>
       );
    }
    return null;
 };
 const AuthenticationLevelCOLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
 const AuthenticationLevelData = [
     {
        name: "Failed on Level 1",
        value: Failedlevel1.length && Failedlevel1.length
     },
     {
        name: "Failed on Level 2",
        value: Failedlevel2.length && Failedlevel2.length
     },
     {
        name: "Failed on Level 3",
        value: Failedlevel3.length && Failedlevel3.length
     },
     {
        name: "Failed on Level 4",
        value: Failedlevel4.length && Failedlevel4.length
     },
     {
        name: "Failed on Level 5",
        value: Failedlevel5.length && Failedlevel5.length
     }
  ];
  const AuthenticationLevelTooltip = ({ active, payload, label }) => {
     if (active) {
        return (
        <div className="custom-tooltip" style={{ backgroundColor: "#ffff", padding: "5px", border: "1px solid #cccc" }}>
           <label>{`${payload[0].name} : ${payload[0].value}`}</label>
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
       {/* <Legend /> */}
       </PieChart>
       <Button style={{float:"left"}} onClick={() => navigate('/admin/distributerscansfail')} >Distributer Scans Failed</Button>
       <Button style={{float:"left"}} onClick={() => navigate('/admin/retailerscansfail')} >Retailer Scans Failed</Button>

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
       {/* <Legend /> */}
       </PieChart>
       </div>
       </>
       );
 }
 export default PieRechartComponent;

