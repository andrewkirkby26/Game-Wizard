import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {collection, query, where, onSnapshot, getDocs, setDoc, doc, addDoc} from "firebase/firestore";
import {Constants} from '../../../../constants/constants';
import {EventService} from './event.service';
import {FirestoreService} from "../firebase/firestore.service";
import { or, and} from "firebase/firestore";
import {Utils} from "../../../../utils/utils";
import {FirebaseService} from "../firebase/firebase.service";
import {AuthenticationService} from "./authentication.service";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import {Game} from "../../../../models/game";
import {GameState} from "../../../../models/gameState";
import {GamePlayer} from "../../../../models/gamePlayer";
import {Message} from "../../../../models/chat";

@Injectable({
  providedIn: 'root',
})
export class GameService {

  currentGame: Game | null = null;
  gamesPlaying: Game[] = [];
  gamesInvitedTo: Game[] = [];
  @Output() invitesUpdated: EventEmitter<Game[]> = new EventEmitter();

  @Output() gamesUpdated: EventEmitter<Game[]> = new EventEmitter();
  unsubChat: Unsubscribe | null = null;
  currentMessages: Message[] = [];

  constructor(public http: HttpClient, public eventService: EventService, public firebaseService: FirebaseService, public firestoreService: FirestoreService,
              public authenticationService: AuthenticationService) {

    this.eventService.userLoggedIn.subscribe(resp => {
      if (this.authenticationService.user) {
        let unsub1 = this.monitorInvitedToByUserId(this.authenticationService.user._id!, this.invitesUpdated);
        let unsub2 = this.monitorByUserId(this.authenticationService.user._id!, this.gamesUpdated);
      }

      this.invitesUpdated.subscribe((games) => {
        this.gamesInvitedTo = games;
      })

      this.gamesUpdated.subscribe((games) => {
        this.gamesPlaying = games;
        if (this.currentGame) {
          this.gamesPlaying.forEach((g) => {
            if (g._id == this.currentGame?._id) {
              this.currentGame = g;
              this.eventService.currentGameUpdated.emit();
            }
          })
        }
      })
    })
  }

  selectGame(game: Game | null) {
    this.currentGame = game;
    if (this.unsubChat != null) {
      this.unsubChat();
    }
    if (game) {
      const q = query(collection(this.firestoreService.db, Constants.COLLECTION_GAMES, game._id!, 'messages'));
      this.unsubChat = onSnapshot(q, (querySnapshot) => {
        let rVal: Message[] = [];
        querySnapshot.forEach((doc) => {
          let g = new Message(doc.data());

          rVal.push(g);
        });
        this.currentMessages = rVal;
      });
    } else {
      this.currentMessages = [];
    }
  }

  async acceptGameInvite(gameId: string, player: GamePlayer) {
    return this.findById(gameId).then((g) => {
      if (g) {
        let game = new Game(g);
        game.addPlayer(player);
        return this.save(game);
      }
      return null;
    })
  }

  async save(game: Game): Promise<Game> {
    if (!game._id || game._id == '') {
      game._id = Utils.createId(16);
    }
    let g = game.toJSON();
    console.log(g)
    return this.firestoreService.setDocument(Constants.COLLECTION_GAMES, g._id!, g).then(ref => {
      return game;
    })
  }

  async removeById(id: string): Promise<null> {
    if (id) {
      return this.firestoreService.deleteDocumentByCollectionAndName(Constants.COLLECTION_GAMES, id).then(ref => {
        return null;
      })
    } else {
      return null;
    }
  }

  async findById(id: string): Promise<Game | null> {
    return this.firestoreService.getDocumentByCollectionAndName(Constants.COLLECTION_GAMES, id).then(async elem => {
      let rVal: Game | null = null;
      if (elem) {
        rVal = new Game(elem);
      }
      return rVal;
    });
  }

  monitorInvitedToByUserId(userId: string, eventEmitter: EventEmitter<Game[]>): Unsubscribe {
    const q = query(collection(this.firestoreService.db, Constants.COLLECTION_GAMES),and(where("invitedPlayerIds", "array-contains", userId), where("status.state", "==", GameState.PREPARING)));
    return onSnapshot(q, (querySnapshot) => {
      let rVal: Game[] = [];
      querySnapshot.forEach((doc) => {
        rVal.push(new Game(doc.data()));
      });
      // @ts-ignore
      eventEmitter.emit(rVal);
    });
  }

  saveCurrentGame() {
    if (this.currentGame) {
      this.save(this.currentGame)
    }
  }

  async sendMessage(message: Message) {
    if (this.currentGame) {
      addDoc(collection(this.firestoreService.db, Constants.COLLECTION_GAMES, this.currentGame._id!, 'messages'), message.toJSON());
      // this.currentGame.chat.messages.push(message);
      // this.saveCurrentGame()
    }
  }

  monitorByUserId(userId: string, eventEmitter: EventEmitter<Game[]>): Unsubscribe {

    const q = query(collection(this.firestoreService.db, Constants.COLLECTION_GAMES),and(where("playerIds", "array-contains", userId), where("status.state", "!=", GameState.COMPLETE)));
    return onSnapshot(q, (querySnapshot) => {
      let rVal: Game[] = [];
      querySnapshot.forEach((doc) => {
        let g = new Game(doc.data());

        rVal.push(g);
      });
      // @ts-ignore
      eventEmitter.emit(rVal);
    });
  }
}


