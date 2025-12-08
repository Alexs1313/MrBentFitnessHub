import { createStackNavigator } from '@react-navigation/stack';
import MrBentFitnessHubTabs from './MrBentFitnessHubTabs';
import MrBentFitnessHubOnboard from '../MrBentFitnessHubScreens/MrBentFitnessHubOnboard';
import MrBentFitnessHubRegistation from '../MrBentFitnessHubScreens/MrBentFitnessHubRegistration';
import MrBentFitnessHubRegistration from '../MrBentFitnessHubScreens/MrBentFitnessHubRegistration';
import MrBentFitnessHubTimer from '../MrBentFitnessHubScreens/MrBentFitnessHubTimer';

const Stack = createStackNavigator();

const MrBentFitnessHubStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MrBentFitnessHubOnboard"
        component={MrBentFitnessHubOnboard}
      />
      <Stack.Screen
        name="MrBentFitnessHubRegistration"
        component={MrBentFitnessHubRegistration}
      />
      <Stack.Screen
        name="MrBentFitnessHubTabs"
        component={MrBentFitnessHubTabs}
      />
      <Stack.Screen
        name="MrBentFitnessHubTimer"
        component={MrBentFitnessHubTimer}
      />
    </Stack.Navigator>
  );
};

export default MrBentFitnessHubStack;
