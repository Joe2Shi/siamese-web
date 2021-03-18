<template>
  <v-card flat tile width="100%" class="d-flex justify-end">
    <v-card-title class="text-caption">
      <v-btn icon small :disabled="page === 1" @click="lastPage">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span class="mx-3">{{page}}</span>
      <v-btn icon small :disabled="totalPages === page || totalPages === 0" @click="nextPage">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    itemsPerPage: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 10
    }
  },
  data: () => ({
    page: 1
  }),
  methods: {
    lastPage () {
      this.page--
      this.$emit('update:page', this.page)
    },
    nextPage () {
      this.page++
      this.$emit('update:page', this.page)
    }
  },
  computed: {
    totalPages () {
      return this.total % this.itemsPerPage === 0 ? this.total / this.itemsPerPage : Math.floor(this.total / this.itemsPerPage) + 1
    }
  }
}
</script>
