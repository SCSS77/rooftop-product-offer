<template>
  <div class="searcher__input-container">
    <input :class="{ 'searcher__input': true, 'searcher__input--error': showError }" v-model="cupsInput" type="number" placeholder="Ej.000000" @keydown.enter="searchClient">
    <button class="searcher__button" @click="searchClient">Buscar mi oferta</button>
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
      clientFound: null as Client | null,
      showError: false
    }
  },
  methods: {
    searchClient() {
      if (!this.cupsInput) {
        toast.error('Por favor, ingrese un número de cups');
        this.showError = true;
        return;
      }

      this.showError = false;
      this.clientFound = clientsData.find((client: Client) => client.cups === this.cupsInput.toString()) || null;
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
.searcher__input--error {
  border-color: #D12929;
}
</style>
