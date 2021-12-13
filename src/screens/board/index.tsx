import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/button';

import PlayerContext from '../../hooks/playerContext';
import { IGameBoardPoints } from '../../models/board';

import { Title } from './styles';

const Board: React.FC = () => {
    const {
        handleUpdatingSelectedRoundPoint,
        handleUpdatingSelectedRoundResult,
        boardGamePoints,
        listOfPossiblePrevisions,
    } = useContext(PlayerContext);

    return (
        <ScrollView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                marginTop: '16%',
            }}
        >
            <Title>Escolha o palpite</Title>

            <ScrollView horizontal={true}>
                {boardGamePoints &&
                    boardGamePoints.length > 0 &&
                    boardGamePoints.map((boardGamePoint) => (
                        <View key={boardGamePoint.playerName}>
                            <Text style={{ fontSize: 18 }}>
                                {boardGamePoint.playerName}
                            </Text>

                            {boardGamePoint &&
                                boardGamePoint.rounds &&
                                boardGamePoint.rounds.length > 0 &&
                                boardGamePoint.rounds.map((round) => {
                                    if (!round.touched) {
                                        return (
                                            <Picker
                                                key={
                                                    boardGamePoint.playerName +
                                                    round.order
                                                }
                                                style={{ width: 94 }}
                                                onValueChange={(
                                                    selectedNumber
                                                ) => {
                                                    handleUpdatingSelectedRoundPoint(
                                                        boardGamePoint.playerName,
                                                        round.order,
                                                        // @ts-ignore
                                                        +selectedNumber
                                                    );
                                                }}
                                            >
                                                {listOfPossiblePrevisions.map(
                                                    (number) => (
                                                        <Picker.Item
                                                            key={number}
                                                            label={`${number}`}
                                                            value={number}
                                                        />
                                                    )
                                                )}
                                            </Picker>
                                        );
                                    } else {
                                        return (
                                            <View>
                                                <Text>Voltar</Text>
                                            </View>
                                        );
                                    }
                                })}
                        </View>
                    ))}
            </ScrollView>

            <Title>Selecionados</Title>
            <ScrollView horizontal={true}>
                {boardGamePoints &&
                    boardGamePoints.length > 0 &&
                    boardGamePoints.map((boardGamePoint) => (
                        <View key={boardGamePoint.playerName}>
                            <Text style={{ fontSize: 18 }}>
                                {boardGamePoint.playerName}
                            </Text>

                            {boardGamePoint &&
                                boardGamePoint.rounds &&
                                boardGamePoint.rounds.length > 0 &&
                                boardGamePoint.rounds.map((round) => (
                                    <View
                                        key={
                                            boardGamePoint.playerName +
                                            round.order
                                        }
                                        style={{ width: 94 }}
                                    >
                                        <Text style={{ fontSize: 18 }}>
                                            {round.valueChosen}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    ))}
            </ScrollView>

            <Title>Ranking</Title>
            <Title>Ranking</Title>
            <Button onPress={() => {}}>Finalizar Jogo</Button>
        </ScrollView>
    );
};

export default Board;
