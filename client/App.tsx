import React from 'react';
import {ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigation/AuthStack';
// import AppStack from './src/navigation/AppStack';

function App() {
  // dummy auth data
  // const authdata = 'authData';
  const loading = false;

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      {/* {authdata ? <AppStack /> : <AuthStack />} */}
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;
