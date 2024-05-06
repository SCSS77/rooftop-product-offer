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
import { defineComponent } from 'vue';
import clientsData from '../data/clients.json';
import supplyPointsData from '../data/supply-points.json';
import { Client, SupplyPoint } from '@/interfaces/types';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
  props: {
    cups: String
  },
  data() {
    return {
      client: null as Client | null,
      clientSupplies: [] as SupplyPoint[],
      offerType: 'No aplicable'
    };
  },
  created() {
    this.findCustomer();
  },
  methods: {
    findCustomer() {
      this.client = clientsData.find(client => client.cups === this.cups) || null;
      if (this.client) {
        this.clientSupplies = supplyPointsData.filter(supply => supply.cups === this.client!.cups);
        this.offerType = this.isEligibleForSpecialOffer();
      }
    },
    isEligibleForSpecialOffer(): string {
      if (this.client && this.client.building_type === 'house' && this.clientSupplies.length > 0) {
        const clientSupply = this.clientSupplies[0];
        const clientPower = clientSupply.power;
        const neighbors = clientSupply.neighbors;

        if (neighbors.length === 0) {
          return 'Oferta estándar';
        }

        const lowerPowerNeighbor = neighbors.some(neighbor => {
          const neighborSupply = supplyPointsData.find(supply => supply.cups === neighbor);
          if (neighborSupply) {
            return neighborSupply.power.p1 < clientPower.p1 && neighborSupply.power.p2 < clientPower.p2;
          }
          return false;
        });

        if (lowerPowerNeighbor) {
          return 'Descuento básico';
        }

        const totalInvoiceAmountOfNeighbors = neighbors.reduce((totalAmount, neighbor) => {
          const neighborSupply = supplyPointsData.find(supply => supply.cups === neighbor);
          if (neighborSupply) {
            totalAmount += parseFloat(neighborSupply.invoiced_amount);
          }
          return totalAmount;
        }, 0);

        if (totalInvoiceAmountOfNeighbors > 100) {
          return 'Descuento especial';
        }

        return 'Oferta estándar';
      }
      return 'No aplicable';
    }
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
  },
  watch: {
    client: {
      immediate: true,
      handler(client: Client | null) {
        if (client) {
          toast(`Hola, ${client.full_name}`);
        }
      }
    }
  }
});
</script>

<style scoped>
</style>
