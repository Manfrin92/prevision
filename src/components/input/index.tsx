import React, { useRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
    setPlayerName(playerName: string): void;
}

const Input: React.FC<InputProps> = ({ setPlayerName, ...rest }) => {
    const inputElementRef = useRef<any>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, [isFocused, setIsFocused]);

    return (
        <Container isFocused={isFocused} isErrored={false}>
            <TextInput
                ref={inputElementRef}
                keyboardAppearance='dark'
                placeholderTextColor='#f5ebe0'
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={(value) => {
                    setPlayerName(value);
                }}
                {...rest}
            />
        </Container>
    );
};

export default Input;
