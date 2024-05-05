<template>
  <div class="searcher">
    <div class="searcher__container">
      <h1 class="searcher__title">Introduzca su ID de punto de suministro.</h1>
      <p class="searcher__subtitle">Para más información, visite <a href="#" target="_blank" title="Holaluz"> nuestra página web</a> con todas las especificaciones.</p>
      <UserSearchForm @clientFound="showClientDetails" />
    </div>
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
