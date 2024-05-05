<template>
  <div>
    <h1>Introduzca su ID de punto de suministro.</h1>
    <p>Para más información, visite nuestra página web con todas las especificaciones.</p>
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
