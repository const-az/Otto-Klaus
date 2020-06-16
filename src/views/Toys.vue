<template>
  <v-app>
    <app-bar></app-bar>
    <v-main align="center">
      <!-- TOYS LIST -->
      <toys-list></toys-list>
      <!-- ADD NEW PRODUCT BUTTON -->
      <v-btn depressed color="cyan darken-2" class="mt-15" fab dark @click="displayToyform">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <!-- FORM -->
      <toy-form></toy-form>
      <!-- MESSAGE -->
      <message-form></message-form>
      <!-- LOADING -->
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '../components/AppBar'
import ToysList from '../components/ToysList'
import ToyForm from '../components/ToyForm'
import MessageForm from '../components/MessageForm'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AppBar,
    ToysList,
    ToyForm,
    MessageForm
  },
  methods: mapActions(['displayToyform']),
  computed: mapState(['loading'])
}
</script>