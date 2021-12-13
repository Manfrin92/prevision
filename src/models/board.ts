export interface IGameBoardPoints {
    playerName: string;
    rounds: IRound[];
}

export interface IRound {
    order: number;
    valueChosen: number;
    didScored: boolean;
    touched: boolean;
}
