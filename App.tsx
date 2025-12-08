import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import MrBentFitnessHubStack from './MrBentFitnessHub/MrBentFitnessHubNavigation/MrBentFitnessHubStack';
import MrBentFitnessHubLoader from './MrBentFitnessHub/MrBentFitnessComponents/MrBentFitnessHubLoader';

const App = () => {
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleLoader(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      {isVisibleLoader ? <MrBentFitnessHubStack /> : <MrBentFitnessHubLoader />}
    </NavigationContainer>
  );
};

export default App;
