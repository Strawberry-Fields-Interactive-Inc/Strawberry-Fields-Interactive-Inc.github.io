<template>
  <div class="home">    
    <img alt="Aeksia logo" class="logo" src="../assets/Ativo_12x.png">
    <div class="actions">
        <Wellcome/>
    </div>    
  </div>
</template>

<script>
// @ is an alias to /src
import Wellcome from '@/components/Wellcome.vue'

export default {
  name: 'Home',
  components: {
    Wellcome
  }
}
</script>

<style lang="scss" scoped>
  .logo{
    width:50vw;
  }
 .actions{
      margin-top:10vh;
    }
</style>