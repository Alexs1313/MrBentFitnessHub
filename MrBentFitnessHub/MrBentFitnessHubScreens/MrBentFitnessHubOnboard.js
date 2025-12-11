import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MrBentFitnessHubBackground from '../MrBentFitnessComponents/MrBentFitnessHubBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MrBentFitnessHubOnboard = () => {
  const [fitnessHubIntro, setFitnessHubIntro] = useState(0);
  const navigation = useNavigation();

  const fitnessHubHandleNextSlide = async () => {
    if (fitnessHubIntro < 2) {
      setFitnessHubIntro(fitnessHubIntro + 1);
    } else {
      const fitnessHubSavedUser = await AsyncStorage.getItem('mrBentUserData');

      if (fitnessHubSavedUser) {
        navigation.replace('MrBentFitnessHubTabs');
      } else {
        navigation.replace('MrBentFitnessHubRegistration');
      }
    }
  };

  return (
    <MrBentFitnessHubBackground>
      <View style={styles.fitnessHubContainer}>
        {fitnessHubIntro === 0 ? (
          <Image
            source={require('../../assets/images/fitnesshubonb1.png')}
            style={styles.fitnessHubImageTop}
          />
        ) : fitnessHubIntro === 1 ? (
          <Image
            source={require('../../assets/images/fitnesshubonb2.png')}
            style={styles.fitnessHubImage}
          />
        ) : (
          <Image
            source={require('../../assets/images/fitnesshubonb3.png')}
            style={styles.fitnessHubImage}
          />
        )}

        <LinearGradient
          colors={['#ffffffff', '#ffffff21']}
          style={styles.fitnessHubGradient}
        >
          <View style={styles.fitnessHubInnerWrapper}>
            <View style={styles.fitnessHubContentBox}>
              <Text style={styles.fitnessHubTitle}>
                {fitnessHubIntro === 0
                  ? 'Let’s begin your journey, sir!'
                  : fitnessHubIntro === 1
                  ? `Workout is 
stylish, sir!`
                  : 'Time is your ally, sir!'}
              </Text>

              <Text style={styles.fitnessHubSubtitle}>
                {fitnessHubIntro === 0
                  ? `Welcome! I’m Mr. Bent, your elegant guide to the world of sports and discipline.
Together, we’ll create a regimen that 
works for you.
So don’t be shy—I’m here to push, but without the violence… well, almost.`
                  : fitnessHubIntro === 1
                  ? `Add your workout, mark your progress, and trust me to keep you organized.
I’m not in a suit for nothing—I like everything neat, beautiful, and uncluttered.`
                  : `Set reminders for water, exercise, and sleep—I’ll send you a signal at the right moment.
And the stats show you how you’re becoming the best version of yourself.
Ready, sir? Then let’s go!`}
              </Text>

              <TouchableOpacity
                style={styles.fitnessHubButton}
                activeOpacity={0.7}
                onPress={fitnessHubHandleNextSlide}
              >
                <Text style={styles.fitnessHubButtonText}>
                  {fitnessHubIntro === 0
                    ? 'GOOD!'
                    : fitnessHubIntro === 1
                    ? 'NEXT!'
                    : 'START!'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </MrBentFitnessHubBackground>
  );
};

const styles = StyleSheet.create({
  fitnessHubContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fitnessHubImageTop: {
    top: 44,
  },
  fitnessHubGradient: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  fitnessHubInnerWrapper: {
    padding: 1,
  },
  fitnessHubContentBox: {
    backgroundColor: '#214363',
    width: '100%',
    padding: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 47,
  },
  fitnessHubTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  fitnessHubSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  fitnessHubButton: {
    backgroundColor: '#63ADE3',
    borderRadius: 22,
    marginTop: 30,
    alignItems: 'center',
    width: 300,
    height: 78,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  fitnessHubButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default MrBentFitnessHubOnboard;
