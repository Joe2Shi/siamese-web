<template>
  <v-card flat tile class="layout" color="secondary">
    <nav-bar :github="user.github"/>
    <side-bar :username="user.username" :motto="user.motto" :avatar="user.avatar"/>
    <v-main>
      <loading :loading="loading"/>
      <v-card flat class="ma-4" color="accent">
        <breadcrumb class="mb-2"/>
        <v-card flat>
          <basic-tick/>
          <v-card-title>{{title}}</v-card-title>
          <v-divider class="pt-4"/>
          <router-view/>
        </v-card>
      </v-card>
    </v-main>
    <directory/>
  </v-card>
</template>

<script>
import Loading from '../../components/basic/Loading'
import BasicTick from '../../components/basic/BasicTick'
import Breadcrumb from './core/Breadcrumb'
import NavBar from './core/NavBar'
import SideBar from './core/SideBar'
import Directory from './core/Directory'
import { mapActions, mapState } from 'vuex'
import { getListAPI } from '../../api'

export default {
  name: 'Layout',
  props: ['title'],
  components: {
    Directory,
    Loading,
    BasicTick,
    NavBar,
    SideBar,
    Breadcrumb
  },
  data: () => ({
    user: {
      username: '',
      motto: '',
      github: '',
      avatar: ''
    }
  }),
  created () {
    this.getUserInformation()
  },
  methods: {
    ...mapActions(['switchDrawer', 'showSnackbar']),
    getUserInformation () {
      getListAPI('/siamese-user-interface/user')
        .then(response => {
          if (response && response.data.code === 10000) {
            this.user = response.data.data
          } else {
            this.showSnackbar({ message: response.data.message, color: 'error' })
          }
        })
    }
  },
  computed: {
    ...mapState(['loading', 'theme'])
  }
}
</script>
