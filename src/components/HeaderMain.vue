<template>
  <header class="header">
    <nav class="header__nav">
      <router-link to="/">Inicio</router-link>
      <img class="header__logo" src="@/assets/logo-gradient.svg" alt="Logo" height="16" width="112">
      <router-link to="/about">Sobre nosotros</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderMain'
});
</script>

<style scoped>
</style>

