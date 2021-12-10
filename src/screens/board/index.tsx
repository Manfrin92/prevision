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
    const [boardLocal, setBoardLocal] = useState(() => {
        return boardGamePoints;
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('======   ==========');
        // console.log('board: ', boardGamePoints);
        console.log('=======   =========');
    }, [handleUpdatingSelectedRoundPoint, boardGamePoints]);

    const handleUpdateLocalBoard = useCallback(
        (newBoard: IGameBoardPoints[]) => {
            setLoading(true);
            setBoardLocal(newBoard);
            setTimeout(() => {
                setLoading(false);
            }, 700);
        },
        [setBoardLocal, setLoading, loading, boardLocal, boardGamePoints]
    );

    return (
        <ScrollView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                marginTop: '16%',
            }}
        >
            <Title>Tabela de pontos</Title>

            <ScrollView horizontal={true}>
                {!loading &&
                    boardGamePoints &&
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
                                    <Picker
                                        style={{ width: 94 }}
                                        selectedValue={() => {
                                            console.log(
                                                'round.valueChosen: ',
                                                round.valueChosen
                                            );
                                            return round.valueChosen;
                                        }}
                                        onValueChange={(selectedNumber) => {
                                            console.log(
                                                'updating with: ',
                                                selectedNumber
                                            );
                                            handleUpdatingSelectedRoundPoint(
                                                boardGamePoint.playerName,
                                                round.order,
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
