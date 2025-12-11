import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import MrBentFitnessHubStack from './MrBentFitnessHub/MrBentFitnessHubNavigation/MrBentFitnessHubStack';
import MrBentFitnessHubLoader from './MrBentFitnessHub/MrBentFitnessComponents/MrBentFitnessHubLoader';
import { ContextProvider } from './MrBentFitnessHub/MrBentFitnessHubStore/mrBentFitnessHubContext';

const App = () => {
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleLoader(true);
    }, 5200);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {isVisibleLoader ? (
          <MrBentFitnessHubStack />
        ) : (
          <MrBentFitnessHubLoader />
        )}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
