import { defineStore } from 'pinia';
import { Client } from '@/interfaces/types';

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
    }
  }
});
