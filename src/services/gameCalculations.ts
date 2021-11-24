const deckSize = 54 * 2;
const minimumNumberOfRounds = 5;
const minimumNumberOfPlayers = 3;

export function getMaximumNumberOfRounds(numberOfPlayers: number): string {
    return (deckSize / numberOfPlayers).toFixed(0);
}

export function canInitiateGame(numberOfPlayers: number): boolean {
    const maxNumberOfRounds = getMaximumNumberOfRounds(numberOfPlayers);
    if (Number(maxNumberOfRounds) < minimumNumberOfRounds) {
        return false;
    }
    if (numberOfPlayers < minimumNumberOfPlayers) {
        return false;
    }
    return true;
}
