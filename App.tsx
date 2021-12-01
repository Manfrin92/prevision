import React from 'react';
import { View } from 'react-native';
import AppProvider from './src/hooks';
import ConfigureGame from './src/screens/configureGame/configureGame';

export default function App() {
    return (
        <View>
            <AppProvider>
                <ConfigureGame />
            </AppProvider>
        </View>
    );
}
