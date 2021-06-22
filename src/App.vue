<template>
  <div id="nav">
    <router-link to="/">Home</router-link> 
    <span v-if="logged">
      | <router-link  to="/upload">Upload</router-link>
    </span>
    <span v-else>
      | <router-link  to="/login">Login</router-link>
    </span>
  </div>
  <router-view/>
</template>


<script lang="ts">
import { Vue } from 'vue-class-component';
import  Store from '@/store';

export default class App extends Vue {

 
  get logged():boolean
  {
    return Store.state.accesslevel !=0;
  }
}
</script>
<style lang="scss">
  
  @import '@/scss/common.scss';

  body{
    background-size: cover;
    background-image: url("/images/low-angle-shot-mesmerizing-starry-sky.jpg");
  }
  
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    
    padding: 30px;
    font-size: 28px;

    a{
      text-decoration: none;
    }
  }
 

</style>
