<template>
  <div>
    <input v-model="cupsInput" type="text" placeholder="Ej.000000">
    <button @click="searchClient">Buscar mi oferta</button>
  </div>
</template>

<script lang="ts">
import clientsData from '@/data/clients.json';
import { defineComponent } from 'vue';
import { Client } from '@/interfaces/types';
import { RouteLocationRaw } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
        toast.error('Cliente no encontrado');
        this.clientFound = null;
      }
    }
  }
});
</script>

<style scoped>
</style>
