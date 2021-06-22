<template>
  <div class="home">
    <Auth/>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/Auth'

export default {
  name: 'Login',
  components: {
     Auth
  }
}
</script>
