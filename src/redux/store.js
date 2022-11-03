import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';
import clockingReducer from './clocking/clockingSlice';
import companyReducer from "./company/companySlice";
import categoryReducer from './companyCategory/categorySlice';
import serviceReducer from './service/serviceSlice';
import advertisingReducer from './advertising/advertisingSlice';
import advertisingPackageReducer from './advertisingPackage/advertisingPackageSlice';

const store = configureStore({reducer: {
    auth:authReducer, 
    advertising:advertisingReducer,
    profile:profileReducer,
    clocking:clockingReducer,
    category:categoryReducer, 
    company:companyReducer,
    advertisingPackage:advertisingPackageReducer,
    service:serviceReducer
}});

export default store;