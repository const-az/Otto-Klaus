import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toys: [],
    loading: false,
    edit: false,
    showForm: false,
    messageModal: false,
    currentToy: {
      id: null,
      data:{
        code: '',
        name: '',
        price: 0,
        stock: 0
      }
    },
    defaultToy: {
      id: null,
      data:{
        code: '',
        name: '',
        price: 0,
        stock: 0
      }
    },
  },
  mutations: {
    UPDATE_LOADING(state){
      state.loading = !state.loading
    },
    // TOYS
    GET_TOYS(state, toys){
      state.toys = toys
      state.loading = false
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
      // state.currentToy.id = state.defaultToy.id
      // state.currentToy.data.code = state.defaultToy.data.code
      // state.currentToy.data.name = state.defaultToy.data.name
      // state.currentToy.data.stock = state.defaultToy.data.stock
      // state.currentToy.data.price = state.defaultToy.data.price
      state.currentToy = state.defaultToy
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
      commit('UPDATE_LOADING')
      axios.get('https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toys', { headers: { "Content-type": "text/plain"}})
      .then((accept) => {
        let data = accept.data
        commit('GET_TOYS', data)
      })
    },
    postToy({dispatch, commit, state}){
      if(state.currentToy.id!=null){
        commit('UPDATE_LOADING')
        axios.put(`https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy/${state.currentToy.id}`, state.currentToy.data, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('UPDATE_LOADING')
          dispatch('getToys')
          dispatch('resetCurrentToy')
        })
      }else{
        commit('UPDATE_LOADING')
        axios.post('https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy', state.currentToy.data, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('UPDATE_LOADING')
          dispatch('getToys')
          dispatch('resetCurrentToy')
        })
      }
    },
    editToy({dispatch, commit, state}, id){
      commit('UPDATE_LOADING')
      axios.get(`https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy/${id}`, { headers:{'Context-type': 'application/json'} })
      .then((response) => {
        commit('UPDATE_LOADING')
        state.currentToy = response
        state.currentToy.id = id
        dispatch('displayToyform')
      })
    },
    deleteConfirmation({commit, state}, id, name){
      state.currentToy.id = id
      commit('UPDATE_NAME', name)
      commit('SHOW_MESSAGE_FORM')
    },
    deleteToy({commit, dispatch, state}){
      commit('HIDE_MESSAGE_FORM')
      commit('UPDATE_LOADING')
       axios.delete(`https://us-central1-ottoklaus-72824.cloudfunctions.net/toys/toy/${state.currentToy.id}`, { headers:{'Context-type': 'application/json'} })
        .then(() => {
          commit('TRUE_EDIT')
          dispatch('getToys')
          commit('UPDATE_LOADING')
          commit('SHOW_MESSAGE_FORM')
        })
    },
    closeMessage({commit, dispatch}){
      commit('HIDE_MESSAGE_FORM')
      commit('FALSE_EDIT')
      dispatch('resetCurrentToy')
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
    hideEmptyToyform({commit, dispatch}){
      commit('HIDE_TOY_FORM')
      dispatch('resetCurrentToy')
    },
    // RESET
    resetCurrentToy({commit}){
      commit('RESET_CURRENT_TOY')
    }
  },
  modules: {
  }
})
