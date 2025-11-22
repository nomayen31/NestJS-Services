import { Injectable } from "@nestjs/common";

@Injectable({})

export class AuthService{
    signin(){
        return {
                    msg: 'hello softvence, i am signin '
                }
    }
    signup(){
        return {
                    msg: 'hello , i am signup '
                }
    }
}