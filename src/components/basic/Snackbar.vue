<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="timeout"
    elevation="1"
    right top>
    <div class="v-alert__border v-alert__border--left"/>
    <v-icon v-show="icon" small class="mr-4" v-text="icon"/>
    <span class="vertical-align-middle text-caption" v-text="message"/>
    <v-btn class="text-none ml-2 text-caption" small text @click="show = false" v-text="$t('System.Close')"/>
  </v-snackbar>
</template>

<script>
export default {
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SHOW_SNACKBAR') {
        this.message = state.message
        this.color = state.color
        this.icon = state.icon
        this.show = true
      }
    })
  },
  data: () => ({
    show: false,
    color: '',
    message: '',
    timeout: 3000,
    icon: ''
  })
}
</script>
