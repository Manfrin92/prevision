import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { Container } from './styles';
import { useState } from 'react';
import Button from '../button';
import { Player } from '../../models/player';

interface PlayerSelectInterface {
    listOfRegisteredPlayers: Player[];
    handleAddingPlayer(newSelectedPlayerName: string): void;
}

const PlayerSelect: React.FC<PlayerSelectInterface> = ({
    listOfRegisteredPlayers,
    handleAddingPlayer,
}) => {
    const [selectedPlayerName, setSelectedPlayerName] = useState(
        listOfRegisteredPlayers && listOfRegisteredPlayers.length > 0
            ? listOfRegisteredPlayers[0].name
            : ''
    );

    return (
        <Container>
            <Picker
                selectedValue={selectedPlayerName}
                onValueChange={(name) => setSelectedPlayerName(name)}
            >
                {listOfRegisteredPlayers.map((player) => (
                    <Picker.Item
                        key={player.name}
                        label={player.name}
                        value={player.name}
                    />
                ))}
            </Picker>
            <Button onPress={() => handleAddingPlayer(selectedPlayerName)}>
                Adicionar
            </Button>
        </Container>
    );
};

export default PlayerSelect;
