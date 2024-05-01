import {Base} from "./base";
import {Card} from "./card";
import {Point} from "./point";
import {RoundPlayer} from "./roundPlayer";
import {GamePlayer} from "./gamePlayer";

export class Round extends Base {

    static BETTING = 0;
    static ACTIVE = 1;
    static COMPLETE = 2;

    number = 0;
    players: RoundPlayer[] = [];
    deck: Card[] = [];
    dealingPlayerId: string | null = null;
    points: Point[] = [];
    trumpCard: Card | null = null;
    state = Round.BETTING;

    constructor(c: any) {
        super();
        if (c) {
            this.trumpCard = c.trumpCard ? new Card(c.trumpCard) : null;
            this.dealingPlayerId = c.dealingPlayerId ? c.dealingPlayerId : null;
            this.number = c.number;
            this.players = [];
            if (c.players) {
                //@ts-ignore
                c.players.forEach((player) => {
                   this.players.push(new RoundPlayer(player));
                })
            }

            this.deck = [];
            if (c.deck) {
                //@ts-ignore
                c.deck.forEach((card) => {
                    this.deck.push(new Card(card));
                })
            }

            this.points = [];
            if (c.points) {
                //@ts-ignore
                c.points.forEach((point) => {
                    this.points.push(new Point(point));
                })
            }

            this.state = c.state ? c.state : Round.BETTING;
        }
    }

    newPoint() {
        let number = this.points ? this.points.length : 0;
        let point = new Point({
            number: number
        })
        //Update playable cards
        this.players.forEach((player) => {
            player.hand.forEach((card) =>{
                card.playable = true;
            })
        })
        this.points.push(point);
    }

    getAvailableBets(isLast: boolean): number[]  {
        let rVal: number[] = [];
        let unavailable: number | null = null;

        let notTarget = this.number + 1;
        let currentBetTotal = 0;
        this.players.forEach((player) => {
            if (player.bet) {
                currentBetTotal += player.bet
            }
        })

        if (isLast){
            unavailable = notTarget - currentBetTotal;
        }

        let ranges = {
            min:0,
            unavailable: unavailable,
            max: notTarget
        }

        for (let i = ranges.min; i <= ranges.max; i++) {
            if (i != ranges.unavailable) {
                rVal.push(i);
            }
        }

        return rVal;
    }



    isLastPlayerToBet(id: string): boolean {
        let rVal = true;

        this.players.forEach((player) => {
            if (player.bet == null && player.getPlayerId() != id) {
                rVal = false;
            }
        })

        return rVal;
    }

    getCurrentPoint(): Point | null {
        let rVal: Point | null = null;

        if (this.points && this.points.length > 0) {
            rVal = this.points[this.points.length - 1];
        }

        return rVal;
    }

    isBetting(): boolean {
        return this.state == Round.BETTING;
    }

    isActive(): boolean {
        return this.state == Round.ACTIVE;
    }

    isComplete(): boolean {
        return this.state == Round.COMPLETE;
    }

    getPlayerById(id: string): RoundPlayer | null {
        let rVal: RoundPlayer | null = null;

        try {
            this.players.forEach((p) => {
                if (id == p.getPlayerId()) {
                    rVal = p;
                }
            })
        } catch (e) {

        }

        return  rVal;
    }

    playCard(card: Card) {
        let currentPoint = this.getCurrentPoint();
        let trumpColor = this.trumpCard ? this.trumpCard.color : null;

        if (currentPoint && currentPoint.isActive()) {
            if (card && card.playerId) {
                let player = this.getPlayerById(card.playerId);

                if (player) {
                    let indexToRemove = -1;
                    player.hand.forEach((hC, index) => {
                        if (hC.color == card.color && hC.value == card.value) {
                            indexToRemove = index;
                        }
                    })
                    player.hand.splice(indexToRemove, 1);
                }
            }

            currentPoint.playCard(card);
            if (currentPoint.playedCards.length == this.players.length) {
                currentPoint.finish(trumpColor);
            }

            if (!currentPoint.isComplete()) {
                //Update playable cards
                let pointColor = currentPoint.pointColor;
                this.players.forEach((player) => {
                    //Reset all cards
                    player.hand.forEach((card) => {
                        if (card.isNumber()) {
                            card.playable = false;
                        } else {
                            card.playable = true;
                        }
                    })

                    let pointColorCards: Card[] = [];
                    if (pointColor) {
                        pointColorCards = player.getCardsFromHandForColor(pointColor);
                    }

                    let availableCardsToPlay = pointColorCards.length > 0 ? pointColorCards : player.hand;
                    availableCardsToPlay.forEach((card) => {
                        card.playable = true;
                    })
                })
            }
        }
    }

    numPointsPlayerWon(id: string): number {
        let rVal = 0;

        this.points.forEach((point) => {
            if (point.winningPlayerId == id) {
                rVal += 1;
            }
        })

        return rVal;
    }

    getDiscard(): Card[] {
        let discard: Card[] = [];

        this.points.forEach((point) => {
            if (point.isComplete()) {
                discard = discard.concat(point.playedCards);
            }
        })

        return discard;
    }

    override toJSON(): any {
        let o =  super.toJSON();

        o.players = [];
        this.players.forEach((player) => {
            o.players.push(player.toJSON());
        })

        o.deck = [];
        this.deck.forEach((a) => {
            o.deck.push(a.toJSON());
        })

        o.points = [];
        this.points.forEach((a) => {
            o.points.push(a.toJSON());
        })

        o.trumpCard = this.trumpCard ? this.trumpCard.toJSON() : null;

        return o;
    }
}