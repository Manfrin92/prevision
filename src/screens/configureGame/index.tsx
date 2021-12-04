import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { PageNamesEnum } from '../../common/enums';
import Button from '../../components/button';

import PlayerSelect from '../../components/playerSelect';
import PlayersList from '../../components/playersList';
import PlayerContext from '../../hooks/playerContext';
import { Title } from './styles';

const ConfigureGame: React.FC = () => {
    const navigation = useNavigation();
    const {
        handleAddPlayerToGame,
        maximumNumberOfRounds,
        registeredPlayersInAsyncStorage,
        canInitiateGame,
    } = useContext(PlayerContext);
    const [playerNameToAdd, setPlayerNameToAdd] = useState(() => {
        const firstPlayerInAsync =
            registeredPlayersInAsyncStorage &&
            registeredPlayersInAsyncStorage[0] &&
            registeredPlayersInAsyncStorage[0].name
                ? registeredPlayersInAsyncStorage[0].name
                : '';
        return firstPlayerInAsync;
    });

    const handleAddingNewPlayerToGame = useCallback(() => {
        if (playerNameToAdd !== '') {
            handleAddPlayerToGame({ name: playerNameToAdd });
            setPlayerNameToAdd('');
        }
    }, [handleAddPlayerToGame, playerNameToAdd, setPlayerNameToAdd]);

    return (
        <ScrollView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                marginTop: '16%',
            }}
        >
            <Button
                onPress={() => {
                    /* @ts-ignore */
                    navigation.navigate(PageNamesEnum.AddPlayers);
                }}
            >
                Adicionar mais jogadores na lista
            </Button>

            <Title> Selecione os jogadores </Title>
            <PlayerSelect
                listOfRegisteredPlayers={registeredPlayersInAsyncStorage}
                actionTextToDisplay='Adicionar jogador'
                handleConfirmingActionOnSelectedPlayer={() =>
                    handleAddingNewPlayerToGame()
                }
                handleSelectingPlayer={(playerName) =>
                    setPlayerNameToAdd(playerName)
                }
            />
            <Title> Jogadores selecionados </Title>
            <PlayersList></PlayersList>
            <Title style={{ marginBottom: 12 }}>
                Número máximo de rodadas: {maximumNumberOfRounds}{' '}
            </Title>

            <Button
                onPress={() => {
                    if (canInitiateGame()) {
                        /* @ts-ignore */
                        navigation.navigate(PageNamesEnum.Board);
                    }
                }}
            >
                Iniciar Partida
            </Button>
        </ScrollView>
    );
};

export default ConfigureGame;
