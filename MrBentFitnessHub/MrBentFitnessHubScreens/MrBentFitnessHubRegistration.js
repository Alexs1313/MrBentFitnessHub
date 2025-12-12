import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import MrBentFitnessHubBackground from '../MrBentFitnessComponents/MrBentFitnessHubBackground';

const MrBentFitnessHubRegistration = () => {
  const navigation = useNavigation();

  const [fitnessHubName, setFitnessHubName] = useState('');
  const [fitnessHubPhoto, setFitnessHubPhoto] = useState(null);

  const fitnessHubSelectPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response?.assets?.[0]?.uri) {
          setFitnessHubPhoto(response.assets[0].uri);
        }
      },
    );
  };

  const fitnessHubHandleSave = async () => {
    if (!fitnessHubName.trim()) return;

    const fitnessHubData = {
      name: fitnessHubName,
      photo: fitnessHubPhoto,
    };

    await AsyncStorage.setItem(
      'mrBentUserData',
      JSON.stringify(fitnessHubData),
    );

    navigation.replace('MrBentFitnessHubTabs');
  };

  return (
    <MrBentFitnessHubBackground>
      <View style={styles.fitnessHubContainer}>
        <Image source={require('../../assets/images/fitnesshubreglogo.png')} />

        <Text style={styles.fitnessHubTitle}>REGISTRATION</Text>

        <LinearGradient
          colors={['#ffffffff', '#ffffff21']}
          style={styles.fitnessHubGradientBox}
        >
          <View style={styles.fitnessHubGradientWrapper}>
            <View style={styles.fitnessHubFormBox}>
              <View style={styles.fitnessHubRow}>
                <View style={styles.fitnessHubInputBlock}>
                  <Text style={styles.fitnessHubLabel}>Enter your name:</Text>

                  <TextInput
                    style={styles.fitnessHubInput}
                    placeholder="Name"
                    placeholderTextColor="#5A7A9A"
                    onChangeText={setFitnessHubName}
                    value={fitnessHubName}
                    maxLength={12}
                  />
                </View>
              </View>

              <View style={styles.fitnessHubPhotoRow}>
                <Text style={styles.fitnessHubLabel}>Add your photo:</Text>

                <TouchableOpacity
                  style={styles.fitnessHubPhotoBox}
                  onPress={fitnessHubSelectPhoto}
                  activeOpacity={0.7}
                >
                  {fitnessHubPhoto ? (
                    <Image
                      source={{ uri: fitnessHubPhoto }}
                      style={styles.fitnessHubPhoto}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/fitnesshubcam.png')}
                      style={styles.fitnessHubCameraIcon}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>

        {fitnessHubName && fitnessHubPhoto ? (
          <TouchableOpacity
            style={styles.fitnessHubSaveBtn}
            onPress={fitnessHubHandleSave}
            activeOpacity={0.6}
          >
            <Text style={styles.fitnessHubSaveText}>Save</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.fitnessHubFooterWrapper}>
          <Text style={styles.fitnessHubFooterText}>
            All your information stays only on your device.
            {'\n'}
            We do not collect, transfer or store any personal data.
          </Text>
        </View>
      </View>
    </MrBentFitnessHubBackground>
  );
};

const styles = StyleSheet.create({
  fitnessHubContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    padding: 16,
  },
  fitnessHubTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 25,
    marginTop: 40,
  },
  fitnessHubGradientBox: {
    borderRadius: 22,
    width: '100%',
  },
  fitnessHubGradientWrapper: {
    padding: 1,
  },
  fitnessHubFormBox: {
    backgroundColor: '#214363',
    width: '100%',
    padding: 20,
    borderRadius: 21,
  },
  fitnessHubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fitnessHubInputBlock: {
    width: '100%',
  },
  fitnessHubLabel: {
    color: '#FFFFFF',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  fitnessHubInput: {
    backgroundColor: '#081C35',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  fitnessHubPhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  fitnessHubPhotoBox: {
    width: 96,
    height: 96,
    backgroundColor: '#081C35',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  fitnessHubCameraIcon: {
    tintColor: '#63ADE3',
  },
  fitnessHubPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  fitnessHubSaveBtn: {
    marginTop: 30,
    backgroundColor: '#63ADE3',
    width: '75%',
    height: 78,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fitnessHubSaveText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  fitnessHubFooterWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    height: 200,
  },
  fitnessHubFooterText: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default MrBentFitnessHubRegistration;
