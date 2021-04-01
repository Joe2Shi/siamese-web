<template>
  <v-card flat tile class="article" min-height="748">
    <v-card flat tile class="pt-4 px-8">
      <v-btn elevation="0" color="primary" small class="text-caption text-none mr-3">
        <v-icon left small>mdi-plus</v-icon>
        {{$t('Page.Article.Add')}}
      </v-btn>
      <v-btn elevation="0" color="error" @click="openDeleteDialog()" small :disabled="selected.length < 1" class="text-caption text-none">
        <v-icon left small>mdi-trash-can-outline</v-icon>
        {{$t('Page.Article.Delete')}}
      </v-btn>
    </v-card>
    <v-row class="d-flex justify-end mx-0">
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
        hide-default-footer
        loader-height="1"
        fixed-header
        show-current-page
        :no-data-text="$t('Page.Article.NoData')"
        :loading-text="$t('Page.Article.LoadingItems')"
        :show-select="true"
        :headers="headers"
        :items="items"
        v-model="selected"
        :options.sync="options"
        :server-items-length="total"
        :loading="loading"
        class="elevation-0">
        <template v-slot:item.operate="{ item }">
          <v-btn elevation="0" @click="openUpdateDialog(item)" text color="warning" small class="text-caption text-none mr-3">
            <v-icon left small>mdi-square-edit-outline</v-icon>
            {{$t('Page.Article.Edit')}}
          </v-btn>
          <v-btn elevation="0" @click="openDeleteDialog(item)" text color="error" small class="text-caption text-none">
            <v-icon left small>mdi-trash-can-outline</v-icon>
            {{$t('Page.Article.Delete')}}
          </v-btn>
        </template>
        <template v-slot:footer>
          <v-divider/>
          <pagination :page.sync="options.page" :total="total" :items-per-page="options.itemsPerPage"/>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text class="pt-3 pb-0">
          <v-icon color="warning" class="dialog mr-4">mdi-alert-outline</v-icon>
          {{$t('Page.Article.ConfirmDeleteTip')}}
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="info" text @click="cancelDelete()" small class="text-none">
            {{$t('Page.Article.Cancel')}}
          </v-btn>
          <v-btn color="primary" text @click="deleteItem()" small class="text-none">
            {{$t('Page.Article.Confirm')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Pagination from '../../../components/page/Pagination'
import { getListAPI, deleteListAPI } from '../../../api'
import utils from '../../../utils'

export default {
  name: 'Article',
  components: { Pagination },
  data: () => ({
    dialog: false,
    message: '',
    isSingle: undefined,
    search: undefined,
    total: 0,
    items: [],
    selected: [],
    loading: false,
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: [],
      sortDesc: []
    },
    pagination: {},
    headers: [
      { text: 'Title', align: 'center', sortable: false, value: 'title' },
      { text: 'Subtitle', align: 'center', sortable: false, value: 'subtitle' },
      { text: 'URL', align: 'center', sortable: false, value: 'url' },
      { text: 'Created Time', align: 'center', value: 'createTime' },
      { text: 'Update Time', align: 'center', value: 'updateTime' },
      { text: 'Operate', align: 'center', sortable: false, value: 'operate' }
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
      const { page, itemsPerPage, sortBy, sortDesc } = this.options
      let name
      if (sortBy.length > 0) {
        name = utils.toLine(sortBy[0])
      }
      getListAPI('/siamese-item-interface/article/page',
        { key: this.search, page: page, rows: itemsPerPage, sortBy: name, desc: sortDesc[0] })
        .then(response => {
          this.loading = false
          if (response && response.data.code === 10000) {
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
    },
    deleteItem () {
      deleteListAPI('/siamese-item-interface/article',
        { ids: utils.handlerParam(this.selected, 'id') })
        .then(response => {
          if (response && response.data.code === 20000) {
            this.getDataFromApi()
            this.dialog = false
          }
        })
    },
    openDeleteDialog (item) {
      if (item) {
        this.selected = [item]
        this.isSingle = true
      } else {
        this.isSingle = false
      }
      this.dialog = true
    },
    cancelDelete () {
      if (this.isSingle) {
        this.selected = []
      }
      this.dialog = false
    },
    openUpdateDialog (item) {}
  }
}
</script>
