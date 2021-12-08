import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/button';

import PlayerContext from '../../hooks/playerContext';

import { Title } from './styles';

const Board: React.FC = () => {
    const { maximumNumberOfRounds, playersToPlay } = useContext(PlayerContext);
    const listOfPossibleNumbers = ['10', '11', '12', '13', '14'];
    const [selectedNumber, setSelectedNumber] = useState(`10`);

    const handleSelectingNumber = useCallback(
        (selectedNumber: string) => {
            setSelectedNumber(selectedNumber);
            console.log('selectedNumber: ', selectedNumber);
        },
        [selectedNumber, setSelectedNumber]
    );

    useEffect(() => {}, []);

    return (
        <ScrollView
            style={{
                paddingRight: '6%',
                paddingLeft: '6%',
                marginTop: '16%',
            }}
        >
            <Title>Tabela de pontos</Title>

            <ScrollView horizontal={true}>
                <View>
                    <Text style={{ fontSize: 18 }}>João</Text>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                </View>
                <View>
                    <Text style={{ fontSize: 18 }}>João</Text>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                </View>
                <View>
                    <Text style={{ fontSize: 18 }}>João</Text>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                </View>
                <View>
                    <Text style={{ fontSize: 18 }}>João</Text>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                </View>
                <View>
                    <Text style={{ fontSize: 18 }}>João</Text>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                </View>
                <View>
                    <Text style={{ fontSize: 18 }}>João</Text>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                    <Picker
                        style={{ width: 94 }}
                        selectedValue={selectedNumber}
                        onValueChange={(selectedNumber) => {
                            handleSelectingNumber(`${selectedNumber}`);
                        }}
                    >
                        {listOfPossibleNumbers.map((number) => (
                            <Picker.Item
                                key={number}
                                label={`${number}`}
                                value={number}
                            />
                        ))}
                    </Picker>
                </View>
            </ScrollView>
            <Title>Ranking</Title>
            <Title>Ranking</Title>
            <Button onPress={() => {}}>Finalizar Jogo</Button>
        </ScrollView>
    );
};

export default Board;
