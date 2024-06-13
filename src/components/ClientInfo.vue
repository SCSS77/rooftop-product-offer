<template>
  <div class="client-section">
    <div v-if="client">
      <div class="client-card">
        <div class="client-card__container">
          <img class="client-card__icon-user" src="@/assets/user.svg" alt="Usuario" height="85" width="85">
          <h2 class="client-card__title">Te estabamos esperando, <strong>{{ client.full_name }}.</strong></h2>
        </div>
      </div>

      <div :class="[ 'client-card', 'client-card--promo-information', promoCardClass ]">
        <h3 class="client-card--promo-information__title">{{ promoTitle }}</h3>
        <p :class="offerClass">{{ offerMessage }}</p>
        <a class="client-card__button" href="#">Descubre más</a>
      </div>

      <div class="client-card client-card--info">
        <h3 class="client-card__title">Datos del cliente:</h3>
        <p>Nombre: <span>{{ client.full_name }}</span></p>
        <p>Dirección: <span>{{ client.address }}</span></p>
        <p>CUPS: <span>{{ client.cups }}</span></p>
        <p>Consumidor: <span>{{ client.role }}</span></p>
        <p>Edificio: <span>{{ client.building_type }}</span></p>
      </div>

      <div class="client-card client-card--info">
        <h3 class="client-card__title">Detalles del Suministro:</h3>
        <div v-for="supply in clientSupplies" :key="supply.cups">
          <p>CUPS: <span>{{ supply.cups }}</span></p>
          <p>Tarifa: <span>{{ supply.tariff }}</span></p>
          <p>Importe Facturado: <span>{{ supply.invoiced_amount }}</span></p>
          <p>Potencia P1: <span>{{ supply.power.p1 }}</span></p>
          <p>Potencia P2: <span>{{ supply.power.p2 }}</span></p>
          <p>Vecinos: <span>{{ supply.neighbors.join(', ') }}</span></p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="client-card client-card--info">
        <h3 class="client-card__title">Cliente no encontrado.</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClientStore } from '@/stores/clientStore';
import { Client, SupplyPoint } from '@/interfaces/types';
import { toast } from 'vue3-toastify';

const store = useClientStore();
const route = useRoute();

const cups = route.params.cups as string;
const client = ref<Client | null>(null);
const clientSupplies = ref<SupplyPoint[]>([]);
const offerType = ref<string>('No aplicable');

onMounted(async () => {
  await store.loadClients();
  client.value = store.getClientByCups(cups) || null;
  if (client.value) {
    clientSupplies.value = store.getClientSuppliesByCups(client.value.cups);
    offerType.value = store.isEligibleForSpecialOffer(client.value, clientSupplies.value);
    toast(`Hola, ${client.value.full_name}`);
  } else {
    toast.error('Cliente no encontrado');
  }
});

const offerMessage = computed(() => {
  switch (offerType.value) {
    case 'Oferta estándar':
      return 'Estás habilitad@ para disfrutar de nuestra promoción #RoofRevolution y de todas las ventajas de nuestros paneles solares.';
    case 'Descuento básico':
      return 'Estás habilitad@ para disfrutar de nuestra promoción #RoofRevolution y de todas las ventajas de nuestros paneles solares. * Además disfrutas de un descuento del 5%.';
    case 'Descuento especial':
      return 'Estás habilitad@ para disfrutar de nuestra promoción #RoofRevolution y de todas las ventajas de nuestros paneles solares. * Además disfrutas de un descuento especial del 12%.';
    default:
      return 'Por el momento, no tienes disponible la promoción #RoofRevolution de Holaluz, pero puedes acceder a nuestra web para buscar más promociones y ventajas.';
  }
});

const offerClass = computed(() => {
  switch (offerType.value) {
    case 'Oferta estándar':
      return 'standard-offer';
    case 'Descuento básico':
      return 'basic-discount';
    case 'Descuento especial':
      return 'special-discount';
    default:
      return '';
  }
});

const promoTitle = computed(() => {
  return offerType.value === 'No aplicable' ? '¡Lo sentimos!' : '¡Felicidades!';
});

const promoCardClass = computed(() => {
  return offerType.value === 'No aplicable' ? 'client-card--promo-information-no-promotion' : '';
});
</script>

<style scoped>
@import "vue3-toastify/dist/index.css";
</style>
