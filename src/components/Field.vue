<template>
    <div class="field">
        <label :for="forName" class="form-label">{{label}}:</label>
        <slot/>
    </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      label:String,
      forName:String,
    },
    components: {
    }
  })
  export default class Field extends Vue {

    label!: string; 
    forName!: string; 
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"> 
    label
    {
      font-size: 18px;
    }
     .form-label
    {
      margin-bottom: 0px; 
    }
</style>
