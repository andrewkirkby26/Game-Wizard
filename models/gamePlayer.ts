import {Base} from "./base";
import {User} from "./user";
import {Card} from "./card";
import {Player} from "./player";
import {RoundPlayer} from "./roundPlayer";

export class GamePlayer extends Player {

    place = 0;

    constructor(c: any) {
        super(c);

        if (c) {
            this.place = c.place != null ? c.place : 0;
        }
    }

    override toJSON(): any {
        let o =  super.toJSON();

        return o;
    }

    newRoundPlayer(): RoundPlayer {
        let o: any = Object.assign({}, this);

        return new RoundPlayer(o);
    }
}