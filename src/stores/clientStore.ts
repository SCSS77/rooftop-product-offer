import { defineStore } from 'pinia';
import { Client, SupplyPoint } from '@/interfaces/types';
import supplyPointsData from '@/data/supply-points.json';

export const useClientStore = defineStore({
  id: 'client',
  state: () => ({
    clients: [] as Client[]
  }),
  actions: {
    async loadClients() {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const data = await response.json();
        this.clients = data;
      } catch (error) {
        console.error('Error loading clients:', error);
      }
    },
    getClientByCups(cups: string): Client | undefined {
      return this.clients.find(client => client.cups === cups);
    },
    getClientSuppliesByCups(cups: string): SupplyPoint[] {
      return supplyPointsData.filter(supply => supply.cups === cups);
    }
  }
});
