<template>
  <HeaderMain />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderMain from "@/components/HeaderMain.vue";

export default defineComponent({
  components: {
    HeaderMain
  }
});
</script>

<style lang="scss">
@import "@/assets/styles/common.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-height: 100vh;
}
</style>

