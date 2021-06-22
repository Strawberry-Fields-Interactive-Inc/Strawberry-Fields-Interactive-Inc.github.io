import { ActionContext, createStore } from 'vuex';
import IIndexState from './iIndexState';
import { AccessLevel } from '../enums/AccessLevel';
import ILoginRequest from '../dtos/iLoginRequest';
import contentManager from "./contentManager";
import userInterface from "./userInterface";
import user from "./user";
import auth from "./auth";

const store = createStore({


  state: <IIndexState>{accesslevel:0},
  getters: { 
  
    
  } ,
  actions:{   
   
  }
});

new contentManager({ store, name: "contentManager" });
new userInterface({ store, name: "userInterface" });
new auth({ store, name: "auth" });
new user({ store, name: "user" });

export default store;
 