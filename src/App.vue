<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld :msg="msg" /> -->
  <THEEE />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";
import THEEE from "@/components/yueliang.vue";

@Options({
  components: {
    HelloWorld,
    THEEE,
  },
})
export default class App extends Vue {
  msg = "Welcome to Your Vue.js + TypeScript App";
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
