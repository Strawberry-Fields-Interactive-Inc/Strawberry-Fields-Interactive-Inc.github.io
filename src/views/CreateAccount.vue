<template>
  <div class="createAccount aeksia-form">
    
      <div class="container">
    <div class="row">
        <div class="col">
        </div>
        <div class="col-8 form">
            <h1>Account creation:</h1>
            <Message :autoHide="true" :time="30000"></Message>
            <field label="Name" forName="name">
              <input type="text" v-model="name" class="form-control" id="name" placeholder="John Smith">
            </field>
            <field label="E-mail address" forName="email">
              <input type="text" v-model="email" class="form-control" id="email" placeholder="email@email.com">
            </field>
            <div class="password-section">
              <password-tip :password="password"/>
              <field label="Password" forName="password">
                <input type="password" autocomplete="off" v-model="password" class="form-control" id="password">        
              </field>
              <field label="Confirmation" forName="confirmation">
                <input type="password" autocomplete="off" v-model="confirmation" class="form-control" id="confirmation">
              </field>
            </div>
            <div class="actions">
              <button type="button"  @click="onCancel" class="btn btn-secondary btn-lg">Cancel</button>
              <button type="button" @click="onCreate" class="btn btn-lg btn-primary">Create</button>
            </div>   
        </div>
        <div class="col">
        </div>
    </div> 
  </div>   
  </div>    
</template>

<script lang="ts">
// @ is an alias to /src
import PasswordTip from "../components/PasswordTip.vue";
import {Options, Vue } from 'vue-class-component';
import { namespace } from "vuex-class";
import validations from "@/util/validations";
import ICreateAccountRequest from "@/dtos/iCreateAccountRequest";
import IResponseDTO from "@/dtos/iResponseDTO";
import Field from "@/components/Field.vue";
import Message from "@/components/Message.vue";


const userInterface = namespace("userInterface");
const user = namespace("user");

@Options({
  props: {
  },
   components: {
    Message,PasswordTip,Field
  }
})
export default class CreateAccount extends Vue {
  @userInterface.Action
  private doError!: (message:string) => Promise<void>;
  @user.Action
  private doCreate!: (createAccountRequest:ICreateAccountRequest) => Promise<IResponseDTO>;

 
  msg!: string;
  name: string="";
  email: string="";
  password:string="";
  confirmation:string="";
  error:string = "";
  success:string= "";

   

  get validateError():string
  {
    if(!this.name)
    {
      return "Username is required";
    }
    if(!this.email)
    {
      return "E-mail is required";
    }
    if(!this.password)
    {
      return "Password is required";
    }
    if(!validations.isEmail(this.email))
    {
      return "E-mail incorrect";
    }
    if(!validations.isName(this.name))
    {
      return "Name incorrect";
    }
    if(!validations.isPassword(this.password))
    {
      return "Incorrect password. Please include [" + validations.getSimbolsChars()  + "]";
    }
    if(this.password!=this.confirmation)
    {
      return "Password and confirmation are not the same";
    }
    return "";
  }

  async onCreate()
  {
     if(this.validateError!="")
     {
        this.doError(this.validateError);
        return;
     }

    const createAccountRequest:ICreateAccountRequest = {
      name:this.name,
      password:this.password,
      email:this.email.toLowerCase()
      };

      const data:IResponseDTO = await this.doCreate(createAccountRequest); 

      if(data.code)
      {
        if(data.code == 50004)
        {
          this.doError("This email is already registered");
        }
        else
        {
          console.log("createAccountRequest:",data);
          this.doError("Unknown error");
        }
        return;
      }

      //TODO: keep the tolkien
      this.$router.push("/upload");

  }

  async onCancel()
  {
    this.$router.push("/");
  }
}
</script>

<style scoped lang="scss">
  .createAccount{
    .container{
      .form{
        .password-section{
          margin-top:1em;
        }
        .field{
          margin-top:1em;
          input{
            text-align: center;
          }

        }
        .actions
        {
          display: flex;
          margin-top:1em;
          width: 300px;
          margin-left: auto;
          margin-right: auto;
          button{
            margin-left:1em;
          }
        }

      }      
    }
  }
</style>