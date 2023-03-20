import React from 'react';
import degreeBatch from "assets/img/degree3.jpg";

function ProgressCard() {
  return (
    <>
    <div className="grid grid-cols-1 ml-7 mb-4  bg-blue-900  w-96 h-full">
            <div className=" text-white mt-5 ml-3">Product Name</div>
            <div className="px-0  main-tiles-section  inline-flex mt-5  bg-red-400">
              <div className=" w-60 h-96  bg-gray-200 py-12  text-left ">
                <div>
                  {/* <h4>Scans Done</h4> */}

                  <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                    Scans Done
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                    <div className="bg-yellow-600 h-2.5 rounded-full text-yellow-700 dark:text-yellow-500"><span className="ml-28 ">225</span> </div>
                  </div>
                </div>
                <br></br>

                <div>
                  {/* <h4>Products sold</h4> */}
                  <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                  Products sold
                  </div>
                  <div className="w-12 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                    <div className="bg-blue-600 h-2.5 rounded-full  text-blue-700 dark:text-blue-500"><span className="ml-14 mt-0">15</span></div>
                  </div>

                </div>
                <br></br>
                <div>
                  {/* <h4>Frauds Detected</h4> */}
                  <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                  Frauds Detected
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                    <div className="bg-red-600 h-2.5 rounded-full  text-red-700 dark:text-red-500"><span className="ml-24 mt-0">75</span></div>
                  </div>
                </div>
                <br></br>
                <div>
                  {/* <h4>Revenue Saved</h4> */}
                  <div className="mb-1 text-base font-medium text-black-700 dark:text-black-500 ml-5">
                  Revenue Saved
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 ml-5">
                    <div className="bg-green-600 h-2.5 rounded-full  text-green-700 dark:text-green-500"><span className="ml-28 mt-0">$2500</span></div>
                  </div>
                </div>
                <br></br>
              </div>

              <div className=" w-60 h-96  bg-gray-500 py-20 text-center">
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