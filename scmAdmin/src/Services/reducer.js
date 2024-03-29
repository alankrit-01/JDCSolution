import { combineReducers } from "redux";
import { GETDETAILS, Set_User_Detail, SuperAdminUserLogin, Set_SuperAdmin_Login, SuperAdmin_Login_Fail, set_SuperAdmin_Local_Store_Data, Set_Handle_User_Status_Data, Set_Handle_User_Status_Data_Fail,Set_Reset_Company_Data, Store_Company, Store_Company_Request, Set_Store_Company_Data, Set_Store_Company_Data_Fail, Set_Store_Company_Data_Already_Exist, Check_Company_Success_data_1, Get_Company, Set_Company_List, Set_Fraud_Scans_List, Set_All_Level_Fails_List, Set_SuperAdmin_Logout, AdminUserLogin, Set_Admin_Login, Admin_Login_Fail, Get_Local_Store_Data, set_Local_Store_Data, Set_Retailer_By_Company_List, Set_Retailer_List, Set_Factory_List, Set_Factory_By_Company_List, Set_Distributer_List, Set_Distributer_By_Company_List, Set_Admin_Logout, FactoryUserLogin, Factory_Login_Invalid, Set_Factory_Login, Factory_Login_Fail, set_Factory_Local_Store_Data, Set_Factory_Logout, Store_Factory, Set_Reset_Factory_Data, Store_Factory_Request, Set_Store_Factory_Data, Set_Store_Factory_Data_Already_Exist, Set_Store_Factory_Data_Fail, Check_Factory_Success_data, Check_Factory_Success_data_1, Store_Distributer, Set_Reset_Distributer_Data, Set_Store_Distributer_Data, Set_Store_Distributer_Data_Fail, Store_Distributer_Request, Check_Distributer_Success_data, Check_Distributer_Success_data_1, Store_Retailer, Set_Store_Retailer_Data, Set_Store_Retailer_Data_Fail, Store_Retailer_Request, Check_Retailer_Success_data, Check_Retailer_Success_data_1, Set_Self_Report_List, Set_Reset_Factory_Report_Data, Set_Store_Factory_Report_Data, Set_Store_Factory_Report_Data_Fail, Store_Company_Feedback, Set_Store_Company_Feedback_Data, Set_Store_Company_Feedback_Data_Fail, Store_Company_Feedback_Request, Check_Company_Feedback_Success_data, Check_Company_Feedback_Success_data_1, Store_Multi_User, Store_Product_Template, Set_Store_Product_Template_Data, Set_Store_Product_Template_Data_Fail, Set_Reset_Product_Template_Data, Store_Product_Template_Request, Check_Product_Template_Success_data, Check_Product_Template_Success_data_1, Get_Product_Template, Set_Product_Template_List, Store_Batch_Template, Set_Store_Batch_Template_Data, Set_Store_Batch_Template_Data_Fail, Store_Batch_Template_Request, Check_Batch_Template_Success_data, Check_Batch_Template_Success_data_1, Set_Batch_Sent_To_Distributer, Set_Batch_By_Distributer, Get_Batch_Template, Set_Batch_Template_List, Get_Batch_Detail, Set_Reset_Batch_Template_Data, Set_Batch_Detail_List, Set_Feedback_List, Set_Self_Feedback_List, Set_Store_Distributer_Data_Already_Exist, Set_Store_Retailer_Data_Already_Exist, Set_Reset_Retailer_Data, Admin_Login_Invalid, SuperAdmin_Login_Invalid, Set_Reset_Login_Data, Get_Factory_Statics, Set_Factory_Statics_List, Get_Ceo_Statistics, Set_Ceo_Statistics, Get_SuperAdmin_Statistics, Set_SuperAdmin_Statistics, Set_Factory_Sent_Product_List, Set_Distributer_Batch_Product_Chart, Set_Total_Scan_Data, Set_Batch_Product_For_Ceo, Set_Batch_Product_For_SuperAdmin, Set_All_Report_For_SuperAdmin, Set_All_Report_For_Ceo, Set_Retailer_Batch_Product_Chart } from "./constant";
const data = {
    error: ""
}

const superAdminData = {
    error: "",
    superAdminUserId: "",
    superAdminUserName: "",
    superAdminUserEmail: "",
    superAdminUserPhone: "",
    superAdmintoken: "",
    superAdminUserRole: "",
    superAdminUserAddress: "",
    superAdminUserCity: "",
    superAdminUserCountry: "",
    superAdminUserLatitude: "",
    superAdminUserLongitude: "",
    store_request: false,
    success: false,
    error: false,
}
const companyStoreData = {
    store_request: false,
    success: false,
    error: false,
}
const userStatusData = {
    store_request: false,
    success: false,
    error: false,
}
const companyData = {
    error: "",
    companyRec: [],
}
const adminData = {
    error: "",
    adminUserId: "",
    superAdminId: "",
    adminUsername: "",
    adminUserEmail: "",
    adminUserPhone: "",
    admintoken: "",
    adminUserRole: "",
    adminUserAddress: "",
    adminUserCity: "",
    adminUserCountry: "",
    adminUserLatitude: "",
    adminUserLongitude: "",
    store_request: false,
    success: false,
    error: false,
}
const userDetailData = {
    error: "",
    userDetailRec: [],
}
const retailerData = {
    error: "",
    retailerRec: [],
}
const factoryData = {
    error: "",
    factoryRec: [],
}
const distributerData = {
    error: "",
    distributerRec: [],
}
const fraudScansData = {
    error: "",
    fraudScansRec: [],
}
const failsLevelData = {
    error: "",
    failsLevelRec: [],
}
const productTemplateData = {
    error: "",
    productTemplateRec: [],
}
const batchTemplateData = {
    error: "",
    batchTemplateRec: [],
}
const batchSentData = {
    error: "",
    batchSentRec: [],
}
const batchDetailData = {
    error: "",
    batchDetailRec: [],
}
const feedbackData = {
    error: "",
    feedbackRec: [],
}
const selffeedbackData = {
    error: "",
    selffeedbackRec: [],
}
const selfreportData = {
    error: "",
    selfReportRec: [],
}

const factoryStaticsData = {
    error: "",
    factoryStaticsRec: [],
}
const ceoStaticsData = {
    error: "",
    ceoStaticsRec: [],
}

const superAdminStaticsData = {
    error: "",
    superAdminStaticsRec: [],
}

const factorySentProductData = {
    error: "",
    factorySentProductRec: [],
}
const distributerBathProdChartData = {
    error: "",
    distributerBatchProductRec: [],
}

const retailerBatchProdChartData = {
    error: "",
    retailerBatchProductRec: [],
}

const totalScannnedData = {
    error: "",
    totalScansRec: [],
}
const allReportCeoData = {
    error: "",
    reportScansRec: [],
}
const allReportSuperAdminData = {
    error: "",
    reportScansRec: [],
}


const allBatchProductCeoData = {
    error: "",
    batchProductForCeoRec: [],
}

const allBatchProductSuperAdminData = {
    error: "",
    batchProductForSuperADminRec: [],
}


/////// Start Factory Module ///



const factoryloginRec = {
    error: "",
    factoryUserId: "",
    factoryUserAdminId: "",
    factoryUsername: "",
    factoryUserEmail: "",
    factorytoken: "",
    factoryUserRole: "",
    factoryUserAddress: "",
    store_request: false,
    success: false,
    error: false,
}

const factoryStoreData = {
    store_request: false,
    success: false,
    error: false,
}
const distributerStoreData = {
    store_request: false,
    success: false,
    error: false,
}
const retailerStoreData = {
    store_request: false,
    success: false,
    error: false,
}
const companyFeedbackStoreData = {
    store_request: false,
    success: false,
    error: false,
}
const factoryReportData = {
    store_request: false,
    success: false,
    error: false,
}
const multiUserStoreData = {
    store_request: false,
    success: false,
    error: false,
}

const storeProductTemplateData = {
    store_request: false,
    success: false,
    error: false,
}
const storeBatchTemplateData = {
    store_request: false,
    success: false,
    error: false,
}


///// End Factory Module /////


export const Details = (initialdata = data, action) => {
    switch (action.type) {
        case GETDETAILS:
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}

export const UserDetailRecord = (initialdata = userDetailData, action) => {
    switch (action.type) {
        case Set_User_Detail:
            initialdata = { ...initialdata, userDetailRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const SuperAdminLoginData = (initialdata = superAdminData, action) => {
    switch (action.type) {
        case SuperAdminUserLogin:
            return initialdata;
            break;
        case SuperAdmin_Login_Invalid:
            initialdata = { ...initialdata, error: action.result.message }
            return initialdata;
            break;
        case Set_SuperAdmin_Login:

            let userId = localStorage.getItem('superAdminUserId');
            initialdata = { ...initialdata, superAdminUserId: userId }
            let username = localStorage.getItem('superAdminUserName');
            initialdata = { ...initialdata, superAdminUserName: username }
            let userEmail = localStorage.getItem('superAdminUserEmail');
            initialdata = { ...initialdata, superAdminUserEmail: userEmail }
            let userPhone = localStorage.getItem('superAdminUserPhone');
            initialdata = { ...initialdata, superAdminUserPhone: userPhone }
            let token = localStorage.getItem('superAdmintoken');
            initialdata = { ...initialdata, superAdmintoken: token }
            let userRole = localStorage.getItem('superAdminUserRole');
            initialdata = { ...initialdata, superAdminUserRole: userRole }
            let userAddress = localStorage.getItem('superAdminUserAddress');
            initialdata = { ...initialdata, superAdminUserAddress: userAddress }
            let userCity = localStorage.getItem('superAdminUserCity');
            initialdata = { ...initialdata, superAdminUserCity: userCity }
            let userCountry = localStorage.getItem('superAdminUserCountry');
            initialdata = { ...initialdata, superAdminUserCountry: userCountry }
            let userLatitude = localStorage.getItem('superAdminUserLatitude');
            initialdata = { ...initialdata, superAdminUserLatitude: userLatitude }
            let userLongitude = localStorage.getItem('superAdminUserLongitude');
            initialdata = { ...initialdata, superAdminUserLongitude: userLongitude }

            return initialdata;
            break;
        case SuperAdmin_Login_Fail:
            return initialdata;
            break;
        case set_SuperAdmin_Local_Store_Data:
            let userId1 = localStorage.getItem('superAdminUserId');
            initialdata = { ...initialdata, superAdminUserId: userId1 }
            let username1 = localStorage.getItem('superAdminUserName');
            initialdata = { ...initialdata, superAdminUserName: username1 }
            let userEmail1 = localStorage.getItem('superAdminUserEmail');
            initialdata = { ...initialdata, superAdminUserEmail: userEmail1 }
            let userPhone1 = localStorage.getItem('superAdminUserPhone');
            initialdata = { ...initialdata, superAdminUserPhone: userPhone1 }
            let token1 = localStorage.getItem('superAdmintoken');
            initialdata = { ...initialdata, superAdmintoken: token1 }
            let userRole1 = localStorage.getItem('superAdminUserRole');
            initialdata = { ...initialdata, superAdminUserRole: userRole1 }
            let userAddress1 = localStorage.getItem('superAdminUserAddress');
            initialdata = { ...initialdata, superAdminUserAddress: userAddress1 }
            let userCity1 = localStorage.getItem('superAdminUserCity');
            initialdata = { ...initialdata, superAdminUserCity: userCity1 }
            let userCountry1 = localStorage.getItem('superAdminUserCountry');
            initialdata = { ...initialdata, superAdminUserCountry: userCountry1 }
            let userLatitude1 = localStorage.getItem('superAdminUserLatitude');
            initialdata = { ...initialdata, superAdminUserLatitude: userLatitude1 }
            let userLongitude1 = localStorage.getItem('superAdminUserLongitude');
            initialdata = { ...initialdata, superAdminUserLongitude: userLongitude1 }
            return initialdata;
            break;
        case Set_SuperAdmin_Logout:
            localStorage.removeItem('superAdminUserId');
            localStorage.removeItem('superAdminUserName');
            localStorage.removeItem('superAdminUserEmail');
            localStorage.removeItem('superAdminUserPhone');
            localStorage.removeItem('superAdmintoken');
            localStorage.removeItem('superAdminUserRole');
            localStorage.removeItem('superAdminUserAddress');
            localStorage.removeItem('superAdminUserCity');
            localStorage.removeItem('superAdminUserCountry');
            localStorage.removeItem('superAdminUserLatitude');
            localStorage.removeItem('superAdminUserLongitude');
            initialdata = { ...initialdata, superAdminUserId: "" }
            initialdata = { ...initialdata, superAdminUserName: "" }
            initialdata = { ...initialdata, superAdminUserEmail: "" }
            initialdata = { ...initialdata, superAdminUserPhone: "" }
            initialdata = { ...initialdata, superAdmintoken: "" }
            initialdata = { ...initialdata, superAdminUserRole: "" }
            initialdata = { ...initialdata, superAdminUserAddress: "" }
            initialdata = { ...initialdata, superAdminUserCity: "" }
            initialdata = { ...initialdata, superAdminUserCountry: "" }
            initialdata = { ...initialdata, superAdminUserLatitude: "" }
            initialdata = { ...initialdata, superAdminUserLongitude: "" }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}



export const handleUserStatusData = (initialdata = userStatusData, action) => {
    switch (action.type) {
        case Set_Handle_User_Status_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Handle_User_Status_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}

export const CompanyStoreData = (initialdata = companyStoreData, action) => {
    switch (action.type) {
        case Store_Company:
            return initialdata;
            break;
        case Set_Reset_Company_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Store_Company_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;
        case Set_Store_Company_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Check_Company_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Company_Data_Already_Exist:
            initialdata = { ...initialdata, error: 'Already Exist', store_request: false, success: false }
            return initialdata;
            break;
        case Set_Store_Company_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}
export const CompanyRecord = (initialdata = companyData, action) => {
    switch (action.type) {
        case Get_Company:
            return initialdata
            break;
        case Set_Company_List:
            initialdata = { ...initialdata, companyRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const AdminLoginData = (initialdata = adminData, action) => {
    switch (action.type) {
        case AdminUserLogin:
            return initialdata;
            break;
        case Set_Reset_Login_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Admin_Login_Invalid:
            initialdata = { ...initialdata, error: action.result.message }
            return initialdata;
            break;
        case Set_Admin_Login:
            let userId = localStorage.getItem('adminUserId');
            initialdata = { ...initialdata, adminUserId: userId }
            let superAdminId = localStorage.getItem('superAdminId');
            initialdata = { ...initialdata, superAdminId: superAdminId }
            let username = localStorage.getItem('adminUserName');
            initialdata = { ...initialdata, adminUserName: username }
            let userEmail = localStorage.getItem('adminUserEmail');
            initialdata = { ...initialdata, adminUserEmail: userEmail }
            let userPhone = localStorage.getItem('adminUserPhone');
            initialdata = { ...initialdata, adminUserPhone: userPhone }
            let token = localStorage.getItem('admintoken');
            initialdata = { ...initialdata, admintoken: token }
            let userRole = localStorage.getItem('adminUserRole');
            initialdata = { ...initialdata, adminUserRole: userRole }
            let userAddress = localStorage.getItem('adminUserAddress');
            initialdata = { ...initialdata, adminUserAddress: userAddress }
            let userCity = localStorage.getItem('adminUserCity');
            initialdata = { ...initialdata, adminUserCity: userCity }
            let userCountry = localStorage.getItem('adminUserCountry');
            initialdata = { ...initialdata, adminUserCountry: userCountry }
            let userLatitude = localStorage.getItem('adminUserLatitude');
            initialdata = { ...initialdata, adminUserLatitude: userLatitude }
            let userLongitude = localStorage.getItem('adminUserLongitude');
            initialdata = { ...initialdata, adminUserLongitude: userLongitude }

            return initialdata;
            break;
        case Admin_Login_Fail:
            return initialdata;
            break;
        case set_Local_Store_Data:
            let userId1 = localStorage.getItem('adminUserId');
            initialdata = { ...initialdata, adminUserId: userId1 }
            let superAdminId1 = localStorage.getItem('superAdminId');
            initialdata = { ...initialdata, superAdminId: superAdminId1 }
            let username1 = localStorage.getItem('adminUserName');
            initialdata = { ...initialdata, adminUserName: username1 }
            let userEmail1 = localStorage.getItem('adminUserEmail');
            initialdata = { ...initialdata, adminUserEmail: userEmail1 }
            let userPhone1 = localStorage.getItem('adminUserPhone');
            initialdata = { ...initialdata, adminUserPhone: userPhone1 }
            let token1 = localStorage.getItem('admintoken');
            initialdata = { ...initialdata, admintoken: token1 }
            let userRole1 = localStorage.getItem('adminUserRole');
            initialdata = { ...initialdata, adminUserRole: userRole1 }
            let userAddress1 = localStorage.getItem('adminUserAddress');
            initialdata = { ...initialdata, adminUserAddress: userAddress1 }
            let userCity1 = localStorage.getItem('adminUserCity');
            initialdata = { ...initialdata, adminUserCity: userCity1 }
            let userCountry1 = localStorage.getItem('adminUserCountry');
            initialdata = { ...initialdata, adminUserCountry: userCountry1 }
            let userLatitude1 = localStorage.getItem('adminUserLatitude');
            initialdata = { ...initialdata, adminUserLatitude: userLatitude1 }
            let userLongitude1 = localStorage.getItem('adminUserLongitude');
            initialdata = { ...initialdata, adminUserLongitude: userLongitude1 }
            return initialdata;
            break;
        case Set_Admin_Logout:
            localStorage.removeItem('adminUserId');
            localStorage.removeItem('superAdminId');
            localStorage.removeItem('adminUserName');
            localStorage.removeItem('adminUserEmail');
            localStorage.removeItem('adminUserPhone');
            localStorage.removeItem('admintoken');
            localStorage.removeItem('adminUserRole');
            localStorage.removeItem('adminUserAddress');
            localStorage.removeItem('adminUserCity');
            localStorage.removeItem('adminUserCountry');
            localStorage.removeItem('adminUserLatitude');
            localStorage.removeItem('adminUserLongitude');
            initialdata = { ...initialdata, adminUserId: "" }
            initialdata = { ...initialdata, superAdminId: "" }
            initialdata = { ...initialdata, adminUserName: "" }
            initialdata = { ...initialdata, adminUserEmail: "" }
            initialdata = { ...initialdata, adminUserPhone: "" }
            initialdata = { ...initialdata, admintoken: "" }
            initialdata = { ...initialdata, adminUserRole: "" }
            initialdata = { ...initialdata, adminUserAddress: "" }
            initialdata = { ...initialdata, adminUserCity: "" }
            initialdata = { ...initialdata, adminUserCountry: "" }
            initialdata = { ...initialdata, adminUserLatitude: "" }
            initialdata = { ...initialdata, adminUserLongitude: "" }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}



export const FraudScansRecord = (initialdata = fraudScansData, action) => {
    switch (action.type) {
        case Set_Fraud_Scans_List:
            initialdata = { ...initialdata, fraudScansRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const FailsLevelRecord = (initialdata = failsLevelData, action) => {
    switch (action.type) {
        case Set_All_Level_Fails_List:
            initialdata = { ...initialdata, failsLevelRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const RetailerRecord = (initialdata = retailerData, action) => {
    switch (action.type) {
        case Set_Retailer_By_Company_List:
            initialdata = { ...initialdata, retailerRec: action.result }
            return initialdata
            break;
        case Set_Retailer_List:
            initialdata = { ...initialdata, retailerRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const FactoryRecord = (initialdata = factoryData, action) => {

    switch (action.type) {
        case Set_Factory_By_Company_List:
            initialdata = { ...initialdata, factoryRec: action.result }
            return initialdata
            break;
        case Set_Factory_List:
            initialdata = { ...initialdata, factoryRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const DistributerRecord = (initialdata = distributerData, action) => {
    switch (action.type) {
        case Set_Distributer_By_Company_List:
            initialdata = { ...initialdata, distributerRec: action.result }
            return initialdata
            break;
        case Set_Distributer_List:
            initialdata = { ...initialdata, distributerRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}




///////////////////Factory Module //////////////////////


export const FactoryLoginData = (initialdata = factoryloginRec, action) => {
    switch (action.type) {
        case FactoryUserLogin:
            return initialdata;
            break;
        case Set_Reset_Login_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Factory_Login_Invalid:
            initialdata = { ...initialdata, error: action.result.message }
            return initialdata;
            break;
        case Set_Factory_Login:
            let userId = localStorage.getItem('factoryUserId');
            initialdata = { ...initialdata, factoryUserId: userId }
            let userAdminId = localStorage.getItem('factoryUserAdminId');
            initialdata = { ...initialdata, factoryUserAdminId: userAdminId }
            let username = localStorage.getItem('factoryUserName');
            initialdata = { ...initialdata, factoryUserName: username }
            let userEmail = localStorage.getItem('factoryUserEmail');
            initialdata = { ...initialdata, factoryUserEmail: userEmail }
            let token = localStorage.getItem('factorytoken');
            initialdata = { ...initialdata, factorytoken: token }
            let userRole = localStorage.getItem('factoryUserRole');
            initialdata = { ...initialdata, factoryUserRole: userRole }
            let userAddress = localStorage.getItem('factoryUserAddress');
            initialdata = { ...initialdata, factoryUserAddress: userAddress }
            let userCity = localStorage.getItem('factoryUserCity');
            initialdata = { ...initialdata, factoryUserCity: userCity }
            let userCountry = localStorage.getItem('factoryUserCountry');
            initialdata = { ...initialdata, factoryUserCountry: userCountry }
            let userLatitude = localStorage.getItem('factoryUserLatitude');
            initialdata = { ...initialdata, factoryUserLatitude: userLatitude }
            let userLongitude = localStorage.getItem('factoryUserLongitude');
            initialdata = { ...initialdata, factoryUserLongitude: userLongitude }
            return initialdata;
            break;
        case Factory_Login_Fail:
            return initialdata;
            break;
        case set_Factory_Local_Store_Data:
            let userId1 = localStorage.getItem('factoryUserId');
            initialdata = { ...initialdata, factoryUserId: userId1 }
            let userAdminId1 = localStorage.getItem('factoryUserAdminId');
            initialdata = { ...initialdata, factoryUserAdminId: userAdminId1 }
            let username1 = localStorage.getItem('factoryUserName');
            initialdata = { ...initialdata, factoryUserName: username1 }
            let userEmail1 = localStorage.getItem('factoryUserEmail');
            initialdata = { ...initialdata, factoryUserEmail: userEmail1 }
            let token1 = localStorage.getItem('factorytoken');
            initialdata = { ...initialdata, factorytoken: token1 }
            let userRole1 = localStorage.getItem('factoryUserRole');
            initialdata = { ...initialdata, factoryUserRole: userRole1 }
            let userAddress1 = localStorage.getItem('factoryUserAddress');
            initialdata = { ...initialdata, factoryUserAddress: userAddress1 }
            let userCity1 = localStorage.getItem('factoryUserCity');
            initialdata = { ...initialdata, factoryUserCity: userCity1 }
            let userCountry1 = localStorage.getItem('factoryUserCountry');
            initialdata = { ...initialdata, factoryUserCountry: userCountry1 }
            let userLatitude1 = localStorage.getItem('factoryUserLatitude');
            initialdata = { ...initialdata, factoryUserLatitude: userLatitude1 }
            let userLongitude1 = localStorage.getItem('factoryUserLongitude');
            initialdata = { ...initialdata, factoryUserLongitude: userLongitude1 }
            return initialdata;
            break;
        case Set_Factory_Logout:
            localStorage.removeItem('factoryUserId');
            localStorage.removeItem('factoryUserAdminId');
            localStorage.removeItem('factoryUserName');
            localStorage.removeItem('factoryUserEmail');
            localStorage.removeItem('factorytoken');
            localStorage.removeItem('factoryUserRole');
            localStorage.removeItem('factoryUserAddress');
            localStorage.removeItem('factoryUserCity');
            localStorage.removeItem('factoryUserCountry');
            localStorage.removeItem('factoryUserLatitude');
            localStorage.removeItem('factoryUserLongitude');
            initialdata = { ...initialdata, factoryUserId: "" }
            initialdata = { ...initialdata, factoryUserAdminId: "" }
            initialdata = { ...initialdata, factoryUserName: "" }
            initialdata = { ...initialdata, factoryUserEmail: "" }
            initialdata = { ...initialdata, factorytoken: "" }
            initialdata = { ...initialdata, factoryUserRole: "" }
            initialdata = { ...initialdata, factoryUserAddress: "" }
            initialdata = { ...initialdata, factoryUserCity: "" }
            initialdata = { ...initialdata, factoryUserCountry: "" }
            initialdata = { ...initialdata, factoryUserLatitude: "" }
            initialdata = { ...initialdata, factoryUserLongitude: "" }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}

export const FactoryStoreData = (initialdata = factoryStoreData, action) => {
    switch (action.type) {
        case Store_Factory:
            return initialdata;
            break;
        case Set_Reset_Factory_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Store_Factory_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;

        case Set_Store_Factory_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Check_Factory_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Factory_Data_Already_Exist:
            initialdata = { ...initialdata, error: 'Already Exist', store_request: false, success: false }
            return initialdata;
            break;
        case Set_Store_Factory_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}

export const DistributerStoreData = (initialdata = distributerStoreData, action) => {
    switch (action.type) {
        case Store_Distributer:
            return initialdata;
            break;
        case Set_Reset_Distributer_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Store_Distributer_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;
        case Set_Store_Distributer_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            console.log("initialdata", initialdata)
            return initialdata;
            break;
        case Check_Distributer_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Distributer_Data_Already_Exist:
            initialdata = { ...initialdata, error: 'Already Exist', store_request: false, success: false }
            return initialdata;
            break;
        case Set_Store_Distributer_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}


export const RetailerStoreData = (initialdata = retailerStoreData, action) => {
    switch (action.type) {
        case Store_Retailer:
            return initialdata;
            break;
        case Set_Reset_Retailer_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Store_Retailer_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;
        case Set_Store_Retailer_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Check_Retailer_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Retailer_Data_Already_Exist:
            initialdata = { ...initialdata, error: 'Already Exist', store_request: false, success: false }
            return initialdata;
            break;
        case Set_Store_Retailer_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}



export const FactoryReportRecord = (initialdata = factoryReportData, action) => {
    switch (action.type) {
        case Set_Reset_Factory_Report_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Factory_Report_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Factory_Report_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}
export const SelfReportRecord = (initialdata = selfreportData, action) => {
    switch (action.type) {
        case Set_Self_Report_List:
            initialdata = { ...initialdata, selfReportRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const CompanyFeedbackStoreData = (initialdata = companyFeedbackStoreData, action) => {
    switch (action.type) {
        case Store_Company_Feedback:
            return initialdata;
            break;
        case Store_Company_Feedback_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;
        case Set_Store_Company_Feedback_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Check_Company_Feedback_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Company_Feedback_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}

export const MultiUserStoreData = (initialdata = multiUserStoreData, action) => {
    switch (action.type) {
        case Store_Multi_User:
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}



export const StoreProductTemplateData = (initialdata = storeProductTemplateData, action) => {
    switch (action.type) {
        case Store_Product_Template:
            return initialdata;
            break;
        case Set_Reset_Product_Template_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Store_Product_Template_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;
        case Set_Store_Product_Template_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Check_Product_Template_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Product_Template_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}

export const ProductTemplateRecord = (initialdata = productTemplateData, action) => {
    switch (action.type) {
        case Get_Product_Template:
            return initialdata
            break;
        case Set_Product_Template_List:
            initialdata = { ...initialdata, productTemplateRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}


export const StoreBatchTemplateData = (initialdata = storeBatchTemplateData, action) => {
    switch (action.type) {
        case Store_Batch_Template:
            return initialdata;
            break;
        case Set_Reset_Batch_Template_Data:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Store_Batch_Template_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;
        case Set_Store_Batch_Template_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Check_Batch_Template_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
            return initialdata;
            break;
        case Set_Store_Batch_Template_Data_Fail:
            initialdata = { ...initialdata, error: true, store_request: false, success: false }
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}
export const BatchSentRecord = (initialdata = batchSentData, action) => {
    switch (action.type) {
        case Set_Batch_Sent_To_Distributer:
            initialdata = { ...initialdata, batchSentRec: action.result }
            return initialdata
            break;
        case Set_Batch_By_Distributer:
            initialdata = { ...initialdata, batchSentRec: action.result }
            return initialdata
            break;

        default:
            return initialdata
            break;
    }
}

export const BatchTemplateRecord = (initialdata = batchTemplateData, action) => {
    switch (action.type) {
        case Get_Batch_Template:
            return initialdata
            break;
        case Set_Batch_Template_List:
            initialdata = { ...initialdata, batchTemplateRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}


export const BatchDetailRecord = (initialdata = batchDetailData, action) => {
    switch (action.type) {
        case Get_Batch_Detail:
            return initialdata
            break;
        case Set_Batch_Detail_List:
            initialdata = { ...initialdata, batchDetailRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}


export const FeedbackRecord = (initialdata = feedbackData, action) => {
    switch (action.type) {
        case Set_Feedback_List:
            initialdata = { ...initialdata, feedbackRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const SelfFeedbackRecord = (initialdata = selffeedbackData, action) => {
    switch (action.type) {
        case Set_Self_Feedback_List:
            initialdata = { ...initialdata, selffeedbackRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}


export const FactoryStaticsRecord = (initialdata = factoryStaticsData, action) => {
    switch (action.type) {
        case Get_Factory_Statics:
            return initialdata
            break;
        case Set_Factory_Statics_List:
            initialdata = { ...initialdata, factoryStaticsRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const CeoStaticsRecord = (initialdata = ceoStaticsData, action) => {
    switch (action.type) {
        case Get_Ceo_Statistics:
            return initialdata
            break;
        case Set_Ceo_Statistics:
            initialdata = { ...initialdata, ceoStaticsRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}



export const SuperAdminStaticsRecord = (initialdata = superAdminStaticsData, action) => {
    switch (action.type) {
        case Get_SuperAdmin_Statistics:
            return initialdata
            break;
        case Set_SuperAdmin_Statistics:
            initialdata = { ...initialdata, superAdminStaticsRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}


export const FactorySentProductListRecord = (initialdata = factorySentProductData, action) => {
    switch (action.type) {
        case Set_Factory_Sent_Product_List:
            initialdata = { ...initialdata, factorySentProductRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const DistributerBatchProductChartData = (initialdata = distributerBathProdChartData, action) => {
    switch (action.type) {
        case Set_Distributer_Batch_Product_Chart:
            initialdata = { ...initialdata, distributerBatchProductRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const TotalScansData = (initialdata = totalScannnedData, action) => {
    switch (action.type) {
        case Set_Total_Scan_Data:
            initialdata = { ...initialdata, totalScansRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const AllReportForCeo = (initialdata = allReportCeoData, action) => {
    switch (action.type) {
        case Set_All_Report_For_Ceo:
            initialdata = { ...initialdata, reportScansRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const AllReportForSuperAdmin = (initialdata = allReportSuperAdminData, action) => {
    switch (action.type) {
        case Set_All_Report_For_SuperAdmin:
            initialdata = { ...initialdata, reportScansRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const AllBatchProductForCeo = (initialdata = allBatchProductCeoData, action) => {
    switch (action.type) {
        case Set_Batch_Product_For_Ceo:
            initialdata = { ...initialdata, batchProductForCeoRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const AllBatchProductForSuperAdmin = (initialdata = allBatchProductSuperAdminData, action) => {
    switch (action.type) {
        case Set_Batch_Product_For_SuperAdmin:
            initialdata = { ...initialdata, batchProductForSuperADminRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const RetailerBatchProductChartData = (initialdata = retailerBatchProdChartData, action) => {

    switch (action.type) {
        case Set_Retailer_Batch_Product_Chart:
            initialdata = { ...initialdata, retailerBatchProductRec: action.result }
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}








export const finalrecord = combineReducers({ AllBatchProductForCeo, AllBatchProductForSuperAdmin, AllReportForCeo, AllReportForSuperAdmin, TotalScansData, DistributerBatchProductChartData, RetailerBatchProductChartData, FactorySentProductListRecord, FactoryStaticsRecord, CeoStaticsRecord, SuperAdminStaticsRecord, Details, UserDetailRecord, SuperAdminLoginData, handleUserStatusData, CompanyStoreData, CompanyRecord, AdminLoginData, FraudScansRecord, FailsLevelRecord, RetailerRecord, FactoryRecord, DistributerRecord, FactoryLoginData, FactoryStoreData, DistributerStoreData, RetailerStoreData, FactoryReportRecord, SelfReportRecord, CompanyFeedbackStoreData, MultiUserStoreData, StoreProductTemplateData, ProductTemplateRecord, StoreBatchTemplateData, BatchSentRecord, BatchTemplateRecord, BatchDetailRecord, FeedbackRecord, SelfFeedbackRecord })