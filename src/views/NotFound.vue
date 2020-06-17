<template>
  <v-app>
    <!-- Link to home -->
    <v-app-bar app color="white" light flat>
      <router-link to="/toys" class="text-decoration-none">
        <v-toolbar-title class="cyan--text text--darken-2 font-weight-black">
          OTTO KLAUS <v-icon class="mb-1 cyan--text text--darken-2">mdi-toy-brick-marker-outline</v-icon>
        </v-toolbar-title>
      </router-link>
    </v-app-bar>
    <!-- Not found Message -->
    <v-main flex class="mt-15">
      <v-card flat class="ma-auto align-center" width="80vw">
        <p class="text-h4 text-center">Ups! La página que buscas no existe.</p>
        <!-- Back to index -->
        <div class="text-center mt-10">
          <v-btn depressed small dark to="/" class="cyan darken-2">Volver al inicio</v-btn>
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>