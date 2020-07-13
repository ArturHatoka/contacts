<template>
  <v-main class="justify-center">
    <v-container>
      <v-row>
        <v-col>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-row>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                  />
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="phone"
                    :rules="phoneRules"
                    label="Phone"
                    required
                  />
                </v-col>
              </v-row>
              <v-row
                class="justify-center"
              >
                <v-btn
                  v-if="!edit"
                  :disabled="!valid"
                  color="success"
                  @click="addContact"
                >
                  Add contact
                </v-btn>
                <v-btn
                  v-else
                  :disabled="!valid"
                  dark
                  @click="editContact"
                >
                  Edit contact
                </v-btn>
              </v-row>
            </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
          v-for="(contact, i) in contacts"
          :key="i"
        >
          <v-card>
            <v-row class="px-3">
              <v-col
                cols="9"
              >
                <h3>{{contact.name}}</h3>
                <span>{{contact.phone}}</span>
              </v-col>
              <v-col
                cols="3"
              >
                <v-row>
                  <v-btn
                    @click="editingContact(i, contact.id)"
                    dark
                  >
                    edit
                  </v-btn>
                </v-row>
                <v-row>
                  <v-btn
                    @click="deleteContact(i, contact.id)"
                  >
                    <v-icon>
                      mdi-delete-forever
                    </v-icon>
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
    import axios from "axios";

    export default {
      name: "Contacts",
      data () {
        return {
          valid: true,
          user: {},
          edit: false,
          name: '',
          phone: '',
          nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          phoneRules: [
            v => !!v || 'Name is required',
          ],
          contacts: []
        }
      },
      mounted() {
        this.user = this.$store.state.auth.user;
        this.getContacts()
      },
      methods: {
        addContact () {
          this.$refs.form.validate()
          if (this.valid){
            axios.post(`http://localhost:3004/contacts`, `user_id=${this.user.id}&name=${this.name}&phone=${this.phone}`).then((response) => {
              this.contacts.push(response.data)
              this.clearFields()
            })
          }
        },
        getContacts () {
          axios.get(`http://localhost:3004/contacts?user_id=${this.user.id}`).then((response) => {
            this.contacts = response.data
          })
        },
        editingContact(i, id){
          this.edit = id
          this.name = this.contacts[i].name
          this.phone = this.contacts[i].phone
        },
        editContact(){
          axios.put(`http://localhost:3004/contacts/${this.edit}`, `user_id=${this.user.id}&name=${this.name}&phone=${this.phone}`).then(() => {
            this.getContacts()
            this.clearFields()
            this.edit = false
          })
        },
        deleteContact(i, id){
          axios.delete(`http://localhost:3004/contacts/${id}`).then(() => {
            this.contacts.splice(i,1)
          })
        },
        clearFields(){
          this.name = ''
          this.phone = ''
        }
      }
    }
</script>

<style scoped>

</style>
