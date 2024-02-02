import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError , tap, throwError} from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface AuthResponseData {
    idToken: string	
    email: string	
    refreshToken: string	
    expiresIn: string	
    localId: string
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor( private http: HttpClient, private router : Router) {}

    signup( email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe( catchError( this.handleError), 
            tap( resData => {
                this.handleAuthentcation(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }

        ));
    }


    login( email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ) 
        .pipe( catchError( this.handleError), 
            tap( resData => {
                this.handleAuthentcation(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }
        ));
    }

    autoLogin() {
        const userData: {
            email:string,
            id: string,
            _token: string,
            _token_expiration_date: string
        } = JSON.parse(localStorage.getItem('userData')); 
        if (!userData) {
            return;
        }
        const d = new Date(userData._token_expiration_date);
        console.log(d);
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._token_expiration_date));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._token_expiration_date).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
        
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        };
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout( () => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentcation(
        email: string, 
        userId:string, 
        token: string, 
        expiresIn: number
    ) {
        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
        const user = new User( email, userId, token, expirationDate );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);
    }

    handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error ocurred.'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists.'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.'
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'These login credentials are invalid.'
                break;
        }
        return throwError(errorMessage);
    }


}