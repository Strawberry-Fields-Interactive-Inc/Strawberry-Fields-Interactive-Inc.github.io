import IBin from "@/dtos/iBin";
import getAPI from "@/util/apiConnector";
import  { AxiosResponse } from "axios";
import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

@Module({ generateMutationSetters: true })

export default class ContentManager extends VuexModule {
 

  @Action
  public async doUploadContent(file:File): Promise<IBin> {
  
    const formData = new FormData();
    formData.append("file", file);

    const response:AxiosResponse =  await getAPI("contentManager").post('binn', formData);


    return response.data;
  }
  
  @Action
  public async doRemoveContent(id:string):Promise<void>
  {
      await getAPI().delete('api/binn/' + id);
  }

  @Action
  public async doDownload(id:string):Promise<IBin>
  {
    
    const response:AxiosResponse =  await getAPI("contentManager").get('download/' + id);

    return response.data;
  }

  
  @Action
  public async doListAllContents():Promise<Array<IBin>>
  {      


    const response:AxiosResponse =  await getAPI("contentManager").get('/binn');


    return response.data; 
  }

}