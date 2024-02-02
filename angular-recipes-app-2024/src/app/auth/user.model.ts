export class User {
    constructor(
        public email:string, 
        public id: string, 
        private _token:string, 
        private _token_expiration_date: Date
        ) {}

        get token() {
            if (!this._token_expiration_date || this._token_expiration_date <= new Date())
            {
                return null;
            }
            return this._token;
        }
}