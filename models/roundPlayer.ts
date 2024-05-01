import {User} from "./user";
import {Card} from "./card";
import {Player} from "./player";

export class RoundPlayer extends Player {

    hand: Card[] = [];
    bet : number | null = null;

    constructor(c: any) {
        super(c);

        if (c) {
            this.bet = c.bet;
            this.hand = [];
            if (c.hand) {
                // @ts-ignore
                c.hand.forEach((a) => {
                    this.hand.push(new Card(a));
                })
            }
        }
    }

    override toJSON(): any {
        let o =  super.toJSON();
        o.hand = [];
        if (this.hand) {
            // @ts-ignore
            this.hand.forEach((a) => {
                o.hand.push(a.toJSON());
            })
        }

        return o;
    }

    getBet(): number  | null{
        return this.bet;
    }

    setBet(bet: number) {
        this.bet = bet;
    }

    getCardsFromHandForColor(color: string | null): Card[] {
        let rVal: Card[] = [];

        this.hand.forEach((card) => {
          if (card.color == color || color == null || color == Card.COLOR_ANY) {
              rVal.push(card);
          }
        })

        return rVal
    }

    getCardsFromHandForValue(num: number): Card[] {
        let rVal: Card[] = [];

        this.hand.forEach((card) => {
            if (card.value == num) {
                rVal.push(card);
            }
        })

        return rVal
    }

    getCardsFromHandGreaterThanValueOrEqual(num: number): Card[] {
        let rVal: Card[] = [];

        this.hand.forEach((card) => {
            if (card.value >= num) {
                rVal.push(card);
            }
        })

        return rVal
    }

    addCard(card: Card) {
        this.hand.push(card);
    }
}