import { takeLatest, call, put } from 'redux-saga/effects';
import { Set_Reset_Distributer_Data, Set_Store_Distributer_Data, Reset_Retailer_Data, Set_Reset_Retailer_Data, Set_Store_Retailer_Data_Already_Exist, BLOCKCHAIN_API_URL, Get_User_Detail, Set_User_Detail, SuperAdminUserLogin, Set_SuperAdmin_Login, SuperAdmin_Login_Fail, Get_SuperAdmin_Local_Store_Data, set_SuperAdmin_Local_Store_Data, Handle_User_Status, Set_Handle_User_Status_Data, Set_Handle_User_Status_Data_Fail, Store_Company, Set_Store_Company_Data, Set_Store_Company_Data_Fail, Check_Company_Success_data, Check_Company_Success_data_1, Get_Company, Set_Company_List, Get_Fraud_Scans, Set_Fraud_Scans_List, Get_All_Level_Fails, Set_All_Level_Fails_List, SuperAdminUserLogout, Set_SuperAdmin_Logout, AdminUserLogin, Set_Admin_Login, Admin_Login_Fail, AdminUserLogout, Set_Admin_Logout, Get_Local_Store_Data, set_Local_Store_Data, Get_Retailers, Get_Retailer_By_Company, Set_Retailer_List, Set_Retailer_By_Company_List, Get_Factory, Get_Factory_By_Company, Set_Factory_List, Set_Factory_By_Company_List, Get_Distributer, Get_Distributer_By_Company, Set_Distributer_List, Set_Distributer_By_Company_List, FactoryUserLogin, Factory_Login_Invalid, Set_Factory_Login, Factory_Login_Fail, FactoryUserLogout, Set_Factory_Logout, Get_Factory_Local_Store_Data, set_Factory_Local_Store_Data, Reset_Factory_Data, Store_Factory, Set_Reset_Factory_Data, Set_Store_Factory_Data, Set_Store_Factory_Data_Already_Exist, Set_Store_Distributer_Data_Already_Exist, Set_Store_Factory_Data_Fail, Check_Factory_Success_data, Check_Factory_Success_data_1, Reset_Distributer_Data, Store_Distributer, Set_Store_Distributer_Data_Fail, Check_Distributer_Success_data, Check_Distributer_Success_data_1, Store_Retailer, Set_Store_Retailer_Data, Set_Store_Retailer_Data_Fail, Check_Retailer_Success_data, Check_Retailer_Success_data_1,Get_Self_Report,Set_Self_Report_List, Store_Factory_Report, Set_Store_Factory_Report_Data, Set_Store_Factory_Report_Data_Fail, Reset_Factory_Report_Data, Set_Reset_Factory_Report_Data, Store_Company_Feedback, Set_Store_Company_Feedback_Data, Set_Store_Company_Feedback_Data_Fail, Check_Company_Feedback_Success_data, Check_Company_Feedback_Success_data_1, Store_Multi_User, Store_Product_Template, Set_Store_Product_Template_Data, Set_Store_Product_Template_Data_Fail, Check_Product_Template_Success_data, Check_Product_Template_Success_data_1, Get_Product_Template, Reset_Product_Template_Data, Set_Reset_Product_Template_Data, Set_Product_Template_List, Get_Batch_Sent_To_Distributer, Set_Batch_Sent_To_Distributer, Get_Batch_By_Distributer, Set_Batch_By_Distributer, Store_Batch_Template, Set_Store_Batch_Template_Data, Set_Store_Batch_Template_Data_Fail, Check_Batch_Template_Success_data, Check_Batch_Template_Success_data_1, Get_Batch_Template, Set_Batch_Template_List, Get_Batch_Detail, Reset_Batch_Template_Data, Set_Reset_Batch_Template_Data, Set_Batch_Detail_List, Get_Feedback, Set_Feedback_List, Get_Self_Feedback, Set_Self_Feedback_List, Admin_Login_Invalid, Set_Reset_Login_Data,Reset_Login_Data ,Get_Factory_Statics ,Set_Factory_Statics_List} from "./constant";
import { API_URL } from "./constant"
import Axios from "axios"

function* superAdminUserLogin(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/superAdminLogin')
        const superAdminLoginRes = yield call(Axios.post, uri, requestData)
        const result = superAdminLoginRes.data;
        localStorage.setItem('superAdminUserId', superAdminLoginRes.data.userId);
        localStorage.setItem('superAdminUserName', superAdminLoginRes.data.userName);
        localStorage.setItem('superAdminUserEmail', superAdminLoginRes.data.userEmail);
        localStorage.setItem('superAdmintoken', superAdminLoginRes.data.token);
        localStorage.setItem('superAdminUserRole', superAdminLoginRes.data.userRole);
        localStorage.setItem('superAdminUserAddress', superAdminLoginRes.data.userAddress);
        localStorage.setItem('superAdminUserCity', superAdminLoginRes.data.userCity);
        localStorage.setItem('superAdminUserCountry', superAdminLoginRes.data.userCountry);
        localStorage.setItem('superAdminUserLatitude', superAdminLoginRes.data.userLatitude);
        localStorage.setItem('superAdminUserLongitude', superAdminLoginRes.data.userLongitude);
        yield put({ type: Set_SuperAdmin_Login, result })
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: SuperAdmin_Login_Fail })
    }
}

function* getSuperAdminLocalStoreData() {
    yield put({ type: set_SuperAdmin_Local_Store_Data })
}





function* getUserDetail(data) {
    const requestData = data.data

    try {
        let uri = API_URL.concat('/userById')
        const userRecord = yield call(Axios.post, uri, requestData)
        const result = userRecord.data;
        yield put({ type: Set_User_Detail, result })
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_User_Detail })
    }
}


function* handleUserStatus(data) {
    const requestData = data.data

    try {
        let uri = API_URL.concat('/userStatusUpdate')
        const userStatusRes = yield call(Axios.post, uri, requestData)

        const result = userStatusRes.data;
        yield put({ type: Set_Handle_User_Status_Data, result })
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Handle_User_Status_Data_Fail })
    }
}

function* storeCompany(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/addUser')
        const storeCompanyRes = yield call(Axios.post, uri, requestData)
        const result = storeCompanyRes.data;
        yield put({ type: Set_Store_Company_Data, result })
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Company_Data_Fail })
    }
}
function* checkCompanySuccessdata(data) {
    const requestData = data.data
    yield put({ type: Check_Company_Success_data_1 })

}
function* getCompany(data) {
    try {
        let uri = API_URL.concat('/company')
        const companyListRes = yield call(Axios.get, uri)
        const result = companyListRes.data;
        yield put({ type: Set_Company_List, result })
    } catch (error) {
        yield put({ type: Set_Company_List, error })
        console.log("Error is ", error)
    }
}

function* getFraudScans() {
    try {
        let uri = BLOCKCHAIN_API_URL.concat('/getFraudScans')
        const fraudScansListRes = yield call(Axios.get, uri)
        const result = fraudScansListRes.data;
        yield put({ type: Set_Fraud_Scans_List, result })
    } catch (error) {
        yield put({ type: Set_Fraud_Scans_List, error })
        console.log("Error is ", error)
    }
}
function* getAllLevelFails() {
    try {
        let uri = BLOCKCHAIN_API_URL.concat('/viewLevelCounts')
        const allLevelFailsListRes = yield call(Axios.get, uri)
        const result = allLevelFailsListRes.data;
        yield put({ type: Set_All_Level_Fails_List, result })
    } catch (error) {
        yield put({ type: Set_All_Level_Fails_List, error })
        console.log("Error is ", error)
    }
}
function* superAdminUserLogout(data) {
    yield put({ type: Set_SuperAdmin_Logout })
}
function* adminUserLogin(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/adminLogin')
        const adminLoginRes = yield call(Axios.post, uri, requestData)
        const result = adminLoginRes.data;
        if (result.status == 'fail') {
            yield put({ type: Admin_Login_Invalid, result })
        } else {
            localStorage.setItem('adminUserId', adminLoginRes.data.userId);
            localStorage.setItem('superAdminId', adminLoginRes.data.superAdminId);
            localStorage.setItem('adminUserName', adminLoginRes.data.userName);
            localStorage.setItem('adminUserEmail', adminLoginRes.data.userEmail);
            localStorage.setItem('admintoken', adminLoginRes.data.token);
            localStorage.setItem('adminUserRole', adminLoginRes.data.userRole);
            localStorage.setItem('adminUserAddress', adminLoginRes.data.userAddress);
            localStorage.setItem('adminUserCity', adminLoginRes.data.userCity);
            localStorage.setItem('adminUserCountry', adminLoginRes.data.userCountry);
            localStorage.setItem('adminUserLatitude', adminLoginRes.data.userLatitude);
            localStorage.setItem('adminUserLongitude', adminLoginRes.data.userLongitude);
            yield put({ type: Set_Admin_Login, result })
        }
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Admin_Login_Fail })
    }
}
function* resetLoginData() {
    yield put({ type: Set_Reset_Login_Data })
}
function* getLocalStoreData() {
    yield put({ type: set_Local_Store_Data })
}
function* adminUserLogout(data) {
    yield put({ type: Set_Admin_Logout })
}
function* getRetailerByCompany(data) {
    try {
        const requestData = data.data
        let uri = API_URL.concat('/retailerByCompany')
        const factoryListRes = yield call(Axios.post, uri, requestData)
        const result = factoryListRes.data;
        yield put({ type: Set_Retailer_By_Company_List, result })
    } catch (error) {
        yield put({ type: Set_Retailer_By_Company_List, error })
        console.log("Error is ", error)
    }
}
function* getRetailers(data) {
    try {
        let uri = API_URL.concat('/retailer')
        const retailerListRes = yield call(Axios.get, uri)
        const result = retailerListRes.data;
        yield put({ type: Set_Retailer_List, result })
    } catch (error) {
        yield put({ type: Set_Retailer_List, error })

        console.log("Error is ", error)
    }
}
function* getFactoryByCompany(data) {
    try {
        const requestData = data.data
        let uri = API_URL.concat('/factoryByCompany')
        const factoryListRes = yield call(Axios.post, uri, requestData)
        const result = factoryListRes.data;
        yield put({ type: Set_Factory_By_Company_List, result })
    } catch (error) {
        yield put({ type: Set_Factory_By_Company_List, error })
        console.log("Error is ", error)
    }
}
function* getFactory(data) {
    try {
        let uri = API_URL.concat('/factory')
        const factoryListRes = yield call(Axios.get, uri)
        const result = factoryListRes.data;
        yield put({ type: Set_Factory_List, result })
    } catch (error) {
        yield put({ type: Set_Factory_List, error })

        console.log("Error is ", error)
    }
}
function* getDistributerByCompany(data) {
    try {
        const requestData = data.data
        let uri = API_URL.concat('/distributerByCompany')
        const factoryListRes = yield call(Axios.post, uri, requestData)
        const result = factoryListRes.data;
        yield put({ type: Set_Distributer_By_Company_List, result })
    } catch (error) {
        yield put({ type: Set_Distributer_By_Company_List, error })
        console.log("Error is ", error)
    }
}
function* getDistributer(data) {
    try {
        let uri = API_URL.concat('/distributer')
        const distributerListRes = yield call(Axios.get, uri)
        const result = distributerListRes.data;
        yield put({ type: Set_Distributer_List, result })
    } catch (error) {
        yield put({ type: Set_Distributer_List, error })

        //console.log("Error is ", error)
    }
}


// function* storeFactory(data) {
//     const requestData = data.data
//     try {
//         let uri = API_URL.concat('/addUser')
//         const storeFactoryRes = yield call(Axios.post, uri, requestData)
//         const result = storeFactoryRes.data;
//         if (result.status == 'fail') {
//             yield put({ type: Set_Store_Factory_Data_Already_Exist, result })
//         } else {
//             yield put({ type: Set_Store_Factory_Data, result })
//         }
//     } catch (error) {
//         console.log("Error is ", error)
//         yield put({ type: Set_Store_Factory_Data_Fail })
//     }
// }

function* factoryUserLogin(data) {
    const requestData = data.data

    try {

        let uri = API_URL.concat('/factoryLogin')
        const factoryLoginRes = yield call(Axios.post, uri, requestData)
        const result = factoryLoginRes.data;
        if (result.status == 'fail') {
            yield put({ type: Factory_Login_Invalid, result })
        } else {
            localStorage.setItem('factoryUserId', factoryLoginRes.data.userId);
            localStorage.setItem('factoryUserAdminId', factoryLoginRes.data.adminId);
            localStorage.setItem('factoryUserName', factoryLoginRes.data.userName);
            localStorage.setItem('factoryUserEmail', factoryLoginRes.data.userEmail);
            localStorage.setItem('factorytoken', factoryLoginRes.data.token);
            localStorage.setItem('factoryUserRole', factoryLoginRes.data.userRole);
            localStorage.setItem('factoryUserAddress', factoryLoginRes.data.address);
            localStorage.setItem('factoryUserCity', factoryLoginRes.data.city);
            localStorage.setItem('factoryUserCountry', factoryLoginRes.data.country);
            localStorage.setItem('factoryUserLatitude', factoryLoginRes.data.latitude);
            localStorage.setItem('factoryUserLongitude', factoryLoginRes.data.longitude);
            yield put({ type: Set_Factory_Login, result })
        }
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Factory_Login_Fail })
    }
}
function* getFactoryLocalStoreData() {
    yield put({ type: set_Factory_Local_Store_Data })
}
function* factoryUserLogout(data) {
    yield put({ type: Set_Factory_Logout })
}


function* resetFactoryData() {
    yield put({ type: Set_Reset_Factory_Data })
}

function* storeFactory(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/addUser')
        const storeFactoryRes = yield call(Axios.post, uri, requestData)
        const result = storeFactoryRes.data;
        if (result.status == 'fail') {
            yield put({ type: Set_Store_Factory_Data_Already_Exist, result })
        } else {
            yield put({ type: Set_Store_Factory_Data, result })
        }
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Factory_Data_Fail })
    }
}
function* checkFactorySuccessdata(data) {
    const requestData = data.data
    yield put({ type: Check_Factory_Success_data_1 })

}


function* resetDistributerData() {
    yield put({ type: Set_Reset_Distributer_Data })
}


function* storeDistributer(data) {
    const requestData = data.data
    console.log("requestData", requestData)

    try {
        let uri = API_URL.concat('/addUser')
        const storeDistributerRes = yield call(Axios.post, uri, requestData)
        const result = storeDistributerRes.data;
        if (result.status == 'fail') {
            yield put({ type: Set_Store_Distributer_Data_Already_Exist, result })
        } else {
            yield put({ type: Set_Store_Distributer_Data, result })
        }
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Distributer_Data_Fail })
    }
}
function* checkDistributerSuccessdata(data) {
    const requestData = data.data
    yield put({ type: Check_Distributer_Success_data_1 })

}

function* resetRetailerData() {
    yield put({ type: Set_Reset_Retailer_Data })
}


function* storeRetailer(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/addUser')
        const storeRetailerRes = yield call(Axios.post, uri, requestData)
        const result = storeRetailerRes.data;
        if (result.status == 'fail') {
            yield put({ type: Set_Store_Retailer_Data_Already_Exist, result })
        } else {
            yield put({ type: Set_Store_Retailer_Data, result })
        }
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Retailer_Data_Fail })
    }
}

function* checkRetailerSuccessdata(data) {
    const requestData = data.data
    yield put({ type: Check_Retailer_Success_data_1 })

}

function* storeFactoryReport(data) {
    const requestData = data.data;
    try {
        let uri = API_URL.concat('/scanIssueReport')
        const storeReportRes = yield call(Axios.post, uri, requestData)
        const result = storeReportRes.data;
        yield put({ type: Set_Store_Factory_Report_Data, result })
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Factory_Report_Data_Fail })
    }
}

function* resetFactoryReportData() {
    yield put({ type: Set_Reset_Factory_Report_Data })
}

function* getSelfReport(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/getSelfReport?senderUserID=')
        uri = uri.concat(requestData.senderUserID)
        const feedbackRes = yield call(Axios.get, uri)
        const result = feedbackRes.data;
        yield put({ type: Set_Self_Report_List, result })
    } catch (error) {
        yield put({ type: Set_Self_Report_List, error })
        console.log("Error is ", error)
    }
}

function* storeCompanyFeedback(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/addFeedback')
        const storeCompanyFeedbackRes = yield call(Axios.post, uri, requestData)
        const result = storeCompanyFeedbackRes.data;

        yield put({ type: Set_Store_Company_Feedback_Data, result })
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Company_Feedback_Data_Fail })
    }
}

function* checkCompanyFeedbackSuccessdata(data) {
    const requestData = data.data
    yield put({ type: Check_Company_Feedback_Success_data_1 })

}

function* storeMultiUser(data) {
    const requestData = data.data
    try {
        const valuesArray = [];
        requestData.map((value, index) => {
            valuesArray.push([value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8], value[9]])
        })
        let uri = API_URL.concat('/addMultiUser')
        console.log("uri", uri && uri)
        const storeDistributerRes = yield call(Axios.post, uri, valuesArray)
        console.log("storeDistributerRes", storeDistributerRes && storeDistributerRes)
        const result = storeDistributerRes.data;
        // if (valuesArray[0].pop() == 'Distributer') {
        //     yield put({ type: Set_Store_Distributer_Data, result })
        // } else if (valuesArray[0].pop() == 'Retailer') {
        //     yield put({ type: Set_Store_Retailer_Data, result })
        // }
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Distributer_Data_Fail })
    }
}
function* storeProductTemplate(data) {
    const requestData = data.data
    try {
        let uri = BLOCKCHAIN_API_URL.concat('/factoryAddProductTemplate')
        const storeProductTemplateRes = yield call(Axios.post, uri, requestData)
        const result = storeProductTemplateRes.data;
        console.log("result", result)
        yield put({ type: Set_Store_Product_Template_Data, result })
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Product_Template_Data_Fail })
    }
}
function* checkProductTemplateSuccessdata(data) {
    const requestData = data.data
    yield put({ type: Check_Product_Template_Success_data_1 })
}

function* resetProductTemplateData() {
    yield put({ type: Set_Reset_Product_Template_Data })
}
function* getProductTemplate(data) {
    const requestData = data.data
    try {
        let uri = BLOCKCHAIN_API_URL.concat('/viewListOfProductTemplates?factoryID=')
        uri = uri.concat(requestData.factoryID)
        const productTemplateListRes = yield call(Axios.get, uri)
        const result = productTemplateListRes.data;
        yield put({ type: Set_Product_Template_List, result })
    } catch (error) {
        yield put({ type: Set_Product_Template_List, error })

        console.log("Error is ", error)
    }
}


function* getBatchSentToDistributer(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/viewBatchCountByDistributors?factoryID=')
        uri = uri.concat(requestData.factoryID)
        const batchSentList = yield call(Axios.get, uri)
        const result = batchSentList.data;
        yield put({ type: Set_Batch_Sent_To_Distributer, result })
    } catch (error) {
        yield put({ type: Set_Batch_Sent_To_Distributer, error })
        console.log("Error is ", error)
    }
}
function* getBatchByDistributer(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/viewFactoryDistributorHistory?factoryID=')
        uri = uri.concat(requestData.factoryID)
        uri = uri.concat("&distibutorID=")
        uri = uri.concat(requestData.distributerID)
        const batchSentList = yield call(Axios.get, uri)
        const result = batchSentList.data;
        yield put({ type: Set_Batch_By_Distributer, result })
    } catch (error) {
        yield put({ type: Set_Batch_By_Distributer, error })
        console.log("Error is ", error)
    }
}

function* storeBatchTemplate(data) {
    const requestData = data.data
    try {
        let uri = BLOCKCHAIN_API_URL.concat('/factoryAddBatch')
        const storeBatchTemplateRes = yield call(Axios.post, uri, requestData)
        const result = storeBatchTemplateRes.data;
        yield put({ type: Set_Store_Batch_Template_Data, result })
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Set_Store_Batch_Template_Data_Fail })
    }
}
function* checkBatchTemplateSuccessdata(data) {
    const requestData = data.data
    yield put({ type: Check_Batch_Template_Success_data_1 })
}
function* getBatchTemplate(data) {
    const requestData = data.data
    try {
        let uri = BLOCKCHAIN_API_URL.concat('/viewListOfBatchesProducedByFactory?factoryID=')
        uri = uri.concat(requestData.factoryID)
        const batchTemplateListRes = yield call(Axios.get, uri)
        const result = batchTemplateListRes.data;
        yield put({ type: Set_Batch_Template_List, result })
    } catch (error) {
        yield put({ type: Set_Batch_Template_List, error })
        console.log("Error is ", error)
    }
}
function* resetBatchTemplateData() {
    yield put({ type: Set_Reset_Batch_Template_Data })
}
function* getBatchDetail(data) {
    const requestData = data.data
    try {
        let uri = BLOCKCHAIN_API_URL.concat('/viewBatchRecordByBatchId?batchID=')
        uri = uri.concat(requestData.batchID)

        console.log("uri", uri)
        const batchDetailRes = yield call(Axios.get, uri)

        const result = batchDetailRes.data;
        yield put({ type: Set_Batch_Detail_List, result })
    } catch (error) {
        yield put({ type: Set_Batch_Detail_List, error })

        console.log("Error is ", error)
    }
}

function* getFeedback(data) {
    const requestData = data.data

    try {
        let uri = API_URL.concat('/getFeedback?receiverUserID=')
        uri = uri.concat(requestData.receiverUserID)
        if (requestData.role != undefined) {
            uri = uri.concat("&role=")
            uri = uri.concat(requestData.role)
        }
        const feedbackRes = yield call(Axios.get, uri)
        const result = feedbackRes.data;
        yield put({ type: Set_Feedback_List, result })
    } catch (error) {
        yield put({ type: Set_Feedback_List, error })
        console.log("Error is ", error)
    }
}

function* getSelfFeedback(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/getSelfFeedback?senderUserID=')
        uri = uri.concat(requestData.senderUserID)
        const feedbackRes = yield call(Axios.get, uri)
        const result = feedbackRes.data;
        yield put({ type: Set_Self_Feedback_List, result })
    } catch (error) {
        yield put({ type: Set_Self_Feedback_List, error })
        console.log("Error is ", error)
    }
}

function* getFactoryStatics(data) {
    const requestData = data.data
    try {
        let uri = BLOCKCHAIN_API_URL.concat('/factoryStatics?factoryID=')
        uri = uri.concat(requestData.factoryID)
        const factoryStaticsRes = yield call(Axios.get, uri)
        const result = factoryStaticsRes.data;
        yield put({ type: Set_Factory_Statics_List, result })
    } catch (error) {
        yield put({ type: Set_Factory_Statics_List, error })
        console.log("Error is ", error)
    }
}

function* mainSaga() {
    yield takeLatest(Get_User_Detail, getUserDetail)
    yield takeLatest(SuperAdminUserLogin, superAdminUserLogin)
    yield takeLatest(Get_SuperAdmin_Local_Store_Data, getSuperAdminLocalStoreData)
    yield takeLatest(Handle_User_Status, handleUserStatus)
    yield takeLatest(Store_Company, storeCompany)
    yield takeLatest(Check_Company_Success_data, checkCompanySuccessdata)
    yield takeLatest(Get_Company, getCompany)
    yield takeLatest(Get_Fraud_Scans, getFraudScans)
    yield takeLatest(Get_All_Level_Fails, getAllLevelFails)


    yield takeLatest(SuperAdminUserLogout, superAdminUserLogout)
    yield takeLatest(AdminUserLogin, adminUserLogin)
    yield takeLatest(Reset_Login_Data, resetLoginData)
    yield takeLatest(AdminUserLogout, adminUserLogout)
    yield takeLatest(Get_Local_Store_Data, getLocalStoreData)
    yield takeLatest(Get_Retailers, getRetailers)
    yield takeLatest(Get_Retailer_By_Company, getRetailerByCompany)

    yield takeLatest(Check_Retailer_Success_data, checkRetailerSuccessdata)

    yield takeLatest(Get_Factory, getFactory)
    yield takeLatest(Get_Factory_By_Company, getFactoryByCompany)
    yield takeLatest(Check_Factory_Success_data, checkFactorySuccessdata)
    yield takeLatest(Get_Distributer, getDistributer)
    yield takeLatest(Get_Distributer_By_Company, getDistributerByCompany)
    yield takeLatest(Check_Distributer_Success_data, checkDistributerSuccessdata)

    yield takeLatest(FactoryUserLogin, factoryUserLogin)
    yield takeLatest(FactoryUserLogout, factoryUserLogout)
    yield takeLatest(Get_Factory_Local_Store_Data, getFactoryLocalStoreData)

    yield takeLatest(Reset_Factory_Data, resetFactoryData)
    yield takeLatest(Store_Factory, storeFactory)

    yield takeLatest(Reset_Distributer_Data, resetDistributerData)
    yield takeLatest(Store_Distributer, storeDistributer)
    yield takeLatest(Store_Retailer, storeRetailer)

    yield takeLatest(Reset_Retailer_Data, resetRetailerData)

    yield takeLatest(Store_Company_Feedback, storeCompanyFeedback)
    yield takeLatest(Check_Company_Feedback_Success_data, checkCompanyFeedbackSuccessdata)


    yield takeLatest(Reset_Factory_Report_Data, resetFactoryReportData)
    yield takeLatest(Store_Factory_Report, storeFactoryReport)
    yield takeLatest(Get_Self_Report, getSelfReport)


    yield takeLatest(Store_Multi_User, storeMultiUser)

    yield takeLatest(Store_Product_Template, storeProductTemplate)
    yield takeLatest(Check_Product_Template_Success_data, checkProductTemplateSuccessdata)

    yield takeLatest(Get_Product_Template, getProductTemplate)
    yield takeLatest(Reset_Product_Template_Data, resetProductTemplateData)


    yield takeLatest(Get_Batch_Sent_To_Distributer, getBatchSentToDistributer)

    yield takeLatest(Get_Batch_By_Distributer, getBatchByDistributer)




    yield takeLatest(Store_Batch_Template, storeBatchTemplate)
    yield takeLatest(Check_Batch_Template_Success_data, checkBatchTemplateSuccessdata)

    yield takeLatest(Get_Batch_Template, getBatchTemplate)

    yield takeLatest(Get_Batch_Detail, getBatchDetail)
    yield takeLatest(Reset_Batch_Template_Data, resetBatchTemplateData)


    yield takeLatest(Get_Feedback, getFeedback)
    yield takeLatest(Get_Self_Feedback, getSelfFeedback)
    yield takeLatest(Get_Factory_Statics, getFactoryStatics)


}
export default mainSaga