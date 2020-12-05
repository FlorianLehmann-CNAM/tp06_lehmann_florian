import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from 'src/app/models/User';
import { UserStateModel } from 'src/app/models/UserStateModel';
import { NewJwt, SignInUser, SignOutUser } from '../actions/User.action';

@State<UserStateModel>({
    name: 'user',
    defaults: {
        isLogged: false,
        userId: -1,
        token: ""
    }
})
@Injectable()
export class UserState{



    @Selector()
    static IsLogged(state: UserStateModel) : Boolean{
        return state.isLogged;
    }

    @Selector()
    static GetLoggedToken(state: UserStateModel) : string{
        return state.token;
    }

    @Action(SignInUser)
    signIn({getState, patchState} : StateContext<UserStateModel>, {payload} : SignInUser){
        patchState({
            isLogged: true,
            userId: payload.Id,
        });
    }

    @Action(SignOutUser)
    signOut({getState, patchState} : StateContext<UserStateModel>, {} : SignOutUser){
    
        patchState({
            isLogged: false,
            userId: -1,
            token: ""
        });
    }
    @Action(NewJwt)
    newJwt({getState, patchState} : StateContext<UserStateModel>, {payload} : NewJwt){
        console.log("New JWT: ", payload);
        patchState({
            token: payload
        });
    }
}