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
  SharedFunction('/parcels?page='+pageNumber, 'GET').then((response) => {
   
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
    console.log(response.id)
    nav.replace ('Main');
    dispatch({
      type: 'CREATE_PARCEL', payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};

export const ChoseParcel = (id) => dispatch => {
  SharedFunction('/deliveryMan/parcel/'+id, 'PUT' ).then((response) => {
    console.log(response)
    dispatch({
      type: 'CREATE_PARCEL', payload: { items: response, } })
  }).catch((err) => {
    console.log(err);

  })
};


