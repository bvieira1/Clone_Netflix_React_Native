import React from 'react';
import Login from './src/pages/login';
import Home from './src/pages/home';
import Filme from './src/pages/Filme';

import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
     initialRouteName="Home"
     activeColor={'#FFF'}
     shifting={false}
     barStyle={{backgroundColor: '#141414'}}    
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={Home}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({color}) => <Icon name="magnify" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Em breve"
        component={Home}
        options={{
          tabBarLabel: 'Em breve',
          tabBarIcon: ({color}) => <Icon name="play-speed" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Downloads"
        component={Home}
        options={{
          tabBarLabel: 'Downloads',
          tabBarIcon: ({color}) => <Icon name="download" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Mais"
        component={Home}
        options={{
          tabBarLabel: 'Mais',
          tabBarIcon: ({color}) => <Icon name="menu" color={color} size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Filme"
          component={Filme}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
