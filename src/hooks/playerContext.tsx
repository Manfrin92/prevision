import React, { createContext, useState, useCallback, useEffect } from 'react';

import {
    getMaximumNumberOfRounds,
    minimumNumberOfPlayers,
} from '../services/gameCalculations';

import { Player } from '../models/player';
import {
    getPlayersInAsyncStorage,
    addPlayerInAsyncStorage,
    removePlayerInAsyncStorage,
} from '../services/asyncStorageService';
import { Alert } from 'react-native';

interface PlayerContextData {
    playersToPlay: [];
    handleAddPlayerToGame(player: Player): void;
    maximumNumberOfRounds: number;
    registeredPlayersInAsyncStorage: Player[];
    handleAddPlayerToListOfRegisteredPlayers(player: Player): Promise<void>;
    handleRemovePlayerToListOfRegisteredPlayers(
        playerName: string
    ): Promise<void>;
    canInitiateGame(): boolean;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }) => {
    const [playersToPlay, setPlayersToPlay] = useState([] as Player[]);
    const [maximumNumberOfRounds, setMaximumNumberOfRounds] = useState(3);
    const [
        registeredPlayersInAsyncStorage,
        setRegisteredPlayersInAsyncStorage,
    ] = useState([] as Player[]);

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

    const canInitiateGame = useCallback(() => {
        let canInitiate = true;
        if (playersToPlay && playersToPlay.length < minimumNumberOfPlayers) {
            canInitiate = false;
            Alert.alert(
                'Erro',
                `O número mínimo de jogadores é de ${minimumNumberOfPlayers}`
            );
        }
        return canInitiate;
    }, [playersToPlay]);

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

    const handleAddPlayerToListOfRegisteredPlayers = useCallback(
        async (player: Player) => {
            await addPlayerInAsyncStorage(player);
            getInitialPlayerInAsyncStorage();
        },
        [registeredPlayersInAsyncStorage, setRegisteredPlayersInAsyncStorage]
    );

    const handleRemovePlayerToListOfRegisteredPlayers = useCallback(
        async (playerName: string) => {
            await removePlayerInAsyncStorage(playerName);
            getInitialPlayerInAsyncStorage();
        },
        [registeredPlayersInAsyncStorage, setRegisteredPlayersInAsyncStorage]
    );

    return (
        <PlayerContext.Provider
            value={{
                handleAddPlayerToGame,
                // @ts-ignore
                playersToPlay,
                maximumNumberOfRounds,
                registeredPlayersInAsyncStorage,
                handleAddPlayerToListOfRegisteredPlayers,
                handleRemovePlayerToListOfRegisteredPlayers,
                canInitiateGame,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContext;
