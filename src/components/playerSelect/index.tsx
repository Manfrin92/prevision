import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { Container } from './styles';
import { useState } from 'react';
import Button from '../button';

interface PlayerSelectInterface {
    handleAddingPlayer(newSelectedPlayer: number): void;
}

const PlayerSelect: React.FC<PlayerSelectInterface> = ({
    handleAddingPlayer,
}) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState(0);
    const listOfRegisteredPlayers = [
        { id: 1, name: 'Joao' },
        { id: 2, name: 'Jose' },
        { id: 3, name: 'Ricardo' },
    ];

    return (
        <Container>
            <Picker
                testID='basic-picker'
                selectedValue={selectedPlayerId}
                onValueChange={(v) => setSelectedPlayerId(v)}
                accessibilityLabel='Basic Picker Accessibility Label'
            >
                {listOfRegisteredPlayers.map((player) => (
                    <Picker.Item
                        key={player.id}
                        label={player.name}
                        value={player.id}
                    />
                ))}
            </Picker>
            <Button onPress={() => handleAddingPlayer(selectedPlayerId)}>
                Adicionar
            </Button>
        </Container>
    );
};

export default PlayerSelect;
