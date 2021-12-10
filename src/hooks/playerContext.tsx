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
import { IGameBoardPoints, IRound } from '../models/board';

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
    handleUpdatingSelectedRoundPoint(
        playerName: string,
        roundNumberIndex: number,
        valueChosen: number
    ): IGameBoardPoints[] | undefined;
    handleUpdatingSelectedRoundResult(
        playerName: string,
        roundNumberIndex: number,
        didScored: boolean
    ): void;
    listOfPossiblePrevisions: string[];
    boardGamePoints: IGameBoardPoints[];
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }) => {
    const [playersToPlay, setPlayersToPlay] = useState([] as Player[]);
    const [maximumNumberOfRounds, setMaximumNumberOfRounds] = useState(3);
    const [
        registeredPlayersInAsyncStorage,
        setRegisteredPlayersInAsyncStorage,
    ] = useState([] as Player[]);
    const [boardGamePoints, setBoardGamePoints] = useState(
        [] as IGameBoardPoints[]
    );
    const [listOfPossiblePrevisions, setListOfPossiblePrevisions] = useState(
        [] as string[]
    );

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
        createBoardPoints();
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

    const createBoardPoints = useCallback(() => {
        const numberOfRounds = playersToPlay.length;
        createListOfPossiblePrevisions(numberOfRounds);
        const inCreationBoardPoints: IGameBoardPoints[] = [];
        playersToPlay.forEach((player) => {
            const rounds = new Array(numberOfRounds).fill({});
            const roundsFilled = [] as IRound[];

            rounds.forEach((value, index) => {
                const roundInCreation: IRound = {
                    didScored: true,
                    order: index,
                    valueChosen: 10,
                };

                roundsFilled.push(roundInCreation);
            });

            const playerPoints: IGameBoardPoints = {
                playerName: player.name,
                rounds: roundsFilled,
            };

            inCreationBoardPoints.push(playerPoints);
        });

        setBoardGamePoints(inCreationBoardPoints);
    }, [
        playersToPlay,
        setBoardGamePoints,
        boardGamePoints,
        setListOfPossiblePrevisions,
    ]);

    const handleUpdatingSelectedRoundPoint = useCallback(
        (
            playerName: string,
            roundNumberIndex: number,
            valueChosen: number
        ): IGameBoardPoints[] | undefined => {
            console.log('received: ', valueChosen);
            const playerSelected = boardGamePoints.find(
                (player) => player.playerName == playerName
            );
            if (playerSelected) {
                const boardGameCopy = [...boardGamePoints];
                boardGameCopy.forEach((player) => {
                    if (player.playerName == playerName) {
                        player.rounds[roundNumberIndex].valueChosen =
                            valueChosen;
                    }
                });
                console.log('setting new board: ', valueChosen);
                setBoardGamePoints(boardGameCopy);
                return boardGameCopy;
            } else {
                Alert.alert('Erro', 'Jogador não encontrado');
            }
        },
        [boardGamePoints, setBoardGamePoints]
    );

    const handleUpdatingSelectedRoundResult = useCallback(
        (playerName: string, roundNumberIndex: number, didScored: boolean) => {
            const playerSelected = boardGamePoints.find(
                (player) => player.playerName == playerName
            );
            if (playerSelected) {
                const boardGameCopy = [...boardGamePoints];
                boardGameCopy.forEach((player) => {
                    if (player.playerName == playerName) {
                        player.rounds[roundNumberIndex].didScored = didScored;
                    }
                });
                setBoardGamePoints(boardGameCopy);
                console.log('new board? ', boardGameCopy);
            } else {
                Alert.alert('Erro', 'Jogador não encontrado');
            }
        },
        [boardGamePoints, setBoardGamePoints]
    );

    const createListOfPossiblePrevisions = useCallback(
        (numberOfRounds: number) => {
            const arrayOfOptions = new Array(numberOfRounds).fill(10);
            const sumArrayOfOptions = [] as string[];
            arrayOfOptions.forEach((value, index) =>
                sumArrayOfOptions.push(`${value + index}`)
            );
            setListOfPossiblePrevisions(sumArrayOfOptions);
        },
        [setListOfPossiblePrevisions]
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
                boardGamePoints,
                handleUpdatingSelectedRoundPoint,
                handleUpdatingSelectedRoundResult,
                listOfPossiblePrevisions,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContext;
