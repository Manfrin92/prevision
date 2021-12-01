import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/button';

import PlayerSelect from '../../components/playerSelect';
import PlayersList from '../../components/playersList';
import PlayerContext from '../../hooks/playerContext';
import { Title } from './styles';

const ConfigureGame: React.FC = () => {
    const {
        handleAddPlayerToGame,
        maximumNumberOfRounds,
        registeredPlayersInAsyncStorage,
    } = useContext(PlayerContext);

    const handleAddingNewPlayerToGame = useCallback(
        (newPlayerName: string) => {
            if (newPlayerName !== '') {
                handleAddPlayerToGame({ name: newPlayerName });
            }
        },
        [handleAddPlayerToGame]
    );

    return (
        <ScrollView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                marginTop: '16%',
            }}
        >
            <Title> Selecione os jogadores </Title>
            <PlayerSelect
                listOfRegisteredPlayers={registeredPlayersInAsyncStorage}
                handleAddingPlayer={(newSelectedPlayerName) => {
                    handleAddingNewPlayerToGame(newSelectedPlayerName);
                }}
            />
            <Title> Jogadores selecionados </Title>
            <PlayersList></PlayersList>
            <Title style={{ marginBottom: 12 }}>
                Número máximo de rodadas: {maximumNumberOfRounds}{' '}
            </Title>

            <Button onPress={() => {}}>Iniciar Partida</Button>
        </ScrollView>
    );
};

export default ConfigureGame;
