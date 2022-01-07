import {Injectable} from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { User } from 'src/app/shared/interfaces'
import { Observable, Subject, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import {  catchError, tap } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient){}

    get token(): string {

        let expDate = new Date(localStorage.getItem('fb-token-exp') as string) 

        if(new Date() > expDate){
            this.logout()
            //this.logout
            return null as any
        }

        return localStorage.getItem('fb-token') as string
    }


    login(user: User): Observable<any>{
        user.returnSecureToken = true
        // return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]`, user)
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        )
    } 

    // logout(user: User){
    logout(){
       this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    private handleError(error: HttpErrorResponse){
            const {message} = error.error.error

            // console.log(message)

            switch(message){
                case 'INVALID_EMAIL':
                    this.error$.next('wrong email')
                    break;
                case 'INVALID_PASSWORD':
                    this.error$.next('wrong password')
                    break;
                case 'EMAIL_NOT_FOUND':
                    this.error$.next('email not found')
                    break;    
            }

            return throwError(error)
    }

    private setToken(response:any | null){ // FbAuthResponse
        // console.log(response)
        if(response){
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
            localStorage.setItem('fb-token', response.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else{
            localStorage.clear()
        } 
    }
}