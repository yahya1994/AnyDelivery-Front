
import { CLIENT_ROLE, ANYDELIVERY_BASE_URL } from '../../helpers/constants/constants';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'; 
import {SharedFunction, } from '../../helpers/functions/functions'; 

export const me = () => dispatch => {
  
        SharedFunction('/me','GET').then((response)=>
        {console.log('user : '+response )
          
        }).catch ((err) => {
          console.log(err);
        }) 
    }; 

export const Login = (email, password, nav) => dispatch => {
    dispatch({ type: 'DATA_ATTEMPT'})
    axios.post('http://2130ece0.ngrok.io/api/user/login',
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
            else {
              
                dispatch({ type: 'FAIL', payload: { message: "vous n'avez pas le droit pour acceder dans cette interface ", success: false } })

            }
        }, (err) => {
             console.log('xxxxxxxx')
            dispatch({ type: 'FAIL', payload: { message: err.response.data.message, success: err.response.data.success } })

        })
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

