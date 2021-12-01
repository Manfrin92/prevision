import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/button';

import PlayerContext from '../../hooks/playerContext';

const Board: React.FC = () => {
    const {
        handleAddPlayerToGame,
        maximumNumberOfRounds,
        registeredPlayersInAsyncStorage,
    } = useContext(PlayerContext);

    return (
        <ScrollView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                marginTop: '16%',
            }}
        ></ScrollView>
    );
};

export default Board;
