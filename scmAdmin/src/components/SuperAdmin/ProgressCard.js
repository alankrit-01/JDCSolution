import React, { useEffect, useState } from 'react';
import degreeBatch from "assets/img/degree3.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getSuperAdminStatistics } from 'Services/action';

function ProgressCard() {

  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [TotalProductSold, setTotalProductSold] = useState([]);
    const [TotalScans, setTotalScans] = useState([]);
    const [TotalFrauds, setTotalFrauds] = useState([]);
    const [TotalWarnings, setTotalWarnings] = useState([]);

    
  useEffect(() => {
    dispatch(getSuperAdminStatistics())
}, [])
const SuperAdminStaticsRecord = useSelector((state) => state.SuperAdminStaticsRecord);

useEffect(() => {
  setTotalScans(SuperAdminStaticsRecord?.superAdminStaticsRec?.totalScans)
  setTotalProductSold(SuperAdminStaticsRecord?.superAdminStaticsRec?.totalProductSold)
  setTotalFrauds(SuperAdminStaticsRecord?.superAdminStaticsRec?.totalFrauds)
  setTotalWarnings(SuperAdminStaticsRecord?.superAdminStaticsRec?.totalWarnings)

}, [SuperAdminStaticsRecord])


  return (
    <>
      <div className="grid grid-cols-1 ml-1 mb-2  bg-[#0c3f6a]  w-92  h-88">
        <div className=" text-white "><h5 className='mt-1  ml-3'>All Products</h5></div>
        <div className="px-0  main-tiles-section  inline-flex mt-2  bg-red-400">
        <div className=" w-full h-full  bg-[#EDF6FB] py-12  text-left ">
            <div>
              <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                Scans Done
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                <div className="bg-purple-500 h-2.5 rounded-full text-purple-500 dark:text-purple-500"><span className="ml-28 ">{TotalScans && TotalScans}</span> </div>
              </div>
            </div>
            <br></br>

            <div className="product-sold">
              <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                Products sold
              </div>
              <div className="w-12 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                <div className="bg-cyan-500 h-2.5 rounded-full  text-cyan-700 dark:text-cyan-500"><span className="ml-14 mt-0">{TotalProductSold && TotalProductSold}</span></div>
              </div>

            </div>
            <br></br>
            <div>
              <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                Warnings
              </div>
              <div className="w-20 bg-yellow-200 rounded-full h-2.5 mb-4 dark:bg-yellow-700 ml-5">
                <div className="bg-yellow-600 h-2.5 rounded-full  text-yellow-700 dark:text-yellow-500"><span className="ml-24 mt-0">{TotalWarnings && TotalWarnings}</span></div>
              </div>
            </div>
            <br></br>
            <div>
              <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                Total Fakes
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                <div className="bg-red-600 h-2.5 rounded-full  text-red-700 dark:text-red-500"><span className="ml-24 mt-0">{TotalFrauds && TotalFrauds}</span></div>
              </div>
            </div>
            <br></br>
            <div className="revenue-saved">
              <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                Revenue Saved
              </div>
              <div className="w-24 bg-green-200 rounded-full h-2.5 mb-4 dark:bg-green-700 ml-5">
                <div className="bg-green-600 h-2.5 rounded-full  text-green-700 dark:text-green-500"><span className="ml-28 mt-0">$2500</span></div>
              </div>
            </div>
            <br></br>
          </div>

          <div className=" w-full h-full  bg-[#B9CCDA] py-20 text-center authentic-certificate">
            <div>
              <h4>Authenticity</h4>
              <h4>Certificates</h4>
              <h4>Generated</h4>
            </div>
            <div className=" w-12 h-12 py-2 mt-5 ml-16 ">
              <img src={degreeBatch} />
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default ProgressCard