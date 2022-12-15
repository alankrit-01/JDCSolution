import { configureStore } from "@reduxjs/toolkit";
import { finalrecord } from "./reducer";
import mainSaga from "./mainSaga";
import createSagaMiddleware from "@redux-saga/core";
const SagaMiddleware = createSagaMiddleware()
const store =  configureStore({
        reducer: finalrecord,
        middleware:() => [SagaMiddleware]
})  
SagaMiddleware.run(mainSaga);
export default store