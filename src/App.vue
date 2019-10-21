<template>
  <v-app id="">
    <navbar></navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import navbar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    navbar,
  },
  data: () => ({
    //
  }),
};
</script>
