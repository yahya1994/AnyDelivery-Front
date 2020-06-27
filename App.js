/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import Authentification from './src/screens/Shared/Authentification';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import startMainTab from './src/navigation/TabNavigation/startMainTab';
import startMainTabForDeliveryMan from './src/navigation/TabNavigation/startMainTabForDeliveryMan';
import RegistrationSteptwo from './src/screens/Shared/RegistrationSteptwo';
import RegistrationStepOne from './src/screens/Shared/RegistrationStepOne';
import ParcelDetails from './src/screens/Shared/ParcelDetails';
import RegistrationType from './src/screens/Shared/RegistrationType';
import GetAdresseFromMap from './src/screens/Shared/GetAdresseFromMap';
import Chat from './src/screens/Shared/Chat';
import Map from './src/screens/Shared/Map';
import reducers from './src/redux/reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Report from './src/screens/Shared/Report';
import Header from './src/components/Shared/header';
import CreateParcels from './src/screens/Client/CreateParcels';
import SplashScreen from './src/screens/Shared/SplashScreen';
import OneSignal from 'react-native-onesignal'; 
import {PARCEL_LIST_SCREEN_TITLE,CHAT_SCREEN_TITLE, PROFIL_SCREEN_TITLE,HOME_SCREEN_TITLE,REGISTRATION_SCREEN_TITLE ,CHATS_SCREEN_TITLE,REPORT_SCREEN_TITLE,CREATE_PARCEL_SCREEN_TITLE ,PARCEL_DETAILS_SCREEN_TITLE} from 
'./src/navigation/stack screen title/stackScreenTitle';
import {DELIVERY_MAN_TAKEN_PARCELS,PROFIL_SCREEN,HOME_SCREEN,SPLASH_SCREEN,MAP_SCREEN,GET_ADRESSE_FROM_MAP_SCREEN,CREATE_PARCEL_SCREEN,REPORT_SCREEN,PARCEL_DETAILS_SCREEN, LOGIN_SCREEN,REGISTRATION_STEP_ONE_SCREEN,CHAT_SCREEN,REGISTRATION_STEP_TWO_SCREEN, REGISTRATION_TYPE_SCREEN} from './src/navigation/stack screen name/StackScreenName';
import DetailsProfil from './src/screens/Shared/DetailsProfil';
const Stack = createStackNavigator();


function getHeaderTitle_DeliveryMan(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || HOME_SCREEN;

  switch (routeName) {
    case HOME_SCREEN:
      return PARCEL_LIST_SCREEN_TITLE;
    case DELIVERY_MAN_TAKEN_PARCELS:
      return HOME_SCREEN_TITLE;
    case PROFIL_SCREEN:
      return PROFIL_SCREEN_TITLE;
    case CHAT_SCREEN:
      return CHAT_SCREEN_TITLE;
  }
}
function getHeaderTitle_Client(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || HOME_SCREEN;

  switch (routeName) {
    case HOME_SCREEN:
      return HOME_SCREEN_TITLE;
    case PROFIL_SCREEN:
      return PROFIL_SCREEN_TITLE;
    case CHAT_SCREEN:
      return CHAT_SCREEN_TITLE;
  }
}

function App() {
useEffect(()=>{
  //console.disableYellowBox = true;
  OneSignal.init("f0427f2f-25cf-4346-88b2-7b5ea50b7214");
}) 
  return (

    <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
      <NavigationContainer>
        <Stack.Navigator  >

        <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} options={{ headerShown: false } } />
          <Stack.Screen name={LOGIN_SCREEN} component={Authentification} options={{ headerShown: false }} />
          <Stack.Screen name={REGISTRATION_STEP_ONE_SCREEN} component={RegistrationStepOne}
            options={{
              headerTransparent: true, title: REGISTRATION_SCREEN_TITLE,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
          <Stack.Screen name={REGISTRATION_TYPE_SCREEN} component={RegistrationType}
            options={{
              headerTransparent: true, title:REGISTRATION_SCREEN_TITLE,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
          <Stack.Screen name="details" component={DetailsProfil} options={{
              title: 'details profil', headerTitleStyle: { color: 'white', fontSize: 25, },headerBackground: () => (<Header />), headerStyle: { height: 49 }
           
            }}  />

          
          <Stack.Screen name={REGISTRATION_STEP_TWO_SCREEN} component={RegistrationSteptwo}
            options={{
              headerTransparent: true, title: REGISTRATION_SCREEN_TITLE,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />

          <Stack.Screen name="MainDeliveryMan" component={startMainTabForDeliveryMan}
            options={({ route, }) => ({
              headerTitleAlign: 'center',
              headerLeft: null, title: getHeaderTitle_DeliveryMan(route)
              , headerTitleStyle: { color: 'white', fontSize: 25, }, headerBackground: () => (<Header />), headerStyle: { height: 49 }
            })} />

          <Stack.Screen name='chats' component={Chat}
            options={{
              title: 'chats',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />

          <Stack.Screen name={CREATE_PARCEL_SCREEN} component={CreateParcels}
            options={{
              title: CREATE_PARCEL_SCREEN_TITLE, headerBackground: () => (<Header />
              ), headerTitleStyle: { color: 'white', fontSize: 25, }

            }} />

          <Stack.Screen name="Main" component={startMainTab}
            options={({ route, }) => ({
              headerTitleAlign: 'center',
              headerLeft: null, title: getHeaderTitle_Client(route)
              , headerTitleStyle: { color: 'white', fontSize: 25, }, headerBackground: () => (<Header />), headerStyle: { height: 49 }
            })} />
          <Stack.Screen name={PARCEL_DETAILS_SCREEN} component={ParcelDetails} options={{
            headerBackground: () => (<Header />
            ),  title: PARCEL_DETAILS_SCREEN_TITLE, headerTitleStyle: { color: 'white', fontSize: 25, }
          }} />
          <Stack.Screen name={REPORT_SCREEN} component={Report} options={{
            headerBackground: () => (<Header />
            ), title:REPORT_SCREEN_TITLE,  headerTitleStyle: { color: 'white',fontSize: 25, }
          }} />

          <Stack.Screen name={MAP_SCREEN} component={Map} options={{
            headerBackground: () => (
              <Header />
            ), headerTitleStyle: { color: 'white', fontSize: 25, }
          }} />
          <Stack.Screen name={GET_ADRESSE_FROM_MAP_SCREEN} component={GetAdresseFromMap} options={{
            headerBackground: () => (
              <Header />
            ), title:CREATE_PARCEL_SCREEN_TITLE, headerTitleStyle: { color: 'white', fontSize: 25, }
          }} />
         
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;