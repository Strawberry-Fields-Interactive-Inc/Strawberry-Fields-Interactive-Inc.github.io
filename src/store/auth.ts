import getAPI from "@/APIConnector";
import IResponseDTO from "@/dtos/iResponseDTO";
import { AxiosResponse } from "axios";
import { ActionContext } from "vuex";
   
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import ILoginRequest from '../dtos/iLoginRequest';
import { AccessLevel } from '../enums/AccessLevel';

@Module({ generateMutationSetters: true })

export default class Auth extends VuexModule {

  private _profileid:string = AccessLevel.GUEST;
 
  get isLogged(): boolean {
    return this._profileid!=AccessLevel.GUEST;
  }
      
  @Action
  public async doAuth( login:ILoginRequest):Promise<string> {

    const response:AxiosResponse =  await getAPI().post('auth',login);

    const data:IResponseDTO = response.data as IResponseDTO;

    console.log("data",data);

    if(data.code)
    {
      return "Password or login incorrect!";
    }    
  
    this._profileid = data.result.profileId;

    return "";
  } 

  @Action
  public async doInternalAuth( profileid:string):Promise<void> {
    this._profileid = profileid;
  } 
 
} 