import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import './plugins/apexcharts'
import './plugins/vmdeditor'
import './plugins/highlight'

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default vue
