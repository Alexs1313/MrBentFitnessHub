import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MrBentFitnessHubBackground from '../MrBentFitnessComponents/MrBentFitnessHubBackground';

const FITNESS_HUB_QUOTES = [
  "Sir, a warm-up is not a suggestion, it's an obligation.",
  "Discipline is not a mood, sir — it's a lifestyle.",
  'Sir, one rep done well beats ten done carelessly.',
  'Water, sir. Not later. Now.',
  'Rest is earned, not given, sir.',
  'Your future self is watching — don’t disappoint him, sir.',
  'Even elegance requires sweat, sir.',
  'Sir, motivation fades. Routine wins.',
  'You’re not tired, sir — you’re upgrading.',
  'Greatness requires punctuality… and push-ups, sir.',
];

const { height } = Dimensions.get('window');

const MrBentFitnessHubHome = () => {
  const [fitnessHubUser, setFitnessHubUser] = useState(null);
  const [fitnessHubQuote, setFitnessHubQuote] = useState('');
  const [fitnessHubTimeLeft, setFitnessHubTimeLeft] = useState('');
  const [fitnessHubTodayMinutes, setFitnessHubTodayMinutes] = useState(0);
  const [fitnessHubTodaySessions, setFitnessHubTodaySessions] = useState(0);

  useEffect(() => {
    fitnessHubLoadUser();
    fitnessHubLoadQuote();
    fitnessHubLoadTodayStats();

    const timer = setInterval(fitnessHubUpdateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const fitnessHubLoadTodayStats = async () => {
    const saved = await AsyncStorage.getItem('mrBentTrainings');
    const list = saved ? JSON.parse(saved) : [];

    if (list.length === 0) {
      setFitnessHubTodayMinutes(0);
      setFitnessHubTodaySessions(0);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfDay = today.getTime();

    const todayList = list.filter(t => t.id >= startOfDay);
    const minutes = todayList.reduce((sum, t) => sum + Number(t.duration), 0);

    setFitnessHubTodayMinutes(minutes);
    setFitnessHubTodaySessions(todayList.length);
  };

  const fitnessHubLoadUser = async () => {
    const saved = await AsyncStorage.getItem('mrBentUserData');
    if (saved) setFitnessHubUser(JSON.parse(saved));
  };

  const fitnessHubLoadQuote = async () => {
    const savedQuote = await AsyncStorage.getItem('mrBentDailyQuote');
    const savedTime = await AsyncStorage.getItem('mrBentQuoteTime');

    const now = Date.now();

    if (savedQuote && savedTime) {
      const hoursPassed = (now - Number(savedTime)) / 3600000;

      if (hoursPassed < 24) {
        setFitnessHubQuote(savedQuote);
        return;
      }
    }

    fitnessHubGenerateQuote();
  };

  const fitnessHubGenerateQuote = async () => {
    const q =
      FITNESS_HUB_QUOTES[Math.floor(Math.random() * FITNESS_HUB_QUOTES.length)];

    setFitnessHubQuote(q);

    await AsyncStorage.setItem('mrBentDailyQuote', q);
    await AsyncStorage.setItem('mrBentQuoteTime', Date.now().toString());
  };

  const fitnessHubUpdateTimer = async () => {
    const savedTime = await AsyncStorage.getItem('mrBentQuoteTime');
    if (!savedTime) return;

    const now = Date.now();
    const diff = 24 * 3600 * 1000 - (now - Number(savedTime));

    if (diff <= 0) {
      setFitnessHubTimeLeft('00:00:00');
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    setFitnessHubTimeLeft(
      `${h.toString().padStart(2, '0')}:` +
        `${m.toString().padStart(2, '0')}:` +
        `${s.toString().padStart(2, '0')}`,
    );
  };

  const fitnessHubShareQuote = () => {
    Share.share({
      message: `${fitnessHubQuote}`,
    });
  };

  return (
    <MrBentFitnessHubBackground>
      <View style={styles.fitnessHubContainer}>
        {fitnessHubUser && (
          <View style={styles.fitnessHubHeaderCard}>
            <Image
              source={{ uri: fitnessHubUser.photo }}
              style={styles.fitnessHubHeaderPhoto}
            />
            <Text style={styles.fitnessHubHeaderText}>
              Hello, {fitnessHubUser.name}
            </Text>

            <Image
              source={require('../../assets/images/fitnesshubicon.png')}
              style={styles.fitnessHubHeaderBent}
            />
          </View>
        )}

        <Text style={styles.fitnessHubSectionTitle}>Daily tips for sport:</Text>

        <View style={styles.fitnessHubQuoteCard}>
          <Text style={styles.fitnessHubAdviceLabel}>New advice via:</Text>
          <Text style={styles.fitnessHubTimer}>{fitnessHubTimeLeft}</Text>

          <Text style={styles.fitnessHubQuoteText}>{fitnessHubQuote}</Text>

          <TouchableOpacity
            style={styles.fitnessHubShareBtn}
            onPress={fitnessHubShareQuote}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../assets/images/fitnesshubshr.png')}
              style={styles.fitnessHubShareIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.fitnessHubSectionTitle}>Your activity today:</Text>

        <View style={styles.fitnessHubActivityCard}>
          <Text style={styles.fitnessHubActivityLabel}>Training hours:</Text>
          <Text style={styles.fitnessHubActivityValue}>
            {fitnessHubTodayMinutes}
          </Text>

          <Text style={styles.fitnessHubActivityLabelMargin}>
            Number of training sessions:
          </Text>
          <Text style={styles.fitnessHubActivityValue}>
            {fitnessHubTodaySessions}
          </Text>
        </View>
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
  fitnessHubHeaderCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fitnessHubHeaderPhoto: {
    width: 65,
    height: 65,
    borderRadius: 12,
  },
  fitnessHubHeaderText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 14,
    color: '#081C35',
    width: '50%',
  },
  fitnessHubHeaderBent: {
    position: 'absolute',
    right: 8,
    bottom: 0,
  },
  fitnessHubSectionTitle: {
    marginTop: 30,
    marginBottom: 12,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  fitnessHubQuoteCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  fitnessHubAdviceLabel: {
    color: '#63ADE3',
    fontSize: 10,
    marginBottom: 4,
  },
  fitnessHubTimer: {
    color: '#63ADE3',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  fitnessHubQuoteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 8,
    width: '75%',
  },
  fitnessHubShareBtn: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: '#63ADE3',
    padding: 12,
    borderRadius: 12,
  },
  fitnessHubShareIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },
  fitnessHubActivityCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 20,
  },
  fitnessHubActivityLabel: {
    color: '#63ADE3',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
  },
  fitnessHubActivityLabelMargin: {
    color: '#63ADE3',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 5,
    fontWeight: '400',
  },
  fitnessHubActivityValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
});

export default MrBentFitnessHubHome;
