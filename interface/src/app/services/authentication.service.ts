import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {Constants} from '../../../../constants/constants';
import {EventService} from './event.service';
import { getAuth, Auth, signInWithRedirect,GoogleAuthProvider,signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import {User} from '../../../../models/user';
import {Snackbar} from "../interfaces/snackbar";
import {FirestoreService} from "../firebase/firestore.service";
import {where, or} from "firebase/firestore";
import {FirebaseService} from "../firebase/firebase.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  auth: Auth;
  provider = new GoogleAuthProvider();
  /** Variable used to ensure service goes after correct REST endpoing */
  endpoint!: string;
  changeUser: User | null = null;
  /** Variable that is equal to currently active user (null if not logged in) */
  user: User | null = null;
  /** Boolean depicting if the service is initialized successfully yet */
  initialized = false;
  /** Variable that is a string if there is an error upon trying to confirm that we need to show the user (null if no error) */
  confirmationError: string | null = null;
  /** Boolean depicting whether we are trying to confirm the user access level currently */
  attemptingToConfirm = false;
  userApprovedForUse = false;
  firstCheck = true;
  allUsers: User[] = [];

  userLevels = [
    Constants.USER_LEVEL_USER,
    Constants.USER_LEVEL_ADMIN
  ]

  /** Event emitter that can be used to logout the user (event may be null) */
  @Output() logoutReq: EventEmitter<any> = new EventEmitter();
  /** Event emitter that can be monitored to see when this service is initialized */
  @Output() initializedNoti: EventEmitter<any> = new EventEmitter();

  constructor(public http: HttpClient, public eventService: EventService, public firebaseService: FirebaseService, public firestoreService: FirestoreService) {
    this.auth = getAuth(firebaseService.app);


    onAuthStateChanged(this.auth, (user) => {
      if (user) {
          this.initialized = true;
          this.aggregate(user).then(compiledUser => {
            this.user = compiledUser;
            this.eventService.userLoggedIn.emit(this.user);
            if (this.firstCheck) {
              this.firstCheck = false;
              this.userApprovedForUse = true;
            } else {
              setTimeout(() => {
                this.userApprovedForUse = true;
              },500);
            }
            let snackBar = new Snackbar('Welcome back ' + this.user.firstName + '!', null, null, Constants.SNACKBAR_GOOD);
            this.eventService.showSnackBar.emit(snackBar);
            this.updateAllUsers();

          });
      } else {
        this.initialized = true;
        this.user = null;
        this.changeUser = null;
        this.eventService.userLoggedOut.emit();
      }
    });

    this.eventService.logoutReq.subscribe(resp => {
      this.logout();
    })
  }

  async aggregate(user: any): Promise<User> {
    let rVal = new User(user);
    // @ts-ignore
    return this.firestoreService.queryForDocuments(Constants.COLLECTION_USERS, where("email", "==", user.email)).then(elem => {
      if (elem && elem.length > 0) {
        rVal._id = elem[0]._id;
        rVal.preferences = elem[0].preferences ? elem[0].preferences : {};
        console.log(rVal)
        return rVal;
      } else {
        let obj = JSON.parse(JSON.stringify(rVal))
        delete obj._id;
        obj.accessLevel = Constants.USER_LEVEL_USER;
        return this.save(obj).then(elem => {
          return this.aggregate(user);
        });
      }
    });
  }

  async save(user: User): Promise<User> {
    if (!user._id || user._id == '') {
      user._id = (user as any).uid;
    }
    return this.firestoreService.setDocument(Constants.COLLECTION_USERS, user._id!, user.toJSON()).then(ref => {
      return user;
    })
  }

  async removeById(id: string): Promise<null> {
    if (id) {
      return this.firestoreService.deleteDocumentByCollectionAndName(Constants.COLLECTION_USERS, id).then(ref => {
        return null;
      })
    } else {
      return null;
    }
  }

  async search(search: string): Promise<User[]> {
    return this.firestoreService.queryForDocuments(Constants.COLLECTION_USERS, or(where("name", ">=", search), where("name", "<=", search))).then(elem => {
      let rVal: User[] = [];
      if (elem && elem.length > 0) {
        elem.forEach((data) => {
          rVal.push(new User(data));
        })
      }
      return rVal;
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.firestoreService.queryForDocuments(Constants.COLLECTION_USERS, where("email", "==", email)).then(elem => {
      let rVal: User | null = null;
      if (elem && elem.length > 0) {
        rVal = new User(elem[0]);
      }
      return rVal;
    });
  }

  async findAll(): Promise<User[]> {
    return this.firestoreService.findAll(Constants.COLLECTION_USERS).then(elem => {
      let rVal: User[] = [];
      if (elem && elem.length > 0) {
        elem.forEach((e) => {
          rVal.push(new User(e));
        })
      }
      return rVal;
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.firestoreService.getDocumentByCollectionAndName(Constants.COLLECTION_USERS, id).then(elem => {
      let rVal: User | null = null;
      if (elem) {
        rVal = new User(elem);
      }
      return rVal;
    });
  }

  canGoToView(item: any): boolean {
    let rVal = false;
    if (item) {
      // rVal = this.checkIfUserLevelAbove(item.minAccessLevel);
    }
    return rVal;
  }

  logout() {
    this.user = null;
    this.userApprovedForUse = false;
    signOut(this.auth)
        .then(() => {
          let snackBar = new Snackbar('Logged out successfully', null, null, Constants.SNACKBAR_GOOD);
          this.eventService.showSnackBar.emit(snackBar);
        })

  }

  setPreference(key: string, value: any) {
    if (this.user) {
      this.user.preferences[key] = value;
      this.save(this.user);
    }
  }

  getPreference(key: string, rVal: any = null) {
    if (this.user) {
      let check = this.user.preferences[key];
      if (check != null && check != undefined) {
        rVal = check;
      }
    }

    return rVal;
  }

  login() {
    signInWithRedirect(this.auth, this.provider);
  }

  updateAllUsers() {
    this.findAll().then((users) => {
      this.allUsers = users;
    });
  }
}


