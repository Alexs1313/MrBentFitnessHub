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
import LinearGradient from 'react-native-linear-gradient';
import MrBentFitnessHubBackground from '../MrBentFitnessComponents/MrBentFitnessHubBackground';

const { height } = Dimensions.get('window');

const MrBentFoodAndDrink = () => {
  const [fitnessHubMode, setFitnessHubMode] = useState('FOOD');
  const [fitnessHubFoodList, setFitnessHubFoodList] = useState([]);
  const [fitnessHubDrinkList, setFitnessHubDrinkList] = useState([]);
  const [fitnessHubShowForm, setFitnessHubShowForm] = useState(false);

  const [fitnessHubSelectedValue, setFitnessHubSelectedValue] = useState(null);
  const [fitnessHubHour, setFitnessHubHour] = useState('');
  const [fitnessHubDate, setFitnessHubDate] = useState('');

  const FITNESS_HUB_FOOD_OPTIONS = ['Breakfast', 'Lunch', 'Dinner'];
  const FITNESS_HUB_DRINK_OPTIONS = ['100 ml', '200 ml', '300 ml'];

  useEffect(() => {
    fitnessHubLoadLists();
  }, []);

  const fitnessHubLoadLists = async () => {
    const foodSaved = await AsyncStorage.getItem('mrBentFoodList');
    const drinkSaved = await AsyncStorage.getItem('mrBentDrinkList');

    setFitnessHubFoodList(foodSaved ? JSON.parse(foodSaved) : []);
    setFitnessHubDrinkList(drinkSaved ? JSON.parse(drinkSaved) : []);
  };

  const fitnessHubSaveRecord = async () => {
    if (!fitnessHubSelectedValue || !fitnessHubHour || !fitnessHubDate) return;

    const newItem = {
      id: Date.now(),
      value: fitnessHubSelectedValue,
      hour: fitnessHubHour,
      date: fitnessHubDate,
    };

    if (fitnessHubMode === 'FOOD') {
      const updated = [...fitnessHubFoodList, newItem];
      setFitnessHubFoodList(updated);
      await AsyncStorage.setItem('mrBentFoodList', JSON.stringify(updated));
    } else {
      const updated = [...fitnessHubDrinkList, newItem];
      setFitnessHubDrinkList(updated);
      await AsyncStorage.setItem('mrBentDrinkList', JSON.stringify(updated));
    }

    setFitnessHubSelectedValue(null);
    setFitnessHubHour('');
    setFitnessHubDate('');
    setFitnessHubShowForm(false);
  };

  const fitnessHubDeleteItem = async id => {
    if (fitnessHubMode === 'FOOD') {
      const updated = fitnessHubFoodList.filter(i => i.id !== id);
      setFitnessHubFoodList(updated);
      await AsyncStorage.setItem('mrBentFoodList', JSON.stringify(updated));
    } else {
      const updated = fitnessHubDrinkList.filter(i => i.id !== id);
      setFitnessHubDrinkList(updated);
      await AsyncStorage.setItem('mrBentDrinkList', JSON.stringify(updated));
    }
  };

  const FitnessHubCard = ({ item }) => (
    <LinearGradient
      colors={['#ffffff', '#ffffff20']}
      style={styles.fitnessHubCardWrapper}
    >
      <View style={styles.fitnessHubInnerPad}>
        <View style={styles.fitnessHubCard}>
          <View>
            <Text style={styles.fitnessHubCardTitle}>{item.value}</Text>

            <View style={styles.fitnessHubCardRow}>
              <View style={styles.fitnessHubRowBlock}>
                <Text style={styles.fitnessHubSmallLabel}>Hour:</Text>
                <Text style={styles.fitnessHubSmallValue}>{item.hour}</Text>
              </View>

              <View style={styles.fitnessHubRowBlock}>
                <Text style={styles.fitnessHubSmallLabel}>Date:</Text>
                <Text style={styles.fitnessHubSmallValue}>{item.date}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => fitnessHubDeleteItem(item.id)}
            style={styles.fitnessHubDeleteBtn}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../assets/images/fitnesshubdel.png')}
              style={styles.fitnessHubDeleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );

  const fitnessHubRenderForm = () => (
    <>
      <TouchableOpacity
        onPress={() => setFitnessHubShowForm(false)}
        activeOpacity={0.7}
        style={styles.fitnessHubBackRow}
      >
        <Image source={require('../../assets/images/fitnesshuback.png')} />
        <Text style={styles.fitnessHubBackLabel}>
          {fitnessHubMode === 'FOOD' ? 'FOOD' : 'WATER'}
        </Text>
      </TouchableOpacity>

      <LinearGradient
        colors={['#ffffff', '#ffffff21']}
        style={styles.fitnessHubFormGrad}
      >
        <View style={styles.fitnessHubInnerPad}>
          <View style={styles.fitnessHubFormCard}>
            <Text style={styles.fitnessHubFormLabel}>
              {fitnessHubMode === 'FOOD' ? 'Meal Category:' : 'Water amount:'}
            </Text>

            <View style={styles.fitnessHubOptionsRow}>
              {(fitnessHubMode === 'FOOD'
                ? FITNESS_HUB_FOOD_OPTIONS
                : FITNESS_HUB_DRINK_OPTIONS
              ).map(opt => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={opt}
                  onPress={() => setFitnessHubSelectedValue(opt)}
                  style={[
                    styles.fitnessHubOptionBtn,
                    fitnessHubSelectedValue === opt &&
                      styles.fitnessHubOptionActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.fitnessHubOptionText,
                      fitnessHubSelectedValue === opt &&
                        styles.fitnessHubOptionTextActive,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.fitnessHubHourDateRow}>
              <View style={styles.fitnessHubFlex1}>
                <Text style={styles.fitnessHubFormLabel}>Hour:</Text>
                <TextInput
                  style={styles.fitnessHubInput}
                  value={fitnessHubHour}
                  onChangeText={setFitnessHubHour}
                  placeholderTextColor="#587293"
                />
              </View>

              <View style={styles.fitnessHubFlex1}>
                <Text style={styles.fitnessHubFormLabel}>Date:</Text>
                <TextInput
                  style={styles.fitnessHubInput}
                  value={fitnessHubDate}
                  onChangeText={setFitnessHubDate}
                  placeholderTextColor="#587293"
                />
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.fitnessHubSaveBtn}
        onPress={fitnessHubSaveRecord}
      >
        <Text style={styles.fitnessHubSaveText}>Save</Text>
      </TouchableOpacity>
    </>
  );

  const fitnessHubRenderList = () => (
    <>
      <View style={styles.fitnessHubQuoteCard}>
        <Text style={styles.fitnessHubQuoteText}>
          Sir, discipline begins with a glass of water. And then with a proper
          lunch.
        </Text>
        <Image
          source={require('../../assets/images/fitnesshubicon.png')}
          style={styles.fitnessHubQuoteIcon}
        />
      </View>

      <Text style={styles.fitnessHubSectionTitle}>Food and Drink</Text>

      <View style={styles.fitnessHubSwitchRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.fitnessHubSwitchBtn,
            fitnessHubMode === 'FOOD' && styles.fitnessHubSwitchActive,
          ]}
          onPress={() => setFitnessHubMode('FOOD')}
        >
          <Text
            style={[
              styles.fitnessHubSwitchText,
              fitnessHubMode === 'FOOD' && styles.fitnessHubSwitchTextActive,
            ]}
          >
            FOOD
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.fitnessHubSwitchBtn,
            fitnessHubMode === 'DRINK' && styles.fitnessHubSwitchActive,
          ]}
          onPress={() => setFitnessHubMode('DRINK')}
        >
          <Text
            style={[
              styles.fitnessHubSwitchText,
              fitnessHubMode === 'DRINK' && styles.fitnessHubSwitchTextActive,
            ]}
          >
            DRINK
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          fitnessHubMode === 'FOOD' ? fitnessHubFoodList : fitnessHubDrinkList
        }
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <FitnessHubCard item={item} />}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.fitnessHubEmptyText}>Empty</Text>
        }
        style={styles.fitnessHubListSpacing}
      />

      <View style={styles.fitnessHubAddWrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.fitnessHubAddBtn}
          onPress={() => setFitnessHubShowForm(true)}
        >
          <Text style={styles.fitnessHubAddBtnText}>
            {fitnessHubMode === 'FOOD'
              ? 'Record your meal intake'
              : 'Record water intake'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
  fitnessHubQuoteCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    minHeight: 100,
    justifyContent: 'center',
    marginBottom: 20,
  },
  fitnessHubQuoteText: {
    fontSize: 16,
    width: '70%',
    color: '#081C35',
  },
  fitnessHubQuoteIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  fitnessHubSectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  fitnessHubSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  fitnessHubSwitchBtn: {
    borderWidth: 1,
    borderColor: '#63ADE3',
    paddingVertical: 12,
    paddingHorizontal: 40,
    height: 57,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '38%',
  },
  fitnessHubSwitchActive: {
    backgroundColor: '#63ADE3',
  },
  fitnessHubSwitchText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
  fitnessHubSwitchTextActive: {
    color: '#fff',
  },
  fitnessHubEmptyText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  fitnessHubCardWrapper: {
    borderRadius: 20,
    marginBottom: 16,
  },
  fitnessHubInnerPad: {
    padding: 1,
  },
  fitnessHubCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fitnessHubCardTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
  },
  fitnessHubCardRow: {
    flexDirection: 'row',
    gap: 30,
  },
  fitnessHubSmallLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
  },
  fitnessHubSmallValue: {
    color: '#63ADE3',
    fontSize: 16,
  },
  fitnessHubDeleteBtn: {
    backgroundColor: '#63ADE3',
    width: 53,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  fitnessHubDeleteIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
  fitnessHubBackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 30,
  },
  fitnessHubBackLabel: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  fitnessHubFormGrad: {
    borderRadius: 22,
    marginBottom: 20,
  },
  fitnessHubFormCard: {
    backgroundColor: '#214363',
    padding: 20,
    borderRadius: 21,
  },
  fitnessHubFormLabel: {
    color: '#fff',
    marginTop: 16,
    marginBottom: 10,
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
  fitnessHubOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fitnessHubOptionBtn: {
    width: '30%',
    backgroundColor: '#081C35',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  fitnessHubOptionActive: {
    backgroundColor: '#63ADE3',
  },
  fitnessHubOptionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  fitnessHubOptionTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  fitnessHubHourDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 13,
  },
  fitnessHubFlex1: {
    flex: 1,
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
  fitnessHubAddWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  fitnessHubAddBtn: {
    backgroundColor: '#63ADE3',
    borderRadius: 22,
    width: '86%',
    height: 78,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  fitnessHubAddBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  fitnessHubListSpacing: {
    marginTop: 20,
  },
});

export default MrBentFoodAndDrink;
