import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from 'src/app/models/User';
import { UserStateModel } from 'src/app/models/UserStateModel';
import { SignInUser, SignOutUser } from '../actions/User.action';

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

    @Action(SignInUser)
    signIn({getState, patchState} : StateContext<UserStateModel>, {payload, token} : SignInUser){
        patchState({
            isLogged: true,
            userId: payload.Id,
            token
        });
    }

    @Action(SignOutUser)
    signOut({getState, patchState} : StateContext<UserStateModel>, {payload} : SignOutUser){
    
        patchState({
            isLogged: false,
            userId: -1,
            token: ""
        });
    }
}