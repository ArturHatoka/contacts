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
              :rules="[passwordRules.required, passwordRules.min, passwordRules.passMatch]"
              :type="show ? 'text' : 'password'"
              label="Password"
              hint="Well done"
              counter
              @click:append="show = !show"
            />
          </v-col>

        </v-row>
        <v-row class="justify-space-between px-3">
          <v-btn
            :disabled="!valid"
            class="mr-4"
            @click="validate"
            dark
          >
            LOGIN!
          </v-btn>
          <v-btn
            @click="resetValidation"
            dark
          >
            Reset Validation
          </v-btn>
        </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "LogIn",
  data(){
    return {
      valid: true,
      login: '',
      loginRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        v => (!this.userName) || ((v === this.userName) || 'User not found')
      ],
      show: false,
      password: '',
      passwordRules: {
        required: value => !!value || 'Password is required',
        min: v => v.length >= 5 || 'Min 5 characters',
        passMatch: v => (!this.userPass) || ((v === this.userPass) || 'The password you entered don\'t match'),
      },
      user: {},
      userId: null,
      userName: '',
      userPass: '',
    }
  },
  watch: {
    login(){
      this.inputsReset()
    },
    password(){
      this.inputsReset()
    }
  },
  methods: {
    validate () {
      this.user = this.$store.state.auth.users.find(user => user.login === this.login)
      this.loginValidate()
      this.$refs.form.validate()
    },
    resetValidation () {
      this.inputsReset()
      this.$refs.form.resetValidation()
    },
    inputsReset(){
      this.userName = ''
      this.userPass = ''
    },
    loginValidate(){
      if (this.user){
        this.userName = this.login
        this.passValidate()
      }else{
        this.userName = true
      }
    },
    passValidate () {
      if (this.password === this.user.pass){
        this.userPass = this.password
        this.userValid()
      }else{
        this.userPass = true
      }
    },
    userValid(){
      localStorage.setItem('authorized', 'true');
      localStorage.setItem('userId', this.user.id);

      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
