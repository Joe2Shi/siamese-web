<template>
  <v-card flat tile v-scroll="onScroll" min-height="748">
    <v-row>
      <v-col xl="7" lg="8" md="10" sm="12" class="mx-auto">
        <v-md-editor
          ref="editor"
          mode="preview"
          v-model="markdown"
          :include-level="[2, 4]"
          @copy-code-success="handleCopyCodeSuccess"/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { postAPI } from '../../api'

export default {
  name: 'Markdown',
  data: () => ({
    markdown: '',
    offsetTop: 0,
    requestData: {
      address: ''
    }
  }),
  created () {
    this.requestData.address = localStorage.address
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions(['showSnackbar']),
    init () {
      postAPI('/siamese-file/file/read', this.requestData)
        .then(response => {
          if (response && response.data.code === 10000) {
            this.markdown = response.data.data
            this.generateCatalog()
          }
        })
    },
    generateCatalog () {
      const that = this
      setTimeout(function () {
        const anchors = that.$refs.editor.$el.querySelectorAll(
          '.v-md-editor-preview h1,h2,h3,h4,h5,h6'
        )
        const directory = Array.from(anchors).filter((title) => !!title.innerText.trim())
        if (!directory.length) {
          that.$store.state.directory = []
          return
        }
        const hTags = Array.from(new Set(directory.map((title) => title.tagName))).sort()
        that.$store.state.directory = directory.map((el) => ({
          title: el.innerText,
          lineIndex: el.getAttribute('data-v-md-line'),
          indent: hTags.indexOf(el.tagName),
          offsetTop: el.offsetTop + 141
        }))
      }, 10)
    },
    handleCopyCodeSuccess () {
      this.showSnackbar({ message: 'Copy Success', color: 'success' })
    },
    handleAnchorClick (anchor) {
      const { editor } = this.$refs
      const { lineIndex } = anchor
      const heading = editor.$el.querySelector(
        `.v-md-editor-preview [data-v-md-line="${lineIndex}"]`
      )
      if (heading) {
        this.$vuetify.goTo(heading, { duration: 300 })
      }
    },
    onScroll (e) {
      this.$store.state.offsetTop = e.target.documentElement.scrollTop || e.target.scrollTop
    }
  },
  computed: {
    ...mapState(['anchor'])
  },
  watch: {
    'anchor' (newValue) {
      if (newValue) {
        this.handleAnchorClick(newValue)
      }
    }
  }
}
</script>
