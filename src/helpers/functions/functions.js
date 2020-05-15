import axios from 'axios';
import {ANYDELIVERY_BASE_URL} from '../constants/constants';
import AsyncStorage from '@react-native-community/async-storage';
 
 export const SharedFunction = async (EndPoint,METHODE,params)=>{
  let token = await retrieveToken('AUTH_TOKEN')
  let config = {
        method : METHODE , 
        url: ANYDELIVERY_BASE_URL+EndPoint,
        headers:{ Authorization:   'Bearer '.concat(token)  },
        data: params,
    } 
  try{      
        const response = await axios(config);
        return response.data;
      } 
      catch(err) {
        return err;
     } 
    
 }
 export const retrieveToken = async (key) => {
  let value = await AsyncStorage.getItem(key)
  return value;
};
 
