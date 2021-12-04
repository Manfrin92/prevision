import AsyncStorage from '@react-native-async-storage/async-storage';

import { Player } from '../models/player';

const storageItemName = '@Prevision:players';

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

export async function removeAllPlayersInAsyncStorage(): Promise<void> {
    try {
        await AsyncStorage.setItem(storageItemName, JSON.stringify([]));
    } catch (e) {
        // e
    }
}

async function addPlayerListInAsyncStorage(
    playerList: Player[]
): Promise<void> {
    await AsyncStorage.setItem(storageItemName, JSON.stringify(playerList));
}

export async function removePlayerInAsyncStorage(
    playerName: string
): Promise<void> {
    try {
        const allPlayers = await getPlayersInAsyncStorage();
        if (allPlayers) {
            const filteredListOfPlayers = allPlayers.filter(
                (player) => player.name !== playerName
            );
            await addPlayerListInAsyncStorage(filteredListOfPlayers);
        }
    } catch (e) {
        // e
    }
}
