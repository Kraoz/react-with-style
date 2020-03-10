import React, { useState } from 'react'
import { View, Button } from 'react-with-style'

import StyleProvider from './StyleProvider'

const App = () => {
  const [theme, setTheme] = useState('dark')

  return (
    <StyleProvider theme={theme}>
      <View style="bg-drop-1">
        <Button onClick={() => setTheme('dark')} style="bg-blue">
          DARK
        </Button>
        <Button onClick={() => setTheme('light')} style="bg-white dark:">
          LIGHT
        </Button>
      </View>
      <View style="bg-primary w-5 h-5"></View>
    </StyleProvider>
  )
}

export default App
