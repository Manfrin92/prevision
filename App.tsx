import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppProvider from './src/hooks';
import ConfigureGame from './src/screens/configureGame';
import AddPlayers from './src/screens/addPlayers';
import Board from './src/screens/board';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='ConfigureGame'>
                    <Stack.Screen
                        name='ConfigureGame'
                        component={ConfigureGame}
                    />
                    <Stack.Screen name='AddPlayers' component={AddPlayers} />
                    <Stack.Screen name='Board' component={Board} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}
