import React from 'react'
import { defaultTheme, Provider, View } from '@adobe/react-spectrum'
import Converter from './components/Converter'

const App: React.FC = () => {
  return (
    <Provider theme={defaultTheme}>
      {/* <View padding="size-400"> */}
        <View  UNSAFE_style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Converter />
      </View>
    </Provider>
  )
}

export default App
