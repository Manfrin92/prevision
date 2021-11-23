const deckSize = 54 * 2;

export function getMaximumNumberOfRounds(numberOfPlayers: number): string {
    return (deckSize / numberOfPlayers).toFixed(0);
}
