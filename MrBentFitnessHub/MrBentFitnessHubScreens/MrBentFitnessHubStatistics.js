import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MrBentFitnessHubBackground from '../MrBentFitnessComponents/MrBentFitnessHubBackground';

const { height } = Dimensions.get('window');

const MrBentFitnessHubStatistics = () => {
  const [fitnessHubWorkoutsPerWeek, setFitnessHubWorkoutsPerWeek] = useState(0);
  const [fitnessHubTotalMinutes, setFitnessHubTotalMinutes] = useState(0);
  const [fitnessHubLongestWorkout, setFitnessHubLongestWorkout] = useState(0);

  useEffect(() => {
    fitnessHubLoadStats();
  }, []);

  const fitnessHubLoadStats = async () => {
    const fitnessHubSaved = await AsyncStorage.getItem('mrBentTrainings');
    const fitnessHubTrainings = fitnessHubSaved
      ? JSON.parse(fitnessHubSaved)
      : [];

    if (fitnessHubTrainings.length === 0) {
      setFitnessHubWorkoutsPerWeek(0);
      setFitnessHubTotalMinutes(0);
      setFitnessHubLongestWorkout(0);
      return;
    }

    const fitnessHubTotal = fitnessHubTrainings.reduce(
      (sum, t) => sum + Number(t.duration),
      0,
    );
    setFitnessHubTotalMinutes(fitnessHubTotal);

    const fitnessHubMaxDuration = Math.max(
      ...fitnessHubTrainings.map(t => Number(t.duration)),
    );
    setFitnessHubLongestWorkout(fitnessHubMaxDuration);

    const fitnessHubNow = Date.now();
    const fitnessHubWeekAgo = fitnessHubNow - 7 * 24 * 60 * 60 * 1000;

    const fitnessHubThisWeek = fitnessHubTrainings.filter(
      t => t.id >= fitnessHubWeekAgo,
    ).length;

    setFitnessHubWorkoutsPerWeek(fitnessHubThisWeek);
  };

  const fitnessHubShareStats = () => {
    Share.share({
      message:
        `My Training Statistics:\n\n` +
        `• Workouts per week: ${fitnessHubWorkoutsPerWeek}\n` +
        `• Total training minutes: ${fitnessHubTotalMinutes} min\n` +
        `• Longest workout: ${fitnessHubLongestWorkout} min\n\n` +
        `Mr Bent approves this discipline, sir!`,
    });
  };

  return (
    <MrBentFitnessHubBackground>
      <View style={styles.fitnessHubContainer}>
        <View style={styles.fitnessHubQuoteCard}>
          <Text style={styles.fitnessHubQuoteText}>
            Sir, the numbers are the bare truth. But remember: even a small step
            forward is a victory.
          </Text>
          <Image
            source={require('../../assets/images/fitnesshubicon.png')}
            style={styles.fitnessHubQuoteIcon}
          />
        </View>

        <Text style={styles.fitnessHubSectionTitle}>Statistics</Text>

        <LinearGradient
          colors={['#fff', '#ffffff22']}
          style={styles.fitnessHubOutsideGrad}
        >
          <View style={styles.fitnessHubCard}>
            <Text style={styles.fitnessHubLabel}>Workouts per week:</Text>
            <Text style={styles.fitnessHubValue}>
              {fitnessHubWorkoutsPerWeek}
            </Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#fff', '#ffffff22']}
          style={styles.fitnessHubOutsideGrad}
        >
          <View style={styles.fitnessHubCard}>
            <Text style={styles.fitnessHubLabel}>Total training minutes:</Text>
            <Text style={styles.fitnessHubValue}>
              {fitnessHubTotalMinutes} min
            </Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#fff', '#ffffff22']}
          style={styles.fitnessHubOutsideGrad}
        >
          <View style={styles.fitnessHubCard}>
            <Text style={styles.fitnessHubLabel}>Longest workout:</Text>
            <Text style={styles.fitnessHubValue}>
              {fitnessHubLongestWorkout} min
            </Text>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.fitnessHubShareBtn}
          onPress={fitnessHubShareStats}
          activeOpacity={0.7}
        >
          <Text style={styles.fitnessHubShareText}>Share statistics</Text>
        </TouchableOpacity>
      </View>
    </MrBentFitnessHubBackground>
  );
};

const styles = StyleSheet.create({
  fitnessHubContainer: {
    paddingTop: height * 0.08,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  fitnessHubQuoteCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    minHeight: 95,
    justifyContent: 'center',
  },
  fitnessHubQuoteText: {
    width: '70%',
    color: '#081C35',
    fontSize: 16,
  },
  fitnessHubQuoteIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  fitnessHubSectionTitle: {
    textAlign: 'center',
    marginVertical: 25,
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  fitnessHubOutsideGrad: {
    borderRadius: 20,
    marginBottom: 18,
  },
  fitnessHubCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 20,
  },
  fitnessHubLabel: {
    color: '#63ADE3',
    fontSize: 16,
    marginBottom: 4,
  },
  fitnessHubValue: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
  },
  fitnessHubShareBtn: {
    backgroundColor: '#63ADE3',
    borderRadius: 22,
    paddingVertical: 22,
    alignItems: 'center',
    marginTop: 30,
  },
  fitnessHubShareText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
});

export default MrBentFitnessHubStatistics;
