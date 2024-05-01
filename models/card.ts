import {Base} from "./base";

export class Card extends Base {

    static WIZARD = 14;
    static NAN = 0;

    static COLOR_ANY = 'ANY';
    static COLOR_GREEN = 'Green';
    static COLOR_YELLOW = 'Yellow';
    static COLOR_RED = 'Red';
    static COLOR_BLUE = 'Blue';

    static ALL_COLORS = [
        Card.COLOR_YELLOW,
        Card.COLOR_RED,
        Card.COLOR_GREEN,
        Card.COLOR_BLUE
    ]

    color: string | null = null;
    value: number = 0;
    playerId: string | null = null;
    playable = false;

    constructor(c: any) {
        super();

        if (c) {
            this.color = c.color ? c.color : null;
            this.playerId = c.playerId ? c.playerId : null;
            this.value = c.value;
            this.playable = c.playable ? c.playable : false;
        }
    }

    isWizard(): boolean {
        return this.value == Card.WIZARD;
    }

    isNAN(): boolean {
        return this.value == Card.NAN;
    }

    isNumber(): boolean {
        return !this.isNAN() && !this.isWizard();
    }

    isColor(color: string | null): boolean {
        return (color && this.color) ? color == this.color : false;
    }

    isPlayable(): boolean {
        return this.playable;
    }
}
