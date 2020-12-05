import { User } from '../../models/User';

export class SignInUser{
    static readonly type = '[User] SignIn';

    constructor(public payload : User){}
}

export class SignOutUser{
    static readonly type = '[User] SignOut';

    constructor(){}
}

export class NewJwt{
    static readonly type = '[User] NewJwt';

    constructor(public payload: string){}
}