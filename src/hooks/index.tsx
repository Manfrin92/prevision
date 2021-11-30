import React from 'react';
import { PlayerProvider } from './playerContext';

const AppProvider: React.FC = ({ children }) => (
    <PlayerProvider>{children}</PlayerProvider>
);

export default AppProvider;
