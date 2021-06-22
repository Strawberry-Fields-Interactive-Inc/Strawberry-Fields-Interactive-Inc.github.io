<template>
  <div class="upload-page aeksia-form">
      <Message :autoHide="true" :time="3000"></Message>

      <a ref="hideLink" class="hideLink" :download="fileName" :href="fileContent">Download</a>
      
      <h1>Upload Page</h1>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="line of lines" v-bind:key="line.id">
            <th scope="row">{{line.id}}</th>
            <td>{{line.name}}</td>
            <td class="action">
              <button class="btn btn-primary" type="button" @click="onDownload(line.id)" >Download</button> 
              <button class="btn btn-primary" type="button" @click="onRemove(line.id)" >Remove</button>
            </td>
          </tr> 
        </tbody>        
      </table>

    <div class="form">
      <div class="input-group">
        <input type="file" class="form-control" id="contentFile" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
        <button class="btn btn-outline-secondary" type="button" @click="onSend" id="inputGroupFileAddon04">Send</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts"> 
import {Options, Vue } from 'vue-class-component'; 
import {default as Store} from "@/store";
import IBin from '@/dtos/iBin';
import Message from "../components/Message.vue";


import { namespace } from "vuex-class";

const contentManager = namespace("contentManager");
const userInterface = namespace("userInterface");


export interface IContent{
    id:string,
    name:string
}


@Options({
  name: "Upload",
  components: {
    Message
  }
})
export default class Upload extends Vue {

  @userInterface.Action
  private doClearMessages!: () => Promise<void>;

  @userInterface.Action
  private doSuccess!: (message:string) => Promise<void>;

  @userInterface.Action
  private doError!: (message:string) => Promise<void>;

  @contentManager.Action
  private doListAllContents!: () => Promise<Array<IBin>>;

  @contentManager.Action
  private doDownload!: (id:string) => Promise<IBin>;
 
  @contentManager.Action
  private doRemoveContent!: (id:string) => Promise<void>;

  @contentManager.Action
  private doUploadContent!: (file:File) => Promise<IBin>;

  
  

  lines:Array<IContent> = new Array();
  error:string = "";
  success:string= "";
  fileName:string="";
  fileContent:string="";



  async mounted()
  {       
    this.lines = await this.doListAllContents();
  }



  async onDownload(id:string)
  {
    await this.doClearMessages();
    
    const bin:IBin = await this.doDownload(id);

    this.fileName = bin.name;
    this.fileContent = `data:${bin.contentType};base64,${bin.content}`;

    window.setTimeout( ()=>{
      (this.$refs as any).hideLink.click();
    },100);
    
    
  }

  async onRemove(id:string)
  {
    await this.doClearMessages();
    await this.doRemoveContent(id);
    this.lines = this.lines.filter((content)=>{return content.id != id});
    this.doSuccess("File removed successfully!");
  } 


  fileExists(listFiles:FileList):boolean
  {      
    return listFiles.length > 0;
  }

  clearFileComponent()
  {
    const contentFile:any = document.querySelector('#contentFile');
    contentFile.outerHTML += "";
  }

  getForm():any{
      const contentFile:any = document.querySelector('#contentFile');

    const listFiles:FileList = contentFile.files;

    if(!this.fileExists(listFiles))
    {
      throw new Error("File is required!");
    } 

    return {file:listFiles[0]};
  }

  async addContent()
  {
    
      const newLine = await this.doUploadContent(this.getForm().file);

      this.lines.push(newLine);

      this.clearFileComponent(); 

  } 

  async onSend(){
    try
    {
      await this.doClearMessages();

      await this.addContent() ;
              
      this.doSuccess("File uploaded successfully!");
    }
    catch(e)
    {
      this.doError(e.message);
    }
  }

    
} 
</script>

<style scoped lang="scss">
  .form{
    width:50%;
    margin:auto;
  }
  .hideLink
  {
    display: none;
  }
  .action
  {
    button{
      margin-left: 2em;
    }
  }
</style>