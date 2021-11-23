import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    width: 100%;
    height: 40px;
    background-color: orange;
    border-radius: 10px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
`;
export const ButtonText = styled.Text`
    color: black;
    font-size: 16px;
`;
