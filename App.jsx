import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Component/Login';  
import Ui from './src/Component/Ui';        
import Abd from './src/Component/Abd';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
    
        <Stack.Screen name="Abd" component={Abd} />
        <Stack.Screen name="Ui" component={Ui} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
