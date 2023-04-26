import { GETDETAILS,Get_User_Detail, SuperAdminUserLogin, Reset_Login_Data, Get_SuperAdmin_Local_Store_Data,Store_Company,Check_Company_Success_data,Handle_User_Status, Get_Company,Get_Fraud_Scans,Get_All_Level_Fails, SuperAdminUserLogout, AdminUserLogin, AdminUserLogout, Get_Local_Store_Data, Get_Retailers,Get_Retailer_By_Company, Get_Factory,Get_Factory_By_Company, Get_Distributer,Get_Distributer_By_Company, FactoryUserLogin, FactoryUserLogout, Get_Factory_Local_Store_Data,Reset_Factory_Data, Store_Factory,Check_Factory_Success_data,Reset_Distributer_Data, Store_Distributer, Check_Distributer_Success_data, Store_Retailer,Check_Retailer_Success_data,Get_Self_Report, Store_Factory_Report,Reset_Factory_Report_Data, Store_Company_Feedback,Check_Company_Feedback_Success_data,Get_Self_Feedback, Store_Multi_User, Store_Product_Template,Check_Product_Template_Success_data, Get_Product_Template, Reset_Product_Template_Data,Get_Batch_Sent_To_Distributer, Get_Batch_By_Distributer, Store_Batch_Template,Check_Batch_Template_Success_data, Get_Batch_Template,Reset_Batch_Template_Data, Get_Batch_Detail, Get_Feedback,Reset_Retailer_Data ,Get_Factory_Statics, Sent_Product_List_By_Factory, Distributer_Batch_Product_Chart_Data,Get_Total_Scans, Get_All_Report_For_Ceo,Retailer_Batch_Product_Chart_Data } from "./constant"
export const GetDetails = (data) => {
    return {
        type: GETDETAILS,
        data
    } 
}



export const getUserDetail = (data) =>{
    return{
        type:Get_User_Detail,
        data:data 
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

export const handleUserStatus = (data) =>{
    return{
        type:Handle_User_Status,
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

export const getFraudScans = (data) =>{
    return{
        type:Get_Fraud_Scans,
        data:data 
    } 
}
export const getAllLevelFails = (data) =>{
    return{
        type:Get_All_Level_Fails,
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
export const resetLoginData = () =>{
    return{
        type:Reset_Login_Data
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
export const getFeedback = (data) =>{
    return{
        type:Get_Feedback,
        data:data 
    } 
}

export const resetFactoryData = () =>{
    return{
        type:Reset_Factory_Data
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

export const resetDistributerData = () =>{
    return{
        type:Reset_Distributer_Data
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

export const resetRetailerData = () =>{
    return{
        type:Reset_Retailer_Data
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
export const storeCompanyFeedback = (data) =>{
    return{
        type:Store_Company_Feedback,
        data:data 
    } 
}
export const storeFactoryReport = (data) =>{
    return{
        type:Store_Factory_Report,
        data:data 
    } 
}

export const resetFactoryReportData = () =>{
    return{
        type:Reset_Factory_Report_Data
    } 
}


export const getSelfReport = (data) =>{
    return{
        type:Get_Self_Report,
        data:data 
    } 
}

export const checkCompanyFeedbackSuccessdata = (data) =>{
    return{
        type:Check_Company_Feedback_Success_data,
        data:data 
    } 
}
export const getSelfFeedback = (data) =>{
    return{
        type:Get_Self_Feedback,
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
    console.log("data",data)
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
export const resetProductTemplateData = () =>{
    return{
        type:Reset_Product_Template_Data
    } 
}

export const getBatchSentToDistributer = (data) =>{
    return{
        type:Get_Batch_Sent_To_Distributer,
        data:data 
    } 
}
export const getBatchByDistributer = (data) =>{
    return{
        type:Get_Batch_By_Distributer,
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

export const resetBatchTemplateData = () =>{
    return{
        type:Reset_Batch_Template_Data
    } 
}

export const getBatchDetail = (data) =>{
    return{
        type:Get_Batch_Detail,
        data:data 
    }  
}
export const getFactoryStatics = (data) =>{
    return{
        type:Get_Factory_Statics,
        data:data 
    } 
}
export const sentProductListByFactory = (data) =>{
    return{
        type:Sent_Product_List_By_Factory,
        data:data 
    } 
}
export const distributerBatchProductChartData = (data) =>{
    return{
        type:Distributer_Batch_Product_Chart_Data,
        data:data 
    } 
}


export const retailerBatchProductChartData = (data) =>{
    return{
        type:Retailer_Batch_Product_Chart_Data,
        data:data 
    } 
}


export const getTotalScans = (data) =>{
    return{
        type:Get_Total_Scans,
        data:data 
    } 
}

export const getAllReportForCeo = (data) =>{
    return{
        type:Get_All_Report_For_Ceo,
        data:data 
    } 
}



