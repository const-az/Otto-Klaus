import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

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
    toys: [],
    loading: false,
    edit: false,
    showForm: false,
    messageModal: false,
    currentToy: defaultToy()
  },
  mutations: {
    SHOW_LOADING(state){
      state.loading = true
    },
    HIDE_LOADING(state){
      state.loading = false
    },
    // TOYS
    GET_TOYS(state, toys){
      state.toys = toys
    },
    // EDIT
    TRUE_EDIT(state){
      state.edit = true
    },
    FALSE_EDIT(state){
      state.edit = false
    },
    // MODAL
    DISPLAY_TOY_FORM(state){
      state.showForm = true
    },
    HIDE_TOY_FORM(state){
      state.showForm = false
    },
    // RESET
    RESET_CURRENT_TOY(state){
      state.currentToy.id = null
      const empty = defaultToy();
      Object.keys(empty.data).forEach(key => {
        state.currentToy.data[key] = empty.data[key]
      });
    },
    // UPDATE DATA
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
    // MESSAGE MODAL
    SHOW_MESSAGE_FORM(state){
      state.messageModal = true
    },
    HIDE_MESSAGE_FORM(state){
      state.messageModal = false
    }
  },
  actions: {
    // CRUD
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
    postToy({dispatch, commit, state}){
      if(state.currentToy.id!=null){
        commit('SHOW_LOADING')
        axios.put(`https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy/${state.currentToy.id}`, state.currentToy.data, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getToys')
        })
      }else{
        commit('SHOW_LOADING')
        axios.post('https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy', state.currentToy.data, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('HIDE_LOADING')
          dispatch('getToys')
        })
      }
    },
    editToy({dispatch, commit, state}, id){
      commit('SHOW_LOADING')
      axios.get(`https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy/${id}`, { headers:{'Context-type': 'application/json'} })
      .then((response) => {
        commit('HIDE_LOADING')
        state.currentToy = response.data
        dispatch('displayToyform')
      })
    },
    deleteConfirmation({commit, state}, id){
      state.currentToy.id = id
      commit('SHOW_MESSAGE_FORM')
    },
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
    closeMessage({commit}){
      commit('HIDE_MESSAGE_FORM')
      commit('FALSE_EDIT')
      commit('RESET_CURRENT_TOY')
    },
    // UPDATING DATA
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
    // MODAL
    displayToyform({commit}){
      commit('DISPLAY_TOY_FORM')
    },
    hideToyform({commit}){
      commit('HIDE_TOY_FORM')
    },
    hideEmptyToyform({commit}){
      commit('HIDE_TOY_FORM')
      commit('RESET_CURRENT_TOY')
    },
  },
  modules: {
  }
})
