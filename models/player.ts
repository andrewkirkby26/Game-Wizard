import {Base} from "./base";
import {User} from "./user";

export class Player extends Base {

    user!: User;
    index: number = 0;
    score = 0;

    constructor(c: any) {
        super();

        if (c) {
            this.score = c.score;
            this.user = new User(c.user);
            this.index = c.index;
        }
    }

    override toJSON(): any {
        let o =  super.toJSON();

        o.user = this.user ? this.user.toJSON() : null;

        return o;
    }

    addScore(score: number) {
        this.score += score;
    }

    getPlayerId(): string {
        return (this.user && this.user._id) ? this.user._id : '';
    }

    isCPU(): boolean {
        return this.user.isCPU();
    }
}