import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import { PageNamesEnum } from '../../common/enums';
import Button from '../../components/button';
import PlayerContext from '../../hooks/playerContext';

import { Title } from './styles';

const Menu: React.FC = () => {
    const navigation = useNavigation();
    const { handleResetGame } = useContext(PlayerContext);

    return (
        <ScrollView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                marginTop: '16%',
            }}
        >
            <Title>Escolha uma opção</Title>

            <Button
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate(PageNamesEnum.AddPlayers);
                }}
            >
                Cadastrar jogadores
            </Button>
            <Button
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate(PageNamesEnum.RemovePlayers);
                }}
            >
                Remover jogadores
            </Button>
            <Button
                onPress={() => {
                    // @ts-ignore
                    navigation.navigate(PageNamesEnum.ConfigureGame);
                }}
            >
                Configurar partida
            </Button>
            <Button onPress={handleResetGame}>Limpar dados de partidas</Button>
        </ScrollView>
    );
};

export default Menu;
