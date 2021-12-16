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
import { IGameBoardPoints, IRanking, IRound } from '../models/board';

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
    handleRevertingSelectedRound(
        playerName: string,
        roundNumberIndex: number
    ): void;
    currentRound: number;
    handleUpdatingRound(backRound?: boolean): void;
    ranking: IRanking[];
    handleResetGame(): void;
    goingBackInRound(round: number, playerName: string): void;
    handleRemovePlayerFromGame(player: Player): void;
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
    const [currentRound, setCurrentRound] = useState(1);
    const [ranking, setRanking] = useState([] as IRanking[]);

    const handleRanking = useCallback(
        (boardGamePointsInCreation: IGameBoardPoints[]) => {
            const newRankingListValue = [] as IRanking[];
            boardGamePointsInCreation.forEach((board) => {
                const sumOfPoints = board.rounds.reduce((sum, a) => {
                    return a.didScored ? sum + a.valueChosen : 0;
                }, 0);
                board.totalPoints = sumOfPoints;
                newRankingListValue.push({
                    sumOfPoints,
                    playerName: board.playerName,
                });
            });
            newRankingListValue.sort((a, b) => b.sumOfPoints - a.sumOfPoints);
            setRanking(newRankingListValue);
        },
        [ranking, setRanking]
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

        [
            playersToPlay,
            setPlayersToPlay,
            maximumNumberOfRounds,
            setMaximumNumberOfRounds,
        ]
    );

    const handleRemovePlayerFromGame = useCallback(
        (player: Player) => {
            if (isPlayerAlreadyInGame(player)) {
                const filteredPlayer = [...playersToPlay].filter(
                    (loopingPlayer) => loopingPlayer.name !== player.name
                );
                setPlayersToPlay(filteredPlayer);

                setMaximumNumberOfRounds(
                    +getMaximumNumberOfRounds([...playersToPlay, player].length)
                );
            } else {
                Alert.alert('Jogador já adicionado');
            }
        },

        [
            playersToPlay,
            setPlayersToPlay,
            maximumNumberOfRounds,
            setMaximumNumberOfRounds,
        ]
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
        const numberOfRounds = +getMaximumNumberOfRounds(playersToPlay.length);
        createListOfPossiblePrevisions();
        const inCreationBoardPoints: IGameBoardPoints[] = [];
        playersToPlay.forEach((player) => {
            const rounds = new Array(numberOfRounds).fill({});
            const roundsFilled = [] as IRound[];

            rounds.forEach((value, index) => {
                const roundInCreation: IRound = {
                    didScored: true,
                    order: index + 1,
                    valueChosen: 10,
                    touched: true,
                };
                roundsFilled.push(roundInCreation);
            });

            const playerPoints: IGameBoardPoints = {
                playerName: player.name,
                rounds: roundsFilled,
                totalPoints: 0,
            };

            inCreationBoardPoints.push(playerPoints);
        });
        setBoardGamePoints(inCreationBoardPoints);
        handleRanking(inCreationBoardPoints);
    }, [
        playersToPlay,
        setBoardGamePoints,
        boardGamePoints,
        setListOfPossiblePrevisions,
        handleRanking,
    ]);

    const handleUpdatingSelectedRoundPoint = useCallback(
        (
            playerName: string,
            roundNumberIndex: number,
            valueChosen: number
        ): IGameBoardPoints[] | undefined => {
            const playerSelected = boardGamePoints.find(
                (player) => player.playerName == playerName
            );
            if (playerSelected) {
                const boardGameCopy = [...boardGamePoints];
                boardGameCopy.forEach((player) => {
                    if (player.playerName == playerName) {
                        player.rounds[roundNumberIndex].valueChosen =
                            valueChosen;
                        player.rounds[roundNumberIndex].touched = true;
                        player.rounds[roundNumberIndex].didScored = true;
                    }
                });
                setBoardGamePoints(boardGameCopy);
                handleRanking(boardGameCopy);

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
            } else {
                Alert.alert('Erro', 'Jogador não encontrado');
            }
        },
        [boardGamePoints, setBoardGamePoints]
    );

    const createListOfPossiblePrevisions = useCallback(() => {
        const arrayOfOptions = new Array(currentRound + 2).fill(1);
        const sumArrayOfOptions = [] as string[];
        arrayOfOptions.forEach((value, index) => {
            sumArrayOfOptions.push(`${value}${index}`);
        });
        setListOfPossiblePrevisions(sumArrayOfOptions);
    }, [setListOfPossiblePrevisions, currentRound]);

    const handleRevertingSelectedRound = useCallback(
        (
            playerName: string,
            roundNumberIndex: number
        ): IGameBoardPoints[] | undefined => {
            const playerSelected = boardGamePoints.find(
                (player) => player.playerName == playerName
            );
            if (playerSelected) {
                const boardGameCopy = [...boardGamePoints];
                boardGameCopy.forEach((player) => {
                    if (player.playerName == playerName) {
                        player.rounds[roundNumberIndex].touched = false;
                    }
                });
                setBoardGamePoints(boardGameCopy);
                return boardGameCopy;
            } else {
                Alert.alert('Erro', 'Jogador não encontrado');
            }
        },
        [boardGamePoints, setBoardGamePoints]
    );

    const goingBackInRound = useCallback(
        (currentRound: number, playerName: string) => {
            console.log('currentRound: ', currentRound);
            console.log('playerName: ', playerName);
            const boardGameCopy = [...boardGamePoints];
            boardGameCopy.forEach((player) => {
                player.rounds.forEach((round) => {
                    if (
                        playerName === player.playerName &&
                        round.order == currentRound
                    ) {
                        round.didScored = false;
                    }
                });
            });
            handleRanking(boardGameCopy);
            setBoardGamePoints(boardGameCopy);
        },
        [boardGamePoints, setBoardGamePoints]
    );

    const goingFowardInRound = useCallback(
        (currentRound: number) => {
            const boardGameCopy = [...boardGamePoints];
            boardGameCopy.forEach((player) => {
                player.rounds.forEach((round) => {
                    if (round.order == currentRound) {
                        round.didScored = true;
                    }
                });
            });
            handleRanking(boardGameCopy);
            setBoardGamePoints(boardGameCopy);
        },
        [boardGamePoints, setBoardGamePoints]
    );

    const handleUpdatingRound = useCallback(
        (backRound) => {
            let newRound = currentRound;
            if (backRound) {
                if (newRound > 1) {
                    newRound--;
                }
            } else {
                if (newRound < maximumNumberOfRounds) {
                    newRound++;
                    goingFowardInRound(newRound);
                }
            }
            createListOfPossiblePrevisions();
            setCurrentRound(newRound);
        },
        [currentRound, setCurrentRound, goingFowardInRound]
    );

    const handleResetGame = useCallback(() => {
        setPlayersToPlay([]);
        setBoardGamePoints([]);
        setListOfPossiblePrevisions([]);
        setCurrentRound(1);
        setRanking([]);
        setMaximumNumberOfRounds(3);
    }, [
        playersToPlay,
        setPlayersToPlay,
        boardGamePoints,
        setBoardGamePoints,
        listOfPossiblePrevisions,
        setListOfPossiblePrevisions,
        currentRound,
        setCurrentRound,
        ranking,
        setRanking,
        maximumNumberOfRounds,
        setMaximumNumberOfRounds,
    ]);

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
                handleRevertingSelectedRound,
                currentRound,
                handleUpdatingRound,
                ranking,
                handleResetGame,
                goingBackInRound,
                handleRemovePlayerFromGame,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContext;
