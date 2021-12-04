import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import PlayerSelect from '../../components/playerSelect';

import PlayerContext from '../../hooks/playerContext';
import { Title } from './styles';

const RemovePlayers: React.FC = () => {
    const {
        handleRemovePlayerToListOfRegisteredPlayers,
        registeredPlayersInAsyncStorage,
    } = useContext(PlayerContext);
    const [playerNameToRemove, setPlayerNameToRemove] = useState('');

    const handleRemovingPlayer = useCallback(() => {
        if (playerNameToRemove !== '') {
            handleRemovePlayerToListOfRegisteredPlayers(playerNameToRemove);
            const newPlayerName =
                registeredPlayersInAsyncStorage &&
                registeredPlayersInAsyncStorage[0] &&
                registeredPlayersInAsyncStorage[0].name
                    ? registeredPlayersInAsyncStorage[0].name
                    : '';
            setPlayerNameToRemove(newPlayerName);
        }
    }, [
        playerNameToRemove,
        setPlayerNameToRemove,
        registeredPlayersInAsyncStorage,
    ]);

    return (
        <SafeAreaView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                paddingTop: '12%',
            }}
        >
            <Title style={{ marginBottom: 16 }}>
                Selecione o jogador que quer remover
            </Title>
            <PlayerSelect
                actionTextToDisplay='Remover Jogador'
                listOfRegisteredPlayers={registeredPlayersInAsyncStorage}
                handleSelectingPlayer={(newSelectedPlayerName) => {
                    setPlayerNameToRemove(newSelectedPlayerName);
                }}
                handleConfirmingActionOnSelectedPlayer={() => {
                    handleRemovingPlayer();
                }}
            />
        </SafeAreaView>
    );
};

export default RemovePlayers;
