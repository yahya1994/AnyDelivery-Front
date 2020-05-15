
 import {combineReducers, } from 'redux';
import authReducer from './authReducer';
import ParcelsReducer from './ParcelsReducer';

 
 export default  combineReducers({
  auth: authReducer   ,
  parcel: ParcelsReducer
});