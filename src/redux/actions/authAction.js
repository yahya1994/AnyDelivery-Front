
import { CLIENT_ROLE,DELIVERYMAN_ROLE,ANYDELIVERY_BASE_URL } from '../../helpers/constants/constants';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { SharedFunction, } from '../../helpers/functions/functions';
import { Alert } from 'react-native';
import { REGISTERATION,DATA_ATTEMPT,SUCCESS ,FAIL,HIDE_MODAL,LOGOUT } from './actionType';
import OneSignal from 'react-native-onesignal'; 

 


export const Registration = (data, nav) => dispatch => {
  dispatch({ type: DATA_ATTEMPT })
  axios({
    method: 'post',
    url: ANYDELIVERY_BASE_URL+'/user/register',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    }, 
  }).then((response) => {
    console.log(response.data)
    Alert.alert(
      "success",
      "votre nouveau compte est creér ",
      [{ text: "OK", onPress: () => nav.replace('Auth') }],
      { cancelable: false });

    dispatch({
      type: REGISTERATION, payload: { items: response, loading: false }
    })
  }).catch((err) => {
    console.log("+++" + err);

  })

};
export const Login = (email, password, nav) => dispatch => {
  dispatch({ type: DATA_ATTEMPT })
  axios.post(ANYDELIVERY_BASE_URL + '/user/login',
    { email, password })
    .then((response) => {
      if (response.data.role === CLIENT_ROLE) {
        storeData(response.data.token);
        // clearToken()
        nav.navigate('Main');
        OneSignal.setExternalUserId(response.data.role.toString());
        dispatch({ type: SUCCESS, payload: { user: response.data.user, success: response.data.success } })
      }
      if (response.data.role === DELIVERYMAN_ROLE) {
        storeData(response.data.token);
        OneSignal.setExternalUserId(response.data.role.toString());
        nav.navigate('MainDeliveryMan');
        dispatch({ type: SUCCESS, payload: { user: response.data.user, success: response.data.success } })
      }
    }, (err) => {
      console.log('xxxxxxxx')
      dispatch({ type: FAIL, payload: { message: err.response.data.message, success: err.response.data.success } })
    })
};
export const HideModal = () => dispatch => {
  dispatch({ type: HIDE_MODAL })

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
export const clearToken =async   () => {
  await  AsyncStorage.removeItem('AUTH_TOKEN');
  console.log('clear token  ')
};

export const logout = (nav) =>   dispatch => {
 clearToken()
  nav.navigate('Auth');
  dispatch({ type: LOGOUT })
};

