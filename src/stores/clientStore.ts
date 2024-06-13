import { defineStore } from 'pinia';
import { Client, SupplyPoint } from '@/interfaces/types';
import axios from 'axios';

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [] as Client[],
    supplyPoints: [] as SupplyPoint[]
  }),
  actions: {
    async loadClients() {
      try {
        const clientsResponse = await axios.get('http://localhost:3000/clients');
        if (clientsResponse.status === 200) {
          this.clients = clientsResponse.data;
        } else {
          throw new Error('Failed to fetch clients');
        }

        const supplyPointsResponse = await axios.get('http://localhost:3000/supplyPoints');
        if (supplyPointsResponse.status === 200) {
          this.supplyPoints = supplyPointsResponse.data;
        } else {
          throw new Error('Failed to fetch supply points');
        }
      } catch (error) {
        console.error('Error loading clients or supply points:', error);
      }
    },
    getClientByCups(cups: string): Client | undefined {
      return this.clients.find(client => client.cups === cups);
    },
    getClientSuppliesByCups(cups: string): SupplyPoint[] {
      return this.supplyPoints.filter(supply => supply.cups === cups);
    },
    isEligibleForSpecialOffer(client: Client, supplies: SupplyPoint[]): string {
      if (client.building_type === 'house' && supplies.length > 0) {
        const clientSupply = supplies[0];
        const clientPower = clientSupply.power;
        const neighbors = clientSupply.neighbors;

        if (neighbors.length === 0) {
          return 'Oferta estándar';
        }

        const lowerPowerNeighbor = neighbors.some(neighbor => {
          const neighborSupply = this.supplyPoints.find(supply => supply.cups === neighbor);
          return neighborSupply && neighborSupply.power.p1 < clientPower.p1 && neighborSupply.power.p2 < clientPower.p2;
        });

        if (lowerPowerNeighbor) {
          return 'Descuento básico';
        }

        const totalInvoiceAmountOfNeighbors = neighbors.reduce((totalAmount, neighbor) => {
          const neighborSupply = this.supplyPoints.find(supply => supply.cups === neighbor);
          return neighborSupply ? totalAmount + parseFloat(neighborSupply.invoiced_amount) : totalAmount;
        }, 0);

        if (totalInvoiceAmountOfNeighbors > 100) {
          return 'Descuento especial';
        }

        return 'Oferta estándar';
      }
      return 'No aplicable';
    }
  }
});
