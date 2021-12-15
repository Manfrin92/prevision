import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppProvider from './src/hooks';
import ConfigureGame from './src/screens/configureGame';
import AddPlayers from './src/screens/addPlayers';
import Board from './src/screens/board';
import RemovePlayers from './src/screens/removePlayers';
import Menu from './src/screens/menu';
import Finish from './src/screens/finish';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Menu'>
                    <Stack.Screen
                        name='Configurar partida'
                        component={ConfigureGame}
                    />
                    <Stack.Screen
                        name='Registrar jogador'
                        component={AddPlayers}
                    />
                    <Stack.Screen
                        name='Remover jogador'
                        component={RemovePlayers}
                    />
                    <Stack.Screen name='Partida' component={Board} />
                    <Stack.Screen name='Menu' component={Menu} />
                    <Stack.Screen
                        options={{
                            headerShown: false,
                        }}
                        name='Fim'
                        component={Finish}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}
