import getAPI from "@/util/apiConnector";
import { AxiosResponse } from "axios";
import { ActionContext } from "vuex";
   
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import ILoginRequest from '../dtos/iLoginRequest';
import { AccessLevel } from '../enums/AccessLevel';
import Store from "@/store";
import IResponseDTO from "@/dtos/iResponseDTO";

@Module({ generateMutationSetters: true })

export default class User extends VuexModule {

 
  @Action
  public async doCreate( login:ILoginRequest):Promise<IResponseDTO> {
    
    const response:AxiosResponse =  await getAPI().post('user',login);

    const data:IResponseDTO = response.data as IResponseDTO;

    if(!data.code)
    {
      await Store.dispatch("auth/doInternalAuth",data.result.profileId);
    }

    return data;
    
  } 
 
} 