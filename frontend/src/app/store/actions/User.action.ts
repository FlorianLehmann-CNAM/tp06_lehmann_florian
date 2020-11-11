import { User } from '../../models/User';

export class SignInUser{
    static readonly type = '[User] SignIn';

    constructor(public payload : User, public token : string){}
}

export class SignOutUser{
    static readonly type = '[User] SignOut';

    constructor(public payload: User){}
}