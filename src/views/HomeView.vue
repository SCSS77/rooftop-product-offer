<template>
  <div>
    <h1>Bienvenido a la página de inicio</h1>
    <UserSearchForm @clientFound="showClientDetails" />
  </div>
</template>

<script>
import UserSearchForm from '@/components/UserSearchForm.vue';

export default {
  components: {
    UserSearchForm
  },
  methods: {
    showClientDetails(client) {
      this.$router.push({ name: 'ClientInfo', params: { cups: client.cups } });
    }
  }
}
</script>
