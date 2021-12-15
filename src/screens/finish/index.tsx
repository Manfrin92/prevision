import React, { useCallback, useContext } from 'react';
import { Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/button';
import PlayerContext from '../../hooks/playerContext';

import { Title } from './styles';
import { PageNamesEnum } from '../../common/enums';

const Finish: React.FC = () => {
    const { ranking, handleResetGame } = useContext(PlayerContext);
    const navigation = useNavigation();

    const handleGoBack = useCallback(() => {
        Alert.alert('Sair do jogo', 'Tem certeza que deseja sair?', [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: () => {
                    handleResetGame();
                    // @ts-ignore
                    navigation.navigate(PageNamesEnum.Menu);
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
            <Title style={{ marginTop: 16 }}>Ranking</Title>
            {ranking &&
                ranking.length > 0 &&
                ranking.map((rank, index) => (
                    <View key={rank.playerName + index}>
                        <Title>
                            {index + 1} - {rank.playerName} - {rank.sumOfPoints}
                        </Title>
                    </View>
                ))}
            <Button onPress={handleGoBack}>Voltar ao início</Button>
        </ScrollView>
    );
};

export default Finish;
