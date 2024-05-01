import {Base} from "./base";

export class User extends Base{
  private  uid!: string;
  _id: string | null = null;
  email!: string | null;
  photoURL!: string | null;
  displayName: string | null = null;
  phoneNumber: string | null = null;
  firstName: string | null = null;
  friends: string[] = [];
  cpu = false;
  preferences: any = {};

  constructor(c:any | null) {
    super();
    if (c) {
      this.uid = c.uid;
      this._id = c._id;
      if (c.friends) {
        this.friends = c.friends;
      }
      this.email = c.email;
      this.phoneNumber = c.phoneNumber;
      this.photoURL = c.photoURL;
      this.preferences = c.preferences ? c.preferences : {};
      this.cpu = c.cpu == true ? true : false;
      this.displayName = c.displayName;
      this.firstName = this.displayName ? this.displayName.split(' ')[0] : '';
    }
  }

  override toJSON(): any {
    let rVal = super.toJSON();

    return rVal;
  }

  isCPU(): boolean {
    return this.cpu;
  }
}

