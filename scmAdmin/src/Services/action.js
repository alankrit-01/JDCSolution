import { GETDETAILS,AdminUserLogin, AdminUserLogout, Get_Local_Store_Data, Get_Retailers, Get_Factory, Get_Distributer, FactoryUserLogin, FactoryUserLogout, Get_Factory_Local_Store_Data, Store_Factory, Store_Distributer, Store_Retailer, Store_Multi_User } from "./constant"
export const GetDetails = (data) => {
    return {
        type: GETDETAILS,
        data
    } 
}
export const adminLogin = (data) =>{
    return{
        type:AdminUserLogin,
        data:data 
    } 
}
export const getLocalStoreData = (data) =>{
    return{
        type:Get_Local_Store_Data,
        data:data 
    } 
}
export const adminLogout = (data) =>{
    return{
        type:AdminUserLogout,
        data:data 
    } 
}

export const getRetailers = (data) =>{
    return{
        type:Get_Retailers,
        data:data 
    } 
}
export const getFactory = (data) =>{
    return{
        type:Get_Factory,
        data:data 
    } 
}
export const getDistributer = (data) =>{
    return{
        type:Get_Distributer,
        data:data 
    } 
}


export const storeFactory = (data) =>{
    return{
        type:Store_Factory,
        data:data 
    } 
}
export const storeDistributer = (data) =>{
    return{
        type:Store_Distributer,
        data:data 
    } 
}

export const storeRetailer = (data) =>{
    return{
        type:Store_Retailer,
        data:data 
    } 
}

export const storeMultiUser = (data) =>{
    return{
        type:Store_Multi_User,
        data:data 
    } 
}


//////////Factory Module //////////////

export const factoryLogin = (data) =>{
    return{
        type:FactoryUserLogin,
        data:data 
    } 
}

export const getFactoryLocalStoreData = (data) =>{
    return{
        type:Get_Factory_Local_Store_Data,
        data:data 
    } 
}

export const factoryLogout = (data) =>{
    return{
        type:FactoryUserLogout,
        data:data 
    } 
}

