import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';

import MrBentFitnessHubBackground from '../MrBentFitnessComponents/MrBentFitnessHubBackground';

const { height } = Dimensions.get('window');

const MrBentFitnessHubProfile = () => {
  const [fitnessHubName, setFitnessHubName] = useState('');
  const [fitnessHubPhoto, setFitnessHubPhoto] = useState(null);
  const [fitnessHubTotalMinutes, setFitnessHubTotalMinutes] = useState(0);
  const [fitnessHubAverageDuration, setFitnessHubAverageDuration] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    fitnessHubLoadProfile();
    fitnessHubLoadStats();
  }, []);

  const fitnessHubLoadProfile = async () => {
    const fitnessHubSaved = await AsyncStorage.getItem('mrBentUserData');
    if (fitnessHubSaved) {
      const fitnessHubObj = JSON.parse(fitnessHubSaved);
      setFitnessHubName(fitnessHubObj.name || '');
      setFitnessHubPhoto(fitnessHubObj.photo || null);
    }
  };

  const fitnessHubSaveProfile = async newPhoto => {
    const updatedFitnessProfile = {
      name: fitnessHubName,
      photo: newPhoto,
    };
    await AsyncStorage.setItem(
      'mrBentUserData',
      JSON.stringify(updatedFitnessProfile),
    );
  };

  const fitnessHubChangePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response?.assets?.[0]?.uri) {
          const newUri = response.assets[0].uri;
          setFitnessHubPhoto(newUri);
          fitnessHubSaveProfile(newUri);
        }
      },
    );
  };

  const fitnessHubLoadStats = async () => {
    const fitnessHubSaved = await AsyncStorage.getItem('mrBentTrainings');
    const fitnessHubList = fitnessHubSaved ? JSON.parse(fitnessHubSaved) : [];

    if (!fitnessHubList.length) {
      setFitnessHubTotalMinutes(0);
      setFitnessHubAverageDuration(0);
      return;
    }

    const totalSavedCards = fitnessHubList.reduce(
      (sum, t) => sum + Number(t.duration),
      0,
    );
    const avgSavedCards = Math.round(totalSavedCards / fitnessHubList.length);

    setFitnessHubTotalMinutes(totalSavedCards);
    setFitnessHubAverageDuration(avgSavedCards);
  };

  const fitnessHubResetStats = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to clear all training data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('mrBentTrainings');
            setFitnessHubTotalMinutes(0);
            setFitnessHubAverageDuration(0);
          },
        },
      ],
    );
  };

  const fitnessHubDeleteProfile = () => {
    Alert.alert(
      'Delete Profile',
      'This will remove your name, age, photo and all statistics. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('mrBentUserData');
            await AsyncStorage.removeItem('mrBentTrainings');

            setFitnessHubName('');
            setFitnessHubPhoto(null);
            setFitnessHubTotalMinutes(0);
            setFitnessHubAverageDuration(0);

            navigation.replace('MrBentFitnessHubOnboard');
          },
        },
      ],
    );
  };

  return (
    <MrBentFitnessHubBackground>
      <View style={styles.fitnessHubContainer}>
        <Text style={styles.fitnessHubTitle}>MY PROFILE</Text>

        <LinearGradient
          colors={['#fff', '#ffffff22']}
          style={styles.fitnessHubWrapGrad}
        >
          <View style={styles.fitnessHubPad}>
            <View style={styles.fitnessHubProfileCard}>
              <View style={styles.fitnessHubPhotoRow}>
                <View onPress={fitnessHubChangePhoto}>
                  <View
                    style={
                      !fitnessHubPhoto && {
                        width: 130,
                        height: 130,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#081C35',
                        borderRadius: 12,
                      }
                    }
                  >
                    <Image
                      source={
                        fitnessHubPhoto
                          ? { uri: fitnessHubPhoto }
                          : require('../../assets/images/fitnesshubcam.png')
                      }
                      style={[
                        styles.fitnessHubPhoto,
                        !fitnessHubPhoto && { width: 30, height: 30 },
                      ]}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.fitnessHubChangeBtn}
                  onPress={fitnessHubChangePhoto}
                  activeOpacity={0.7}
                >
                  <Text style={styles.fitnessHubChangeTxt}>Change photo</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.fitnessHubInfoRow}>
                <View style={styles.fitnessHubInfoCol}>
                  <Text style={styles.fitnessHubInfoLabel}>Your name:</Text>

                  <View style={styles.fitnessHubInfoInput}>
                    <Text style={styles.fitnessHubInfoValue}>
                      {fitnessHubName}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.fitnessHubStatsRow}>
          <LinearGradient
            colors={['#fff', '#ffffff22']}
            style={styles.fitnessHubStatGrad}
          >
            <View style={styles.fitnessHubPad}>
              <View style={styles.fitnessHubStatCard}>
                <Text style={styles.fitnessHubStatLabel}>
                  Hours in the app:
                </Text>
                <Text style={styles.fitnessHubStatValue}>
                  {Math.round(fitnessHubTotalMinutes / 60)} hours
                </Text>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['#fff', '#ffffff22']}
            style={styles.fitnessHubStatGrad}
          >
            <View style={styles.fitnessHubPad}>
              <View style={styles.fitnessHubStatCard}>
                <Text style={styles.fitnessHubStatLabel}>
                  Average duration:
                </Text>
                <Text style={styles.fitnessHubStatValue}>
                  {fitnessHubAverageDuration} min
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <TouchableOpacity
          style={styles.fitnessHubResetBtn}
          onPress={fitnessHubResetStats}
          activeOpacity={0.7}
        >
          <Text style={styles.fitnessHubResetTxt}>Reset statistics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fitnessHubDeleteBtn}
          onPress={fitnessHubDeleteProfile}
          activeOpacity={0.7}
        >
          <Text style={styles.fitnessHubDeleteTxt}>Delete profile</Text>
        </TouchableOpacity>
      </View>
    </MrBentFitnessHubBackground>
  );
};

const styles = StyleSheet.create({
  fitnessHubContainer: {
    paddingTop: height * 0.08,
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  fitnessHubTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 25,
  },
  fitnessHubWrapGrad: {
    borderRadius: 20,
    marginBottom: 25,
  },
  fitnessHubPad: {
    padding: 1,
  },
  fitnessHubProfileCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 20,
  },
  fitnessHubPhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  fitnessHubPhoto: {
    width: 130,
    height: 130,
    borderRadius: 12,
    marginBottom: 10,
  },
  fitnessHubChangeBtn: {
    backgroundColor: '#63ADE3',
    width: 155,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  fitnessHubChangeTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  fitnessHubInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  fitnessHubInfoCol: {
    flex: 1,
  },
  fitnessHubInfoLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  fitnessHubInfoInput: {
    backgroundColor: '#081C35',
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 12,
  },
  fitnessHubInfoValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  fitnessHubStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  fitnessHubStatGrad: {
    width: '48%',
    borderRadius: 21,
  },
  fitnessHubStatCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 20,
    minHeight: 110,
    justifyContent: 'center',
    gap: 10,
  },
  fitnessHubStatLabel: {
    color: '#fff',
    fontSize: 14,
  },
  fitnessHubStatValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  fitnessHubResetBtn: {
    backgroundColor: '#63ADE3',
    width: '100%',
    height: 78,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  fitnessHubResetTxt: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  fitnessHubDeleteBtn: {
    backgroundColor: '#63ADE3',
    width: '100%',
    height: 78,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fitnessHubDeleteTxt: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default MrBentFitnessHubProfile;
