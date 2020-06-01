import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParcelDetails from '../screens/ParcelDetails';
import ParcelsList from '../screens/ParcelsList';
import CreateParcelStepTwo from '../screens/CreateParcelStepTwo';
import CreateParcel from '../screens/CreateParcel';
import UserProfil from '../screens/UserProfil';
import CreateParcels from '../screens/CreateParcels';
import Chat from '../screens/Chat';
import ConversationList from '../screens/ConversationList';
 
const Tab = createBottomTabNavigator();

const Tabs = () => { 
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
        component={ParcelsList}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
   
      <Tab.Screen
        name="chat"
        component={ConversationList}
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
    

    /*
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Home') {
            return <Icon name='home' size={40}   color={color} />;
          } 
          if (route.name === 'Creer') {
            return <Icon name='wechat' size={40}   color={color} />;
          }
          if (route.name === 'chat') {
            return <Icon name='plus-square-o' size={40}   color={color} />;
          }
          if (route.name === 'Profil') {
            return <Icon name='user-circle-o' size={40}   color={color} />;
          }

        },
      })}
      tabBarOptions={{
        activeTintColor: '#007aff' ,
        inactiveTintColor: 'gray',
        style: {  backgroundColor: 'white' },
        showLabel: false  , tabStyle:{  }
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="chat" component={Home} />
      <Tab.Screen name="Creer" component={Home} />
      <Tab.Screen name="Profil" component={Home} />
    </Tab.Navigator>


       <Tab.Screen
        name="creer"
        component={CreateParcels}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='plus-square-o' color={color} size={30} />
          ),
        }}
      />
*/
  );
}
export default Tabs;
