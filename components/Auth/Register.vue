<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="login"
            :counter="10"
            :rules="loginRules"
            label="Login"
            required
          />
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="Well done"
            counter
            @click:append="show = !show"
          />
        </v-col>

      </v-row>
      <v-row class="justify-end px-3">
        <v-btn
          :disabled="!valid"
          class="mr-4"
          @click="registerValidate"
          dark
        >
          Register
        </v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "Register",
  data(){
    return {
      valid: true,
      login: '',
      loginRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        v => (!this.checkUser) || ((v === this.checkUser) || 'Login is already in use')
      ],
      show: false,
      password: '',
      passwordRules: {
        required: value => !!value || 'Password is required',
        min: v => v.length >= 5 || 'Min 5 characters',
      },
      checkUser: '',
    }
  },
  watch: {
    login() {
      this.checkUser = ''
    },
  },
  methods: {
    registerValidate(){
      this.checkUser = this.$store.state.auth.users.find(user => user.login === this.login)
      if (!this.checkUser){
        this.registered()
      }
      this.$refs.form.validate()
    },
    registered(){
      axios.post("http://localhost:3004/users", `login=${this.login}&pass=${this.password}`).then((response) => {
        localStorage.setItem('authorized', 'true');
        localStorage.setItem('userId', response.data.id);
        this.$store.commit('auth/pushUser', response.data)

        this.$router.push('/');
      })
    },
  }
}
</script>

<style scoped>

</style>
