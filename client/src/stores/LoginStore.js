import {makeObservable, action, computed, decorate, observable} from 'mobx';
import jwt from 'jwt-decode';

class LoginStore {
    thisUser = '';
    thisUserLoggedIn = false;
    constructor(thisUser) {
        makeObservable(this, {
            thisUser: observable,
            thisUserLoggedIn: observable,
            jwtDecode: observable,
            getNick: observable,
            getRole: observable
        })
        this.thisUser = thisUser
    }
    users(){
        //console.log(token);
        const token = localStorage.getItem('token');
        console.log(token);
        return jwt(token);
    }
    logInUser(userName) {
        this.thisUser = userName;
        this.thisUserLoggedIn = true;
    }
    jwtDecode(token){
        //console.log(token);
        //const user = jwt(token.token);
        //console.log(token.token);
        localStorage.setItem('token', JSON.stringify(token.token));
        //const js = JSON.parse(localStorage.getItem('token'))['access_token']
        //console.log(localStorage.getItem('token'));
        localStorage.setItem('loggedIn', 'yes');
        //console.log(user);
    }
    getNick(){
        console.log(this.users());
        return this.users().nickname;
    }
    getRole(){
        if(this.isLogged())
            return this.users().role;
        return 0;
    }
    isLogged(){
        const log = localStorage.getItem('loggedIn');
        return log === 'yes';
    }
    logout(){
        localStorage.setItem('loggedIn', 'no');
    }
}

export default new LoginStore();