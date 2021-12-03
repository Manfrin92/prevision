import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import { PageNamesEnum } from '../../common/enums';
import Button from '../../components/button';

import { Title } from './styles';

const Menu: React.FC = () => {
    const navigation = useNavigation();

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
        </ScrollView>
    );
};

export default Menu;
