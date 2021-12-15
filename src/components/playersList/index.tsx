import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PlayerContext from '../../hooks/playerContext';
import { Player } from '../../models/player';

import { Container } from './styles';

const PlayersList: React.FC = () => {
    const { playersToPlay, handleRemovePlayerFromGame } =
        useContext(PlayerContext);

    return (
        <Container>
            {playersToPlay &&
                playersToPlay.length > 0 &&
                playersToPlay.map((player: Player, index) => (
                    <View
                        style={{
                            padding: 8,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        key={Math.random()}
                    >
                        <Text>
                            {index + 1}. {player.name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => handleRemovePlayerFromGame(player)}
                        >
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
        </Container>
    );
};

export default PlayersList;
