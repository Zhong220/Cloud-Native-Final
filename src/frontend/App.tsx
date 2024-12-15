import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/home/index';
import GroupPage from './pages/group/index';
import FriendPage from './pages/friend/index';
import IntroPage from './pages/intro/index';
import NotiBoardPage from './pages/home/notiBoard';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // 可在此使用 react-native-vector-icons 添加圖示
            return <Text style={{ fontSize: size, color }}>{route.name[0]}</Text>;
          },
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Groups" component={GroupPage} />
        <Tab.Screen name="Friends" component={FriendPage} />
        <Tab.Screen name="You" component={IntroPage} />
        <Tab.Screen name="NotiBoard" component={NotiBoardPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
