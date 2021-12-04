import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppProvider from './src/hooks';
import ConfigureGame from './src/screens/configureGame';
import AddPlayers from './src/screens/addPlayers';
import Board from './src/screens/board';
import RemovePlayers from './src/screens/removePlayers';
import Menu from './src/screens/menu';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Menu'>
                    <Stack.Screen
                        name='ConfigureGame'
                        component={ConfigureGame}
                    />
                    <Stack.Screen name='AddPlayers' component={AddPlayers} />
                    <Stack.Screen
                        name='RemovePlayers'
                        component={RemovePlayers}
                    />
                    <Stack.Screen name='Board' component={Board} />
                    <Stack.Screen name='Menu' component={Menu} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}
