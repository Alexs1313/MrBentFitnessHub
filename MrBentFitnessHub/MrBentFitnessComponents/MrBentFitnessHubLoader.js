import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Image } from 'react-native';
import { mrBentFitnessHubHtmlLoader } from '../MrBentFitnessHubUtils/mrBentFitnessHubHtmlLoader';
import MrBentFitnessHubBackground from './MrBentFitnessHubBackground';

const MrBentFitnessHubLoader = () => {
  return (
    <MrBentFitnessHubBackground>
      <View style={styles.fitnesshubcontainer}>
        <Image source={require('../../assets/images/fitnesshubldr.png')} />
        <View style={styles.fitnesshubwrapper}>
          <WebView
            originWhitelist={['*']}
            source={{ html: mrBentFitnessHubHtmlLoader }}
            style={{ width: 50, height: 300, backgroundColor: 'transparent' }}
            scrollEnabled={false}
          />
        </View>
      </View>
    </MrBentFitnessHubBackground>
  );
};

const styles = StyleSheet.create({
  fitnesshubwrapper: {
    bottom: 160,
    left: 0,
    right: 0,
    alignItems: 'center',
    position: 'absolute',
  },
  fitnesshubcontainer: {
    flex: 1,
    marginTop: 110,
    alignItems: 'center',
    height: 570,
  },
});

export default MrBentFitnessHubLoader;
