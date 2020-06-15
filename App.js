/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Authentification from './src/screens/Authentification';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import startMainTab from './src/MainTabScreens/startMainTab';
import startMainTabForDeliveryMan from './src/MainTabScreens/startMainTabForDeliveryMan';
import RegistrationSteptwo from './src/screens/RegistrationSteptwo';
import RegistrationStepOne from './src/screens/RegistrationStepOne';
import ParcelDetails from './src/screens/ParcelDetails';
import CreateParcelStepTwo from './src/screens/CreateParcelStepTwo';
import RegistrationType from './src/screens/RegistrationType';
import CreateParcelStepThree from './src/screens/CreateParcelStepThree';
import GetAdresseFromMap from './src/screens/GetAdresseFromMap';
import Chat from './src/screens/Chat';
import Map from './src/screens/Map';
import reducers from './src/redux/reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Report from './src/screens/Report';
import Header from './src/components/header';
import CreateParcels from './src/screens/CreateParcels';
import SplashScreen from './src/screens/SplashScreen';
const Stack = createStackNavigator();


function getHeaderTitle_DeliveryMan(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home';

  switch (routeName) {
    case 'Home':
      return 'Liste des colis';
    case 'UserParcel':
      return "Vos colis";
    case 'Profil':
      return 'Profil';
    case 'chat':
      return 'chat';
  }
}
function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home';

  switch (routeName) {
    case 'Home':
      return 'Mes colis';
    case 'creer':
      return "Création d'une Colis";
    case 'Profil':
      return 'Profil';
    case 'chat':
      return 'chat';
  }
}
function App() {

  return (

    <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
      <NavigationContainer>
        <Stack.Navigator  >
        <Stack.Screen name="splashScreen" component={SplashScreen} options={{ headerShown: false } } />
          <Stack.Screen name="Auth" component={Authentification} options={{ headerShown: false }} />
          <Stack.Screen name="Creér votre compte" component={RegistrationStepOne}
            options={{
              headerTransparent: true, title: 'Creér votre compte',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
          <Stack.Screen name="RegistrationType" component={RegistrationType}
            options={{
              headerTransparent: true, title: 'Creér votre compte',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />

          <Stack.Screen name="Creér votre compte2" component={RegistrationSteptwo}
            options={{
              headerTransparent: true, title: 'Creér votre compte',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />

          <Stack.Screen name="MainDeliveryMan" component={startMainTabForDeliveryMan}
            options={({ route, }) => ({
              headerTitleAlign: 'center',
              headerLeft: null, title: getHeaderTitle_DeliveryMan(route)
              , headerTitleStyle: { color: 'white', fontSize: 25, }, headerBackground: () => (<Header />), headerStyle: { height: 49 }
            })} />

          <Stack.Screen name="Chat" component={Chat}
            options={{
              title: 'chats',
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />

          <Stack.Screen name="create parcel" component={CreateParcels}
            options={{
              title: "creation d'une colis", headerBackground: () => (<Header />
              ), headerTitleStyle: { color: 'white', fontSize: 25, }

            }} />

          <Stack.Screen name="Main" component={startMainTab}
            options={({ route, }) => ({
              headerTitleAlign: 'center',
              headerLeft: null, title: getHeaderTitle(route)
              , headerTitleStyle: { color: 'white', fontSize: 25, }, headerBackground: () => (<Header />), headerStyle: { height: 49 }
            })} />
          <Stack.Screen name="ParcelDetails" component={ParcelDetails} options={{
            headerBackground: () => (<Header />
            ),  title: "Details Colis", headerTitleStyle: { color: 'white', fontSize: 25, }
          }} />
          <Stack.Screen name="Report" component={Report} options={{
            headerBackground: () => (<Header />
            ), title: "Reclamation",  headerTitleStyle: { color: 'white',fontSize: 25, }
          }} />

          <Stack.Screen name="Map" component={Map} options={{
            headerBackground: () => (
              <Header />
            ), headerTitleStyle: { color: 'white', fontSize: 25, }
          }} />
          <Stack.Screen name="GetAdresseFromMap" component={GetAdresseFromMap} options={{
            headerBackground: () => (
              <Header />
            ), title: "Création d'une Colis", headerTitleStyle: { color: 'white', fontSize: 25, }
          }} />
          <Stack.Screen name="CreateParcelStepTwo" component={CreateParcelStepTwo} options={{
            headerBackground: () => (
              <Header />
            ), title: "Création d'une Colis", headerTitleStyle: { color: 'white', fontSize: 25, }
          }} />
          <Stack.Screen name="CreateParcelStepThree" component={CreateParcelStepThree} options={{
            headerBackground: () => (
              <Header />
            ), title: "Création d'une Colis", headerTitleStyle: { color: 'white', fontSize: 25, }
          }} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;