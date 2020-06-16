<template>
  <v-app>
    <v-card width="400" class="mx-auto my-auto pa-5">
      <v-card-title>
        <h1>Iniciar sesión</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Usuario" prepend-icon="mdi-account" v-model="user"/>
          <v-text-field :type="showPassword ? 'text' : 'password'" label="Contraseña" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed dark color="cyan darken-2" @click="login">Iniciar sesión</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'App',
  data: () => ({
    user: '',
    password: '',
    showPassword: false
  }),
  methods: {
    login(){
      Firebase.auth().signInWithEmailAndPassword(this.user, this.password)
      .then(() => {
        this.$router.push('/toys')
        alert(`Bienvenido, ${this.user}`)
      }).catch(() => {
        alert('¡Upsi!')
      })
    }
  }
};
</script>
