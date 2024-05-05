<template>
  <div>
    <input v-model="cupsInput" type="text" placeholder="Enter the CUPS">
    <button @click="searchClient">Buscar</button>
    <div v-if="clientFound">
      <p>{{ clientFound.full_name }}</p>
      <p>{{ clientFound.address }}</p>
    </div>
    <div v-else>
      <p>Cliente no encontrado</p>
    </div>
  </div>
</template>

<script lang="ts">
import clientsData from '@/data/clients.json';
import { defineComponent } from 'vue';
import { Client } from '@/interfaces/types';
import { RouteLocationRaw } from 'vue-router';

export default defineComponent({
  data() {
    return {
      cupsInput: '',
      clientFound: null as Client | null
    }
  },
  methods: {
    searchClient() {
      this.clientFound = clientsData.find((client: Client) => client.cups === this.cupsInput) || null;
      if (this.clientFound) {
        this.$router.push({ name: 'ClientInfo', params: { cups: this.clientFound.cups } } as unknown as RouteLocationRaw);
      } else {
        this.clientFound = null;
      }
    }
  }
});
</script>

<style scoped>
</style>
