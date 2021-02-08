import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLyric: false,
    songDetail: {}
  },
  mutations: {
    editshowLyric (store, type) {
      store.showLyric = type
    },
    editSongDetai (store, obj) {
      store.songDetail = obj
    }
  },
  actions: {
  },
  modules: {
  }
})
