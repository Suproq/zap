import { computed, flow, makeObservable, observable } from "mobx";
import Api from '../utils/Api';
//import serv from '../../config';

class AuthStore {
    token = null;
    message = '';
    constructor() {
        makeObservable(this, {
            message: observable,
            token: observable,
            register: flow,
            user: computed,
            isLoggedIn: computed
        });
    }

    async register(nickname, password, phone, role, name, surname, address, darktheme) {
        const user = {
            nickname: nickname, password: password, phone: phone,role:role,name:name,surname:surname,address:address,darktheme:darktheme
          };
        const response = await fetch('http://localhost:8080/api/auth/register', {
            mode: 'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        const result = await response.json();
        console.log(result.message);
        this.message = result.message;
        return result.message;
        //return result;
        //console.log(response.status);
        /*const  = new Api().post(
            'http://localhost:8080/api/auth/register',
            {nickname, password, phone, role, name, surname, address, darktheme}
        );
        console.log(token);*/
        //const token = null;
        /*if(token) {
            this.token = token;
        }*/
    }

    login(nickname, password, phone, role, name, surname, address, darktheme) {
        const {token} = new Api().post(
            'http://localhost:8080/api/auth/register',
            {nickname, password, phone, role, name, surname, address, darktheme}
        );
        console.log(token);
        if(token) {
            this.token = token;
        }
    }

    get user() {
        if (!this.token) {
          return null;
        }
    
        const [, encodedPayload,] = this.token.split('.');
    
        if (!encodedPayload) {
          return null;
        }
    
        try {
          return JSON.parse(window.atob(encodedPayload)).sub;
        } catch(e) {
          return null
        }
      }

    get isLoggedIn() {
        return Boolean(this.user);
      }
}

export default new AuthStore();
