<template>
  <div>
    <h2>Detalles del Cliente</h2>
    <div v-if="client">
      <p>Nombre: {{ client.full_name }}</p>
      <p>Dirección: {{ client.address }}</p>
      <p>CUPS: {{ client.cups }}</p>
      <p>Consumidor: {{ client.role }}</p>
      <p>Edificio: {{ client.building_type }}</p>

      <h3>Detalles del Suministro</h3>
      <div v-for="supply in clientSupplies" :key="supply.cups">
        <p>CUPS: {{ supply.cups }}</p>
        <p>Tarifa: {{ supply.tariff }}</p>
        <p>Importe Facturado: {{ supply.invoiced_amount }}</p>
        <p>Potencia P1: {{ supply.power.p1 }}</p>
        <p>Potencia P2: {{ supply.power.p2 }}</p>
        <p>Vecinos: {{ supply.neighbors.join(', ') }}</p>
      </div>
      <h3>Oferta Especial</h3>
      <p :class="offerClass">{{ offerMessage }}</p>
    </div>
    <div v-else>
      <p>Cliente no encontrado</p>
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
      clientSupplies: [] as SupplyPoint[]
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
      const offer: string = this.isEligibleForSpecialOffer();
      switch (offer) {
        case 'Oferta estándar':
          return '¡Este cliente es elegible para una oferta estándar!';
        case 'Descuento básico':
          return '¡Este cliente es elegible para un descuento básico del 5%!';
        case 'Descuento especial':
          return '¡Este cliente es elegible para un descuento especial del 12%!';
        default:
          return 'Este cliente no es elegible para ninguna oferta especial.';
      }
    },
    offerClass(): string {
      const offer: string = this.isEligibleForSpecialOffer();
      switch (offer) {
        case 'Oferta estándar':
          return 'standard-offer';
        case 'Descuento básico':
          return 'basic-discount';
        case 'Descuento especial':
          return 'special-discount';
        default:
          return '';
      }
    }
  },
  watch: {
    client: {
      immediate: true,
      handler(client: Client | null) {
        if (client) {
          toast(`Bienvenido, ${client.full_name}`);
        }
      }
    }
  }
});
</script>

<style scoped>
.standard-offer {
  color: black;
}

.basic-discount {
  color: blue;
}

.special-discount {
  color: green;
}
</style>
