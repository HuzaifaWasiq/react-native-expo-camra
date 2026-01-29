import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/Component/Login';  
import Ui from './src/Component/Ui';        
import Abd from './src/Component/Camera';
import Home from './src/Component/Home';
import CostTracker from './src/Component/CostTracker';
import FieldSelector from './src/Component/Fields';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="FieldSelector">
        <Stack.Screen name="FieldSelector" component={FieldSelector} />
        <Stack.Screen name="CostTracker" component={CostTracker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
