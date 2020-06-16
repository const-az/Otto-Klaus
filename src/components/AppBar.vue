<template>
  <v-app-bar app color="cyan darken-2" dark flat>
    <v-toolbar-title class="font-weight-black">
      OTTO KLAUS <v-icon class="mb-1">mdi-toy-brick-marker-outline</v-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="logout">
      <span class="mr-2">Cerrar sesión</span>
      <v-icon>mdi-lock</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'AppBar',
  methods:{
    logout(){
      Firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
