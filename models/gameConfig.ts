import {Base} from "./base";

export class GameConfig extends Base {

    name = 'Wizard Game';
    totalNumPlayers = 3;

    constructor(c: any) {
        super();
        if (c) {
            if (c.name) {
                this.name = c.name;
            }
            this.totalNumPlayers = c.totalNumPlayers;
        }
    }

    getTotalNumRounds(): number {
        let rVal = 20;

        if (this.totalNumPlayers == 4) {
            rVal = 15;
        } else if (this.totalNumPlayers == 5) {
            rVal = 12;
        } else if (this.totalNumPlayers == 6) {
            rVal = 10;
        }

        return rVal;
    }
}