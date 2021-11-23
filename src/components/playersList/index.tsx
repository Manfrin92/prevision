import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

interface PlayersListProps {
    listOfPlayers: string[];
}

const PlayersList: React.FC<PlayersListProps> = ({ listOfPlayers }) => {
    return (
        <Container>
            {listOfPlayers.map((player) => (
                <Text>{player}</Text>
            ))}
        </Container>
    );
};

export default PlayersList;
