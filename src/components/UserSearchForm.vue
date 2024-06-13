<template>
  <div class="searcher__input-container">
    <input
      :class="{ 'searcher__input': true, 'searcher__input--error': showError }"
      v-model="cupsInput"
      type="number"
      placeholder="Ej. 000000"
      @keydown.enter="searchClient"
    />
    <button class="searcher__button" @click="searchClient">Buscar mi oferta</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClientStore } from '@/stores/clientStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const store = useClientStore();
const router = useRouter();

const cupsInput = ref<number | string>('');
const showError = ref(false);

const searchClient = async () => {
  if (!cupsInput.value) {
    toast.error('Por favor, ingrese un número de CUPS');
    showError.value = true;
    return;
  }

  showError.value = false;

  await store.loadClients();

  const cupsInputStr = String(cupsInput.value);

  const clientFound = store.getClientByCups(cupsInputStr);
  if (clientFound) {
    router.push({ name: 'ClientInfo', params: { cups: clientFound.cups } });
  } else {
    toast.error('Cliente no encontrado');
  }
};
</script>

<style scoped>
@import "vue3-toastify/dist/index.css";

.searcher__input--error {
  border-color: #d12929;
}
</style>
