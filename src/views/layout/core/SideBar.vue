<template>
  <v-navigation-drawer color="accent" :mini-variant="miniVariant" v-model="drawer" floating clipped app>
    <v-list>
      <v-list-item :class="miniVariant ? `px-2` : ``">
        <v-avatar :class="`mx-auto ${!miniVariant ? `my-2` : ``}`" :size="!miniVariant ? 80 : 32">
          <v-img class="grey" :src="avatar"/>
        </v-avatar>
      </v-list-item>
      <v-list-item v-show="!miniVariant">
        <v-list-item-content class="py-0">
          <v-list-item-title class="text-center text-body-1 font-weight-medium" v-text="username"/>
          <v-list-item-subtitle class="text-center text-caption" v-text="motto"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider/>
    <v-list nav dense>
      <v-list-item-group color="primary" mandatory>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.path">
          <v-list-item-icon>
            <v-tooltip right :disabled="!miniVariant">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-text="item.icon" class="px-1" v-bind="attrs" v-on="on" small/>
              </template>
              <span class="text-caption" v-text="$t(item.text)"/>
            </v-tooltip>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-regular" v-text="$t(item.text)"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SideBar',
  props: ['username', 'motto', 'avatar'],
  data: () => ({
    miniVariant: false,
    items: [
      { text: 'Menu.Dashboard', icon: 'mdi-palette', path: '/dashboard' },
      { text: 'Menu.Article', icon: 'mdi-gentoo', path: '/article' },
      { text: 'Menu.Markdown', icon: 'mdi-palm-tree ', path: '/markdown' }
    ]
  }),
  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (newValue) {
        if (!newValue) {
          this.switchDrawer(newValue)
        }
      }
    }
  },
  methods: {
    ...mapActions(['switchDrawer'])
  }
}
</script>
