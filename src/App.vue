<template>
  <v-app id="app" class="grey">
    <snackbar/>
    <router-view :title="title"/>
  </v-app>
</template>

<script>
import Snackbar from './components/basic/Snackbar'
import { mapState } from 'vuex'

export default {
  name: 'SingInLayout',
  components: { Snackbar },
  data: () => ({
    title: null
  }),
  created () {
    this.init()
  },
  watch: {
    '$route.matched' (newValue) {
      this.switchTitle(newValue)
    },
    'language' () {
      this.switchTitle(this.$route.matched)
    }
  },
  methods: {
    init: function () {
      this.$vuetify.theme.dark = this.theme !== 'light'
      this.$i18n.locale = this.language
      this.switchTitle(this.$route.matched)
      this.switchBackgroundColor()
    },
    switchBackgroundColor: function () {
      if (this.$vuetify.theme.dark) document.body.style.backgroundColor = '#191919'
      else document.body.style.backgroundColor = '#f1f3f4'
    },
    switchTitle: function (matched) {
      const size = matched.length
      if (size > 0) {
        document.title = `${this.$t('Base.ApplicationName')} / ${this.$t(`Menu.${matched[size - 1].meta.name}`)}`
        this.title = this.$t(`Title.${matched[size - 1].meta.title}`)
      }
    }
  },
  computed: {
    ...mapState(['theme', 'language'])
  }
}
</script>
