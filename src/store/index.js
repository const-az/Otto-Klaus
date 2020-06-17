import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// To reset current toy into an empty toy
function defaultToy(){
  return {
    id: null,
    data:{
      code: '',
      name: '',
      price: 0,
      stock: 0
    }
  }
}

export default new Vuex.Store({
  state: {
    // All toys
    toys: [],
    // Toggles
    loading: false,
    edit: false,
    // Modals
    showForm: false,
    messageModal: false,
    // Current toy
    currentToy: defaultToy()
  },
  mutations: {
    // To toggle (show/hide) loading state
    SHOW_LOADING(state){
      state.loading = true
    },
    HIDE_LOADING(state){
      state.loading = false
    },
    // Put toys from Firebase into an array
    GET_TOYS(state, toys){
      state.toys = toys
    },
    // To toggle (show/hide) form to edit or add new products
    DISPLAY_TOY_FORM(state){
      state.showForm = true
    },
    HIDE_TOY_FORM(state){
      state.showForm = false
    },
    // To reset current toy into an empty toy
    RESET_CURRENT_TOY(state){
      state.currentToy.id = null
      const empty = defaultToy();
      Object.keys(empty.data).forEach(key => {
        state.currentToy.data[key] = empty.data[key]
      });
    },
    // Update data from inputs into state
    UPDATE_CODE(state, code){
      state.currentToy.data.code = code
    },
    UPDATE_NAME(state, name){
      state.currentToy.data.name = name
    },
    UPDATE_STOCK(state, stock){
      state.currentToy.data.stock = stock
    },
    UPDATE_PRICE(state, price){
      state.currentToy.data.price = price
    },
    // To toggle message form, asks for confirmation on delete or edit product
    SHOW_MESSAGE_FORM(state){
      state.messageModal = true
    },
    HIDE_MESSAGE_FORM(state){
      state.messageModal = false
    },
    // To toggle edit state if product is deleted or edited
    TRUE_EDIT(state){
      state.edit = true
    },
    FALSE_EDIT(state){
      state.edit = false
    }
  },
  actions: {
    // CRUD
    // Get toys from Firebase
    getToys({commit}){
      commit('SHOW_LOADING')
      axios.get('https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toys', { headers: { "Content-type": "text/plain"}})
      .then((accept) => {
        let data = accept.data
        commit('GET_TOYS', data)
        commit('HIDE_LOADING')
        commit('RESET_CURRENT_TOY')
      })
    },
    // Post toy from Firebase
    postToy({dispatch, commit, state}){
      // To put when edit product
      if(state.currentToy.id!=null){
        commit('SHOW_LOADING')
        axios.put(`https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy/${state.currentToy.id}`, state.currentToy.data, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getToys')
        })
      } else{
        // To post a new product
        commit('SHOW_LOADING')
        axios.post('https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy', state.currentToy.data, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getToys')
        })
      }
    },
    // Displays form when edit button is clicked
    editToy({dispatch, commit, state}, id){
      commit('SHOW_LOADING')
      axios.get(`https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy/${id}`, { headers:{'Context-type': 'application/json'} })
      .then((response) => {
        commit('HIDE_LOADING')
        state.currentToy = response.data
        dispatch('displayToyform')
      })
    },
    // Asks for confirmation to delete a product
    deleteConfirmation({commit, state}, id){
      state.currentToy.id = id
      commit('SHOW_MESSAGE_FORM')
    },
    // Deletes a toy from Firebase
    deleteToy({commit, dispatch, state}){
      commit('HIDE_MESSAGE_FORM')
      commit('SHOW_LOADING')
       axios.delete(`https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy/${state.currentToy.id}`, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('TRUE_EDIT')
          dispatch('getToys')
          commit('HIDE_LOADING')
          commit('SHOW_MESSAGE_FORM')
        })
    },
    // Closes message when product is deleted
    closeMessage({commit}){
      commit('HIDE_MESSAGE_FORM')
      commit('FALSE_EDIT')
      commit('RESET_CURRENT_TOY')
    },
    // Update data from inputs into state
    updateCode({commit}, code){
      commit('UPDATE_CODE', code)
    },
    updateName({commit}, name){
      commit('UPDATE_NAME', name)
    },
    updateStock({commit}, stock){
      commit('UPDATE_STOCK', stock)
    },
    updatePrice({commit}, price){
      commit('UPDATE_PRICE', price)
    },
    // Toggles (show/hide) form to add or edit products
    displayToyform({commit}){
      commit('DISPLAY_TOY_FORM')
    },
    hideToyform({commit}){
      commit('HIDE_TOY_FORM')
    },
    // Closes form without adding or editing products
    hideEmptyToyform({commit}){
      commit('HIDE_TOY_FORM')
      commit('RESET_CURRENT_TOY')
    },
  },
})
