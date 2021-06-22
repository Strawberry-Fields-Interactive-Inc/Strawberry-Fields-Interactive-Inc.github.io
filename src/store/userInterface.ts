import IResponseDTO from "@/dtos/iResponseDTO";
import { ActionContext } from "vuex";
  
export interface IUserInterfaceState
{
  messageError:string,
  messageSuccess:string
}

import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

@Module({ generateMutationSetters: true })

export default class Userinterface extends VuexModule {
  private _messageError:string = "";
  private _messageSuccess:string= "";

  get messageError(): string {
    return this._messageError;
  }

  
  get messageSuccess(): string {
    return this._messageSuccess;
  }

  @Mutation
  public clearMessages() {
    this._messageSuccess="";
    this._messageError="";
  }

  @Mutation
  public updateError(error:string) {
    this._messageError=error;
  }

  @Mutation
  public updateSuccess(success:string) {
    this._messageSuccess=success;
  }
  

  @Action
  public doClearMessages() {
    this.clearMessages();
  }

  
  @Action
  public doError( error:string) {
    this.updateError(error);
  }

  @Action
  public doSuccess( success:string) {
    this.updateSuccess(success);
  } 
 

} 