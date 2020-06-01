
import { CLIENT_ROLE, ANYDELIVERY_BASE_URL } from '../../helpers/constants/constants';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'; 
import {SharedFunction, } from '../../helpers/functions/functions'; 
 
export const Login = (email, password, nav) => dispatch => {
    dispatch({ type: 'DATA_ATTEMPT'})
    axios.post('http://7523694db5cb.ngrok.io/api/user/login',
        { email, password })
        .then((response) => {
            if (response.data.role === 1) {
                storeData(response.data.token);
        
               // clearToken()
               nav.navigate('Main');
                   dispatch({ type: 'SUCCESS', payload: { user:response.data.user, success : response.data.success }})
                 
            }    
            if (response.data.role === 2) {
                storeData(response.data.token);
                nav.navigate('MainDeliveryMan');
                dispatch({ type: 'SUCCESS',  payload: { user:response.data.user, success : response.data.success }})      
           }
           
        }, (err) => {
             console.log('xxxxxxxx')
            dispatch({ type: 'FAIL', payload: { message: err.response.data.message, success: err.response.data.success } })

        })
};
export const HideModal =  () => dispatch=>{
    dispatch({ type: 'HIDE_MODAL'  })
    
  };
export const storeData = async (token) => {
    try {
      await AsyncStorage.setItem(
        'AUTH_TOKEN',
        token
      );
      console.log('store token  ')
    } catch (error) {
    }
  };
  export const clearToken =async () =>{
 
         await AsyncStorage.RemoveItem(AUTH_TOKEN);
         console.log('clear token  ')
   }; 
 
export const logout = () => dispatch => {
    localStorage.clear();
    History.push("/login");
    dispatch({ type: LOGOUT })
};

