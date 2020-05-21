import { PARCELS, PAGE } from '../../helpers/constants/EndPoint/EndPoint';
import { SharedFunction, } from '../../helpers/functions/functions';
import AsyncStorage from '@react-native-community/async-storage';

export const fetshParcels = ( status,pageNumber) => dispatch => {
  dispatch({ type: 'FETCH_DATA_ATTEMPT' })
  SharedFunction('/client/parcel?status='+status+'&page='+pageNumber, 'GET').then((response) => {
  
     const type = response.current_page ===1 ?'FETCH_PARCELS' :'FETCH_MORE_PARCELS'
      dispatch({
        type: type, payload: {
          items: response.data, 
          totalItemsCount: response.total,
          current_page :response.current_page,
          last_page : response.last_page
        }
      })
     
    
  }).catch((err) => {
    console.log("error = "+ err ); })
};

export const fetshParcels_DeliveryMan = (status,pageNumber) => dispatch => {
  dispatch({ type: 'FETCH_DATA_ATTEMPT' })
  SharedFunction('/parcels?status='+0+'&page='+pageNumber, 'GET').then((response) => {
   
    const type = response.current_page ===1 ?'FETCH_PARCELS' :'FETCH_MORE_PARCELS'
    dispatch({
      type: type, payload: {
        items: response.data, 
        totalItemsCount: response.total,
        current_page :response.current_page,
        last_page : response.last_page
      }
    })
   
  
}).catch((err) => {
  console.log("error = "+ err ); })
};
export const CreateParcel = (data,nav) => dispatch => {
  SharedFunction('/client/parcel', 'POST', data).then((response) => {
    console.log(response)
    nav.replace ('Main');
    dispatch({
      type: 'CREATE_PARCEL', payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};

export const parcelReady = (id) => dispatch => {
  SharedFunction('/client/parcelReady/'+id, 'PUT' ).then((response) => {
    console.log(response)
    dispatch({
      type: 'PARCEL_READY', payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};

export const parcelDone = (id) => dispatch => {
  SharedFunction('/deliveryMan/parcelDone/'+id, 'PUT' ).then((response) => {
    console.log('Done '+response)
    dispatch({
      type: 'PARCEL_DONE', payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};


export const ChoseParcel = (id) => dispatch => {
  SharedFunction('/deliveryMan/parcel/'+id, 'PUT' ).then((response) => {
    console.log("response")
    dispatch({
      type: 'CHOSE_PARCEL', payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};
 
  
export const fetsh_DeliveryMan_Parcel = (status,pageNumber) => dispatch => {
  dispatch({ type: 'FETCH_DATA_ATTEMPT' })
  SharedFunction('/deliveryMan/parcel?status='+status+'&page='+pageNumber,  'GET').then((response) => {
    const type = response.current_page ===1 ?'FETCH_TAKEN_PARCEL' :'FETCH_MORE_TAKEN_PARCELS'
    dispatch({
      type: type, payload: {
        items: response.data, 
        totalItemsCount: response.total,
        current_page :response.current_page,
        last_page : response.last_page
      }
    })
}).catch((err) => {
  console.log("error d= "+ err ); })
};