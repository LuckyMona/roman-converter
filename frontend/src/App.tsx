import React from 'react';
import { defaultTheme, Provider, View } from '@adobe/react-spectrum';
import Converter from './components/Converter';

const App: React.FC = () => {
  return (
    // <Provider theme={defaultTheme} colorScheme="dark">
    <Provider theme={defaultTheme}>
      <View padding="size-400">
        <Converter />
      </View>
    </Provider>
  );
};

export default App;
