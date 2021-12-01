import React, { createContext, useState, useCallback, useEffect } from 'react';

import { getMaximumNumberOfRounds } from '../services/gameCalculations';

import { Player } from '../models/player';
import {
    getPlayersInAsyncStorage,
    addPlayerInAsyncStorage,
} from '../services/asyncStorageService';
import { Alert } from 'react-native';

interface PlayerContextData {
    playersToPlay: [];
    handleAddPlayerToGame(player: Player): void;
    maximumNumberOfRounds: number;
    registeredPlayersInAsyncStorage: Player[];
    handleAddPlayerToListOfRegisteredPlayers(): Player[];
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }) => {
    const [playersToPlay, setPlayersToPlay] = useState([] as Player[]);
    const [maximumNumberOfRounds, setMaximumNumberOfRounds] = useState(3);
    const [
        registeredPlayersInAsyncStorage,
        setRegisteredPlayersInAsyncStorage,
    ] = useState([] as Player[]);

    const handleAddPlayerToListOfRegisteredPlayers = useCallback(() => {
        return registeredPlayersInAsyncStorage;
    }, [registeredPlayersInAsyncStorage, setRegisteredPlayersInAsyncStorage]);

    const getInitialPlayerInAsyncStorage = useCallback(async () => {
        const listOfPlayers = await getPlayersInAsyncStorage();
        if (listOfPlayers) {
            setRegisteredPlayersInAsyncStorage(listOfPlayers);
        }
    }, []);

    const isPlayerAlreadyInGame = useCallback(
        (player): boolean => {
            const playerAlreadyInGame = playersToPlay.find(
                (playerAlreadyInGame) =>
                    playerAlreadyInGame.name === player.name
            );
            return playerAlreadyInGame ? true : false;
        },
        [playersToPlay]
    );

    const handleAddPlayerToGame = useCallback(
        (player: Player) => {
            if (!isPlayerAlreadyInGame(player)) {
                setPlayersToPlay(() => [...playersToPlay, player]);

                setMaximumNumberOfRounds(
                    +getMaximumNumberOfRounds([...playersToPlay, player].length)
                );
            } else {
                Alert.alert('Jogador já adicionado');
            }
        },

        [playersToPlay, setPlayersToPlay]
    );

    useEffect(() => {
        getInitialPlayerInAsyncStorage();
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                handleAddPlayerToGame,
                // @ts-ignore
                playersToPlay,
                maximumNumberOfRounds,
                registeredPlayersInAsyncStorage,
                handleAddPlayerToListOfRegisteredPlayers,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContext;
