<template>
  <v-navigation-drawer color="accent" right floating clipped app class="directory">
    <ul class="pa-6" v-if="directory.length > 0">
      <li :class="`pl-${2 * (anchor.indent + 1)} text-caption py-1 font-weight-regular primary--text directory-item`"
          v-for="(anchor,index) in directory"
          :key="index"
          @click="goto(anchor)">
        <a :class="`text-decoration-none text--disabled`">{{ anchor.title }}</a>
      </li>
    </ul>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Directory',
  methods: {
    goto (anchor) {
      this.switchDirectory(anchor)
      this.$store.state.scroll = false
      this.$store.state.anchor = anchor
      const than = this
      setTimeout(function () {
        than.$store.state.scroll = true
      }, 350)
    },
    switchDirectory (anchor) {
      this.deactivate()
      const directoryItem = document.getElementsByClassName('directory-item')
      for (const item of directoryItem) {
        if (item.children[0].innerHTML === anchor.title) {
          item.classList.add('router-link-active')
          item.children[0].classList.remove('text--disabled')
          break
        }
      }
    },
    deactivate () {
      const directoryActive = document.getElementsByClassName('router-link-active')
      if (directoryActive && directoryActive.length === 1) {
        directoryActive[0].children[0].classList.add('text--disabled')
        directoryActive[0].classList.remove('router-link-active')
      }
    }
  },
  watch: {
    'offsetTop' (newValue) {
      this.$store.state.anchor = undefined
      if (this.$store.state.scroll) {
        for (let i = 0; i < this.directory.length; i++) {
          if (newValue - 141 < 0) {
            this.deactivate()
            break
          }
          if (newValue >= this.directory[i].offsetTop && ((i === this.directory.length - 1) ? true : newValue < this.directory[i + 1].offsetTop)) {
            this.switchDirectory(this.directory[i])
            break
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['directory', 'offsetTop'])
  }
}
</script>

<style lang="scss" scoped>
  ul {
    list-style-type: none;

    li {
      border-left: 2px solid #e5e5e5;
    }

    li.router-link-active {
      border-left-color: currentColor;
    }
  }
</style>
