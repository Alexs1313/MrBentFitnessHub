import { ScrollView, View } from 'react-native';

const MrBentFitnessHubBackground = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#081C35' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default MrBentFitnessHubBackground;
