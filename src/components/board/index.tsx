import React from 'react';
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Container } from './styles';
import { useState } from 'react';

const Board: React.FC = () => {
    const [shouldShowDeleteIcon, setShouldShowDeleteIcon] = useState(false);

    const toggleDone = useCallback((id: number | string) => {
        console.log('father, id: ', id);
    }, []);

    return (
        <Container>
            <View style={{ flexDirection: 'row' }}>
                <Text
                    onLongPress={() =>
                        setShouldShowDeleteIcon(!shouldShowDeleteIcon)
                    }
                    style={{
                        color: '#232023',
                        fontSize: 22,
                        fontWeight: '600',
                    }}
                >
                    Olar
                </Text>

                {shouldShowDeleteIcon && (
                    <TouchableOpacity>
                        <Feather
                            style={{ marginLeft: 12, marginTop: 3 }}
                            name='trash-2'
                            size={22}
                            color='black'
                        />
                    </TouchableOpacity>
                )}
            </View>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={{ marginLeft: 32, color: '#232023' }}>
                        May{' '}
                    </Text>
                    <Text style={{ color: '#232023' }}>Jun </Text>
                    <Text style={{ marginRight: 32, color: '#232023' }}>
                        Jul
                    </Text>
                </View>
                <ScrollView
                    horizontal={true}
                    style={{
                        borderColor: 'black',
                        borderWidth: 2,
                        padding: 4,
                    }}
                >
                    <View
                        style={{
                            maxHeight: 340,
                            flexWrap: 'wrap',
                            paddingRight: 24,
                        }}
                    >
                        <Text> Olar</Text>
                    </View>
                </ScrollView>
            </View>
        </Container>
    );
};

export default Board;
