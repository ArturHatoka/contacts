<template>
  <v-row>
    <user/>
    <contacts/>
  </v-row>
</template>

<script>
import User from "./User";
import Contacts from "./Contacts";
export default {
    name: "AppWrap",
  components: {Contacts, User}
}
</script>

<style scoped>

</style>
