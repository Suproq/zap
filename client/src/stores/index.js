import * as React from 'react';
import AuthStore from './AuthStore';
import {createBrowserHistory} from 'history';

export const StoreContext = React.createContext(null);
export class Store {
  history;
  AuthStore;
  constructor() {
    this.history = createBrowserHistory();
    this.AuthStore = new AuthStore();
  }
}
