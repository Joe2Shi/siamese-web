import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: Cookies.get('theme') || 'light',
    language: Cookies.get('language') || 'zh',
    drawer: null,
    loading: false,
    message: null,
    color: null,
    icon: null,
    directory: [],
    anchor: undefined,
    offsetTop: 0,
    scroll: true
  },
  mutations: {
    SWITCH_THEME: (state, payload) => {
      state.theme = payload
      Cookies.set('theme', payload)
    },
    SWITCH_LANGUAGE: (state, payload) => {
      state.language = payload
      Cookies.set('language', payload)
    },
    SWITCH_DRAWER: (state, payload) => {
      state.drawer = payload
    },
    SWITCH_LOADING: (state, payload) => {
      state.loading = payload
    },
    SHOW_SNACKBAR: (state, payload) => {
      switch (payload.color) {
        case 'success':
          payload.icon = 'mdi-check-circle'
          break
        case 'warning':
          payload.icon = 'mdi-alert-outline'
          break
        case 'error':
          payload.icon = 'mdi-alert-octagon-outline'
          break
        case 'info':
          payload.icon = 'mdi-alert-circle-outline'
          break
      }
      state.message = payload.message
      state.color = payload.color
      state.icon = payload.icon
    },
    SET_DIRECTORY: (state, payload) => {
      state.directory = payload
    },
    SET_ANCHOR: (state, payload) => {
      state.anchor = payload
    },
    SET_OFFSET_TOP: (state, payload) => {
      state.offsetTop = payload
    },
    SET_SCROLL: (state, payload) => {
      state.scroll = payload
    }
  },
  actions: {
    switchTheme ({ commit }, payload) {
      commit('SWITCH_THEME', payload)
    },
    switchLanguage ({ commit }, payload) {
      commit('SWITCH_LANGUAGE', payload)
    },
    switchDrawer ({ commit }, payload) {
      commit('SWITCH_DRAWER', payload)
    },
    switchLoading ({ commit }, payload) {
      commit('SWITCH_LOADING', payload)
    },
    showSnackbar ({ commit }, payload) {
      commit('SHOW_SNACKBAR', payload)
    },
    setDirectory ({ commit }, payload) {
      commit('SET_DIRECTORY', payload)
    },
    setAnchor ({ commit }, payload) {
      commit('SET_ANCHOR', payload)
    },
    setOffsetTop ({ commit }, payload) {
      commit('SET_OFFSET_TOP', payload)
    },
    setScroll ({ commit }, payload) {
      commit('SET_SCROLL:', payload)
    }
  },
  getters: {
    theme: state => state.theme,
    language: state => state.language,
    drawer: state => state.drawer,
    loading: state => state.loading,
    text: state => state.message,
    color: state => state.color,
    icon: state => state.icon,
    directory: state => state.directory,
    anchor: state => state.anchor,
    offsetTop: state => state.offsetTop,
    scroll: state => state.scroll
  }
})
