import { combineReducers } from "redux";
import { GETDETAILS,SuperAdminUserLogin,Set_SuperAdmin_Login, SuperAdmin_Login_Fail,set_SuperAdmin_Local_Store_Data,Store_Company, Store_Company_Request, Set_Store_Company_Data, Set_Store_Company_Data_Fail,Check_Company_Success_data_1, Get_Company, Set_Company_List,Set_SuperAdmin_Logout, AdminUserLogin, Set_Admin_Login, Admin_Login_Fail, Get_Local_Store_Data, set_Local_Store_Data,Set_Retailer_By_Company_List, Set_Retailer_List, Set_Factory_List,Set_Factory_By_Company_List, Set_Distributer_List,Set_Distributer_By_Company_List, Set_Admin_Logout, FactoryUserLogin, Set_Factory_Login, Factory_Login_Fail, set_Factory_Local_Store_Data, Set_Factory_Logout, Store_Factory, Store_Factory_Request, Set_Store_Factory_Data, Set_Store_Factory_Data_Fail, Check_Factory_Success_data, Check_Factory_Success_data_1, Store_Distributer, Set_Store_Distributer_Data, Set_Store_Distributer_Data_Fail, Store_Distributer_Request, Check_Distributer_Success_data, Check_Distributer_Success_data_1, Store_Retailer, Set_Store_Retailer_Data, Set_Store_Retailer_Data_Fail, Store_Retailer_Request, Check_Retailer_Success_data, Check_Retailer_Success_data_1, Store_Multi_User, Store_Product_Template } from "./constant";
const data = {
    error: ""
}

const superAdminData = {
    error: "",
    superAdminUserId: "",
    superAdminUsername: "",
    superAdminUserEmail: "",
    superAdmintoken: "",
    superAdminUserRole: "",
    superAdminUserAddress: "",
    superAdminUserCity: "",
    superAdminUserCountry: "",
    superAdminUserLatitude: "",
    superAdminUserLongitude: ""
}
const companyStoreData = {
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
    adminUsername: "",
    adminUserEmail: "",
    admintoken: "",
    adminUserRole: "",
    adminUserAddress: "",
    adminUserCity: "",
    adminUserCountry: "",
    adminUserLatitude: "",
    adminUserLongitude: ""
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


/////// Start Factory Module ///



const factoryloginRec = {
    error: "",
    factoryUsername: "",
    factoryUserEmail: "",
    factorytoken: "",
    factoryUserRole: "",
    factoryUserAddress: ""
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
const multiUserStoreData = {
    store_request: false,
    success: false,
    error: false,
}

const storeProductTemplateData = {
    error: "",
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

export const SuperAdminLoginData = (initialdata = superAdminData, action) => {
    switch (action.type) {
        case SuperAdminUserLogin:
            return initialdata;
            break;
        case Set_SuperAdmin_Login:
            let userId = localStorage.getItem('superAdminUserId');
            initialdata = { ...initialdata, superAdminUserId: userId }
            let username = localStorage.getItem('superAdminUserName');
            initialdata = { ...initialdata, superAdminUserName: username }
            let userEmail = localStorage.getItem('superAdminUserEmail');
            initialdata = { ...initialdata, superAdminUserEmail: userEmail }
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

export const CompanyStoreData = (initialdata = companyStoreData, action) => {
    switch (action.type) {
        case Store_Company:
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
        case Set_Admin_Login:
            let userId = localStorage.getItem('adminUserId');
            initialdata = { ...initialdata, adminUserId: userId }
            let username = localStorage.getItem('adminUserName');
            initialdata = { ...initialdata, adminUserName: username }
            let userEmail = localStorage.getItem('adminUserEmail');
            initialdata = { ...initialdata, adminUserEmail: userEmail }
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
            console.log("Invalid Username From Reducer",)
            return initialdata;
            break;
        case set_Local_Store_Data:
            let userId1 = localStorage.getItem('adminUserId');
            initialdata = { ...initialdata, adminUserId: userId1 }
            let username1 = localStorage.getItem('adminUserName');
            initialdata = { ...initialdata, adminUserName: username1 }
            let userEmail1 = localStorage.getItem('adminUserEmail');
            initialdata = { ...initialdata, adminUserEmail: userEmail1 }
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
            localStorage.removeItem('adminUserName');
            localStorage.removeItem('adminUserEmail');
            localStorage.removeItem('admintoken');
            localStorage.removeItem('adminUserRole');
            localStorage.removeItem('adminUserAddress');
            localStorage.removeItem('adminUserCity');
            localStorage.removeItem('adminUserCountry');
            localStorage.removeItem('adminUserLatitude');
            localStorage.removeItem('adminUserLongitude');
            initialdata = { ...initialdata, adminUserId: "" }
            initialdata = { ...initialdata, adminUserName: "" }
            initialdata = { ...initialdata, adminUserEmail: "" }
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
        case Set_Factory_Login:
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
            let currentFactoryUserHash = localStorage.getItem('currentFactoryUserHash');
            initialdata = { ...initialdata, currentFactoryUserHash: currentFactoryUserHash }
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
            console.log("Invalid Username From Reducer",)
            return initialdata;
            break;
        case set_Factory_Local_Store_Data:
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
            let currentFactoryUserHash1 = localStorage.getItem('currentFactoryUserHash');
            initialdata = { ...initialdata, currentFactoryUserHash: currentFactoryUserHash1 }
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
            localStorage.removeItem('factoryUserName');
            localStorage.removeItem('factoryUserEmail');
            localStorage.removeItem('factorytoken');
            localStorage.removeItem('factoryUserRole');
            localStorage.removeItem('factoryUserAddress');
            localStorage.removeItem('currentFactoryUserHash');
            localStorage.removeItem('factoryUserCity');
            localStorage.removeItem('factoryUserCountry');
            localStorage.removeItem('factoryUserLatitude');
            localStorage.removeItem('factoryUserLongitude');
            initialdata = { ...initialdata, factoryUserName: "" }
            initialdata = { ...initialdata, factoryUserEmail: "" }
            initialdata = { ...initialdata, factorytoken: "" }
            initialdata = { ...initialdata, factoryUserRole: "" }
            initialdata = { ...initialdata, factoryUserAddress: "" }
            initialdata = { ...initialdata, currentFactoryUserHash: "" }
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
        case Store_Distributer_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;
        case Set_Store_Distributer_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            return initialdata;
            break;
        case Check_Distributer_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
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
        case Store_Retailer_Request:
            initialdata = { ...initialdata, success: false, store_request: true, error: false }
            return initialdata;
            break;
        case Set_Store_Retailer_Data:
            initialdata = { ...initialdata, success: true, store_request: false, error: false }
            console.log("Successsssss initialdata",initialdata)
            return initialdata;
            break;
        case Check_Retailer_Success_data_1:
            initialdata = { ...initialdata, success: false, store_request: false, error: false }
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
        default:
            return initialdata;
            break;
    }
}


export const finalrecord = combineReducers({ Details,SuperAdminLoginData,CompanyStoreData,CompanyRecord, AdminLoginData, RetailerRecord, FactoryRecord, DistributerRecord, FactoryLoginData, FactoryStoreData, DistributerStoreData, RetailerStoreData, MultiUserStoreData, StoreProductTemplateData })