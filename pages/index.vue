<template>
  <v-row>
    <preloader
      v-if="!authorized"
    />
    <app-wrap
      v-else
    />
  </v-row>
</template>

<script>
import Preloader from "../components/Preloader";
import AppWrap from "../components/App/AppWrap";
import axios from "axios";

export default {
  components: {AppWrap, Preloader},
  data(){
    return {
      authorized: false
    }
  },
  mounted(){
    if(!localStorage.getItem('authorized')){
      this.$router.push('/auth')
    }else{
      axios.get('http://localhost:3004/users').then((response) => {
        let user = response.data.find(user => user.id === Number([localStorage.getItem('userId')]))
        this.$store.commit('auth/setUser', user)
        this.authorized = true
      })
    }
  },
}
</script>

<style>
</style>

