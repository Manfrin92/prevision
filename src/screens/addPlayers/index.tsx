import React, { useCallback, useContext, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import Button from '../../components/button';
import Input from '../../components/input';

import PlayerContext from '../../hooks/playerContext';
import { Title } from './styles';

const AddPlayers: React.FC = () => {
    const { handleAddPlayerToListOfRegisteredPlayers } =
        useContext(PlayerContext);
    const [playerNameToAdd, setPlayerNameToAdd] = useState('');

    const handleAddPlayerToAsync = useCallback(async () => {
        if (playerNameToAdd && playerNameToAdd !== '') {
            handleAddPlayerToListOfRegisteredPlayers({ name: playerNameToAdd });
            Alert.alert('Sucesso', 'Jogador adicionado com sucesso');
        } else {
            Alert.alert('Erro', 'Digite o nome do jogador');
        }
    }, [playerNameToAdd]);

    return (
        <SafeAreaView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                paddingTop: '12%',
            }}
        >
            <Title style={{ marginBottom: 16 }}>
                Coloque o nome dos jogadores que quer adicionar
            </Title>
            <Input
                placeholder='Ex: João'
                setPlayerName={(playerName) => {
                    setPlayerNameToAdd(playerName);
                }}
            />
            <Button onPress={handleAddPlayerToAsync}>Adicionar jogador</Button>
        </SafeAreaView>
    );
};

export default AddPlayers;
