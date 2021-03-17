<template>
  <v-card flat tile class="article">
    <v-card flat tile class="pt-4 pb-2 px-8">
      <v-btn elevation="0" color="primary" small class="text-caption text-none mr-3">
        <v-icon left small>mdi-plus</v-icon>
        {{$t('Page.Article.Add')}}
      </v-btn>
      <v-btn elevation="0" color="error" small class="text-caption text-none">
        <v-icon left small>mdi-trash-can-outline</v-icon>
        {{$t('Page.Article.Delete')}}
      </v-btn>
    </v-card>
    <v-row class="d-flex justify-end">
      <v-col xl="3" lg="4" md="5" sm="8" class="mx-8 pt-0">
        <v-text-field
          v-model="search"
          dense
          flat
          hide-details
          class="text-caption mt-2"
          prepend-inner-icon="mdi-magnify"
          :placeholder="$t('Page.Article.Search')"/>
      </v-col>
    </v-row>
    <v-card flat class="px-4 pb-4">
      <v-data-table
        loader-height="1"
        show-current-page
        :no-data-text="$t('Page.Article.NoData')"
        :loading-text="$t('Page.Article.LoadingItems')"
        :show-select="true"
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="total"
        :loading="loading"
        class="elevation-0"/>
    </v-card>
  </v-card>
</template>

<script>
import { getListAPI } from '../../../api'

export default {
  name: 'Article',
  data: () => ({
    search: '',
    total: 0,
    items: [],
    loading: false,
    options: {
      groupBy: [],
      groupDesc: [],
      itemsPerPage: 10,
      page: 1,
      multiSort: false,
      mustSort: false
    },
    pagination: {
      page: 1,
      itemsPerPage: 10,
      pageStart: 1,
      pageStop: 10,
      pageCount: 1000,
      itemsLength: 100
    },
    headers: [
      { text: 'Title', align: 'center', sortable: false, value: 'title' },
      { text: 'Subtitle', align: 'center', value: 'subtitle' },
      { text: 'URL', align: 'center', value: 'url' },
      { text: 'Created Time', align: 'center', value: 'createTime' },
      { text: 'Update Time', align: 'center', value: 'updateTime' },
      { text: 'Operate', align: 'center' }
    ]
  }),
  watch: {
    options: {
      handler () {
        this.getDataFromApi()
      },
      deep: true
    },
    'search' () {
      this.getDataFromApi()
    }
  },
  methods: {
    getDataFromApi () {
      this.loading = true
      const { page, itemsPerPage } = this.options
      getListAPI('/siamese-item-interface/article/page', { key: this.search, page: page, rows: itemsPerPage })
        .then(response => {
          this.loading = false
          if (response && response.data.code === 20000) {
            this.total = response.data.data.total
            this.items = response.data.data.items
          } else {
            this.total = 0
            this.items = []
          }
        })
        .catch(() => {
          this.loading = false
          this.total = 0
          this.items = []
        })
    }
  }
}
</script>
