import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParcelDetails from '../../screens/Shared/ParcelDetails';
import ParcelList_DM from '../../screens/DeliveryMan/ParcelList_DM';
import UserProfil from '../../screens/Shared/UserProfil';
import ConversationList from '../../screens/Shared/ConversationList';
import TakenParcelList from '../../screens/DeliveryMan/TakenParcelList';
 import {HOME_SCREEN ,CHAT_SCREEN,PROFIL_SCREEN,DELIVERY_MAN_TAKEN_PARCELS  } from '../stack screen name/StackScreenName';
const Tab = createBottomTabNavigator(); 

const DeliveryManTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_SCREEN}
      tabBarOptions={{
        showLabel : false,
        activeTintColor: '#007aff',
        inactiveTintColor: '#240000',
        style: { paddingBottom: 10, height: 50, backgroundColor: 'white' },       
      }}
    >
      <Tab.Screen
        name={HOME_SCREEN}
        component={ParcelList_DM}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
        <Tab.Screen
        name={DELIVERY_MAN_TAKEN_PARCELS}
        component={TakenParcelList}
        options={{
         
          tabBarIcon: ({ color, size }) => (
            <Icon name='road' color={color} size={30} /> 
          ), 
        } 
      } 
      />
      <Tab.Screen
        name={CHAT_SCREEN}
        component={ConversationList}
        options={{
         
          tabBarIcon: ({ color, size }) => (
            <Icon name='comments-o' color={color} size={30} /> 
          ), 
        } 
      } 
      />
      <Tab.Screen
        name={PROFIL_SCREEN}
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
