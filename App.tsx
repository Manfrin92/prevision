import React from 'react';
import { View } from 'react-native';
import AppProvider from './src/hooks';
import ConfigureGame from './src/screens/configureGame';
import AddPlayers from './src/screens/addPlayers';

export default function App() {
    return (
        <View>
            <AppProvider>
                <ConfigureGame />
            </AppProvider>
        </View>
    );
}
