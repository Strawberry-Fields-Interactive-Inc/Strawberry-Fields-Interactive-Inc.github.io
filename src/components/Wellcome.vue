<template>
  <div class="hello">
    <div class="actions">
      <button type="button" @click="onCreateAccount" class="btn btn-lg btn-primary">Create Account</button>
      <button type="button" @click="onSignin" class="btn btn-lg btn-primary">Sign in</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
  }
})
export default class Wellcome extends Vue {
  msg!: string

  
  async onCreateAccount()
  {
    console.log("onCreateAccount");
    this.$router.push("/createAccount");
  }

  
  async onSignin()
  {
    this.$router.push("/login");
  }

  
}
</script>

<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .hello{
    .actions{
      button{
        margin-right: 1em;
      }
    }
  }
  
</style>
