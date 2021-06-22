<template>
  <div class="message">    
    <div v-if="success" class="alert alert-primary" role="alert">
      {{success}}
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
        {{error}}
     </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { namespace } from "vuex-class";

const userInterface = namespace("userInterface");


@Options({
  props: {
    autoHide:Boolean,
    time:Number
  }
})
 
export default class Message extends Vue {
  

  @userInterface.State("_messageError")
  private error !: string;
  @userInterface.State("_messageSuccess")
  private success !: string;

  @userInterface.Action
  private doClearMessages!: () => Promise<void>;


   autoHide: boolean = false;
   time:number = 1000;
   timeLeftToClean:number = 0;


  mounted(){
    this.startAutoCleanIfNeeded();
  }

  async startAutoCleanIfNeeded()
  {    
    if(this.autoHide)
    {
      setInterval(this.verifyChangesAndMarkToClean, Math.round(this.time/10));     
    }
  }

  updateTimeLeftToClean()
  {
    if(this.timeLeftToClean==0)
    {
      this.timeLeftToClean = this.time;
    }
    else
    {
      this.timeLeftToClean -=  Math.round(this.time/10);
      this.timeLeftToClean = (this.timeLeftToClean <=0)?0:this.timeLeftToClean;
    }
  }
 
  async verifyChangesAndMarkToClean(){

    const nothingToClean : boolean = this.error=="" && this.success =="";
    if(nothingToClean)
    {
      return;
    }

    this.updateTimeLeftToClean();

    const isTime:boolean = this.timeLeftToClean==0;
  
    if(isTime)
    {
      await this.doClearMessages();
    }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    .form{
        * {
          margin-top: 1em;
          margin-left: 1em;
        }
    }
  }
 
</style>
