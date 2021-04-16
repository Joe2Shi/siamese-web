<template>
  <v-card flat tile class="article" min-height="748">
    <v-card flat tile class="pt-4 px-8">
      <v-btn elevation="0" color="primary" small class="text-caption text-none mr-3" @click="openNewDialog()">
        <v-icon left small>mdi-plus</v-icon>
        {{$t('Page.Article.New')}}
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
    <v-dialog v-model="tipDialog" max-width="400">
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
          <v-btn color="primary" text @click="deleteItemApi()" small class="text-none">
            {{$t('Page.Article.Confirm')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- New dialog -->
    <v-dialog v-model="newDialog" max-width="650" transition="dialog-bottom-transition">
      <v-card :loading="loading">
        <basic-tick/>
        <v-card-title>
          {{$t('Page.Article.NewArticle')}}
          <v-spacer/>
          <v-btn icon small @click="cancelNew()">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider/>
        <v-form ref="newArticleInForm" autocomplete="off" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="11" class="mx-auto">
                <v-text-field
                  v-model="newForm.title"
                  :label="$t('Page.Article.Title')"
                  :placeholder="$t('Page.Article.TitleEnterTip')"
                  class="text-caption"
                  dense
                  counter="50"
                  outlined
                  clearable
                  :rules="[value => !!value || $t('Page.Article.ArticleTitleRequiredTip')]"/>
                <v-textarea
                  v-model="newForm.subtitle"
                  :label="$t('Page.Article.Subtitle')"
                  :placeholder="$t('Page.Article.SubtitleEnterTip')"
                  class="text-caption"
                  rows="3"
                  counter="200"
                  outlined
                  clearable
                  :rules="[value => !!value || $t('Page.Article.ArticleSubtitleRequiredTip')]"/>
                <v-file-input
                  v-model="newForm.file"
                  :label="$t('Page.Article.MarkdownFile')"
                  class="text-caption"
                  show-size
                  small-chips
                  truncate-length="50"
                  outlined
                  dense
                  clearable
                  prepend-icon=""
                  :placeholder="$t('Page.Article.MarkdownFileSelectTip')"
                  :rules="[value => !!value || $t('Page.Article.MarkdownFileRequiredTip')]">
                  <template v-slot:selection="{ text }">
                    <v-chip color="primary" label small>
                      {{ text }}
                    </v-chip>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="info" text class="text-none" @click="cancelNew()">
            {{$t('Page.Article.Cancel')}}
          </v-btn>
          <v-btn color="primary" text class="text-none" @click="newArticleApi()">
            {{$t('Page.Article.Confirm')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit dialog -->
    <v-dialog v-model="editDialog" max-width="650" transition="dialog-bottom-transition">
      <v-card :loading="loading">
        <basic-tick/>
        <v-card-title>
          {{$t('Page.Article.EditArticle')}}
          <v-spacer/>
          <v-btn icon small @click="cancelEdit()">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider/>
        <v-form ref="editArticleInForm" autocomplete="off" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="11" class="mx-auto">
                <v-text-field
                  v-model="editForm.title"
                  :label="$t('Page.Article.Title')"
                  :placeholder="$t('Page.Article.TitleEnterTip')"
                  class="text-caption"
                  dense
                  counter="50"
                  outlined
                  clearable
                  :rules="[value => !!value || $t('Page.Article.ArticleTitleRequiredTip')]"/>
                <v-textarea
                  v-model="editForm.subtitle"
                  :label="$t('Page.Article.Subtitle')"
                  :placeholder="$t('Page.Article.SubtitleEnterTip')"
                  class="text-caption"
                  rows="3"
                  counter="200"
                  outlined
                  clearable
                  :rules="[value => !!value || $t('Page.Article.ArticleSubtitleRequiredTip')]"/>
                <v-file-input
                  v-model="editForm.file"
                  :label="$t('Page.Article.MarkdownFile')"
                  class="text-caption"
                  :show-size="editForm.file && editForm.file.size > 0"
                  small-chips
                  truncate-length="50"
                  outlined
                  dense
                  clearable
                  prepend-icon=""
                  :placeholder="$t('Page.Article.MarkdownFileSelectTip')"
                  :rules="[value => !!value || $t('Page.Article.MarkdownFileRequiredTip')]">
                  <template v-slot:selection="{ text }">
                    <v-chip color="primary" label small>
                      {{ text }}
                    </v-chip>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="info" text class="text-none" @click="cancelEdit()">
            {{$t('Page.Article.Cancel')}}
          </v-btn>
          <v-btn color="primary" text class="text-none" @click="editArticleApi()">
            {{$t('Page.Article.Confirm')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Pagination from '../../../components/page/Pagination'
import BasicTick from '../../../components/basic/BasicTick'
import { getListAPI, postAPI, deleteListAPI, putAPI } from '../../../api'
import utils from '../../../utils'

export default {
  name: 'Article',
  components: { Pagination, BasicTick },
  data: () => ({
    loading: false,
    tipDialog: false,
    newDialog: false,
    editDialog: false,
    newForm: { title: '', subtitle: '', file: undefined },
    editForm: { id: '', title: '', subtitle: '', oldAddress: '', file: undefined },
    message: '',
    isSingle: undefined,
    search: undefined,
    total: 0,
    items: [],
    selected: [],
    options: {
      page: 1,
      itemsPerPage: 10,
      sortBy: [],
      sortDesc: []
    },
    pagination: {},
    headers: [
      { text: 'Title', align: 'center', sortable: false, value: 'title' },
      { text: 'File Address', align: 'center', sortable: false, value: 'address' },
      { text: 'Created Time', align: 'center', value: 'createTime' },
      { text: 'Update Time', align: 'center', value: 'updateTime' },
      { text: 'Operate', align: 'center', sortable: false, value: 'operate', width: 200 }
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
      const { page, itemsPerPage, sortBy, sortDesc } = this.options
      let name
      if (sortBy.length > 0) {
        name = utils.toLine(sortBy[0])
      }
      getListAPI('/siamese-item-interface/article/page',
        { key: this.search, page: page, rows: itemsPerPage, sortBy: name, desc: sortDesc[0] })
        .then(response => {
          if (response && response.data.code === 10000) {
            this.total = response.data.data.total
            this.items = response.data.data.items
          } else {
            this.total = 0
            this.items = []
          }
        })
        .catch(() => {
          this.total = 0
          this.items = []
        })
    },
    deleteItemApi () {
      deleteListAPI('/siamese-item-interface/article',
        { ids: utils.handlerParam(this.selected, 'id') })
        .then(response => {
          this.tipDialog = false
          if (response && response.data.code === 20000) {
            this.getDataFromApi()
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
      this.tipDialog = true
    },
    cancelDelete () {
      if (this.isSingle) {
        this.selected = []
      }
      this.tipDialog = false
    },
    openUpdateDialog (item) {
      this.editForm.id = item.id
      this.editForm.title = item.title
      this.editForm.subtitle = item.subtitle
      this.editForm.oldAddress = item.address
      const tempArray = item.address.split('/')
      this.editForm.file = new File([], tempArray[tempArray.length - 1])
      this.editDialog = true
    },
    openNewDialog () {
      this.newDialog = true
    },
    editArticleApi () {
      if (this.$refs.editArticleInForm.validate()) {
        this.loading = true
        putAPI('/siamese-item-interface/article', utils.objectToFormData(this.editForm), { contentType: 'application/form-data' })
          .then(response => {
            this.loading = false
            if (response && response.data.code === 20000) {
              this.cancelEdit()
              this.getDataFromApi()
            }
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    cancelNew () {
      this.$refs.newArticleInForm.reset()
      this.newDialog = false
    },
    newArticleApi () {
      if (this.$refs.newArticleInForm.validate()) {
        this.loading = true
        postAPI('/siamese-item-interface/article', utils.objectToFormData(this.newForm), { contentType: 'application/form-data' })
          .then(response => {
            this.loading = false
            if (response && response.data.code === 20000) {
              this.cancelNew()
              this.getDataFromApi()
            }
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    cancelEdit () {
      this.$refs.editArticleInForm.reset()
      this.editDialog = false
    }
  }
}
</script>
