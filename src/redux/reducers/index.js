
 import {combineReducers, } from 'redux';
import authReducer from './authReducer';
import ParcelsReducer from './ParcelsReducer';
import ReportReducer from './ReportReducer';
import ChatReducer from './ChatReducer';

 
 export default  combineReducers({
  auth: authReducer   ,
  Report: ReportReducer   ,
  parcel: ParcelsReducer,
  chat: ChatReducer,
});