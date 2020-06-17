<template>
  <v-app>
    <!-- AppBar -->
    <app-bar></app-bar>
    <v-main align="center">
      <!-- Toys List -->
      <toys-list></toys-list>
      <!-- Add new product button -->
      <v-btn depressed color="cyan darken-2" class="mt-15" fab dark @click="displayToyform">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <!-- Form -->
      <toy-form></toy-form>
      <!-- Message -->
      <message-form></message-form>
      <!-- Loading -->
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
  // To show form to edit or add new products
  methods: mapActions(['displayToyform']),
  // Loading state
  computed: mapState(['loading'])
}
</script>