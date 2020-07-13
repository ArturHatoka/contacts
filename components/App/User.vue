<template>
  <v-app-bar
    absolute
    dark
  >
    <v-toolbar-title>
      {{user.login}}
    </v-toolbar-title>
    <v-spacer/>
    <v-btn
      @click="exit"
      light
    >Exit</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "User",
  data(){
    return {
      user: {}
    }
  },
  mounted() {
    this.user = this.$store.state.auth.user;
  },
  methods: {
    exit(){
      localStorage.clear();
      this.$router.push('/auth')
    },
  },
}
</script>

<style scoped>

</style>
