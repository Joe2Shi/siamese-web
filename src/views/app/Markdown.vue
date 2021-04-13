<template>
  <v-card flat tile>
    <v-md-editor
      ref="editor"
      mode="preview"
      v-model="text"
      :include-level="[2, 4]"
      @copy-code-success="handleCopyCodeSuccess"/>
    <v-navigation-drawer color="accent" right floating clipped app>
      <v-tabs vertical>
        <v-tab v-for="(anchor,index) in titles" :key="index"  @click="handleAnchorClick(anchor)">
          <span>{{ anchor.title }}</span>
        </v-tab>
      </v-tabs>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Markdown',
  data: () => ({
    titles: [],
    text: '## Java Code\n' +
      '\n' +
      '```java\n' +
      '@SpringBootApplication\n' +
      '@EnableDiscoveryClient\n' +
      '@EnableZuulProxy\n' +
      'public class SiameseGatewayApplication {\n' +
      '    public static void main(String[] args) {\n' +
      '        SpringApplication.run(SiameseGatewayApplication.class, args);\n' +
      '    }\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '## HTML Code\n' +
      '\n' +
      '```html\n' +
      '<template>\n' +
      '  <v-card flat tile class="layout" color="secondary">\n' +
      '    <nav-bar :github="user.github"/>\n' +
      '    <side-bar :username="user.username" :motto="user.motto" :avatar="user.avatar"/>\n' +
      '    <v-main>\n' +
      '      <loading :loading="loading"/>\n' +
      '      <v-card flat class="ma-4" color="accent">\n' +
      '        <breadcrumb class="mb-2"/>\n' +
      '        <v-card flat>\n' +
      '          <basic-tick/>\n' +
      '          <v-card-title>{{title}}</v-card-title>\n' +
      '          <v-divider class="pt-4"/>\n' +
      '          <router-view/>\n' +
      '        </v-card>\n' +
      '      </v-card>\n' +
      '    </v-main>\n' +
      '    <directory/>\n' +
      '  </v-card>\n' +
      '</template>\n' +
      '```\n' +
      '\n' +
      '## JavaScript Code\n' +
      '\n' +
      '```js\n' +
      'import Loading from \'../../components/basic/Loading\'\n' +
      'import BasicTick from \'../../components/basic/BasicTick\'\n' +
      'import Breadcrumb from \'./core/Breadcrumb\'\n' +
      'import NavBar from \'./core/NavBar\'\n' +
      'import SideBar from \'./core/SideBar\'\n' +
      'import Directory from \'./core/Directory\'\n' +
      'import { mapActions, mapState } from \'vuex\'\n' +
      'import { getListAPI } from \'../../api\'\n' +
      '\n' +
      'export default {\n' +
      '  name: \'Layout\',\n' +
      '  props: [\'title\'],\n' +
      '  components: {\n' +
      '    Directory,\n' +
      '    Loading,\n' +
      '    BasicTick,\n' +
      '    NavBar,\n' +
      '    SideBar,\n' +
      '    Breadcrumb\n' +
      '  },\n' +
      '  data: () => ({\n' +
      '    user: {\n' +
      '      username: \'\',\n' +
      '      motto: \'\',\n' +
      '      github: \'\',\n' +
      '      avatar: \'\'\n' +
      '    }\n' +
      '  }),\n' +
      '  created () {\n' +
      '    this.getUserInformation()\n' +
      '  },\n' +
      '  methods: {\n' +
      '    ...mapActions([\'switchDrawer\', \'showSnackbar\']),\n' +
      '    getUserInformation () {\n' +
      '      getListAPI(\'/siamese-user-interface/user\')\n' +
      '        .then(response => {\n' +
      '          if (response && response.data.code === 10000) {\n' +
      '            this.user = response.data.data\n' +
      '          } else if (response && response.data.code !== 40100) {\n' +
      '            this.showSnackbar({ message: response.data.message, color: \'error\' })\n' +
      '          }\n' +
      '        })\n' +
      '    }\n' +
      '  },\n' +
      '  computed: {\n' +
      '    ...mapState([\'loading\', \'theme\'])\n' +
      '  }\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '## XML Code\n' +
      '\n' +
      '```xml\n' +
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<project xmlns="http://maven.apache.org/POM/4.0.0"\n' +
      '         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
      '         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
      '    <parent>\n' +
      '        <artifactId>siamese-service</artifactId>\n' +
      '        <groupId>com.joe2shi.siamese</groupId>\n' +
      '        <version>1.0.0-SNAPSHOT</version>\n' +
      '    </parent>\n' +
      '    <modelVersion>4.0.0</modelVersion>\n' +
      '\n' +
      '    <artifactId>siamese-gateway</artifactId>\n' +
      '    <packaging>jar</packaging>\n' +
      '\n' +
      '    <dependencies>\n' +
      '        <dependency>\n' +
      '            <groupId>org.springframework.boot</groupId>\n' +
      '            <artifactId>spring-boot-starter-web</artifactId>\n' +
      '        </dependency>\n' +
      '        <dependency>\n' +
      '            <groupId>org.springframework.boot</groupId>\n' +
      '            <artifactId>spring-boot-devtools</artifactId>\n' +
      '            <optional>true</optional>\n' +
      '        </dependency>\n' +
      '        <dependency>\n' +
      '            <groupId>org.springframework.cloud</groupId>\n' +
      '            <artifactId>spring-cloud-starter-netflix-zuul</artifactId>\n' +
      '        </dependency>\n' +
      '        <dependency>\n' +
      '            <groupId>com.alibaba.cloud</groupId>\n' +
      '            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>\n' +
      '        </dependency>\n' +
      '        <dependency>\n' +
      '            <groupId>com.alibaba.cloud</groupId>\n' +
      '            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>\n' +
      '        </dependency>\n' +
      '        <dependency>\n' +
      '            <groupId>org.springframework.boot</groupId>\n' +
      '            <artifactId>spring-boot-starter-data-redis</artifactId>\n' +
      '        </dependency>\n' +
      '        <dependency>\n' +
      '            <groupId>org.projectlombok</groupId>\n' +
      '            <artifactId>lombok</artifactId>\n' +
      '        </dependency>\n' +
      '        <dependency>\n' +
      '            <groupId>com.joe2shi.siamese</groupId>\n' +
      '            <artifactId>siamese-common</artifactId>\n' +
      '            <version>1.0.0-SNAPSHOT</version>\n' +
      '        </dependency>\n' +
      '    </dependencies>\n' +
      '\n' +
      '    <build>\n' +
      '        <plugins>\n' +
      '            <plugin>\n' +
      '                <groupId>org.springframework.boot</groupId>\n' +
      '                <artifactId>spring-boot-maven-plugin</artifactId>\n' +
      '            </plugin>\n' +
      '        </plugins>\n' +
      '    </build>\n' +
      '\n' +
      '</project>\n' +
      '```\n' +
      '\n' +
      '## Json Code\n' +
      '\n' +
      '```json\n' +
      '{\n' +
      '  "Base": {\n' +
      '    "ApplicationName": "Siamese Admin"\n' +
      '  },\n' +
      '  "Menu": {\n' +
      '    "SignIn": "Sign In",\n' +
      '    "Dashboard": "Dashboard",\n' +
      '    "Article": "Article",\n' +
      '    "Markdown": "Markdown"\n' +
      '  },\n' +
      '  "Title": {\n' +
      '    "SignIn": "Sign In",\n' +
      '    "SystemOverview": "System Overview",\n' +
      '    "ArticleManagement": "Article Management",\n' +
      '    "Markdown": "Markdown"\n' +
      '  },\n' +
      '  "System": {\n' +
      '    "ConnectTimeout": "Connect timeout",\n' +
      '    "Chinese": "简体中文",\n' +
      '    "English": "English",\n' +
      '    "Close": "Close",\n' +
      '    "Search": "Search"\n' +
      '  },\n' +
      '  "Page": {\n' +
      '    "SignIn": {\n' +
      '      "Account": "Account",\n' +
      '      "SignIn": "Sign In",\n' +
      '      "SignInSiameseAdmin": "Sign In Siamese Admin",\n' +
      '      "UsernameOrPhoneNumber": "Username / Phone Number",\n' +
      '      "Password": "Password",\n' +
      '      "ForgotPassword": "Forgot your password?",\n' +
      '      "OrSignInWith": "Or Sign In With",\n' +
      '      "BySigningInYouAgreeToThe": "By signing in, you agree to the",\n' +
      '      "TermsOfService": "Terms Of Service",\n' +
      '      "AndSymbol": "&",\n' +
      '      "PrivacyPolicy": "Privacy Policy",\n' +
      '      "UsernameRequiredTip": "Username is required",\n' +
      '      "PasswordRequiredTip": "Password is required"\n' +
      '    },\n' +
      '    "Dashboard": {\n' +
      '\n' +
      '    },\n' +
      '    "Article": {\n' +
      '      "Search": "Search",\n' +
      '      "New": "New",\n' +
      '      "Edit": "Edit",\n' +
      '      "Delete": "Delete",\n' +
      '      "NoData": "No Data",\n' +
      '      "LoadingItems": "Loading Items",\n' +
      '      "Cancel": "Cancel",\n' +
      '      "Confirm": "Confirm",\n' +
      '      "ConfirmDeleteTip": "Are you sure you wish to remove?",\n' +
      '      "ArticleTitleRequiredTip": "Article title is required",\n' +
      '      "ArticleSubtitleRequiredTip": "Article subtitle is required",\n' +
      '      "MarkdownFileRequiredTip": "Markdown file is required",\n' +
      '      "NewArticle": "New Article",\n' +
      '      "EditArticle": "Edit Article",\n' +
      '      "Title": "Title",\n' +
      '      "Subtitle": "Subtitle",\n' +
      '      "MarkdownFile": "Markdown File",\n' +
      '      "TitleEnterTip": "Please enter article title",\n' +
      '      "SubtitleEnterTip": "Please enter article subtitle",\n' +
      '      "MarkdownFileSelectTip": "Please select markdown file"\n' +
      '    }\n' +
      '  }\n' +
      '}\n' +
      '```'
  }),
  mounted () {
    const anchors = this.$refs.editor.$el.querySelectorAll(
      '.v-md-editor-preview h1,h2,h3,h4,h5,h6'
    )
    const titles = Array.from(anchors).filter((title) => !!title.innerText.trim())

    if (!titles.length) {
      this.titles = []
      return
    }

    const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort()

    this.titles = titles.map((el) => ({
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName)
    }))
  },
  methods: {
    ...mapActions(['showSnackbar']),
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
        this.$vuetify.goTo(heading, { duration: 500 })
      }
    }
  }

}
</script>
