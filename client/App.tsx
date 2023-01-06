import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import {Loader} from './src/components/Loader';

function App() {
  // dummy auth data
  const authdata = 'authData';
  const loading = false;

  if (loading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {authdata ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
