import { GETDETAILS,SuperAdminUserLogin,Get_SuperAdmin_Local_Store_Data,Store_Company,Check_Company_Success_data,Get_Company, SuperAdminUserLogout, AdminUserLogin, AdminUserLogout, Get_Local_Store_Data, Get_Retailers,Get_Retailer_By_Company, Get_Factory,Get_Factory_By_Company, Get_Distributer,Get_Distributer_By_Company, FactoryUserLogin, FactoryUserLogout, Get_Factory_Local_Store_Data, Store_Factory,Check_Factory_Success_data, Store_Distributer, Check_Distributer_Success_data, Store_Retailer,Check_Retailer_Success_data, Store_Multi_User, Store_Product_Template,Check_Product_Template_Success_data, Get_Product_Template, Store_Batch_Template,Check_Batch_Template_Success_data, Get_Batch_Template,Get_Batch_Detail } from "./constant"
export const GetDetails = (data) => {
    return {
        type: GETDETAILS,
        data
    } 
}

export const superAdminLogin = (data) =>{
    return{
        type:SuperAdminUserLogin,
        data:data 
    } 
}
export const getSuperAdminLocalStoreData = (data) =>{
    return{
        type:Get_SuperAdmin_Local_Store_Data,
        data:data 
    } 
}
export const storeCompany = (data) =>{
    return{
        type:Store_Company,
        data:data 
    } 
}
export const checkCompanySuccessdata = (data) =>{
    return{
        type:Check_Company_Success_data,
        data:data 
    } 
}
export const getCompany = (data) =>{
    return{
        type:Get_Company,
        data:data 
    } 
}

export const superAdminLogout = (data) =>{
    return{
        type:SuperAdminUserLogout,
        data:data 
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
export const getRetailerByCompany = (data) =>{
    return{
        type:Get_Retailer_By_Company, 
        data:data 
    } 
}
export const getRetailers = (data) =>{
    return{
        type:Get_Retailers,
        data:data 
    } 
}

export const getFactoryByCompany = (data) =>{
    return{
        type:Get_Factory_By_Company,
        data:data 
    } 
}


export const getFactory = (data) =>{
    return{
        type:Get_Factory,
        data:data 
    } 
}
export const getDistributerByCompany = (data) =>{ 
    return{
        type:Get_Distributer_By_Company,
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
export const checkFactorySuccessdata = (data) =>{
    return{
        type:Check_Factory_Success_data,
        data:data 
    } 
}
export const storeDistributer = (data) =>{
    return{
        type:Store_Distributer,
        data:data 
    } 
}
export const checkDistributerSuccessdata = (data) =>{
    return{
        type:Check_Distributer_Success_data,
        data:data 
    } 
}

export const storeRetailer = (data) =>{
    return{
        type:Store_Retailer,
        data:data 
    } 
}
export const checkRetailerSuccessdata = (data) =>{
    return{
        type:Check_Retailer_Success_data,
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


export const storeProductTemplate = (data) =>{
    return{
        type:Store_Product_Template,
        data:data 
    } 
}
export const checkProductTemplateSuccessdata = (data) =>{
    return{
        type:Check_Product_Template_Success_data,
        data:data 
    } 
}
export const getProductTemplate = (data) =>{
    return{
        type:Get_Product_Template,
        data:data 
    } 
}


export const storeBatchTemplate = (data) =>{
    return{
        type:Store_Batch_Template,
        data:data 
    } 
}
export const checkBatchTemplateSuccessdata = (data) =>{
    return{
        type:Check_Batch_Template_Success_data,
        data:data 
    } 
}
export const getBatchTemplate = (data) =>{
    return{
        type:Get_Batch_Template,
        data:data 
    } 
}

export const getBatchDetail = (data) =>{
    return{
        type:Get_Batch_Detail,
        data:data 
    } 
}


