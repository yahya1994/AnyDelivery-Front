import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParcelDetails from '../screens/ParcelDetails';
import ParcelList_DM from '../screens/DeliveryMan/ParcelList_DM';
import CreateParcelStepTwo from '../screens/CreateParcelStepTwo';
import CreateParcel from '../screens/CreateParcel';
import UserProfil from '../screens/UserProfil';
import CreateParcels from '../screens/CreateParcels';
 
const Tab = createBottomTabNavigator();

const DeliveryManTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel : false,
        activeTintColor: '#007aff',
        inactiveTintColor: '#240000',
        style: { paddingBottom: 10, height: 50, backgroundColor: 'white' },       
      }}
    >
      <Tab.Screen
        name="Home"
        component={ParcelList_DM}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
        <Tab.Screen
        name="chats"
        component={CreateParcels}
        options={{
         
          tabBarIcon: ({ color, size }) => (
            <Icon name='database' color={color} size={30} /> 
          ), 
        } 
      } 
      />
      <Tab.Screen
        name="chat"
        component={CreateParcels}
        options={{
         
          tabBarIcon: ({ color, size }) => (
            <Icon name='comments-o' color={color} size={30} /> 
          ), 
        } 
      } 
      />
      <Tab.Screen
        name="Profil"
        component={UserProfil}
        options={{
          tabBarIcon: ({ focused, color }) => (

            <Icon name='user-o' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
    

    
  );
}
export default DeliveryManTabs;
