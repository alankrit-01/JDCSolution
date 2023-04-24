import React from 'react';
import degreeBatch from "assets/img/degree3.jpg";

function ProgressCard() {
  return (
    <>
      <div className="grid grid-cols-1 ml-7 mb-2  bg-[#0c3f6a]  w-96 h-full">
        <div className=" text-white "><h5 className='mt-1 p-1  ml-3'>All Products</h5></div>
        {/* <div className="px-0  main-tiles-section  inline-flex mt-3  bg-red-400"> */}
        <div className=" w-full h-full  bg-[#EDF6FB] py-12  text-left ">
          <div>


            <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
              Scans Done
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
              <div className="bg-yellow-600 h-2.5 rounded-full text-yellow-700 dark:text-yellow-500"><span className="ml-28 ">225</span> </div>
            </div>
          </div>
          <br></br>


          <div>

            <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
              Frauds Detected
            </div>
            <div className="w-20 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
              <div className="bg-red-600 h-2.5 rounded-full  text-red-700 dark:text-red-500"><span className="ml-24 mt-0">75</span></div>
            </div>
          </div>
          <br></br>

        </div>


        {/* </div> */}

      </div>
    </>
  )
}

export default ProgressCard