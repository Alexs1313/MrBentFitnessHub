import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MrBentFitnessHubHome from '../MrBentFitnessHubScreens/MrBentFitnessHubHome';
import MrBentFitnessHubTraining from '../MrBentFitnessHubScreens/MrBentFitnessHubTraining';
import MrBentFitnessHubFoodAndDrink from '../MrBentFitnessHubScreens/MrBentFitnessHubFoodAndDrink';
import MrBentFitnessHubStatistics from '../MrBentFitnessHubScreens/MrBentFitnessHubStatistics';
import MrBentFitnessHubProfile from '../MrBentFitnessHubScreens/MrBentFitnessHubProfile';

const Tab = createBottomTabNavigator();

const MrBentFitnessHubTabs = () => {
  const [photo, setPhoto] = useState(null);

  // LOAD PHOTO ON START
  useEffect(() => {
    loadUserPhoto();
    const interval = setInterval(loadUserPhoto, 500); // updates when changed
    return () => clearInterval(interval);
  }, []);

  const loadUserPhoto = async () => {
    const saved = await AsyncStorage.getItem('mrBentUserData');
    if (saved) {
      const obj = JSON.parse(saved);
      setPhoto(obj.photo || null);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomTabs,
        tabBarActiveTintColor: '#63ADE3',
        tabBarInactiveTintColor: '#fff',

        tabBarBackground: () => (
          <LinearGradient
            colors={['#ffffffff', '#ffffff21']}
            style={{ borderRadius: 30 }}
          >
            <LinearGradient
              colors={['#214363', '#214363']}
              style={styles.tabsBackground}
            />
          </LinearGradient>
        ),
      }}
    >
      {/* HOME */}
      <Tab.Screen
        name="MrBentFitnessHubHome"
        component={MrBentFitnessHubHome}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/fitnesshubtab1act.png')
                  : require('../../assets/icons/fitnesshubtab1.png')
              }
              style={{ tintColor: color }}
            />
          ),
        }}
      />

      {/* TRAINING */}
      <Tab.Screen
        name="MrBentFitnessHubTraining"
        component={MrBentFitnessHubTraining}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/fitnesshubtab2act.png')
                  : require('../../assets/icons/fitnesshubtab2.png')
              }
              style={{ tintColor: color }}
            />
          ),
        }}
      />

      {/* FOOD & DRINK */}
      <Tab.Screen
        name="MrBentFitnessHubFoodAndDrink"
        component={MrBentFitnessHubFoodAndDrink}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/fitnesshubtab3act.png')
                  : require('../../assets/icons/fitnesshubtab3.png')
              }
              style={{ tintColor: color }}
            />
          ),
        }}
      />

      {/* STATISTICS */}
      <Tab.Screen
        name="MrBentFitnessHubStatistics"
        component={MrBentFitnessHubStatistics}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/icons/fitnesshubtab4act.png')
                  : require('../../assets/icons/fitnesshubtab4.png')
              }
              style={{ tintColor: color }}
            />
          ),
        }}
      />

      {/* PROFILE WITH REAL PHOTO */}
      <Tab.Screen
        name="MrBentFitnessHubProfile"
        component={MrBentFitnessHubProfile}
        options={{
          tabBarIcon: ({ focused }) =>
            photo ? (
              <Image
                source={{ uri: photo }}
                style={[
                  styles.avatar,
                  { borderColor: focused ? '#63ADE3' : '#ffffff' },
                ]}
              />
            ) : (
              <Image
                source={
                  focused
                    ? require('../../assets/icons/fitnesshubtab5act.png')
                    : require('../../assets/icons/fitnesshubtab5.png')
                }
                style={{ tintColor: focused ? '#63ADE3' : '#fff' }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabs: {
    elevation: 0,
    paddingTop: 28,
    paddingBottom: 16,
    position: 'absolute',
    borderTopWidth: 1,
    borderTopColor: 'transparent',
    paddingHorizontal: 20,
    bottom: 40,
  },

  tabsBackground: {
    height: 126,
    borderRadius: 29,
    padding: Platform.OS === 'ios' ? 1 : 0,
    margin: Platform.OS === 'ios' ? 0 : 1,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
  },
});

export default MrBentFitnessHubTabs;
