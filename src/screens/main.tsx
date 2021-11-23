import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../components/button';
import { Container } from '../components/button/styles';

import PlayerSelect from '../components/playerSelect';
import PlayersList from '../components/playersList';
import { getMaximumNumberOfRounds } from '../services/gameCalculations';

const Main: React.FC = () => {
    const [maximumNumberOfRounds, setMaximumNumberOfRounds] = useState(() =>
        getMaximumNumberOfRounds(3)
    );
    const [selectedPlayerName, setSelectedPlayerName] = useState([
        'Joao',
        'Jose',
        'Ricardo',
    ]);
    const listOfRegisteredPlayers = [
        { id: 1, name: 'Joao' },
        { id: 2, name: 'Jose' },
        { id: 3, name: 'Ricardo' },
    ];

    const findPlayerById = useCallback((playerId: number) => {
        const player = listOfRegisteredPlayers.find(
            (registeredPlayer) => registeredPlayer.id === playerId
        );
        return player;
    }, []);

    return (
        <ScrollView
            style={{
                marginTop: '16%',
            }}
        >
            <Text> Selecione os jogadores </Text>
            <PlayerSelect
                handleAddingPlayer={(newSelectedPlayerId) => {
                    const playerAlreadyrRegistered =
                        findPlayerById(newSelectedPlayerId);
                    if (playerAlreadyrRegistered) {
                        setSelectedPlayerName([
                            ...selectedPlayerName,
                            playerAlreadyrRegistered?.name,
                        ]);
                        const maximumNumber = getMaximumNumberOfRounds(
                            selectedPlayerName.length + 1
                        );
                        setMaximumNumberOfRounds(maximumNumber);
                    }
                }}
            />
            <Text> Jogadores selecionados </Text>
            <PlayersList listOfPlayers={selectedPlayerName}></PlayersList>
            <Text> Número máximo de rodadas: {maximumNumberOfRounds} </Text>

            <Button onPress={() => {}}>Iniciar Partida</Button>
        </ScrollView>
    );
};

export default Main;
