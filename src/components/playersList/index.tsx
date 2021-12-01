import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import PlayerContext from '../../hooks/playerContext';
import { Player } from '../../models/player';

import { Container } from './styles';

const PlayersList: React.FC = () => {
    const { playersToPlay } = useContext(PlayerContext);

    return (
        <Container>
            {playersToPlay &&
                playersToPlay.length > 0 &&
                playersToPlay.map((player: Player, index) => (
                    <Text key={Math.random()}>
                        {index + 1}. {player.name}
                    </Text>
                ))}
        </Container>
    );
};

export default PlayersList;
