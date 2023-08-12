import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, SafeAreaView } from 'react-native';
import ShowDataScreen from './src/screens/Home/ShowDataScreen';
import LoginScreen from './src/screens/LoginScreen';
import FavScreen from './src/screens/FavScreen';
import LogOut from './src/screens/User/Logout';
import Setting from './src/screens/User/Setting';
import UserScreen from './src/screens/User/UserScreen';
import TransactionsDetail from './src/screens/TransactionsDetail/TransactionsDetail';

const DrawerUser = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="User" component={UserScreen} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Log Out" component={LogOut} />
    </Drawer.Navigator>
  );
};
const List = () => {
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator
      initialRouteName="ShowData"
      screenOptions={{headerShown: false}}>
      <MainStack.Screen name="ShowData" component={ShowDataScreen} />
      <MainStack.Screen
        name="TransactionsDetail"
        component={TransactionsDetail}
        screenOptions={{headerShown: true}}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  const Tab = createBottomTabNavigator();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Tab.Navigator
            initialRouteName="FoodList"
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#ad9853',
            }}>
            <Tab.Screen
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  return (
                    <Image
                      style={{height: 20, width: 20}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077976.png',
                      }}></Image>
                  );
                },
                tabBarShowLabel: false,
              }}
              name="List"
              component={List}></Tab.Screen>
            <Tab.Screen
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  return (
                    <Image
                      style={{height: 20, width: 20}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/5597/5597327.png',
                      }}></Image>
                  );
                },
                tabBarShowLabel: false,
              }}
              name="FavScreen"
              component={FavScreen}></Tab.Screen>
            <Tab.Screen
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  return (
                    <Image
                      style={{height: 20, width: 20}}
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png',
                      }}></Image>
                  );
                },
                tabBarShowLabel: false,
              }}
              name="UserScreen"
              component={DrawerUser}></Tab.Screen>
          </Tab.Navigator>
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
