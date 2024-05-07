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

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useClientStore } from '@/stores/clientStore';
import { toast } from 'vue3-toastify';

export default defineComponent({
  props: {
    cups: String
  },
  setup(props) {
    const clientStore = useClientStore();
    const client = computed(() => {
      if (props.cups) {
        return clientStore.getClientByCups(props.cups);
      } else {
        return null;
      }
    });

    const clientSupplies = computed(() => {
      if (client.value && props.cups) {
        return clientStore.getClientSuppliesByCups(props.cups);
      } else {
        return [];
      }
    });

    const offerType = ref('No aplicable');

    clientStore.loadClients();

    function isEligibleForSpecialOffer() {
      if (!client.value || clientSupplies.value.length === 0) {
        return 'No aplicable';
      }

      const clientSupply = clientSupplies.value[0];
      const clientPower = clientSupply.power;
      const neighbors = clientSupply.neighbors;

      if (neighbors.length === 0) {
        return 'Oferta estándar';
      }

      const lowerPowerNeighbor = neighbors.some(neighbor => {
        const neighborSupply = clientStore.getClientSuppliesByCups(neighbor);
        if (neighborSupply && neighborSupply.length > 0) {
          const firstNeighborSupply = neighborSupply[0];
          return firstNeighborSupply.power.p1 < clientPower.p1 && firstNeighborSupply.power.p2 < clientPower.p2;
        }
        return false;
      });

      if (lowerPowerNeighbor) {
        return 'Descuento básico';
      }

      const totalInvoiceAmountOfNeighbors = neighbors.reduce((totalAmount, neighbor) => {
      const neighborSupply = clientStore.getClientSuppliesByCups(neighbor);
      if (neighborSupply && neighborSupply.length > 0) {
        const firstNeighborSupply = neighborSupply[0];
        totalAmount += parseFloat(firstNeighborSupply.invoiced_amount);
      }
      return totalAmount;
    }, 0);

      if (totalInvoiceAmountOfNeighbors > 100) {
        return 'Descuento especial';
      }

      return 'Oferta estándar';
    }

    offerType.value = isEligibleForSpecialOffer();

    watch(client, (newClient) => {
      if (newClient) {
        toast(`Hola, ${newClient.full_name}`);
      }
    }, { immediate: true });

    return {
      client,
      clientSupplies,
      offerType
    };
  },
  computed: {
    offerMessage(): string {
      switch (this.offerType) {
        case 'Oferta estándar':
          return 'Estás habilitad@ para disfrutar de nuestra promoción #RoofRevolution y de todas las ventajas de nuestros paneles solares.';
        case 'Descuento básico':
          return 'Estás habilitad@ para disfrutar de nuestra promoción #RoofRevolution y de todas las ventajas de nuestros paneles solares. * Además disfrutas de un descuento del 5%.';
        case 'Descuento especial':
          return 'Estás habilitad@ para disfrutar de nuestra promoción #RoofRevolution y de todas las ventajas de nuestros paneles solares. * Además disfrutas de un descuento especial del 12%.';
        default:
          return 'Por el momento, no tienes disponible la promoción #RoofRevolution de Holaluz, pero puedes acceder a nuestra web para buscar más promociones y ventajas.';
      }
    },
    offerClass(): string {
      switch (this.offerType) {
        case 'Oferta estándar':
          return 'standard-offer';
        case 'Descuento básico':
          return 'basic-discount';
        case 'Descuento especial':
          return 'special-discount';
        default:
          return '';
      }
    },
    promoTitle(): string {
      return this.offerType === 'No aplicable' ? '¡Lo sentimos!' : '¡Felicidades!';
    },
    promoCardClass(): string {
      return this.offerType === 'No aplicable' ? 'client-card--promo-information-no-promotion' : '';
    }
  }
});
</script>

<style scoped>
</style>
