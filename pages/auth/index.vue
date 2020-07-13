<template>
  <v-container>
    <v-row class="justify-center">
        <v-card>
          <v-tabs
            v-model="tab"
            dark
          >
            <v-tab
              v-for="item in items"
              :key="item.tab"
              @click="page=item.content"
            >
              {{ item.tab }}
            </v-tab>
          </v-tabs>
          <log-in
            v-if="!page"
          />
          <register
            v-else
          />
        </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import LogIn from "../../components/Auth/LogIn";
  import Register from "../../components/Auth/Register";
  import axios from "axios";
  export default {
    name: "index",
    components: {Register, LogIn},
    data () {
      return {
        tab: null,
        page: 0,
        items: [
          { tab: 'LogIn', content: 0 },
          { tab: 'Register', content: 1 },
        ],
      }
    },
    mounted() {
      if(localStorage.getItem('authorized')){
        this.$router.push('/')
      }else{
        axios.get('http://localhost:3004/users').then((response) => {
          this.$store.commit('auth/setUsers', response.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
