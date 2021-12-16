import React, { useCallback, useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/button';
import { Entypo } from '@expo/vector-icons';
import PlayerContext from '../../hooks/playerContext';

import { Title } from './styles';
import { PageNamesEnum } from '../../common/enums';

const Board: React.FC = () => {
    const {
        handleUpdatingSelectedRoundPoint,
        boardGamePoints,
        listOfPossiblePrevisions,
        handleRevertingSelectedRound,
        currentRound,
        handleUpdatingRound,
        maximumNumberOfRounds,
        ranking,
        goingBackInRound,
    } = useContext(PlayerContext);
    const navigation = useNavigation();

    const handleFinishGame = useCallback(() => {
        Alert.alert('Finalizando jogo', 'Tem certeza que deseja finalizar?', [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: () => {
                    // @ts-ignore
                    navigation.navigate(PageNamesEnum.FinishGame);
                },
            },
        ]);
    }, []);

    return (
        <ScrollView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                marginTop: '16%',
            }}
        >
            <Title style={{ borderBottomWidth: 2, paddingBottom: 8 }}>
                Total de rodadas: {maximumNumberOfRounds}
            </Title>

            <Title style={{ marginTop: 8 }}>Rodada atual: {currentRound}</Title>

            <ScrollView horizontal={true}>
                {currentRound !== maximumNumberOfRounds &&
                    boardGamePoints &&
                    boardGamePoints.length > 0 &&
                    boardGamePoints.map((boardGamePoint) => (
                        <View key={boardGamePoint.playerName + Math.random()}>
                            <Text style={{ fontSize: 18 }}>
                                {boardGamePoint.playerName}
                            </Text>

                            {boardGamePoint &&
                                boardGamePoint.rounds &&
                                boardGamePoint.rounds.length > 0 &&
                                boardGamePoint.rounds.map((round) => {
                                    if (round.order === currentRound) {
                                        if (!round.touched) {
                                            return (
                                                <View
                                                    key={
                                                        boardGamePoint.playerName +
                                                        round.order +
                                                        Math.random()
                                                    }
                                                >
                                                    {listOfPossiblePrevisions.map(
                                                        (number) => (
                                                            <TouchableOpacity
                                                                style={{
                                                                    width: 94,
                                                                    height: 52,
                                                                    padding: 16,
                                                                    backgroundColor:
                                                                        round.valueChosen ===
                                                                        +number
                                                                            ? '#adcaf7'
                                                                            : null,
                                                                }}
                                                                onPress={() => {
                                                                    handleUpdatingSelectedRoundPoint(
                                                                        boardGamePoint.playerName,
                                                                        round.order -
                                                                            1,
                                                                        +number
                                                                    );
                                                                }}
                                                                key={
                                                                    number +
                                                                    Math.random()
                                                                }
                                                            >
                                                                <Text>
                                                                    {number}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )
                                                    )}
                                                </View>
                                            );
                                        } else {
                                            return (
                                                <>
                                                    <View
                                                        key={
                                                            boardGamePoint.playerName +
                                                            round.order +
                                                            Math.random()
                                                        }
                                                        style={{
                                                            width: 94,
                                                            flexDirection:
                                                                'row',
                                                            marginTop: 8,
                                                            height: 52,
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            style={{
                                                                flexDirection:
                                                                    'row',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                            onPress={() => {
                                                                handleRevertingSelectedRound(
                                                                    boardGamePoint.playerName,
                                                                    round.order -
                                                                        1
                                                                );
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize: 18,
                                                                }}
                                                            >
                                                                {
                                                                    round.valueChosen
                                                                }
                                                            </Text>
                                                            <Entypo
                                                                style={{
                                                                    marginLeft: 4,
                                                                }}
                                                                name='back-in-time'
                                                                size={24}
                                                                color='black'
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View
                                                        key={
                                                            boardGamePoint.playerName +
                                                            round.order +
                                                            Math.random()
                                                        }
                                                        style={{
                                                            flexDirection:
                                                                'row',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                goingBackInRound(
                                                                    round.order -
                                                                        1,
                                                                    boardGamePoint.playerName
                                                                );
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    borderBottomWidth: 1,
                                                                }}
                                                            >
                                                                Errou
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </>
                                            );
                                        }
                                    }
                                })}
                        </View>
                    ))}
            </ScrollView>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 24,
                }}
            >
                <TouchableOpacity
                    style={{ borderWidth: 2, padding: 10, borderRadius: 8 }}
                    onPress={() => handleUpdatingRound(true)}
                >
                    <Text>Voltar round</Text>
                </TouchableOpacity>
                {currentRound !== maximumNumberOfRounds && (
                    <TouchableOpacity
                        style={{ borderWidth: 2, padding: 10, borderRadius: 8 }}
                        onPress={() => handleUpdatingRound(false)}
                    >
                        <Text>Avançar round</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Title style={{ marginTop: 16 }}>Ranking</Title>
            {ranking &&
                ranking.length > 0 &&
                ranking.map((rank, index) => (
                    <View key={rank.playerName + index + Math.random()}>
                        <Title>
                            {index + 1} - {rank.playerName} - {rank.sumOfPoints}
                        </Title>
                    </View>
                ))}
            {currentRound === maximumNumberOfRounds && (
                <Button onPress={handleFinishGame}>Finalizar Jogo</Button>
            )}
        </ScrollView>
    );
};

export default Board;
