
 import {combineReducers, } from 'redux';
import authReducer from './authReducer';
import ParcelsReducer from './ParcelsReducer';
import ReportReducer from './ReportReducer';

 
 export default  combineReducers({
  auth: authReducer   ,
  Report: ReportReducer   ,
  parcel: ParcelsReducer
});