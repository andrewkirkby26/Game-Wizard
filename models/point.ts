import {Base} from "./base";
import {Card} from "./card";

export class Point extends Base {

    static ACTIVE = 0;
    static COMPLETE = 1;

    number = 0;
    pointColor: string | null = null;
    winningPlayerId: string | null = null;
    playedCards: Card[] = [];
    state = Point.ACTIVE;

    constructor(c: any) {
        super();
        if (c) {
            this.number = c.number;
            this.winningPlayerId = c.winningPlayerId ? c.winningPlayerId : null;
            this.pointColor = c.pointColor ? c.pointColor : null;
            this.state = c.state ? c.state : Point.ACTIVE;
            this.playedCards = [];
            if (c.playedCards) {
                //@ts-ignore
                c.playedCards.forEach((card) => {
                    this.playedCards.push(new Card(card));
                })
            }
        }
    }

    isComplete(): boolean {
        return this.state == Point.COMPLETE;
    }

    isActive(): boolean {
        return this.state == Point.ACTIVE;
    }

    playCard(card: Card) {
        if (this.pointColor == null && !card.isNAN()) {
            if (card.isWizard()) {
                this.pointColor = Card.COLOR_ANY;
            } else {
                this.pointColor = card.color;
            }
        }
        this.playedCards.push(card);
    }

    finish(trumpColor: string | null) {
        let winningCard = this.getCurrentlyWinningCard(trumpColor);

        if (winningCard != null) {
            //@ts-ignore
            this.winningPlayerId = winningCard.playerId;
        }

        this.state = Point.COMPLETE;
    }

    getCurrentlyWinningCard(trumpColor: string | null): Card | null {
        let winningCard: Card | null = null;
        let playedCards = this.playedCards;
        let pointColor = this.pointColor;
        playedCards.forEach((card) => {
            let isTrumpColor = card.isColor(trumpColor);
            let isPointColor = card.isColor(pointColor);

            let winningIsTrump = winningCard ? winningCard.isColor(trumpColor) : false;
            let winningIsPoint = winningCard ? winningCard.isColor(pointColor) : false;
            let winningIsWizard = winningCard ? winningCard.isWizard() : false;

            if (!card.isNAN()) {
                if (!winningCard) {
                    winningCard = card;
                } else if (card.isWizard()) {
                    if (!winningIsWizard) {
                        winningCard = card;
                    }
                } else if (isTrumpColor) {
                    if (!winningIsWizard) {
                        if (winningIsTrump) {
                            if (card.value > winningCard.value) {
                                winningCard = card;
                            }
                        } else {
                            winningCard = card;
                        }
                    }
                } else if (isPointColor) {
                    if (!winningIsTrump && !winningIsWizard) {
                        if (winningIsPoint) {
                            if (card.value > winningCard.value) {
                                winningCard = card;
                            }
                        } else {
                            winningCard = card;
                        }
                    }
                }
            }
        })
        return winningCard;
    }

    override toJSON(): any {
        let o =  super.toJSON();

        o.playedCards = [];
        this.playedCards.forEach((a) => {
            o.playedCards.push(a.toJSON());
        })

        return o;
    }
}