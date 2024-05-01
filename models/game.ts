import {Base} from "./base";
import {GameState} from "./gameState";
import {GameConfig} from "./gameConfig";
import {Player} from "./player";
import {Round} from "./round";
import {Card} from "./card";
import {GamePlayer} from "./gamePlayer";
import {Utils} from "../utils/utils";
import {Constants} from "../constants/constants";
import {RoundPlayer} from "./roundPlayer";
import {Chat, Message} from "./chat";

export class Game extends Base {

    _id: string | null = null;
    invitedPlayerIds: string[] = [];
    players: GamePlayer[] = [];
    status: GameState = new GameState(null);
    config: GameConfig = new GameConfig(null);
    rounds: Round[] = [];
    activePlayerId: string | null = null;

    constructor(c: any) {
        super();

        if (c) {
            this._id = c._id;
            if (c.invitedPlayerIds) {
                this.invitedPlayerIds = c.invitedPlayerIds;
            }
            this.players = [];
            this.config = new GameConfig(c.config);

            this.status = new GameState(c.status);
            this.players = [];
            if (c.players) {
                // @ts-ignore
                c.players.forEach((a) => {
                    this.players.push(new GamePlayer(a));
                })
            }
            this.rounds = [];
            if (c.rounds) {
                // @ts-ignore
                c.rounds.forEach((a) => {
                    this.rounds.push(new Round(a));
                })
            }

            this.activePlayerId = c.activePlayerId ? c.activePlayerId : null;
        }
    }

    addPlayer(player: GamePlayer) {
        if (player) {
            let check = this.getPlayerById(player.getPlayerId());
            if (check == null) {
                this.players.push(player);

                if (this.players.length == this.config.totalNumPlayers) {
                    this.startGame();
                }
            }
        }
    }

    startGame() {
        if (this.players.length == this.config.totalNumPlayers) {
            this.status.state = GameState.ACTIVE;
            this.newRound();
        }
    }

    getCurrentRound(): Round | null {
        let rVal: Round | null = null;

        try {
            if (this.rounds && this.rounds.length > 0) {
                rVal = this.rounds[this.rounds.length - 1];
            }
        } catch (e) {

        }

        return rVal;
    }

    placeBet(playerId: string, bet: number) {
        let currentRound = this.getCurrentRound();
        if (currentRound) {
            let player = currentRound.getPlayerById(playerId);
            if (player) {
                player.setBet(bet);
                // let message = new Message({
                //     text: player.user.displayName + ' bet ' + bet + ' ' + (bet == 1 ? 'point' : 'points')
                // })
                // Utils.sendMessage(this, message);
                let allPlaced = true;
                currentRound.players.forEach((p) => {
                  if (p.bet == null) {
                      allPlaced = false;
                  }
                })
                if (allPlaced) {
                    currentRound.state = Round.ACTIVE;
                }
                this.nextPlayerActive();
            }
        }
    }

    getActivePlayer(): RoundPlayer | null {
        let rVal: RoundPlayer | null = null;

        let currentRound = this.getCurrentRound();
        if (this.activePlayerId && currentRound) {
            rVal = currentRound.getPlayerById(this.activePlayerId);
        }

        return rVal;
    }

    isCPUsTurn(): boolean {
        let rVal = false;

        if (this.activePlayerId) {
            let player = this.getPlayerById(this.activePlayerId);
            if (player) {
                rVal = player.isCPU();
            }
        }

        return rVal;
    }

    playCard(card: Card): boolean {
        let rVal = false;
        let currentRound = this.getCurrentRound();
        if (currentRound && currentRound.isActive()) {
            currentRound.playCard(card);

            let color = currentRound.trumpCard ? currentRound.trumpCard.color : null;
            let winningCard = currentRound.getCurrentPoint()?.getCurrentlyWinningCard(color);
            if (winningCard) {
                if (card.playerId == winningCard.playerId) {
                    rVal = true;
                }
            }

            let currentPoint = currentRound.getCurrentPoint();
            if (currentPoint && !currentPoint.isComplete()) {
                this.nextPlayerActive();
            } else {
                this.activePlayerId = '';
            }
        }
        return rVal;
    }

    newRound() {
        let num = this.rounds ? this.rounds.length : 0;
        let ps: RoundPlayer[] = [];
        this.players.forEach((p) => {
            ps.push(p.newRoundPlayer());
        })

        let deck: Card[] = [];
        Constants.DECK.forEach((card) => {
            deck.push(new Card(card));
        })
        for (let i = 0; i <= num; i++) {
            ps.forEach((player) => {
                let indexToPull = Math.floor(Math.random() * deck.length - 1);
                let cards = deck.splice(indexToPull, 1);
                if (cards && cards.length > 0) {
                    let card = cards[0];
                    card.playerId = player.getPlayerId();
                    player.addCard(card);
                }
            })
        }

        let trumpCard: Card | null = null;
        let indexToPull = Math.floor(Math.random() * deck.length - 1);
        let card = deck.splice(indexToPull, 1);
        if (card && card.length > 0) {
            trumpCard = card[0];
        }

        let dealer = this.getPlayerByIndex(0);
        let lastRound = this.getCurrentRound();
        if (lastRound) {
            let lastDealer = this.getPlayerById(lastRound.dealingPlayerId!);
            if (lastDealer) {
                let index = lastDealer.index;
                index += 1;
                if (index >= this.players.length) {
                    index = 0;
                }
                dealer = this.getPlayerByIndex(index);
            }
        }

        let round = new Round({
            number: num,
            players: ps,
            deck: deck,
            trumpCard: trumpCard,
            dealingPlayerId: dealer!.getPlayerId()
        });

        round.newPoint();

        this.activePlayerId = dealer!.getPlayerId();
        this.nextPlayerActive();
        this.rounds.push(round);
    }

    getPlayerByIndex(index: number): GamePlayer | null {
        let rVal: GamePlayer | null = null;

        try {
            this.players.forEach((p) => {
                if (index == p.index) {
                    rVal = p;
                }
            })
        } catch (e) {

        }

        return  rVal;
    }

    nextPlayerActive() {
        let nextIndex = 0;
        this.players.forEach((player) => {
            if (player.getPlayerId() == this.activePlayerId) {
                nextIndex = player.index + 1;
            }
        })

        if (nextIndex >= this.players.length) {
            nextIndex = 0;
        }

        this.activePlayerId = this.getPlayerByIndex(nextIndex)!.getPlayerId();
    }

    finish() {
        if (this.status.isActive()) {
            this.status.state = GameState.COMPLETE;
        }
    }

    getPlayerById(id: string): GamePlayer | null {
        let rVal: GamePlayer | null = null;

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



    isFirstRound(): boolean {
        return this.rounds.length == 1;
    }

    isPlayersTurn(id: string) {
        return this.activePlayerId == id;
    }

    override toJSON(): any {
        let o =  super.toJSON();

        o.playerIds = [];
        o.players = [];
        this.players.forEach((player) => {
            o.players.push(player.toJSON());
            o.playerIds.push(player.getPlayerId());
        })

        o.status = this.status.toJSON();
        o.config = this.config.toJSON();
        o.rounds = [];
        this.rounds.forEach((round) => {
            o.rounds.push(round.toJSON());
        })



        return o;
    }
}