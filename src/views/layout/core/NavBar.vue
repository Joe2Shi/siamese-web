<template>
  <v-app-bar flat app clipped-left clipped-right color="accent" elevation="1">
    <v-app-bar-nav-icon @click="showDrawer()" class="hidden-lg-and-up"/>
    <v-toolbar-title class="text-subtitle-1 font-weight-medium mx-auto" v-text="$t('Base.ApplicationName')"/>
    <v-spacer/>
    <v-responsive class="hidden-sm-and-down mr-2" max-width="300">
      <v-text-field
        flat
        hide-details
        single-line
        rounded
        class="text-caption"
        background-color="secondary"
        prepend-inner-icon="mdi-magnify"
        :placeholder="$t('System.Search')"/>
    </v-responsive>
    <internationalization/>
    <v-btn icon class="hidden-sm-and-down" target="_blank" :href="github">
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <theme/>
  </v-app-bar>
</template>

<script>
import Internationalization from '../../../components/basic/Internationalization'
import { mapActions } from 'vuex'
import Theme from '../../../components/basic/Theme'
export default {
  name: 'NavBar',
  components: { Theme, Internationalization },
  props: ['github'],
  methods: {
    ...mapActions(['switchDrawer']),
    showDrawer: function () {
      this.switchDrawer(true)
    }
  }
}
</script>
