import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MrBentFitnessHubBackground from '../MrBentFitnessComponents/MrBentFitnessHubBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const MrBentTraining = () => {
  const [fitnessHubUser, setFitnessHubUser] = useState(null);
  const [fitnessHubTrainings, setFitnessHubTrainings] = useState([]);
  const [fitnessHubShowForm, setFitnessHubShowForm] = useState(false);
  const navigation = useNavigation();

  const [fitnessHubName, setFitnessHubName] = useState('');
  const [fitnessHubType, setFitnessHubType] = useState('');
  const [fitnessHubDuration, setFitnessHubDuration] = useState('');
  const [fitnessHubIntensity, setFitnessHubIntensity] = useState('Easy');

  useEffect(() => {
    fitnessHubLoadUser();
    fitnessHubLoadTrainings();
  }, []);

  const fitnessHubLoadUser = async () => {
    const fitnessHubSaved = await AsyncStorage.getItem('mrBentUserData');
    if (fitnessHubSaved) {
      setFitnessHubUser(JSON.parse(fitnessHubSaved));
    }
  };

  const fitnessHubLoadTrainings = async () => {
    const fitnessHubSaved = await AsyncStorage.getItem('mrBentTrainings');
    setFitnessHubTrainings(fitnessHubSaved ? JSON.parse(fitnessHubSaved) : []);
  };

  const fitnessHubSaveTraining = async () => {
    if (!fitnessHubName || !fitnessHubType || !fitnessHubDuration) return;

    const fitnessHubNewTraining = {
      id: Date.now(),
      name: fitnessHubName,
      type: fitnessHubType,
      duration: fitnessHubDuration,
      intensity: fitnessHubIntensity,
    };

    const fitnessHubUpdatedList = [
      ...fitnessHubTrainings,
      fitnessHubNewTraining,
    ];

    await AsyncStorage.setItem(
      'mrBentTrainings',
      JSON.stringify(fitnessHubUpdatedList),
    );
    setFitnessHubTrainings(fitnessHubUpdatedList);

    setFitnessHubShowForm(false);
    setFitnessHubName('');
    setFitnessHubType('');
    setFitnessHubDuration('');
    setFitnessHubIntensity('Easy');
  };

  const FitnessHubTrainingCard = ({ item }) => (
    <LinearGradient
      colors={['#ffffffff', '#ffffff21']}
      style={{ borderRadius: 22, marginBottom: 20 }}
    >
      <View style={{ padding: 1 }}>
        <View style={styles.fitnessHubTrainingCard}>
          <View style={styles.fitnessHubRowTop}>
            <View style={styles.fitnessHubIntensityBadge}>
              <Text style={styles.fitnessHubIntensityBadgeText}>
                {item.intensity}
              </Text>
            </View>

            <Text style={styles.fitnessHubTrainingName}>{item.name}</Text>
          </View>

          <View style={styles.fitnessHubRowBottom}>
            <View>
              <Text style={styles.fitnessHubLabel}>Type of workout:</Text>
              <Text style={styles.fitnessHubValue}>{item.type}</Text>
            </View>

            <View>
              <Text style={styles.fitnessHubLabel}>Duration:</Text>
              <Text style={styles.fitnessHubValue}>{item.duration} min</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('MrBentFitnessHubTimer', { item })
              }
            >
              <Image
                source={require('../../assets/images/fitnesshubrock.png')}
                style={styles.fitnessHubCardIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  const fitnessHubRenderForm = () => (
    <>
      <TouchableOpacity
        onPress={() => setFitnessHubShowForm(false)}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 17,
          marginBottom: 34,
        }}
      >
        <Image source={require('../../assets/images/fitnesshuback.png')} />
        <Text style={styles.fitnessHubBackArrow}>NEW TRAINING</Text>
      </TouchableOpacity>
      <LinearGradient
        colors={['#ffffffff', '#ffffff21']}
        style={{ borderRadius: 22 }}
      >
        <View style={{ padding: 1 }}>
          <View style={styles.fitnessHubFormCard}>
            <Text style={styles.fitnessHubFormLabel}>
              Workout name (e.g., ‘Strength – Chest’)
            </Text>
            <TextInput
              style={styles.fitnessHubInput}
              value={fitnessHubName}
              onChangeText={setFitnessHubName}
            />

            <Text style={styles.fitnessHubFormLabel}>Type of workout:</Text>
            <TextInput
              style={styles.fitnessHubInput}
              value={fitnessHubType}
              onChangeText={setFitnessHubType}
            />

            <Text style={styles.fitnessHubFormLabel}>Duration:</Text>
            <View style={styles.fitnessHubDurationRow}>
              <TextInput
                style={[styles.fitnessHubInput, { flex: 1 }]}
                value={fitnessHubDuration}
                onChangeText={setFitnessHubDuration}
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={styles.fitnessHubMinLabel}>min</Text>
            </View>

            <Text style={styles.fitnessHubFormLabel}>Intensity:</Text>
            <View style={styles.fitnessHubIntensityRow}>
              {['Easy', 'Medium', 'High'].map(level => (
                <TouchableOpacity
                  key={level}
                  activeOpacity={0.7}
                  style={[
                    styles.fitnessHubIntensityBtn,
                    fitnessHubIntensity === level &&
                      styles.fitnessHubIntensityBtnActive,
                  ]}
                  onPress={() => setFitnessHubIntensity(level)}
                >
                  <Text
                    style={[
                      styles.fitnessHubIntensityText,
                      fitnessHubIntensity === level &&
                        styles.fitnessHubIntensityTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>

      <TouchableOpacity
        style={styles.fitnessHubSaveBtn}
        onPress={fitnessHubSaveTraining}
        activeOpacity={0.7}
      >
        <Text style={styles.fitnessHubSaveText}>Save</Text>
      </TouchableOpacity>
    </>
  );

  const fitnessHubRenderList = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.fitnessHubHeaderCard}>
        <Text style={styles.fitnessHubHeaderQuote}>
          Sir, your training is like a collection. The more, the more solid it
          looks.
        </Text>
        <Image
          source={require('../../assets/images/fitnesshubicon.png')}
          style={styles.fitnessHubHeaderBent}
        />
      </View>

      <Text style={styles.fitnessHubSectionTitle}>Your training:</Text>

      {fitnessHubTrainings.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.fitnessHubEmptyText}>Empty</Text>
        </View>
      ) : (
        <FlatList
          data={fitnessHubTrainings}
          scrollEnabled={false}
          renderItem={({ item }) => <FitnessHubTrainingCard item={item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
          style={styles.fitnessHubAddBtn}
          onPress={() => setFitnessHubShowForm(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.fitnessHubAddText}>ADD TRAINING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <MrBentFitnessHubBackground>
      <View style={styles.fitnessHubContainer}>
        {fitnessHubShowForm ? fitnessHubRenderForm() : fitnessHubRenderList()}
      </View>
    </MrBentFitnessHubBackground>
  );
};

const styles = StyleSheet.create({
  fitnessHubContainer: {
    paddingTop: height * 0.08,
    paddingHorizontal: 20,
    paddingBottom: 150,
    flex: 1,
  },
  fitnessHubHeaderCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    minHeight: 100,
    justifyContent: 'center',
  },
  fitnessHubHeaderQuote: {
    fontSize: 16,
    color: '#081C35',
    width: '70%',
    fontWeight: '400',
  },
  fitnessHubHeaderBent: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  fitnessHubSectionTitle: {
    marginTop: 25,
    marginBottom: 25,
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  fitnessHubEmptyText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  fitnessHubTrainingCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 21,
  },
  fitnessHubRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fitnessHubIntensityBadge: {
    backgroundColor: '#63ADE3',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 12,
  },
  fitnessHubIntensityBadgeText: {
    color: '#fff',
    fontWeight: '500',
  },
  fitnessHubTrainingName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  fitnessHubRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    alignItems: 'center',
  },
  fitnessHubLabel: {
    color: '#ffff',
    fontSize: 12,
    marginBottom: 5,
  },
  fitnessHubValue: {
    color: '#63ADE3',
    fontSize: 16,
    fontWeight: '400',
  },
  fitnessHubBackArrow: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  fitnessHubFormCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 21,
  },
  fitnessHubFormLabel: {
    color: '#fff',
    marginTop: 16,
    marginBottom: 14,
    fontWeight: '500',
  },
  fitnessHubInput: {
    backgroundColor: '#081C35',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 16,
  },
  fitnessHubDurationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fitnessHubMinLabel: {
    color: '#fff',
    marginLeft: 10,
    position: 'absolute',
    right: 14,
    fontSize: 12,
  },
  fitnessHubIntensityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fitnessHubIntensityBtn: {
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#081C35',
    height: 54,
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
  },
  fitnessHubIntensityBtnActive: {
    backgroundColor: '#63ADE3',
  },
  fitnessHubIntensityText: {
    color: '#fff',
  },
  fitnessHubIntensityTextActive: {
    color: '#fff',
  },
  fitnessHubSaveBtn: {
    backgroundColor: '#63ADE3',
    borderRadius: 22,
    width: '85%',
    height: 78,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 25,
    alignItems: 'center',
  },
  fitnessHubSaveText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  fitnessHubAddBtn: {
    backgroundColor: '#63ADE3',
    borderRadius: 22,
    width: '85%',
    height: 78,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 25,
    alignItems: 'center',
  },
  fitnessHubAddText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default MrBentTraining;
