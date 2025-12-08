import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import MrBentFitnessHubBackground from '../MrBentFitnessComponents/MrBentFitnessHubBackground';
import { useRoute, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const fitnessHubSize = width * 0.7;
const fitnessHubStrokeWidth = 5;
const fitnessHubRadius = (fitnessHubSize - fitnessHubStrokeWidth) / 2.2;
const fitnessHubCircumference = 2 * Math.PI * fitnessHubRadius;

const MrBentFitnessHubTimer = () => {
  const fitnessHubRoute = useRoute();
  const fitnessHubNavigation = useNavigation();
  const { item: fitnessHubItem } = fitnessHubRoute.params;

  const [fitnessHubTime, setFitnessHubTime] = useState(
    fitnessHubItem.duration * 60,
  );
  const [fitnessHubIsRunning, setFitnessHubIsRunning] = useState(true);

  const fitnessHubIntervalRef = useRef(null);

  useEffect(() => {
    if (fitnessHubIsRunning) {
      fitnessHubIntervalRef.current = setInterval(() => {
        setFitnessHubTime(prev => {
          if (prev <= 1) {
            clearInterval(fitnessHubIntervalRef.current);
            setFitnessHubIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(fitnessHubIntervalRef.current);
    }

    return () => clearInterval(fitnessHubIntervalRef.current);
  }, [fitnessHubIsRunning]);

  const fitnessHubMinutes = String(Math.floor(fitnessHubTime / 60)).padStart(
    2,
    '0',
  );
  const fitnessHubSeconds = String(fitnessHubTime % 60).padStart(2, '0');

  const fitnessHubProgress =
    fitnessHubCircumference -
    (fitnessHubTime / (fitnessHubItem.duration * 60)) * fitnessHubCircumference;

  return (
    <MrBentFitnessHubBackground>
      <View style={styles.fitnessHubContainer}>
        <View style={styles.fitnessHubCenter}>
          <Svg width={fitnessHubSize} height={fitnessHubSize}>
            <G
              rotation="-90"
              origin={`${fitnessHubSize / 2}, ${fitnessHubSize / 2}`}
            >
              <Circle
                cx={fitnessHubSize / 2}
                cy={fitnessHubSize / 2}
                r={fitnessHubRadius}
                stroke="#13314D"
                strokeWidth={fitnessHubStrokeWidth}
                fill="none"
              />

              <Circle
                cx={fitnessHubSize / 2}
                cy={fitnessHubSize / 2}
                r={fitnessHubRadius}
                stroke="#63ADE3"
                strokeWidth={fitnessHubStrokeWidth}
                strokeDasharray={fitnessHubCircumference}
                strokeDashoffset={fitnessHubProgress}
                strokeLinecap="round"
                fill="none"
              />
            </G>
          </Svg>

          <Text style={styles.fitnessHubTime}>
            {fitnessHubMinutes}:{fitnessHubSeconds}
          </Text>
        </View>

        <LinearGradient
          colors={['#ffffffff', '#ffffff21']}
          style={styles.fitnessHubGradWrapper}
        >
          <View style={styles.fitnessHubGradPad}>
            <View style={styles.fitnessHubTrainingCard}>
              <View style={styles.fitnessHubRowTop}>
                <View style={styles.fitnessHubIntensityBadge}>
                  <Text style={styles.fitnessHubIntensityBadgeText}>
                    {fitnessHubItem.intensity}
                  </Text>
                </View>

                <Text style={styles.fitnessHubTrainingName}>
                  {fitnessHubItem.name}
                </Text>
              </View>

              <View style={styles.fitnessHubRowBottom}>
                <View>
                  <Text style={styles.fitnessHubLabel}>Type of workout:</Text>
                  <Text style={styles.fitnessHubValue}>
                    {fitnessHubItem.type}
                  </Text>
                </View>

                <View>
                  <Text style={styles.fitnessHubLabel}>Duration:</Text>
                  <Text style={styles.fitnessHubValue}>
                    {fitnessHubItem.duration} min
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.fitnessHubFooterWrapper}>
          <TouchableOpacity
            onPress={() => fitnessHubNavigation.goBack()}
            activeOpacity={0.7}
          >
            <Image source={require('../../assets/images/fitnesshubhome.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </MrBentFitnessHubBackground>
  );
};

const styles = StyleSheet.create({
  fitnessHubContainer: {
    paddingTop: height * 0.08,
    alignItems: 'center',
    flex: 1,
  },
  fitnessHubCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fitnessHubTime: {
    color: '#63ADE3',
    fontSize: 48,
    position: 'absolute',
    fontWeight: '700',
  },
  fitnessHubGradWrapper: {
    borderRadius: 22,
    width: '60%',
    marginTop: 46,
  },
  fitnessHubGradPad: {
    padding: 1,
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
  fitnessHubFooterWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    height: 150,
  },
});

export default MrBentFitnessHubTimer;
