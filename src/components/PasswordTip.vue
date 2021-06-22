<template>
  <div class="passwordtip">
      <p><strong>Attention </strong> : Password must obey these rules:</p>
      <ul>
        <li :class="fiveCharactersClass">{{passwordSize}} characters or more</li>
        <li :class="oneCharacterUpperCaseClass">One character using uppercase</li>
        <li  :class="oneNumberClass">One number</li>
        <li  :class="oneSymbolClass">One of those symbols {{simbols}}</li>
      </ul>               
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import  Store from '@/store';// path to store file
import validations from "@/util/validations";


@Options({
  props: {
    password:String
  },
   components: {
  }
})
export default class PasswordTip extends Vue {
  password:string=""; 
  simbols:string="";
  passwordSize:number=0;

  mounted(){
    this.simbols=validations.getSimbolsChars(); 
    this.passwordSize = validations.getMinimumPasswordSize();
  }

  get oneSymbolClass():string{
    if(validations.containsIntersection(this.simbols,this.password))
    {
      return "correct";
    }
    return "";
  }

  get oneNumberClass():string{
    if(validations.containsIntersection(validations.getNumbersChars(),this.password))
    {
      return "correct";
    }
    return "";
  }

  
  get oneCharacterUpperCaseClass():string{
     if(validations.containsIntersection(validations.getUpperCaseChars(),this.password))
    {
      return "correct";
    }
    return "";
  }

  
  get fiveCharactersClass():string{
     if(this.password.length >= this.passwordSize)
    {
      return "correct";
    }
    return "";
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $aeksia-color-mid-red : #8c2523;
  $aeksia-color-mid-teal : #188484;
  .passwordtip
  {
      li {
        color:$aeksia-color-mid-red;
        font-weight: bold;
        list-style: none;

        &.correct{
          color:$aeksia-color-mid-teal;
        }
      }

      
  }
 
</style>
