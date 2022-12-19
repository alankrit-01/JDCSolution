import { combineReducers } from "redux";
import { GETDETAILS, AdminUserLogin, Set_Admin_Login, Admin_Login_Fail, Get_Local_Store_Data, set_Local_Store_Data, Get_Retailers, Set_Retailer_List, Get_Factory, Set_Factory_List,Get_Distributer, Set_Distributer_List, Set_Admin_Logout, FactoryUserLogin,Set_Factory_Login, Factory_Login_Fail, set_Factory_Local_Store_Data, Set_Factory_Logout, Store_Factory, Store_Distributer, Store_Retailer, Store_Multi_User } from "./constant";
const data = {
    error: ""
}

const adminData = { 
    error: "",
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
    factoryUserRole: ""
}

const factoryStoreData ={
    error: "",
}
const distributerStoreData ={
    error: "",
}
const retailerStoreData ={
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

export const AdminLoginData = (initialdata = adminData, action) => {
    switch (action.type) {
        case AdminUserLogin:
            return initialdata;
            break;
        case Set_Admin_Login:
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
            localStorage.removeItem('adminUserName');
            localStorage.removeItem('adminUserEmail');
            localStorage.removeItem('admintoken');
            localStorage.removeItem('adminUserRole');
            localStorage.removeItem('adminUserAddress');
            localStorage.removeItem('adminUserCity');
            localStorage.removeItem('adminUserCountry');
            localStorage.removeItem('adminUserLatitude');
            localStorage.removeItem('adminUserLongitude');
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
        case Get_Retailers:
            return initialdata
            break;
        case Set_Retailer_List:
            initialdata = {...initialdata,retailerRec:action.result}
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}

export const FactoryRecord = (initialdata = factoryData, action) => {
    switch (action.type) {
        case Get_Factory:
            return initialdata
            break;
        case Set_Factory_List:
            initialdata = {...initialdata,factoryRec:action.result}
            return initialdata
            break;
        default:
            return initialdata
            break;
    }
}
export const DistributerRecord = (initialdata = distributerData, action) => {
    switch (action.type) {
        case Get_Distributer:
            return initialdata
            break;
        case Set_Distributer_List:
            initialdata = {...initialdata,distributerRec:action.result}
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
            return initialdata;
            break;
        case Set_Factory_Logout:
            localStorage.removeItem('factoryUserName');
            localStorage.removeItem('factoryUserEmail');
            localStorage.removeItem('factorytoken');
            localStorage.removeItem('factoryUserRole');
            initialdata = { ...initialdata, factoryUserName: "" }
            initialdata = { ...initialdata, factoryUserEmail: "" }
            initialdata = { ...initialdata, factorytoken: "" }
            initialdata = { ...initialdata, factoryUserRole: "" }
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
        default:
            return initialdata;
            break;
    }
}

export const MultiUserStoreData = (initialdata = retailerStoreData, action) => {
    switch (action.type) {
        case Store_Multi_User:
            return initialdata;
            break;
        default:
            return initialdata;
            break;
    }
}


export const finalrecord = combineReducers({ Details, AdminLoginData, RetailerRecord, FactoryRecord, DistributerRecord, FactoryLoginData,FactoryStoreData, DistributerStoreData,RetailerStoreData,MultiUserStoreData })