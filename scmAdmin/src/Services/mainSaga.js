import { takeLatest, call, put } from 'redux-saga/effects'
import { AdminUserLogin, Set_Admin_Login, Admin_Login_Fail, AdminUserLogout, Set_Admin_Logout, Get_Local_Store_Data, set_Local_Store_Data, Get_Retailers, Set_Retailer_List, Get_Factory, Set_Factory_List, Get_Distributer, Set_Distributer_List, FactoryUserLogin, Set_Factory_Login, Factory_Login_Fail, FactoryUserLogout, Set_Factory_Logout, Get_Factory_Local_Store_Data, set_Factory_Local_Store_Data, Store_Factory, Set_Store_Factory_Data, Set_Store_Factory_Data_Fail, Store_Distributer, Set_Store_Distributer_Data, Set_Store_Distributer_Data_Fail, Store_Retailer, Set_Store_Retailer_Data, Set_Store_Retailer_Data_Fail, Store_Multi_User, Store_Product_Template } from "./constant"
import { API_URL } from "./constant"
import Axios from "axios"

function* adminUserLogin(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/adminLogin')
        const adminLoginRes = yield call(Axios.post, uri, requestData)
        const result = adminLoginRes.data;
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
    } catch (error) {
        console.log("Error is ", error)
        yield put({ type: Admin_Login_Fail })
    }
}
function* getLocalStoreData() {
    yield put({ type: set_Local_Store_Data })
}
function* adminUserLogout(data) {
    yield put({ type: Set_Admin_Logout })
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




function* factoryUserLogin(data) {
    const requestData = data.data
    try {
        let uri = API_URL.concat('/factoryLogin')
        const factoryLoginRes = yield call(Axios.post, uri, requestData)
        const result = factoryLoginRes.data;
        localStorage.setItem('factoryUserName', factoryLoginRes.data.userName);
        localStorage.setItem('factoryUserEmail', factoryLoginRes.data.userEmail);
        localStorage.setItem('factorytoken', factoryLoginRes.data.token);
        localStorage.setItem('factoryUserRole', factoryLoginRes.data.userRole);
        yield put({ type: Set_Factory_Login, result })
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


function* storeFactory(data) {
    const requestData = data.data
    try {
        //console.log("requestData", requestData);
        let uri = API_URL.concat('/adddistributer')
        const storeFactoryRes = yield call(Axios.post, uri, requestData)
        const result = storeFactoryRes.data;
        //yield put({type: Set_Store_Factory_Data,result})
    } catch (error) {
        console.log("Error is ", error)
        //yield put({type:Set_Store_Factory_Data_Fail})
    }
}


function* storeDistributer(data) {
    const requestData = data.data
    try {
        console.log("requestData", requestData);
        let uri = API_URL.concat('/adddistributer')
        const storeDistributerRes = yield call(Axios.post, uri, requestData)
        const result = storeDistributerRes.data;
        //yield put({type: Set_Store_Distributer_Data,result})
    } catch (error) {
        console.log("Error is ", error)
        //yield put({type:Set_Store_Distributer_Data_Fail})
    }
}

function* storeRetailer(data) {
    const requestData = data.data
    try {
        //console.log("requestData", requestData);
        let uri = API_URL.concat('/adddistributer')
        const storeRetailerRes = yield call(Axios.post, uri, requestData)
        const result = storeRetailerRes.data;
        //yield put({type: Set_Store_Retailer_Data,result})
    } catch (error) {
        console.log("Error is ", error)
        //yield put({type:Set_Store_Retailer_Data_Fail})
    }
}

function* storeMultiUser(data) {
    const requestData = data.data
    try {

        const valuesArray = [];

        requestData.map((value, index) => {
            //  {value.map((val, i) => {

            // valuesArray.push(['hashAddress',value[0]]);
            // valuesArray.push(['name',value[1]]);
            //valuesArray.push(['hashAddress:'+ value[0], 'name',value[1]])
            valuesArray.push([value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8]])


            // })}

        })



        console.log("requestData main saga", valuesArray);
        let uri = API_URL.concat('/addMultiUser')
        const storeDistributerRes = yield call(Axios.post, uri, valuesArray)
        const result = storeDistributerRes.data;
        //yield put({type: Set_Store_Distributer_Data,result})
    } catch (error) {
        console.log("Error is ", error)
        //yield put({type:Set_Store_Distributer_Data_Fail})
    }
}


async function* storeProductTemplate(data) {
    const requestData = data.data
    try {

        const currentFactoryUserHash = localStorage.getItem('currentFactoryUserHash');
        // console.log("currentFactoryUserHash", currentFactoryUserHash)
        // console.log("requestData main saga", requestData);

          //await supplychain.addProductTemplate(currentFactoryUserHash,requestData.productName,requestData.productDescription);

        
        //yield put({type: Set_Store_Distributer_Data,result})
    } catch (error) {
        console.log("Error is ", error)
        //yield put({type:Set_Store_Distributer_Data_Fail})
    }
}



function* mainSaga() {
    yield takeLatest(AdminUserLogin, adminUserLogin)
    yield takeLatest(AdminUserLogout, adminUserLogout)
    yield takeLatest(Get_Local_Store_Data, getLocalStoreData)
    yield takeLatest(Get_Retailers, getRetailers)
    yield takeLatest(Get_Factory, getFactory)
    yield takeLatest(Get_Distributer, getDistributer)


    yield takeLatest(FactoryUserLogin, factoryUserLogin)
    yield takeLatest(FactoryUserLogout, factoryUserLogout)
    yield takeLatest(Get_Factory_Local_Store_Data, getFactoryLocalStoreData)
    yield takeLatest(Store_Factory, storeFactory)
    yield takeLatest(Store_Distributer, storeDistributer)
    yield takeLatest(Store_Retailer, storeRetailer)
    yield takeLatest(Store_Multi_User, storeMultiUser)
    yield takeLatest(Store_Product_Template, storeProductTemplate)



}
export default mainSaga