<template>
  <div class="searcher__input-container">
    <input :class="{ 'searcher__input': true, 'searcher__input--error': showError }" v-model="cupsInput" type="number" placeholder="Ej.000000" @keydown.enter="searchClient">
    <button class="searcher__button" @click="searchClient">Buscar mi oferta</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue';
import { useClientStore } from '@/stores/clientStore';
import { toast } from 'vue3-toastify';

export default defineComponent({
  setup() {
    const clientStore = useClientStore();
    const cupsInput = ref('');
    const showError = ref(false);
    const instance = getCurrentInstance();

    function searchClient() {
      if (!cupsInput.value) {
        toast.error('Por favor, ingrese un número de CUPS');
        showError.value = true;
        return;
      }

      showError.value = false;
      const foundClient = clientStore.getClientByCups(cupsInput.value);
      if (foundClient) {
        instance?.proxy?.$router.push({ name: 'ClientInfo', params: { cups: foundClient.cups } });
      } else {
        toast.error('Cliente no encontrado');
      }
    }

    return {
      cupsInput,
      showError,
      searchClient
    };
  }
});
</script>

<style scoped>
@import "vue3-toastify/dist/index.css";

.searcher__input--error {
  border-color: #D12929;
}
</style>
