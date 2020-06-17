<template>
  <v-container>
    <!-- Toys list -->
    <v-card flat>
      <!-- Header -->
      <v-card-title>
        Lista de juguetes
        <v-spacer></v-spacer>
        <!-- Search field -->
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Búsqueda" single-line hide-details></v-text-field>
      </v-card-title>
      <!-- Content -->
      <v-data-table :headers="headers" :items="toys" :search="search" no-results-text="No existen productos registrados con esas características." no-data-text="No hay productos disponibles..." hide-default-footer>
        <!-- Buttons (edit/delete) -->
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editToy(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deleteConfirmation(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Toys',
  data() {
      return {
        search: '',
        // Data for table
        headers: [
          {
            text: 'Código SKU',
            align: 'start',
            sortable: true,
            value: 'data.code',
          },
          { text: 'Nombre', value: 'data.name'},
          { text: 'Stock', value: 'data.stock'},
          { text: 'Precio', value: 'data.price'},
          { text: '', value: 'actions'},
        ],
      }
    },
    // Actions and states from store
    methods: mapActions(['updateEdit', 'editToy','deleteConfirmation']),
    computed: mapState(['toys','edit']),
    // Displays all toys registered on mounted
    mounted(){
      this.$store.dispatch('getToys')
    },
  }
</script>
