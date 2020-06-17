<template>
  <!-- Delete confirmation modal -->
  <v-dialog :value="messageModal" max-width="500px" persistent>
    <v-card class="pa-4">
      <!-- Modal title -->
      <v-card-text>
        <v-card-title class="text-subtitle-1">{{ !edit ? '¿Seguro que deseas borrar este juguete?' : 'Producto borrado exitosamente.'}}</v-card-title>
      </v-card-text>
      <!-- Modal buttons: to confirm or close modal -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cyan darken-2" outlined @click="closeMessage">{{ !edit ? 'No' : 'Cerrar'}}</v-btn>
        <v-btn color="cyan darken-2" depressed dark @click="deleteToy" v-if="!edit">Sí</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: mapActions(['deleteToy', 'closeMessage']),
  computed: mapState(['currentToy', 'edit', 'messageModal']),
}
</script>