<template>
  <v-btn icon @click="changeTheme()">
    <v-icon>mdi-invert-colors</v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Theme',
  methods: {
    ...mapActions(['switchTheme']),
    changeTheme () {
      this.$vuetify.theme.dark = this.theme === 'light'
      this.switchTheme(this.theme === 'light' ? 'dark' : 'light')
      this.switchBackgroundColor()
    },
    switchBackgroundColor () {
      if (this.$vuetify.theme.dark) document.body.style.backgroundColor = '#191919'
      else document.body.style.backgroundColor = '#f1f3f4'
    }
  },
  computed: {
    ...mapState(['theme'])
  }
}
</script>
