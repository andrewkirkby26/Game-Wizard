import {
     onDocumentWritten,
} from "firebase-functions/v2/firestore";
import {Game} from "../../models/game";
import {Card} from "../../models/card";
import {Utils} from "../../utils/utils";
import {Round} from "../../models/round";
import {Constants} from "../../constants/constants";
import {Message} from "../../models/chat";
import {CPULogic} from "../../logic/CPULogic";

//This function is called everytime a game is created, updated and deleted... so oldGame and game may be null depending on which event is called

////////////////////////////////////
// **** NOTE *****
// This function runs when a document is saved... it also saves documents...
// To keep the cost free, please for all that is holy ensure we do NOT have infinite loops
////////////////////////////////////
//@ts-ignore

exports.gameUpdated = onDocumentWritten("Games/{gameID}", (event) => {
    if (event && event.data) {
        let after = event.data.after;
        let oldGame : Game | null =  event.data.before.data() ? new Game(event.data.before.data()) : null;
        let game: Game | null = after.data() ? new Game(after.data()) : null;

        //Game was either created or updated
        if (game != null) {
            if (oldGame && after) {
                event.data.after.data()!.chat = null;
                event.data.before.data()!.chat = null;
                let justChat = event.data.after.isEqual(event.data.before)
                console.log(justChat)
            }

            let id =  game._id;
            console.log('Game Updated ID: ' + id);
            let updated = oldGame != null;

            let currentRound = game.getCurrentRound();
            if (currentRound) {
                if (currentRound.isComplete()) {
                    let totalNumRounds = game.config.getTotalNumRounds();
                    if (currentRound.number + 1 == totalNumRounds) {
                        game.finish();
                        return Utils.saveAfterDelay(after, game)
                    } else {
                        currentRound.players.forEach((roundPlayer) => {
                            let gamePlayer = game!.getPlayerById(roundPlayer.getPlayerId());

                            if (gamePlayer) {
                                gamePlayer.addScore(roundPlayer.score);
                            }
                        })

                        let order = game.players.sort(Utils.sortByProperty('score'));

                        order.forEach((p, index) => {
                            let player = game!.getPlayerById(p.getPlayerId());
                            if (player) {
                                player.place = index;
                            }
                        })

                        game.newRound();
                        return Utils.saveAfterDelay(after, game)
                    }
                } else {
                    let currentPoint = currentRound.getCurrentPoint();
                    if (currentPoint) {
                        if (currentPoint.isComplete()) {
                            let winningPlayer = currentRound.getPlayerById(currentPoint.winningPlayerId!);
                            if (winningPlayer){
                                let message = new Message({
                                    text: winningPlayer.user.displayName + ' won the point!'
                                })
                                Utils.sendMessage(game, message);

                                CPULogic.handlePointCompleteMessages(game);
                            }

                            if (currentPoint.number == currentRound.number) {
                                currentRound.players.forEach((player) => {
                                    let points = 0;
                                    let bet = player.bet;
                                    let pointsWon = currentRound!.numPointsPlayerWon(player.getPlayerId());
                                    let delta = Math.abs(bet! - pointsWon);
                                    let text = '';
                                    if (delta == 0) {
                                        points += 2;
                                        points += bet!;
                                        text = 'made their bet and gained ' + (points * 10) + ' points';

                                        if (player.isCPU()) {
                                            let diss = new Message({
                                                text: CPULogic.HIT_BID[Math.floor(Math.random() * (CPULogic.HIT_BID.length - 1))],
                                                authorUserId: player.getPlayerId()
                                            })
                                            Utils.sendMessage(game!, diss);
                                        }
                                    } else {
                                        points -= delta;
                                        text = 'missed their bet and lost ' + (points * -10) + ' points';
                                    }

                                    player.score = points * 10;
                                    let message = new Message({
                                        text: player.user.displayName + ' ' + text
                                    })
                                    Utils.sendMessage(game!, message);
                                })

                                currentRound.state  = Round.COMPLETE;
                                return Utils.saveAfterDelay(after, game)
                            } else {
                                game.activePlayerId = currentPoint.winningPlayerId;
                                currentRound.newPoint();
                                return Utils.saveAfterDelay(after, game)
                            }
                        }
                    }
                }
            }

            if (game.isCPUsTurn()) {
                console.log(id + ' is CPU Turn');
                let player = game.getActivePlayer();
                if (player) {
                    if (game.status.isActive()) {
                        console.log(id + ' active playerID ' + player.getPlayerId());

                        let currentRound = game.getCurrentRound();
                        let currentPoint = currentRound?.getCurrentPoint();
                        if (currentRound) {
                            let trumpCard = currentRound.trumpCard;
                            let hand = currentRound.getPlayerById(player.getPlayerId())?.hand;
                            if (currentPoint && hand && trumpCard?.isWizard() && trumpCard.color == null && currentPoint.playedCards.length == 0) {
                                console.log(id + ' CPU needs to select trump color')
                                return CPULogic.handleCPUTrumpColor(game, after);
                            } else if (currentRound.isBetting()) {
                                console.log(id + ' CPU needs to bet');
                                return CPULogic.handleCPUBet(game, after);
                            } else if (currentRound.isActive()) {
                                console.log(id + ' CPU needs to play a card');
                                return CPULogic.handleCPUCard(game, after);
                            }
                        }
                    }
                }
            } else {
                console.log(id + ' no work to do')
            }
        } else {
            //Game was deleted... don't need to do anything
            console.log('Game deleted ID: ' + oldGame?._id);
        }
    }
});

