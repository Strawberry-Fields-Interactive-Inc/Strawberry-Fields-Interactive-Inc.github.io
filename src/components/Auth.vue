<template>
  <div class="login aeksia-form">
    <div class="container">
      <div class="row align-items-start">
        <div class="col">
        </div>
        <div class="col form">
          <h1>Login</h1>
          <Message :autoHide="true" :time="30000"></Message>
          <field label="Email address:" forName="email">
            <input type="email" v-model="email" class="form-control" id="email" placeholder="name@example.com">
          </field>

          <field label="Password:" forName="epasswordmail">
            <input type="password" v-model="password" class="form-control" id="password">        
          </field>

          <div class="actions">
            <button type="button" @click="onCancel" class="btn btn-secondary btn-lg">Cancel</button>
            <button type="button" @click="onLogin" class="btn btn-lg btn-primary">Login</button>
          </div>
        </div>
        <div class="col">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import  Store from '@/store';
import ILoginRequest from '@/dtos/iLoginRequest';
import Message from "@/components/Message.vue";
import Field from "@/components/Field.vue";
import { namespace } from "vuex-class";

const auth = namespace("auth");
const userInterface = namespace("userInterface");

@Options({
  props: {
  },
   components: {
    Message,Field
  }
})
export default class Auth extends Vue {

   @auth.Action
  private doAuth!: (login:ILoginRequest) => Promise<string>;
  @userInterface.Action
  private doError!: (message:string) => Promise<void>;


  msg!: string;
  email: string="";
  password:string="";
  error:string = "";
  success:string= "";
  
  async onLogin()
  {

    const loginRequest: ILoginRequest = {email:this.email,password:this.password};
    const ret = await this.doAuth(loginRequest);
    
    if(ret)
    {
      
     this.doError(ret);
      return ;
    }

    this.$router.push("Upload");
   
  }

  async onCancel()
  {
      this.$router.push("/");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login{

  .container{
    .form{
          * {
            margin-top: 1em;
          }
          .actions
          {
            display: flex;
            button{
              margin-top: 1em;
              margin-left:1em;
            }
            
          }
   

          
      }
  }
}
  
 
</style>
