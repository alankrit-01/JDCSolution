import React from "react";
import Home from "pages/Front/Home";
import SuperAdminLogin from "pages/SuperAdmin/Login";
import SuperAdminDashboard from 'pages/SuperAdmin/Dashboard';
import SuperAdminSetting from 'pages/SuperAdmin/Settings';
import Company from 'pages/SuperAdmin/Company/Company';
import AddCompany from 'pages/SuperAdmin/Company/AddCompany';
import SuperAdminFactory from 'pages/SuperAdmin/Factory';
import SuperAdminDistributer from 'pages/SuperAdmin/Distributer';
import SuperAdminRetailer from 'pages/SuperAdmin/Retailer';

import AdminLogin from "pages/Admin/Login";
import FactoryLogin from "pages/Factory/Login";
import Factory from "pages/Admin/Factory";
import AddFactory from "pages/Admin/Factory/AddFactory";
import Distributer from 'pages/Admin/Distributer';
import AddDistributer from "pages/Admin/Distributer/AddDistributer";
import AddMultiUser from "pages/Admin/Distributer/AddMultiUser";
import Retailer from 'pages/Admin/Retailer';
import AddRetailer from "pages/Admin/Retailer/AddRetailer";
import Dashboard from 'pages/Admin/Dashboard';
import FactoryFeedback from 'pages/Admin/Factory/FactoryFeedback';
import DistributerFeedback from 'pages/Admin/Distributer/DistributerFeedback';
import RetailerFeedback from 'pages/Admin/Retailer/RetailerFeedback';

import FactoryDashboard from "pages/Factory/Dashboard";
import FactorySetting from 'pages/Factory/Settings';
import Products from "pages/Factory/Product";
import BatchTemplate from "pages/Factory/batchTemplate";
import AddBatchTemplate from "pages/Factory/addBatchTemplate";
import BatchQr from "pages/Factory/batchQr";
import BatchProductQr from "pages/Factory/batchProductQr";
import ProductTemplate from "pages/Factory/productTemplate";
import AddProductTemplate from "pages/Factory/addProductTemplate";
import AddProduct from "pages/Factory/addProduct";
import Setting from 'pages/Admin/Settings';


import { Route, Routes } from "react-router-dom";
const WebRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<SuperAdminLogin />} />
            <Route path="/superAdmin" index element={<SuperAdminLogin />} />
            <Route path="/superAdmin/dashboard" index element={<SuperAdminDashboard />} />
            <Route path="/superAdmin/settings" index element={<SuperAdminSetting />} />
            <Route path="/superAdmin/company" index element={<Company />} />
            <Route path="/superAdmin/addCompany" index element={<AddCompany />} />
            <Route path="/superAdmin/factory" index element={<SuperAdminFactory />} />
            <Route path="/superAdmin/distributer" index element={<SuperAdminDistributer />} />
            <Route path="/superAdmin/retailer" index element={<SuperAdminRetailer />} />
            


            
            
            <Route path="/admin" index element={<AdminLogin />} />
            <Route path="/admin/dashboard" index element={<Dashboard />} />    
            <Route path="/admin/settings" index element={<Setting />} />
            <Route path="/admin/factory" index element={<Factory />} />
            <Route path="/admin/addfactory" index element={<AddFactory />} />
            <Route path="/admin/distributer" index element={<Distributer />} />
            <Route path="/admin/adddistributer" index element={<AddDistributer />} />
            <Route path="/admin/retailer" index element={<Retailer />} />
            <Route path="/admin/addretailer" index element={<AddRetailer />} />
            <Route path="/admin/addMultiUser" index element={<AddMultiUser />} />

            
            <Route path="/admin/factoryFeedback" index element={<FactoryFeedback />} />
            <Route path="/admin/viewdistributerFeedback" index element={<Distributer />} />
            
            <Route path="/admin/distributerFeedback" index element={<DistributerFeedback />} />
            <Route path="/admin/viewdistributerFeedback" index element={<Distributer />} />

            <Route path="/admin/retailerFeedback" index element={<RetailerFeedback />} />
            <Route path="/admin/viewRetailerFeedback" index element={<Distributer />} />
            
            <Route path="/factory" index element={<FactoryLogin />} />
            <Route path="/factory/dashboard" index element={<FactoryDashboard />} />
            <Route path="/factory/settings" index element={<FactorySetting />} />

            <Route path="/factory/batchTemplate" index element={<BatchTemplate />} />
            <Route path="/factory/addBatchTemplate" index element={<AddBatchTemplate />} />
            <Route path="/factory/batchQr" index element={<BatchQr />} />
            <Route path="/factory/batchProductQr" index element={<BatchProductQr />} />

            <Route path="/factory/productTemplate" index element={<ProductTemplate />} />
            <Route path="/factory/addProductTemplate" index element={<AddProductTemplate />} />


            {/* Need Changes */}
            <Route path="/factory/product" index element={<Products />} />
            <Route path="/factory/addProduct" index element={<AddProduct />} />
            {/* End Need Changes */}

            
        </Routes>
    )
}
export default WebRoutes