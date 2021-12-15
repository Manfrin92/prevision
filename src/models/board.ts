export interface IGameBoardPoints {
    playerName: string;
    rounds: IRound[];
    totalPoints: number;
}

export interface IRound {
    order: number;
    valueChosen: number;
    didScored: boolean;
    touched: boolean;
}

export interface IRanking {
    sumOfPoints: number;
    playerName: string;
}
