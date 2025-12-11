import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);
export const useStore = () => useContext(StoreContext);

export const ContextProvider = ({ children }) => {
  const [fitnessHubTodayMinutes, setFitnessHubTodayMinutes] = useState(0);
  const [fitnessHubTodaySessions, setFitnessHubTodaySessions] = useState(0);
  const [fitnessHubUser, setFitnessHubUser] = useState(null);

  const fitnessHubLoadTodayStats = async () => {
    const savedTrainings = await AsyncStorage.getItem('mrBentTrainings');
    const trainingsList = savedTrainings ? JSON.parse(savedTrainings) : [];

    if (trainingsList.length === 0) {
      setFitnessHubTodayMinutes(0);
      setFitnessHubTodaySessions(0);
      return;
    }

    const fitnessToday = new Date();
    fitnessToday.setHours(0, 0, 0, 0);
    const startOfDay = fitnessToday.getTime();

    const todaySavedList = trainingsList.filter(
      fitTime => fitTime.id >= startOfDay,
    );
    const fitnessMinutes = todaySavedList.reduce(
      (fitSum, fitTime) => fitSum + Number(fitTime.duration),
      0,
    );

    setFitnessHubTodayMinutes(fitnessMinutes);
    setFitnessHubTodaySessions(todaySavedList.length);
  };

  const fitnessHubLoadUser = async () => {
    const savedUserInfo = await AsyncStorage.getItem('mrBentUserData');
    if (savedUserInfo) setFitnessHubUser(JSON.parse(savedUserInfo));
  };

  const contextValue = {
    fitnessHubTodayMinutes,
    fitnessHubTodaySessions,
    fitnessHubLoadTodayStats,
    setFitnessHubTodayMinutes,
    setFitnessHubTodaySessions,
    fitnessHubLoadUser,
    fitnessHubUser,
    setFitnessHubUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
