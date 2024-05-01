import {Card} from "../models/card";
import {Utils} from "../utils/utils";
import {Game} from "../models/game";
import {Message} from "../models/chat";

export class CPULogic {

    static HIT_BID = ["SCOREEEEE", "It's too easy", "Are you trying?", "Sorry not sorry", "Keep em' coming"];
    static WINS_POINT_WANTED = ["I'll take this one", "Did you want that?", "One point good guys", "Keep em' coming"]
    static WINS_POINT_NOT_WANTED = ["Damn it!", "Scheisse!" , "Uggghh", "Fuck", "Golleyy"];

    static handleCPUBet(game: Game, after: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) {
        let currentRound = game.getCurrentRound()!;
        let currentPoint = currentRound.getCurrentPoint()!;
        let id = game._id!;
        let trumpCard = currentRound.trumpCard;
        let player = game.getActivePlayer()!;

        let availBets = currentRound.getAvailableBets(currentRound.isLastPlayerToBet(player.getPlayerId()));
        console.log(id + ' available bets ', availBets);
        if (availBets.length > 0 && trumpCard) {
            let numTrump = trumpCard.color ? player.getCardsFromHandForColor(trumpCard.color).length : 0;
            let numWizards = player.getCardsFromHandForValue(Card.WIZARD).length;
            let numHighValueCards = 0;
            player.getCardsFromHandGreaterThanValueOrEqual(12).forEach((c) => {
                if (!c.isWizard() && !c.isColor(trumpCard!.color)) {
                    numHighValueCards++;
                }
            })

            let bet = availBets[0];
            console.log('trump cards in hand: ' + numTrump, ', wizards in hand: ' + numWizards, ', high value in hand: ' + numHighValueCards);
            availBets.forEach((potBet) => {
                if (potBet <= (numTrump + numWizards + numHighValueCards)) {
                    bet = potBet;
                }
            })
            console.log(id + ' betting ' + bet);

            game?.placeBet(player.getPlayerId(), bet);
            return Utils.saveAfterDelay(after, game);
        }
    }

    static handlePointCompleteMessages(game: Game) {
        let currentRound = game.getCurrentRound()!;
        let currentPoint = currentRound.getCurrentPoint()!;
        let id = game._id!;
        let trumpCard = currentRound.trumpCard;
        let color = trumpCard ? trumpCard.color : null;
        let winningCard = currentPoint.getCurrentlyWinningCard(color);

        if (winningCard) {
            let player = currentRound.getPlayerById(winningCard.playerId!)!;
            if (player.isCPU()) {
                let pointsWon = currentRound!.numPointsPlayerWon(player.getPlayerId());
                let text = '';
                if (pointsWon <= player.bet!) {
                    text = CPULogic.WINS_POINT_WANTED[Math.floor(Math.random() * (CPULogic.WINS_POINT_WANTED.length - 1))]
                } else {
                    text = CPULogic.WINS_POINT_NOT_WANTED[Math.floor(Math.random() * (CPULogic.WINS_POINT_NOT_WANTED.length - 1))]
                }

                let message = new Message({
                    text: text,
                    authorUserId: player.getPlayerId()
                })
                Utils.sendMessage(game, message)
            }
        }
    }

    static handleCPUCard(game: Game, after: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) {
        let currentRound = game.getCurrentRound()!;
        let currentPoint = currentRound.getCurrentPoint()!;
        let id = game._id!;
        let trumpCard = currentRound.trumpCard;
        let player = game.getActivePlayer()!;

        let availCards: Card[] = [];
        player.hand.forEach((card) => {
            if (card.playable) {
                availCards.push(card);
            }
        })

        console.log(id + ' available cards to play ', availCards);

        if (availCards.length > 0) {
            let cardToPlay = availCards[0];
            let isWinningCard = game.playCard(cardToPlay);
            let pointsWon = currentRound!.numPointsPlayerWon(player.getPlayerId());
            if (isWinningCard) {
                let text = ''
                if (pointsWon <= player.bet!) {
                    if (cardToPlay.isWizard()) {
                        let message = new Message({
                            text: "Hold this for me",
                            authorUserId: player.getPlayerId()
                        })
                        Utils.sendMessage(game, message)
                    }
                }
            }
            return Utils.saveAfterDelay(after, game);
        }
    }

    static handleCPUTrumpColor(game: Game, after: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) {
        let currentRound = game.getCurrentRound()!;
        let currentPoint = currentRound.getCurrentPoint()!;
        let id = game._id!;
        let trumpCard = currentRound.trumpCard;
        let player = game.getActivePlayer()!;
        let hand = currentRound.getPlayerById(player.getPlayerId())?.hand!;

        let mostColors = {
            "Red": 0,
            "Green": 0,
            "Blue": 0,
            "Yellow": 0
        }
        hand.forEach((c) => {
            if (c.color) {
                // @ts-ignore
                mostColors[c.color] += 1;
            }
        })
        let most = "Red";
        Object.keys(mostColors).forEach((key) => {
            // @ts-ignore
            let val = mostColors[key];
            // @ts-ignore
            if (val > mostColors[most]) {
                most = key;
            }
        })
        let message = new Message({
            text: player.user.displayName + ' picked ' + most + ' as the trump color'
        })
        Utils.sendMessage(game!, message);
        currentRound.trumpCard!.color = most;
        return Utils.saveAfterDelay(after, game);
    }
}