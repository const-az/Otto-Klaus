<template>
  <v-app-bar app color="cyan darken-2" dark flat>
    <!-- Brand title -->
    <v-toolbar-title class="font-weight-black">
      OTTO KLAUS <v-icon class="mb-1">mdi-toy-brick-marker-outline</v-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Logout button -->
    <v-btn text @click="logout">
      <span class="mr-2"> Cerrar sesión</span>
      <v-icon>mdi-lock</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'AppBar',
  methods:{
    // Pushes into login view when sign out
    logout(){
        Firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
