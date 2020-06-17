<template>
  <!-- Form to add or edit a product -->
  <v-dialog :value="showForm" max-width="500px" persistent>
    <v-card class="pa-5">
      <!-- Form title -->
      <v-card-title>
        <span class="headline">{{ !!currentToy.id ? 'Editar juguete' : 'Agregar juguete' }}</span>
      </v-card-title>
      <!-- Input to update data -->
      <v-card-text>
        <v-container>
          <v-row>
            <!-- Product code (disabled when editing product) -->
            <v-col cols="12" sm="6">
              <v-text-field :value="currentToy.data.code" label="Código" @input="updateCode" :disabled="!!currentToy.id"></v-text-field>
            </v-col>
            <!-- Product name -->
            <v-col cols="12" sm="6">
              <v-text-field :value="currentToy.data.name" label="Nombre" @input="updateName"></v-text-field>
            </v-col>
            <!-- Product stock -->
            <v-col cols="12" sm="6">
              <v-text-field :value="currentToy.data.stock" label="Stock" @input="updateStock" suffix="unidades"></v-text-field>
            </v-col>
            <!-- Product price -->
            <v-col cols="12" sm="6">
              <v-text-field :value="currentToy.data.price" label="Precio" @input="updatePrice" prefix="$"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <!-- Buttons to save product or close form -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cyan darken-2" outlined @click="hideEmptyToyform">Cancelar</v-btn>
        <v-btn color="cyan darken-2" depressed dark @click="saveToy">{{ !!currentToy.id ? 'Actualizar' : 'Crear'}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['hideToyform', 'updateCode', 'updateName', 'updateStock', 'updatePrice', 'postToy','hideEmptyToyform']),
    // Saves and close form
    saveToy(){
      this.hideToyform()
      this.postToy()
    }
  },
  computed: mapState(['showForm', 'currentToy']),
}
</script>