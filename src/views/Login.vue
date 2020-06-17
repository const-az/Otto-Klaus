<template>
  <v-app>
    <!-- Alert on errors and success -->
    <v-snackbar elevation="0" top :color="alert.type" v-model="alert.state" timeout="3000">
      {{ alert.text }}
      <template v-slot:action="{ attrs }">
        <!-- To close alert -->
        <v-btn icon small color="white" v-bind="attrs" @click="alert.state = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Login card -->
    <v-card flat width="400" class="mx-auto my-auto pa-5">
      <v-card-title>
        <h5 class="text-h4 text-uppercase">Otto Klaus</h5>
      </v-card-title>
      <v-card-subtitle>
        <h6 class="cyan--text text--darken-2 text-h6">Inventario</h6>
      </v-card-subtitle>
      <!-- Log-in form -->
      <v-card-text>
        <v-form>
          <v-text-field label="Usuario" prepend-icon="mdi-account" v-model="user"/>
          <v-text-field :type="showPassword ? 'text' : 'password'" label="Contraseña" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" v-model="password"/>
        </v-form>
      </v-card-text>
      <!-- Send form -->
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
    // Form
    user: '',
    password: '',
    showPassword: false,
    // Alert
    alert: {
      text: '',
      state: false,
      type: ''
    }
  }),
  methods: {
    login(){
      // If all inputs are filled
      if(this.user != '' && this.password != ''){
        Firebase.auth().signInWithEmailAndPassword(this.user, this.password)
        .then(() => {
          // Welcome alert
          this.alert.type = 'success' 
          this.alert.state = true
          this.alert.text = `Bienvenida, ${this.user}`
          // Redirect to index
          setTimeout(() => {
            this.$router.push('/toys')
          }, 2000)
        })
        .catch(() => {
          // Error alert
          this.alert.type = 'error' 
          this.alert.state = true
          this.alert.text = 'Usuario o contraseña incorrectos. Intente nuevamente.'
        })
      } else{
        // If any input is empty
        this.alert.type = 'error' 
        this.alert.state = true
        this.alert.text = 'Todos los campos son obligatorios.'
      }
    }
  }
};
</script>
