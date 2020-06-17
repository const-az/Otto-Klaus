<template>
    <v-dialog :value="messageModal" max-width="500px" persistent>
      <v-card class="pa-4">
        <v-card-text>
          <v-container>
            <v-card-title class="text-subtitle-1" v-if="!edit">¿Seguro que deseas borrar este juguete?</v-card-title>
            <v-card-title class="text-subtitle-1" v-if="edit">Producto borrado exitosamente.</v-card-title>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="edit">
          <v-spacer></v-spacer>
          <v-btn color="cyan darken-2" outlined @click="closeMessage">Cerrar</v-btn>
        </v-card-actions>
        <v-card-actions v-if="!edit">
          <v-spacer></v-spacer>
          <v-btn color="cyan darken-2" outlined @click="closeMessage">No</v-btn>
          <v-btn color="cyan darken-2" depressed dark @click="deleteToy">Sí</v-btn>
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