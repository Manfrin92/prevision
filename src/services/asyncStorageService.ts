import AsyncStorage from '@react-native-async-storage/async-storage';

import { Player } from '../models/player';

const storageItemName = '@Prevision:players';

export const listOfRegisteredPlayersName = ['Joao', 'Jose', 'Ricardo'];

export const listOfRegisteredPlayers = [
    { name: 'Joao' },
    { name: 'Jose' },
    { name: 'Ricardo' },
    { name: 'Felipe' },
];

export async function getPlayersNamesInAsyncStorage(): Promise<string[] | []> {
    try {
        const allPlayers = await AsyncStorage.getItem(storageItemName);
        if (allPlayers) {
            const parsedStoragedPlayers: Player[] = JSON.parse(allPlayers);
            if (parsedStoragedPlayers && parsedStoragedPlayers.length > 0) {
                const listOfPlayerNames = [] as string[];
                parsedStoragedPlayers.map((player) =>
                    listOfPlayerNames.push(player.name)
                );
                return listOfPlayerNames;
            }
        }
    } catch (err) {
        // // console.log(err);
    }
    return [];
}

export async function getPlayersInAsyncStorage(): Promise<Player[] | null> {
    try {
        const allPlayers = await AsyncStorage.getItem(storageItemName);
        if (allPlayers) {
            const parsedStoragedPlayers = JSON.parse(allPlayers);
            return parsedStoragedPlayers;
        }
    } catch (err) {
        // // console.log(err);
    }
    return null;
}

export async function addPlayerInAsyncStorage(player: Player): Promise<void> {
    try {
        const allPlayers = await AsyncStorage.getItem(storageItemName);

        if (allPlayers) {
            let parsedStoragedAllPlayers: Player[] = JSON.parse(allPlayers);
            if (
                parsedStoragedAllPlayers &&
                parsedStoragedAllPlayers.length > 0
            ) {
                const foundPlayer = parsedStoragedAllPlayers.find(
                    (storagedPlayer: Player) =>
                        storagedPlayer.name === player.name
                );
                if (!foundPlayer) {
                    parsedStoragedAllPlayers = [
                        ...parsedStoragedAllPlayers,
                        player,
                    ];
                    await AsyncStorage.setItem(
                        storageItemName,
                        JSON.stringify(parsedStoragedAllPlayers)
                    );
                }
            }
            return;
        }
        await AsyncStorage.setItem(storageItemName, JSON.stringify([player]));
    } catch (e) {
        // e
    }
}

export async function removePlayerInAsyncStorage(): Promise<void> {
    try {
        await AsyncStorage.setItem(storageItemName, JSON.stringify([]));
    } catch (e) {
        // e
    }
}
